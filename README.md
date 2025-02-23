# E-Commerce Project

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd e-commerce
    ```

2. Copy the example environment file to [.env](http://_vscodecontentref_/2):

    ```sh
    cp .env.example .env
    ```

3. Fill in the required environment variables in the [.env](http://_vscodecontentref_/3) file:

## Running the Containers

1. Start the containers using Docker Compose:

    ```sh
    docker-compose up -d
    ```

2. Verify that the containers are running:

    ```sh
    docker-compose ps
    ```

## Stopping the Containers

1. Stop the containers:

    ```sh
    docker-compose down
    ```

## Accessing Services

- MySQL: `localhost:3307`
- Elasticsearch: `localhost:9200`

## Notes

- Ensure that the ports `3307` and `9200` are not being used by other services on your machine.
- You can modify the environment variables in the [.env](http://_vscodecontentref_/4) file to suit your development environment.
