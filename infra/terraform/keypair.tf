resource "aws_key_pair" "cloudshop" {
  key_name   = "cloudshop-key"
  public_key = file(pathexpand("~/.ssh/cloudshop-key-v2.pub"))

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}