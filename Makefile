.PHONY: help tests

help: ## print this message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'

tests: ## Run tests locally
	docker run -w /workdir -v $(shell pwd):/workdir dduportal/bats:latest ./tests