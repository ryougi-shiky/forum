### Deploy Nginx
1. Configuration file


server {
    listen 80;
    server_name aniani.cfd;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /users {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 443 ssl;
    server_name aniani.cfd;

    ssl_certificate /etc/letsencrypt/live/aniani.cfd/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aniani.cfd/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /users {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


2. Create new configuration file: `sudo nano /etc/nginx/sites-available/myapp`
3. Create symbolic link: `sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/`
4. Test conf: `sudo nginx -t`
5. Restart Nginx: `sudo systemctl reload nginx`
6. If have default conf, you can remove it: `sudo rm /etc/nginx/sites-enabled/default`
