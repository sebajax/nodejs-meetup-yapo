-include .env
export $(shell sed 's/=.*//' .env)
export APP_NAME=$(API_NAME)

.PHONY: create install build down start restart start-cloud start-db db-access cache-access up test lint prune help

DOCKER_COMPOSE ?= docker-compose -p $(APP_NAME)
COMPOSE_DIR ?= docker/docker-compose

create:
		$(info Make: Creates a new service structure 3 layer framework)
		@node create.js $(service)

install:
		$(info Make: Install project dependecies in docker volume)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml run --rm app npm install --save

build:
		$(info Make: Build images(s) of the service)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml build

down:
		$(info Make: Removing service(s))
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml down --remove-orphans

start:
		$(info Make: Starting service(s) in background (detached) with local database)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml up -d

restart:
		$(info Make: Restart app service in background no detached)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml restart app

start-cloud:
		$(info Make: Starting service(s) using cloud proxy in background (detached))
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).cloud.yml up -d

start-db:
		$(info Make: Starting db service in background (detached))
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml up -d db

db-access:
		$(info Make: Access local db instance)
		docker exec -it ${APP_NAME}-db psql -U ${DB_USER} ${DB_NAME}

cache-access:
		$(info Make: Access local cache instance)
		docker exec -it ${APP_NAME}-cache redis-cli

clear-cache:
		$(info Make: clear all redis cache)
		docker exec -it ${APP_NAME}-cache redis-cli FLUSHALL

show-cache:
		$(info Make: show redis cache keys)
		docker exec -it ${APP_NAME}-cache redis-cli keys '*'
up:
		$(info Make: Starting service(s) no detached)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml up

test:
		$(info Make: Running tests located on /test)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml run --rm app npm run test

load-test:
		$(info Make: Run load test)
		@k6/run-test.sh

coverage:
		$(info Make: Run tests located on /test & test coverage)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml run --rm app npm run coverage

lint:
		$(info Make: Execute lint check over project)
		@$(DOCKER_COMPOSE) -f $(COMPOSE_DIR).yml run --rm app npm run lint

prune:
		$(info Make: Prune docker system)
		docker system prune -a

help: ## Help messages showed
	@echo ''
	@echo 'Usage: make [TARGET] [EXTRA_ARGUMENTS]'
	@echo 'Targets:'
	@echo '  create             creates a new service structure 3 layer framework (usage = make create service=newService).'
	@echo '  install            install project dependecies in docker volume.'
	@echo '  build              build images(s) of the service.'
	@echo '  down               removing service(s).'
	@echo '  start              starting service(s) in background (detached) with local database.'
	@echo '  restart            restart app service in background no detached.'
	@echo '  start-cloud        starting service(s) using cloud proxy in background (detached).'
	@echo '  start-db           starting db service in background (detached).'
	@echo '  db-access          access local db instance.'
	@echo '  cache-access       access local db instance.'
	@echo '  clear-cache        clear all redis cache.'
	@echo '  show-cache         show redis cache keys.'
	@echo '  up                 starting service(s) no detached.'
	@echo '  test               running tests located on /test.'
	@echo '  load-test          run a performance test located on /k6.'
	@echo '  coverage           run tests located on /test & test coverage.'
	@echo '  lint               execute lint check over project.'
	@echo '  prune              prune docker system.'
	@echo '  help               for help and more commands.'
	@echo ''
