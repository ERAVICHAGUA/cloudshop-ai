resource "aws_ecr_repository" "backend" {
  name                 = "cloudshop-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "cloudshop-backend"
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "cloudshop-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "cloudshop-frontend"
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}