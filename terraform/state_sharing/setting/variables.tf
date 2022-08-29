variable "bucket_name" {
  description = "for tf-state s3 bucket name"
  type = string
  default = "tf-state-s3-nemne"
}

variable "table_name" {
  description = "for tf-state dynamo db table name"
  type = string
  default = "tf-state-db"
}