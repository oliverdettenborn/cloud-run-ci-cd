# DEVELOPMENT
dev_compose = docker-compose -f docker-compose.development.yml --env-file .env.development

.PRONY: dev
dev:
	$(dev_compose) up -d

.PRONY: dev-attached
dev-attached:
	$(dev_compose) up

.PRONY: dev-build
dev-build:
	$(dev_compose) build

.PRONY: dev-down
dev-down:
	$(dev_compose) down -v

# TEST
test_compose = docker-compose -f docker-compose.test.yml --env-file .env.test

.PRONY: test
test:
	make test-build && $(test_compose) run app-test && make test-down

.PRONY: test-down
test-down:
	$(test_compose) down

.PRONY: test-build
test-build:
	$(test_compose) build