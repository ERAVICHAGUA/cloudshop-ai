# ============================================================
# SNS - CloudShop Alerts
# ============================================================

resource "aws_sns_topic" "cloudshop_alerts" {
  name = "cloudshop-alerts"

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_sns_topic_subscription" "cloudshop_email_alerts" {
  topic_arn = aws_sns_topic.cloudshop_alerts.arn
  protocol  = "email"
  endpoint  = "ravichaguaep@gmail.com"
}