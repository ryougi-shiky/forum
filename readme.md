## Deploy on Azure
### Install SSL certificate
1. Buy a domain
2. Set Host records
 Type          Host         Value         TTL   
 A Record 	    @    20.239.174.137  Automatic
 CNAME Record www    aniani.cfd      Automatic
3. Set Server's 443 port open for inbound traffic
4. Follow `https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal` instruction to install SSL certificate on your machine.


## Localhost Deploy
##### Start Frontend Server
`cd client`

`npm install`

`npm start` or `nodemon start`

Modify `.env` to update backend url and open weather API key.
##### Start Backend Server
`cd server`

`npm install`

`npm start` or `nodemon start`

Modify `config.env` to update backend port and MongoDB database address.

### MongoDB
##### How to save database
1. Navigate to a directory where you want to store the data.
2. Run `mongodump`. If *dump* exists already, it will be overwrited.
3. To backup a specific database on a specific host: `mongodump --host=mongodb-host:port --db=your-db-name`

##### How to restore database
1. cd to the folder includes `dump` 
2. Run `mongorestore`(default on port 27017)
3. To restore specific database on a specific host: `mongorestore --host mongodb0.example.com --port 27017 --db your_database_name /path/to/your/dump/your_database_name`
4. 

### Run in Docker
start two containers on a single network

docker compose -f docker-compose.yml up -d 


Project Structure:

- Forum
    - client
        - build
        - node_modules
        - public
            - assets (store icons and other images)
            - css
            - fonts
            - index.html (empty page for react to render)
        - src
            - components (contains all react components, each folder includes a .jsx and its .css file)
                - feed
                - feedMoments
                - leftFriends
    			- onlineFriends
    			- post
    			- rightbar
    			- share
    			- sidebar
    			- topbar
  			- context
    			- AuthActions.js
    			- AuthContext.js
    			- AuthReducer.js
  			- pages
    			- home
    			- login
    			- messenger
    			- moments
    			- profile
    			- register
  			- regex
    			- validateUrl.js (only provide a regular expression to parse url)
  			- apiCall.js
  			- App.js
  			- dummyData.js
  			- index.js
  			- .env
  			- package-lock.json
  			- package.json
	- server
    	- models
        	- Post.js (data structure to store post)
        	- User.js (user structure to store user)
      	- node_modules
      	- routes
        	- auth.js
        	- post.js
        	- user.js
      	- config.env
      	- index.js
      	- package-lock.json
  		- package.json
	