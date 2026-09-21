# ============================================================
# CloudWatch Logs - Backend
# ============================================================

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/cloudshop/backend"
  retention_in_days = 7

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}


# ============================================================
# CloudWatch Logs - Frontend
# ============================================================

resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/cloudshop/frontend"
  retention_in_days = 7

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}


# ============================================================
# CloudWatch Alarm - EC2 High CPU
# ============================================================

resource "aws_cloudwatch_metric_alarm" "ec2_high_cpu" {
  alarm_name        = "cloudshop-ec2-high-cpu"
  alarm_description = "Alarm when CloudShop EC2 CPU exceeds 80 percent"

  namespace   = "AWS/EC2"
  metric_name = "CPUUtilization"

  comparison_operator = "GreaterThanThreshold"
  threshold           = 80

  period              = 300
  evaluation_periods  = 2
  datapoints_to_alarm = 2

  statistic = "Average"

  dimensions = {
    InstanceId = aws_instance.cloudshop.id
  }

  treat_missing_data = "notBreaching"

  # Enviar notificación cuando la alarma entre en estado ALARM
  alarm_actions = [
    aws_sns_topic.cloudshop_alerts.arn
  ]

  # Enviar notificación cuando la alarma vuelva a estado OK
  ok_actions = [
    aws_sns_topic.cloudshop_alerts.arn
  ]

  tags = {
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}