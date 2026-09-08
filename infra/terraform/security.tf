resource "aws_security_group" "cloudshop_ec2" {
  name        = "cloudshop-ec2-sg"
  description = "Security Group for CloudShop EC2"
  vpc_id      = aws_vpc.cloudshop.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "FastAPI"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH from my IP"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["138.84.39.219/32"]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "cloudshop-ec2-sg"
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}