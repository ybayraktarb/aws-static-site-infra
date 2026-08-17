output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting static files"
  value       = aws_s3_bucket.static_site.id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.static_site.arn
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution (used for CI/CD invalidation)"
  value       = aws_cloudfront_distribution.s3_distribution.id
}

output "cloudfront_domain_name" {
  description = "Default CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "website_url" {
  description = "Public HTTPS URL for the portfolio website"
  value       = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
}
