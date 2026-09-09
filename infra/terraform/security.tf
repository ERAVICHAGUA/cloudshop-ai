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