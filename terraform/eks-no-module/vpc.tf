locals {
  vpc_name        = "eks-no-module-terraform-test-vpc"
  cidr            = "10.0.0.0/16"
  public_subnets  = ["10.0.255.0/24", "10.0.254.0/24"]
  private_subnets = ["10.0.0.0/24", "10.0.1.0/24"]
  azs             = ["ap-northeast-2a", "ap-northeast-2b", "ap-northeast-2c", "ap-northeast-2d"]
  cluster_name    = "eks-no-module-terraform-test-cluster"
}

resource "aws_vpc" "main" {
  cidr_block = local.cidr

  tags = {
    Name = local.vpc_name
  }
}

resource "aws_default_route_table" "main" {
  default_route_table_id = aws_vpc.main.default_route_table_id
  
  tages = {
    Name = "${local.vpc_name}-default"
  }
}

resource "aws_default_security_group" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.vpc_name}-default"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.vpc_name}-default"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.vpc_name}-public"
  }
}

resource "aws_route" "public_worldwide" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_subnet" "public" {
  count = length(local.public_subnets)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = local.public_subnets[count.index]
  availability_zone       = local.azs[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name                                          = "${local.vpc_name}-public-${count.index + 1}"
    "kubernetes.io/cluster/${local.cluster_name}" = "shared",
    "kubernetes.io/role/elb"                      = "1"
  }
}

resource "aws_route_table_association" "public" {
  count = length(local.public_subnets)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public
}

resource "aws_eip" "nat_gateway" {
  vpc = true

  tags = {
    Name = "${local.vpc_name}-natgw"
  }
}

resource "aws_nat_gateway" "this" {
  allocation_id = aws_eip.nat_gateway.id
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "${local.vpc_name}-natgw"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.vpc_name}-private"
  }
}

resource "aws_route" "private_worldwide" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.this.id
}

resource "aws_subnet" "private" {
  count = length(local.private_subnets)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = local.private_subnets[count.index]
  availability_zone       = local.azs[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name                                          = "${local.vpc_name}-public-${count.index + 1}"
    "kubernetes.io/cluster/${local.cluster_name}" = "shared",
    "kubernetes.io/role/internal-elb"             = "1"
  }
}

resource "aws_route_table_association" "private" {
  count = length(local.private_subnets)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private
}