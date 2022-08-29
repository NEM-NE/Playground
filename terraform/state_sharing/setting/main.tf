provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_s3_bucket" "tf-state" {
  bucket = var.bucket_name
  
  force_destroy = true

  # 상태 파일의 이력관리를 위해
  # 버전관리 기능을 활성화 합니다.
  versioning {
    enabled = true
  }

}

resource "aws_s3_bucket_server_side_encryption_configuration" "tf-state-encrypt" {
  bucket = aws_s3_bucket.tf-state.bucket

  rule {
    apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "tf-state-db" {
  name = var.table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

}