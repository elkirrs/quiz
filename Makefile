build: #build docker container @docker compose build
	@docker compose build

up: #start docker containers @docker compose up -d
	@docker compose up -d

start: #start docker containers @docker compose start
	@docker compose start

stop: #stop docker containers @docker compose stop
	@docker compose stop

down: #stop and remove docker containers @docker compose down
	@docker compose down

connect_node: #Connect to node container
	@docker exec -it node-wq sh

npm_dev: #Run development js server
	@docker exec -it node-wq npm run dev -- --host

npm_build: #build js app
	@docker exec -it node-wq npm run build