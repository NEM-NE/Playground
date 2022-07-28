provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_instance" "test_instance" {
  ami = "ami-0fd0765afb77bcca7"
  instance_type = "t2.micro"

  tags = {
    Name = "terraform-example"
  }
}