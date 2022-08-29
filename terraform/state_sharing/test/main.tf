provider "aws" {
  region = "ap-northeast-2"
}

# terraform {
#   backend "s3" {
#     bucket         = "tf-state-s3-nemne"
#     key            = "../test/terraform.tfstate"
#     region         = "ap-northeast-2"
#     dynamodb_table = "tf-state-db"
#     encrypt        = true
#   }
# }

resource "aws_instance" "example" {
  ami = "ami-0ea5eb4b05645aa8a"
  instance_type = "t2.micro"
}