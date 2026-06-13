cd /home/ubuntu/app
pm2 delete nextapp || true
pm2 start "pnpm start" --name nextapp
pm2 save