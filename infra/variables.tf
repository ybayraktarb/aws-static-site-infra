variable "aws_region" {
  description = "AWS region for provisioning resources"
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Project name identifier used for naming resources"
  type        = string
  default     = "ybb-portfolio"
}

variable "bucket_name" {
  description = "Unique name for the S3 bucket"
  type        = string
  default     = "ybb-portfolio-pau-ybb"
}

variable "environment" {
  description = "Deployment environment (e.g., production)"
  type        = string
  default     = "production"
}

variable "tags" {
  description = "Common tags to apply to all AWS resources"
  type        = map(string)
  default = {
    Project   = "ybb-portfolio"
    ManagedBy = "Terraform"
  }
}
