#!/bin/bash
cd /home/ec2-user/app
export NODE_OPTIONS="--max-old-space-size=512"
pm2 delete nextapp || true
pm2 start "pnpm start" --name nextapp --cwd /home/ec2-user/app --max-memory-restart 400M
pm2 save
