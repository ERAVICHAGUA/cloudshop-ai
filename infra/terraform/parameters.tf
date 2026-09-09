resource "aws_ssm_parameter" "database_url" {
  name        = "/cloudshop/dev/database_url"
  description = "Database connection URL for CloudShop backend"
  type        = "SecureString"

value = var.database_url

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}