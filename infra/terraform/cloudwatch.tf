resource "aws_cloudwatch_log_group" "backend" {
  name              = "/cloudshop/backend"
  retention_in_days = 7

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/cloudshop/frontend"
  retention_in_days = 7

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}