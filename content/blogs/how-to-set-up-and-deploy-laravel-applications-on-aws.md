---
title: How to Set Up and Deploy Laravel Applications on AWS
description: "This guide provides step-by-step instructions on how to set up and
  deploy Laravel applications on AWS (Amazon Web Services). "
date: 2023-05-20T08:42:14.995Z
tags:
  - programming
---
# Introduction

This guide will walk you through the process of setting up and deploying Laravel (a PHP framework)  applications on AWS (Amazon Web Services). It covers the steps for creating and configuring the necessary AWS services, building CI/CD pipelines, and deploying the applications to EC2 instances and using S3 buckets for storage assets.

Please refer to the following sections for detailed instructions:

1. [Introduction](#introduction)
2. [Key Terms, Tools, and Services](#key-terms-tools-and-services)
3. [Step-by-Step Guide](#step-by-step-guide)
    1. [Step 1: Set Up an S3 Bucket for Your Laravel Application](#step-1-set-up-an-s3-bucket-for-your-laravel-application)
    2. [Step 2: Create a Laravel API](#step-2-create-a-laravel-api)
    3. [Step 3: Set up an EC2 Instance](#step-3-set-up-an-ec2-instance)
    4. [Step 4: Install PHP, Composer, and Nginx on EC2](#step-4-install-php-composer-and-nginx-on-ec2)
    5. [Step 5: Install and Configure MySQL (If Needed)](#step-5-install-and-configure-mysql-if-needed)
    6. [Step 6: Clone and Configure Your Laravel Application](#step-6-clone-and-configure-your-laravel-application)
    7. [Step 7: Configure Nginx for Your Laravel Application](#step-7-configure-nginx-for-your-laravel-application)
    8. [Step 8: Set up AWS Code Pipeline for Laravel](#step-8-set-up-aws-code-pipeline-for-laravel)
    9. [Step 9: Update Your Laravel Application on local machine](#step-9-update-your-laravel-application-on-local-machine)
    10. [Step 10: Monitor and Scale Your Applications](#step-10-monitor-and-scale-your-applications)
    11. [Step 11: Security Best Practices](#step-11-security-best-practices)

## Key Terms, Tools, and Services

1. **AWS (Amazon Web Services):** AWS is a cloud services platform by Amazon that provides a wide range of cloud services such as computing power, database storage, content delivery, and other functionalities.

2. **EC2 (Elastic Compute Cloud):** EC2 is a service provided by AWS that offers secure, resizable compute capacity in the cloud. It's designed to make web-scale cloud computing easier for developers.

3. **Laravel:** Laravel is a popular open-source PHP framework used for web application development following the MVC (Model View Controller) architectural pattern.

4. **S3 (Simple Storage Service):** Amazon S3 is a scalable object storage service by AWS. It's designed for storing and retrieving any amount of data at any time, from anywhere on the web.

5. **AWS CodePipeline:** AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates.

6. **AWS CodeBuild:** AWS CodeBuild is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.

7. **Nginx:** Nginx is a popular open-source web server that can also be used as a reverse proxy, load balancer, and HTTP cache.

8. **MySQL:** MySQL is a widely used open-source relational database management system.

## Step-by-Step Guide

### Step 1: Set Up an S3 Bucket for Your Laravel Application

1. Go to the S3 section of the AWS Management Console.
2. Click on "Create bucket" and provide a unique name for your bucket.
3. Configure the bucket settings as per your requirements.
4. Click on "Create bucket" to create the bucket.
5. Copy the bucket name and region for later use.

### Step 2: Create a Laravel API

1. In your local machine, create a new Laravel project:
`composer create-project --prefer-dist laravel/laravel test-api`

2. Navigate to the new Laravel application directory: cd test-api
3. Configure the s3 bucket connection in the `.env.example` file.

```bash
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_DEFAULT_REGION=your_default_region
AWS_BUCKET=your_bucket_name
```

4. copy the .env.example file to .env: `cp .env.example .env`
5. Configure the database connection (if needed) and the s3 bucket connection in the `.env` file.
6. Run:
`composer install`
`php artisan key:generate`
`php artisan migrate`
`php artisan serve`
7. Test the application by visiting <http://localhost:8000> in your browser.

### Step 3: Set up an EC2 Instance

1. Log into your AWS Management Console and select EC2 from the list of services.
2. Click on "Launch Instance" and select an Amazon Machine Image (AMI). For Laravel, you can use an Amazon Linux 2 AMI.
3. Choose an instance type based on your needs and click "Next: Configure Instance Details".
4. Configure instance details as per your requirements and click "Next: Add Storage".
5. Add storage as per your needs and click "Next: Add Tags".
6. Add tags if required and click "Next: Configure Security Group".
7. Configure a security group. Make sure to open ports 22 (SSH), 80 (HTTP), and 443 (HTTPS).
8. Review your instance configuration and click "Launch".
9. You'll be prompted to create a new key pair or use an existing one. This is important for connecting to your instance. Download the key pair and keep it safe.

### Step 4: Install PHP, Composer, and Nginx on EC2

1. Connect to your EC2 instance using SSH.
`ssh -i /path/to/your-key-pair.pem ec2-user@your-instance-public-ip`

2. Update the package lists for upgrades and new package installations: `sudo apt update`
3. Install PHP: `sudo apt install -y php`
4. Install Composer: `sudo apt install -y composer`
5. Install Nginx: `sudo apt install -y nginx`

### Step 5: Install and Configure MySQL (If Needed)

1. Install MySQL: `sudo apt install -y mysql-server`
2. Secure your MySQL installation: `sudo mysql_secure_installation`
3. Follow the prompts to set a root password and secure your installation.

### Step 6: Clone and Configure Your Laravel Application

1. cd `/var/www/`
2. Clone your Laravel application repository to your EC2 instance.
1.1. Make sure to add your ssh key to your github account.
`cat ~/.ssh/id_rsa.pub`
1.2. If you're using GitHub, you can clone your repository using SSH:
`git clone {your-repository-ssh-url}`
3. Navigate to the Laravel application directory: `cd /path/to/laravel`
4. Install the Laravel dependencies using Composer: `composer install`
5. Copy the `.env.example` file to `.env`: `cp .env.example .env`
6. Generate the application key for Laravel: `php artisan key:generate`
7. Configure the database connection in the `.env` file using the credentials you set up in Step 3.
8. Configure the s3 bucket connection in the `.env` file.

### Step 7: Configure Nginx for Your Laravel Application

1. Open the Nginx configuration file for editing: `sudo nano /etc/nginx/sites-available/default`
2. Update the configuration file with the following content:

```bash
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/laravel/public;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

3. Save the file and exit the editor.
4. Restart Nginx to apply the changes: `sudo systemctl restart nginx`
5. Open your domain in your browser to test your Laravel application using ec2 public ip. `http://your-instance-public-ip`

### Step 8: Set up AWS Code Pipeline for Laravel

1. Go to the AWS Management Console and open the AWS CodePipeline console.
2. Click "Create pipeline".
3. Enter a name for your pipeline and click "Next".
4. For "Source provider", select "GitHub" and connect your GitHub account. Then, select your Laravel repository and the branch you want to use.
5. For "Build provider", choose AWS CodeBuild. Click "Create project" and configure it to use the buildspec.yml file in your repository. Here's a sample buildspec.yml for Laravel:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      php: 8.2
    commands:
      - echo Installing source code...
      - composer install
  pre_build:
    commands:
      - echo Pre-build steps...
      - php artisan migrate --force
  build:
    commands:
      - echo Build started on `date`
      - echo Compiling the Laravel code...
      - php artisan optimize
      - composer dump-autoload
  post_build:
    commands:
      - echo Build completed on `date`
```

6. For "Deploy provider", choose "Amazon EC2". Configure it to deploy your Laravel application to your EC2 instance.
7. Review your pipeline configuration and click "Create pipeline".

### Step 9: Update Your Laravel Application on local machine

1. Open the routes/api.php file.
2. Add the following code to create a new API endpoint:

```php
use Illuminate\Support\Facades\Storage;

Route::get('/message', function () {
    $url = Storage::disk('s3')->url('filename.txt');
    return response()->json(['message' => 'This is from Laravel API', 'fileUrl' => $url]);
});
```

3. Run the following command to start the Laravel development server:
`php artisan serve`
4. Open the URL in your browser to test the API endpoint `http://localhost:8000/api/message`
5. You should see the following response:

```json
{
    "message": "This is from Laravel API",
    "fileUrl": "https://your-bucket-name.s3.your-region.amazonaws.com/filename.txt"
}
```

6. Last but not least, commit your changes and push them to your GitHub repository.
7. Go to the AWS CodePipeline console and open your pipeline.
8. Now you can see the pipeline in action. It will automatically deploy your Laravel application to your EC2 instance.

### Step 10: Monitor and Scale Your Applications

1. Set up monitoring for your EC2 instances and S3 buckets using AWS CloudWatch.
2. Configure alarms and notifications for important metrics.
3. Monitor the performance and health of your applications using CloudWatch dashboards and logs.
4. Implement auto-scaling to handle increasing traffic and demand.

### Step 11: Security Best Practices

1. Use SSL/TLS certificates to secure your applications. You can use AWS Certificate Manager to provision and manage certificates.
2. Regularly update your software and apply security patches to keep your applications and infrastructure secure.
3. Follow AWS security best practices for EC2 instances, S3 buckets, and other services you use.
4. Implement proper access controls and permissions to restrict unauthorized access to your applications and resources.

Remember to continuously monitor and improve your applications, keep them up to date with the latest security patches, and follow best practices for development and operations.

If you have any questions or encounter any issues, please feel free to reach out to me on [Twitter](https://twitter.com/amqnese)

Happy deploying!
