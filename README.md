# DevFinder

![Swipe feature in the app](https://github.com/Manish270698/DevFinder-FE/blob/main/ezgif-5-44ae10c7a6.gif)

- sudo apt update
- sudo apt install nginx (install nginx)
- sudo systemctl start nginx (start nginx)
- sudo systemctl enable nginx
- copy code from dist(build files) folder to nginx http server : /var/www/html
    - sudo scp -r dist/* /var/www/html
- Enable port 80 on your instance