### MongoDB
##### How to save database
1. Navigate to a directory where you want to store the data.
2. Run `mongodump`. If *dump* exists already, it will be overwrited.
3. 

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
	