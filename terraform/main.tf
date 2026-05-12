provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "chaoscart_sg" {
  name        = "chaoscart-sg"
  description = "Security group for ChaosCart"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Grafana"
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Prometheus"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "cAdvisor"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "chaoscart_ec2" {
  ami                    = "ami-0f918f7e67a3323f0"
  instance_type          = "t2.small"
  key_name               = "EC2 Tutorial"
  vpc_security_group_ids = [aws_security_group.chaoscart_sg.id]

  tags = {
    Name = "ChaosCart"
  }
}

