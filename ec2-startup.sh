# Update all installed packages to latest versions
sudo dnf update -y

# --- Swap setup (t3.micro has only 1GB RAM, needed to avoid OOM crashes) ---

# Create a 2GB file to be used as swap space
sudo fallocate -l 2G /swapfile

# Restrict file permissions (only root can read/write) - security requirement for swap
sudo chmod 600 /swapfile

# Format the file as swap space
sudo mkswap /swapfile

# Activate the swap file immediately
sudo swapon /swapfile

# Add entry to fstab so swap persists after reboot
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab


# --- Install required software ---

# Install Node.js (runtime to run Next.js), Ruby (required by CodeDeploy agent), wget (download tool), nginx (web server/reverse proxy)
sudo dnf install -y nodejs ruby wget nginx

# Install pnpm (package manager your project uses) and pm2 (process manager to keep Next.js app running)
sudo npm install -g pnpm@9 pm2


# --- CodeDeploy agent setup ---

# Go to home directory
cd /home/ec2-user

# Download the CodeDeploy agent installer from AWS S3 (region-specific bucket)
wget https://aws-codedeploy-<region>.s3.<region>.amazonaws.com/latest/install

# Make the installer script executable
chmod +x ./install

# Run the installer in auto mode (installs and configures agent automatically)
sudo ./install auto

# Enable CodeDeploy agent to start automatically on every boot
sudo systemctl enable codedeploy-agent

# Start the CodeDeploy agent now
sudo systemctl start codedeploy-agent


# --- nginx reverse proxy setup ---

# Write nginx config: forward all traffic from port 80 to port 3000 (where Next.js runs)
sudo tee /etc/nginx/conf.d/nextapp.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://localhost:3000;       # send requests to Next.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade; # support websockets (needed for Next.js dev/HMR, some features)
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;            # pass original host header to app
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable nginx to start automatically on boot
sudo systemctl enable nginx

# Start nginx now
sudo systemctl start nginx


# --- App directory setup ---

# Create folder where CodeDeploy will place your app's build files
mkdir -p /home/ec2-user/app

# Make sure ec2-user owns this folder (so app can run without permission issues)
sudo chown -R ec2-user:ec2-user /home/ec2-user/app