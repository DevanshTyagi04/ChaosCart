terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
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
  ami                    = "ami-01b40e1bcccae197a"
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.chaoscart_sg.id]

  root_block_device {
    volume_size = 25
    volume_type = "gp3"
  }

  user_data = <<-EOF
#!/bin/bash

dnf update -y

dnf install -y docker git

systemctl enable docker
systemctl start docker

mkdir -p /usr/libexec/docker/cli-plugins

curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o /usr/libexec/docker/cli-plugins/docker-compose

chmod +x /usr/libexec/docker/cli-plugins/docker-compose

usermod -aG docker ec2-user

cd /home/ec2-user

git clone https://github.com/devanshtyagi04/chaoscart.git

chown -R ec2-user:ec2-user /home/ec2-user/chaoscart

cd chaoscart

cat > services/user-service/.env <<EOL
PORT=4001
DATABASE_URL="postgresql://postgres:password@postgres-user:5432/chaoscart_users?schema=public"
EOL

cat > services/product-service/.env <<EOL
PORT=4002
DATABASE_URL="postgresql://postgres:password@postgres-product:5432/chaoscart_products?schema=public"
EOL

cat > services/order-service/.env <<EOL
PORT=4003
DATABASE_URL="postgresql://postgres:password@postgres-order:5432/chaoscart_orders?schema=public"
USER_SERVICE_URL="http://user-service:4001"
PRODUCT_SERVICE_URL="http://product-service:4002"
EOL

sleep 30

docker compose pull

sleep 10

docker compose up -d

EOF

  tags = {
    Name = var.instance_name
  }
}

