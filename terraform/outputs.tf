output "public_ip" {
  description = "EC2 public IP"
  value       = aws_instance.chaoscart_ec2.public_ip
}

output "application_url" {
  description = "Main application URL"
  value       = "http://${aws_instance.chaoscart_ec2.public_ip}"
}

output "grafana_url" {
  description = "Grafana dashboard URL"
  value       = "http://${aws_instance.chaoscart_ec2.public_ip}:3001"
}