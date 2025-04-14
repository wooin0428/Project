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

variable "ecs-worker-role" {
  description = "the arn of the role that handles ecs"
  type        = string
  default     = "arn:aws:iam::108782078712:role/ecs-executer"
}


resource "aws_ecs_cluster" "ecs_cluster" {
  name = "infinity-cleaner-app-ecs-cluster"
}

resource "aws_ecs_task_definition" "ecs-docker-container" {
  family                   = "infinity-cleaner-task"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name      = "infinity-cleaner"
      image     = "boiledsteak/infinity-cleaner-app:latest"
      essential = true
      portMappings = [
        {
          containerPort = 8080
        }
      ]
    }
  ])
}


// WIP, NOT WORKING YET
resource "aws_ecs_service" "app" {
  name            = "infinity-cleaner-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets         = ["subnet-xxxxxxxx", "subnet-yyyyyyyy"] # Replace with real subnet IDs
    assign_public_ip = true
    security_groups = ["sg-xxxxxxxx"] # Replace with real SG ID
  }
}