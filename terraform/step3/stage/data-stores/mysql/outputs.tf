output "db_address" {
  value       = aws_db_instance.example.address
  description = "DB Instance Address"
}

output "db_port" {
  value       = aws_db_instance.example.port
  description = "DB Instance Port"
}