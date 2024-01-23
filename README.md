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
5. Add the following line to /etc/hosts file:
   ````
   127.0.0.1   techtest.local
   ````
6. Restart apache:
    ````
    sudo service apache2 restart
    ````
7. "cd" to project folder.
8. Install vendors for angular (**frontend**):
    ````
    cd <root-folder>/frontend
    npm install
    ````
9. Install vendors for symfony (**backend**):
    ````
    cd <root-folder>/backend
    composer intall
    ````
10. Generate public and private key for jwt:
    ````
    cd <root-folder>/backend
    php bin/console lexik:jwt:generate-keypair
    ````
    This will create `config/jwt/private.pem` and `config/jwt/public.pem` files.
11. Create a symbolic link from frontend/app to backend/public:
    ````
    cd <root-folder>
    ln -s ../../frontend/app backend/public
    ````
12. Create the database:
    ````
    cd <root-folder>/backend
    bin/console doctrine:database:create
    ````
13. Run migrations:
    ````
    cd <root-folder>/backend
    bin/console doctrine:migrations:migrate
    ````
14. Launch local web server for front-end
    ````
    cd <root-folder>/frontend
    nvm use 16.14.0
    npx ng build --base-href=/frontend/app/
    npx ng serve
    ````
15. Run the following command in a new terminal to open Chrome with security disabled:  
    ````google-chrome --disable-web-security --allowCfile-access-from-files --user-data-dir="aa"````  
    This will open a Chrome browser with security disabled. We'll use this browser to navigate through our app.  
    This step is necessary to prevent blocking by CORS policy.
16. Access the site in the new Chrome brower via `http://localhost:4200`.  
    Register as many users as you want.  
    Log in using any of the created users.  
    In the list of users shown, the id is a link to the users details.
16. Comments:
    * Answers to Task 1 of the Technical Test are in the pdf document `Answer to technical test Task 1.pdf` (in the root folder).
    * .env file has not been git ignored so no need to do anything on this regard.
    * I was told I had to finish asap, so I didn't have enough time to refine and test the whole app.  
      In other words, improvements can be made. For instance, I didn't have the time to make all work  
      without using the local web server provided by Angular. Another example is I didn't implement the building of the app with Docker.
    * I implemented all the advanced features.
    * Addition of new users is done via "Register".
    * Navigation between components is demonstrated when logging in, loging out, registering, viewing user details and viewing users list.
    * I didn't see the necessity for "ensure proper relationships" without contradicting previous requirements,  
      so I didn't implement any other table but users.
