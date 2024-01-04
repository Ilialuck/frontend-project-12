start-backend:
	npx start-server

start-frontend:
	make -C frontend start

start:
	make start-backend & make start-frontend

build:
	make -C frontend build

install:
	npm ci

lint:
	make -C frontend lint