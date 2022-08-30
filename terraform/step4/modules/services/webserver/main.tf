provider "aws" {
  region = "ap-northeast-2"
}

terraform {
  backend "s3" {
    bucket = "terraform-up-and-running-state-so1s"
    key = "module/services/webserver/terraform.tfstate"
    region = "ap-northeast-2"
    dynamodb_table = "terraform-up-and-running-locks-so1s"
    encrypt = true
  }
}

locals {
  http_port = 80
  any_port = 0
  any_protocol = "-1"
  tcp_protocol = "tcp"
  http_protocol = "HTTP"
  all_ips = ["0.0.0.0/0"]  
}

resource "aws_launch_configuration" "alc-example" {
  image_id = "ami-0ea5eb4b05645aa8a"
  instance_type = var.instance_type
  security_groups = [ aws_security_group.test-instance-sg.id ]

  user_data = data.template_file.user_data.rendered

  lifecycle {
    create_before_destroy = true
  }

}
resource "aws_autoscaling_group" "asg-example" {
  launch_configuration = aws_launch_configuration.alc-example.name
  vpc_zone_identifier = data.aws_subnet_ids.default.ids

  target_group_arns = [aws_lb_target_group.asg.arn]
  health_check_type = "ELB"

  min_size = var.asg_min_size
  max_size = var.asg_max_size

  tag {
    key = "Name"
    value = "${var.cluster_name}-asg-example"
    propagate_at_launch = true
  }
}

resource "aws_security_group" "test-instance-sg" {
  name = "${var.cluster_name}-instance"

  ingress {
    from_port = var.service-port
    to_port = var.service-port
    protocol = local.tcp_protocol
    cidr_blocks = local.all_ips
  }
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

resource "aws_lb" "example" {
  name = "${var.cluster_name}-lb-tf"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = data.aws_subnet_ids.default.ids
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.example.arn
  port = local.http_port
  protocol = local.http_protocol

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "404: page not found"
      status_code = 404
    }
  }
}

resource "aws_lb_target_group" "asg" {

  name = aws_lb.example.name

  port     = var.service-port
  protocol = local.http_protocol
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/"
    protocol            = local.http_protocol
    matcher             = "200"
    interval            = 15
    timeout             = 3
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener_rule" "asg" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 100

  condition {
    path_pattern {
      values = ["*"]
    }
  }

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.asg.arn
  }
}

resource "aws_security_group" "alb" {
  name = "${var.cluster_name}-alb"

  ingress {
    from_port = local.http_port
    to_port = local.http_port
    protocol = local.tcp_protocol
    cidr_blocks = local.all_ips
  }
  
  egress {
    from_port   = local.any_port
    to_port     = local.any_port
    protocol    = local.any_protocol
    cidr_blocks = local.all_ips
  }
}

data "terraform_remote_state" "db" {
  backend = "s3"
  config = {
    bucket = var.db_remote_state_bucket
    key = var.db_remote_state_bucket
    region = "ap-northeast-2"
   }
}

data "template_file" "user_data" {
  template = file("${path.module}/user-data.sh")

  vars = {
    service-port = var.service-port
    db_address = data.terraform_remote_state.db.outputs.db_address
    db_port = data.terraform_remote_state.db.outputs.db_port
  }
}