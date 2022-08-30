provider "aws" {
  region = "ap-northeast-2"
}

module "webserver" {
  source = "../../../modules/services/webserver"

  service-port = 8080
  cluster_name = "webserver-stage"
  db_remote_state_bucket = "terraform-up-and-running-state-so1s"
  db_remote_state_key = "prod/services/webserver/terraform.tfstate"

  instance_type = "m4.large"
  asg_min_size = 2
  asg_max_siz = 10
}

resource "aws_autoscaling_schedule" "asg_autoscale_bussiness_time" {
  scheduled_action_name  = "size-up-instance-during-bussiness-time"
  min_size               = 2
  max_size               = 10
  desired_capacity       = 5
  recurrence = "0 0 9 * * ?"
  autoscaling_group_name = module.webserver.asg_name
}

resource "aws_autoscaling_schedule" "asg_autoscale_bed_time" {
  scheduled_action_name  = "size-up-instance-during-bed-time"
  min_size               = 2
  max_size               = 10
  desired_capacity       = 2
  recurrence = "0 0 17 * * ?"
  autoscaling_group_name = module.webserver.asg_name
}