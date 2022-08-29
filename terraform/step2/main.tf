provider "aws" {
  region = "ap-northeast-2"
}

# resource "aws_instance" "test-instance" {
#   ami = "ami-0ea5eb4b05645aa8a"
#   instance_type = "t2.micro"
#   vpc_security_group_ids = [ aws_security_group.test-instance-sg.id ]

#   user_data = <<-EOF
#                 #!/bin/bash
#                 echo "Hello World!" > index.html
#                 nohup busybox httpd -f -p ${var.service-port} &
#                 EOF
#   tags = {
#     Name = "terraform-example"
#   }
# }

resource "aws_launch_configuration" "alc-example" {
  image_id = "ami-0ea5eb4b05645aa8a"
  instance_type = "t2.micro"
  security_groups = [ aws_security_group.test-instance-sg.id ]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello World!" > index.html
              nohup busybox httpd -f -p ${var.service-port} &
              EOF
  

  lifecycle {
    create_before_destroy = true
  }

}
resource "aws_autoscaling_group" "asg-example" {
  launch_configuration = aws_launch_configuration.alc-example.name
  vpc_zone_identifier = data.aws_subnet_ids.default.ids

  target_group_arns = [aws_lb_target_group.asg.arn]
  health_check_type = "ELB"

  min_size = 2
  max_size = 10

  tag {
    key = "Name"
    value = "terraform-asg-example"
    propagate_at_launch = true
  }
}

resource "aws_security_group" "test-instance-sg" {
  name = "terraform-example-sg"

  ingress {
    from_port = var.service-port
    to_port = var.service-port
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
}

resource "aws_lb" "example" {
  name = "example-lb-tf"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = data.aws_subnet_ids.default.ids
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.example.arn
  port = "80"
  protocol = "HTTP"

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
  protocol = "HTTP"
  vpc_id   = data.aws_vpc.default.id

  health_check {
    path                = "/"
    protocol            = "HTTP"
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
  name = "terraform-example-alb"

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}