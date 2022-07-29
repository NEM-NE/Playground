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
  ami = "ami-0ea5eb4b05645aa8a"
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
  vpc_zone_identifier = data.aws_subnet.default.ids


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

data "aws_subnet" "default" {
  vpc_id = data.aws_vpc.default.id
}

resource "aws_lb" "example" {
  name = "example-lb-tf"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.default.ids
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

resource "aws_security_group" "alb" {
  name = "terraform-example-alb"

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port = 80
    to_port = 80
    protocol = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
}