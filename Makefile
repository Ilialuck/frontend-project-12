lint-frontend:
	make -C frontend lint

install:
	npm ci

start:
	npx start-server

build:
	make -C frontend build