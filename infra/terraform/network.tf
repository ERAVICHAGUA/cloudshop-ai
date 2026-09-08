resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.cloudshop.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name        = "cloudshop-public-a"
    Project     = "CloudShop"
    Environment = "dev"
    Type        = "public"
    ManagedBy   = "Terraform"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.cloudshop.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    Name        = "cloudshop-public-b"
    Project     = "CloudShop"
    Environment = "dev"
    Type        = "public"
    ManagedBy   = "Terraform"
  }
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.cloudshop.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name        = "cloudshop-private-a"
    Project     = "CloudShop"
    Environment = "dev"
    Type        = "private"
    ManagedBy   = "Terraform"
  }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.cloudshop.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name        = "cloudshop-private-b"
    Project     = "CloudShop"
    Environment = "dev"
    Type        = "private"
    ManagedBy   = "Terraform"
  }
}

resource "aws_internet_gateway" "cloudshop" {
  vpc_id = aws_vpc.cloudshop.id

  tags = {
    Name        = "cloudshop-igw"
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.cloudshop.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.cloudshop.id
  }

  tags = {
    Name        = "cloudshop-public-rt"
    Project     = "CloudShop"
    Environment = "dev"
    ManagedBy   = "Terraform"
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}