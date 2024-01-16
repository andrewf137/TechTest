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
nvm use 16.14.0
npx ng build --base-href=/frontend/dist/
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

## Doctrine, database and migrations
Install doctrine packages
````
composer require symfony/orm-pack
composer require --dev symfony/maker-bundle
````

This will add the following line to the .env file
````
DATABASE_URL="mysql://root:password@127.0.0.1:3306/tech_test?serverVersion=8.0.32"
````

We can now create the database with this command:
````
bin/console doctrine:database:create
````

Create an entity with this command:
````
 bin/console make:entity
````

Create a migration based on the existing entities with:
````
bin/console make:migration 
````

Once all migrations are created, run them with this command:
````
bin/console doctrine:migrations:migrate
````

Create a controller:
````
bin/console make:controller UserController
````

Add serializer to the symfony project:
````
composer require symfony/serializer-pack
````

Debuging routes:
````
php bin/console debug:router
````
