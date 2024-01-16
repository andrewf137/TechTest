# TechTest

## Install vendors for angular:
````
cd frontend
npm install
````

## Install vendors for symfony:
````
cd backend
composer intall
````

## Launch local web server for front-end
````
cd frontend
ng serve --open
````

Build with right base-href 
````
ng build --base-href=/frontend/dist/
````

## Launch local web server for back-end
````
cd backend
symfony server:start
````

## .conf file to access the project from the browser
Create techtest.conf file:
````
sudo touch /etc/apache2/sites-available/techtest.conf
````
Add the following content to the file:
````
<VirtualHost *:80>
    ServerName techtest.local
    DocumentRoot /home/andresf/workspace/TechTest/

    <Directory />
        Options FollowSymLinks
        AllowOverride All
    </Directory>

    <Directory /home/andresf/workspace/TechTest/>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
        Header set Access-Control-Allow-Headers "Content-Type"
        Header set Access-Control-Allow-Methods "GET,POST,PUT,DELETE,PATCH,OPTIONS"
        Header set Access-Control-Allow-Origin "*"
        Header set Access-Control-Allow-Credentials: "true"
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/techtest-error.log
    CustomLog ${APACHE_LOG_DIR}/techtest.log combined
</VirtualHost>
````
Enable the site:
````
sudo a2ensite techtest.conf
````
Restart apache:
````
sudo service apache2 restart
````

Url to back-end:
````
http://techtest.local/backend/public/
````
Url to front-end:
````
http://techtest.local/frontend/dist/
````

Create a symbolic link:
````
ln -s ../../frontend/dist backend/public
````
Remove symbolic link:
````
cd backend/public
rm dist
````