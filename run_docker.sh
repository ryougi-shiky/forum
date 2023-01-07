cd client
docker build . -t client
cd ..
cd server
docker build . -t server
cd ..
docker compose -f docker-compose.yml up -d 
