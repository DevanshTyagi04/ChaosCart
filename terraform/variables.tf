variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.small"
}

variable "key_name" {
  description = "AWS EC2 key pair name"
  type        = string
}

variable "instance_name" {
  description = "EC2 instance name"
  type        = string
  default     = "ChaosCart"
}