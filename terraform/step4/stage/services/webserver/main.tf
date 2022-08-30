provider "aws" {
  region = "ap-northeast-2"
}

module "webserver" {
  source = "../../../modules/services/webserver"

  service-port = 8080
  cluster_name = "webserver-stage"
  db_remote_state_bucket = "terraform-up-and-running-state-so1s"
  db_remote_state_key = "stage/services/webserver/terraform.tfstate"

  instance_type = "tc2.micro"
  asg_min_size = 1
  asg_max_siz = 3
}