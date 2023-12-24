open command prompt in current directory:
https://youtu.be/bgSSJQolR0E?t=47

### GCP acount for ClientId and ClientSecret

    Create account on console.cloud.google.com
    https://www.youtube.com/watch?v=SP_d8VgqrPo
                        OR
    https://www.youtube.com/watch?v=KcHx5dXaDtk

    create project on console.cloud.google.com to generate keys
    https://youtu.be/i5IybpgcInY?t=129

    Copy the keys needed on this site"https://console.cloud.google.com/apis/credentials?organizationId=0&project=fifth-tangent-406711"

    TUTORIAL:    https://youtu.be/i5IybpgcInY?t=420

    Use your own personal below keys

        **pasteClientId**
        **pasteClientSecret**

        $client->setClientId('pasteClientId');
        $client->setClientSecret('pasteClientSecret');

#        $client->setClientId('your_google_client_id');
#        $client->setClientSecret('your_google_client_secret');

#    PASTE THEM IN THE BELOW FILE
#    composer - Shortcut

    For REDIRECT URI USE THE SAME AS THE ONE USED IN THE CODE IN THE BELOW FILE
    http://localhost:3000/login



### Setup Database

    open the command prompt in the current working directory which is **"aEBackendFromScratch"**, and run command **"source aedb2.sql"**

    in case if some errors are encountered, open the **aedb2** file and copy all contents and paste in the command prompt after loggin in mysql on it, and that should do it



### Backend setup

    We need to do three things to get ready, get inside this directory/folder to continue with the below commands, "**aEBackendFromScratch**"

    1. change database settings according to your system, in the db_config.php file in the present in the current directory, which is **aEBackendFromScratch**
        $servername = "localhost";      => keep this the same mostly
        $username = "root";             => put your mysql username in place of **root**
        $password = "root";             => put your mysql password in place of **root**
        $dbname = "aedb2";       => let this be same,

    2. after being in the aEBackendFromScratch folder or directory, open command prompt in the same directory, run this command in the command prompt "composer require google/apiclient" once all installed, and it'll take some time to do install this 

        AND if you face a **process-timeout#** issue, mostly gets stuck at 94%

        Close the command prompt and do the thing mentioned below

        in your composer.json file, which will be present in the current directory, or inside this directory here "aEBackendFromScratch", open the composer.json file and delete all code inside it, and paste(just inside the curly braces part, including the curly braces themselves) all of this below

        ```json
        {
            "require": {
                "google/apiclient": "*"
            },

            "scripts": {
                "test": [
                    "Composer\\Config::disableProcessTimeout",
                    "phpunit"
                ]
            }
        }
        ```

        once above code is updated in the composer.json file run the command "composer install" in the command promt opened in the CWD


    3. Once again in the CWD which is **aEBackendFromScratch**, run command **"php -S localhost:8000"**, and the backend is now live at **"http://localhost:8000/"**, although, we don't need to run this in the browser.



### Frontend setup

    **name of working frontend project** : **aereact**

    1. location of it : **"aereact"**
    2. after being inside the directory mentioned above open command prompt in the same directory by clicking in the directory path bar in windows explorer above, in the command prompt, run the command "npm install"
    3. once all is installed, run command "npm start" and it starts serving once it shows serving at localhost:3000, and usually the project serves at localhost:3000, so open a browser and type in url bar "http://localhost:3000/" and the front end should start running and you'll be able to see UI

        proceed with signup and login, Oauth has still some issues still
        and the other functionalities don't work quite yet



