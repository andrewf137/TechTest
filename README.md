# TechTest

## Requirements

* PHP >= 8.1
* composer >= 2.2.1
* node >= 16.14.0
* nvm >= 0.39.1
* MySQL >= 8.0.33


## Build with

* Symfony 7.0
* Angular 16.1.0


## Instructions

1. Clone the repository (`master` is the default branch):
    ````
    git clone https://github.com/andrewf137/TechTest.git
    ````
2. Create a techtest.conf file:
   ````
   sudo touch /etc/apache2/sites-available/techtest.conf
   ````
3. Add the following content to the techtest.conf file:
   ````
    <VirtualHost *:80>
        ServerName techtest.local
        DocumentRoot /home/andresf/workspace/TechTest/backend/public
    
        <Directory />
            Options FollowSymLinks
            AllowOverride All
        </Directory>
    
        <Directory /home/andresf/workspace/TechTest/backend/public>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride All
            Require all granted
            Header set Access-Control-Allow-Headers "Content-Type"
            Header set Access-Control-Allow-Methods "GET,POST,PUT,DELETE,PATCH,OPTIONS"
            Header set Access-Control-Allow-Origin "*"
            Header set Access-Control-Allow-Credentials: "true"
        </Directory>
    
        SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
    
        ErrorLog ${APACHE_LOG_DIR}/techtest-error.log
        CustomLog ${APACHE_LOG_DIR}/techtest.log combined
    </VirtualHost>
   ````
4. Enable the site:
    ````
    sudo a2ensite techtest.conf
    ````
5. Restart apache:
    ````
    sudo service apache2 restart
    ````
6. "cd" to project folder.
7. Install vendors for angular (**frontend**):
    ````
    cd <root-folder>/frontend
    npm install
    ````
8. Install vendors for symfony (**backend**):
    ````
    cd <root-folder>/backend
    composer intall
    ````
9. Generate public and private key for jwt:
    ````
    php bin/console lexik:jwt:generate-keypair
    ````
    This will create `config/jwt/private.pem` and `config/jwt/public.pem` files.
10. Create a symbolic link from frontend/app to backend/public:
    ````
    cd <root-folder>
    ln -s ../../frontend/app backend/public
    ````
11. Create the database:
    ````
    bin/console doctrine:database:create
    ````
13. Run migrations:
    ````
    bin/console doctrine:migrations:migrate
    ````
12. Launch local web server for front-end
    ````
    cd <root-folder>/frontend
    nvm use 16.14.0
    npx ng build --base-href=/frontend/app/
    npx ng serve --open
    ````      
13. Access the site in `http://localhost:4200`.  
    Register as many users as you want.  
    Log in using any of the created users.  
    In the list of users shown, the id is a link to the users details.
14. Comments:
    * Answers to Task 1 of the Technical Test are in the pdf document `Answer to technical test Task 1.pdf` (in the root folder).
    * .env file has not been git ignored so no need to do anything on this regard.
    * I was told I had to finish asap, so I didn't have enough time to refine and test the whole app.  
      In other words, improvements can be made. For instance, I didn't have the time to make all work  
      without using the local web server provided by Angular.
    * I implemented all the advanced features.
    * Addition of new users is done via "Register".
    * Navigation between components is demonstrated when logging in, loging out, registering, viewing user details and viewing users list.
    * I didn't see the necessity for "ensure proper relationships" without contradicting previous requirements,  
      so I didn't implement any other table but users.
