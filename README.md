# express_mysql
create a new repository

echo "# express_mysql" >> README.md

git init

git add README.md

git commit -m "first commit"

git branch -M main

git remote add origin https://github.com/ryougi-shiky/express_mysql.git

git push -u origin main


push an existing repository 

git remote add origin https://github.com/ryougi-shiky/express_mysql.git

git branch -M main

git push -u origin main

About Express

Initialise it

$ npm install -g express-generator

$ express

If use 

$ npx express-generator

May not able to start the server

For heroku hosting.

Deploy MySQL database, go to resource, addon clearDB

Go to setting, config

heroku config | grep CLEARDB_DATABASE_URL

Get database configs get database info

or

heroku config:set DATABASE_URL='mysql://b8ea8ff3653c7b:6c6b9c93@us-cdbr-east-06.cleardb.net/heroku_b623dcfae74a5b4?reconnect=true'

username: b8ea8ff3653c7b

password: 6c6b9c93

host: us-cdbr-east-06.cleardb.net

database: heroku_b623dcfae74a5b4
