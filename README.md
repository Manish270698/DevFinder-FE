# DevFinder

![Swipe feature in the app](https://github.com/Manish270698/DevFinder-FE/blob/main/ezgif-5-44ae10c7a6.gif)

- sudo apt update
- sudo apt install nginx (install nginx)
- sudo systemctl start nginx (start nginx)
- sudo systemctl enable nginx
- copy code from dist(build files) folder to nginx http server : /var/www/html
  - sudo scp -r dist/\* /var/www/html
- Enable port 80 on your instance

# BACKEND

- npm install pm2 -g (install pm2 globally)
- pm2 start npm -- start
- pm2 logs (to see pm2 logs)
- pm2 flush npm (empty logs)
- pm2 stop mpm
- pm2 delete npm
- pm2 start npm --name "DevTninder-Backend" -- start (to give custom name)

- sudo nano /etc/nginx/sites-available/default
- nginx config
  server_name 13.61.147.239;

  location /api/ {
  proxy_pass http://localhost:7777/; # Forward requests to Node.js server on port 7777
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  }

- sudo systemctl restart nginx
- Make the BASE_URL as "/api"
