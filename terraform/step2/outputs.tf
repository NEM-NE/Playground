output "public_ip" {
  description = "the public ip address of the web server"
  value = aws_instance.test-instance.public_ip
}