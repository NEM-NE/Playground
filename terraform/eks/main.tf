module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  cluster_name    = var.cluster_name
  cluster_version = "1.22"

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  cluster_addons = {
    coredns = {
      resolve_conflicts = "OVERWRITE"
    }
    kube-proxy = {}
    vpc-cni = {
      resolve_conflicts = "OVERWRITE"
    }
  }

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    public = {
      name         = "public"
      min_size     = 1
      max_size     = 1
      desired_size = 1

      disk_size = 10

      instance_types = ["t3.small"]
      capacity_type  = "SPOT"
    }

    inference = {
      name         = "inference"
      min_size     = 1
      max_size     = 1
      desired_size = 1

      disk_size = 30

      instance_types = ["t3.small"]
      capacity_type  = "SPOT"

      taints = {
        kind = {
          key    = "kind"
          effect = "NO_SCHEDULE"
          value  = "inference"
        }
      }

      labels = {
        kind = "inference"
      }
    }

    api = {
      name         = "api"
      min_size     = 1
      max_size     = 1
      desired_size = 1

      disk_size = 30

      instance_types = ["t3.small"]
      capacity_type  = "SPOT"

      taints = {
        kind = {
          key    = "kind"
          effect = "NO_SCHEDULE"
          value  = "api"
        }
      }

      labels = {
        kind = "api"
      }
    }
  }

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}