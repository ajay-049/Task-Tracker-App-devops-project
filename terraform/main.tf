# 1. AWS Provider Setup
provider "aws" {
  region = "ap-south-1" # Mumbai Region
}

# 2. Security Group (Firewall) Banana
resource "aws_security_group" "task_tracker_sg" {
  name        = "task-tracker-terraform-sg"
  description = "Allow Web, Backend, and SSH traffic"

  # Nginx (Frontend) ke liye
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Node.js (Backend) ke liye
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH (Terminal access) ke liye
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound traffic (Server ko bahar internet use karne dena)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. EC2 Instance (Server) Banana
resource "aws_instance" "task_tracker_server" {
  ami           = "ami-0dee22c13ea7a9a67" # Ubuntu 24.04 AMI (Mumbai region)
  instance_type = "t3.micro"             # Free Tier

  # Upar banaye gaye Security group ko is server se jodna
  vpc_security_group_ids = [aws_security_group.task_tracker_sg.id]

  tags = {
    Name = "TaskTracker-Terraform-Server"
  }
}

# 4. Naye Server ka IP address print karna
output "public_ip" {
  value       = aws_instance.task_tracker_server.public_ip
  description = "Naye server ka Public IP"
}