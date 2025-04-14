terraform { 
  cloud { 
    
    organization = "tim1" 

    workspaces { 
      name = "314-workspace" 
    } 
  }
  required_providers {
        aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "region" {
  description = "AWS Region"
  type        = string
  default     = "ap-southeast-1"
}