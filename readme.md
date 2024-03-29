#### Development with Docker:

!["Docker Image"](https://res.cloudinary.com/drdard8os/image/upload/v1709703167/docker/Screenshot_from_2024-02-23_10-53-33_szwmdp.png)

#### How to auto push to docker hub using github action

- first see the structure of project:
- docker-compose file should be in root dir

**For the first time you need to build and push to docker hub mannually.**

#### for the first time compose.yml

```yml
version: "3.9"

services:
  # MongoDB service
  mongo_db:
    container_name: db_container
    image: mongo:latest
    restart: always
    volumes:
      - mongo_db:/data/db

  # Angular web service
  web:
    build: demo3
    ports:
      - 4200:4200
    volumes:
      - ./demo3:/app/client
    depends_on:
      - mongo_db

  # Node API service
  api:
    build: demo1
    ports:
      - 4000:8000
    environment:
      PORT: 8000
      MONGO_URI: mongodb://mongo_db:27017/
      DB_NAME: my_db
    volumes:
      - ./demo1:/app/api
    depends_on:
      - mongo_db

volumes:
  mongo_db: {}
```

#### second time onwards compose.yml

- for the second time onwards you just commit and push. Github action will auto push to the docker hub.

```yml
version: "3.9"

services:
  # MongoDB service
  mongo_db:
    container_name: db_container
    image: rudrasanjeev/mongo
    restart: always
    volumes:
      - mongo_db:/data/db

  # Angular web service
  web:
    build: demo3
    image: rudrasanjeev/fullstack-demo-web
    ports:
      - 4200:4200
    volumes:
      - ./demo3:/app/client
    depends_on:
      - mongo_db

  # Node API service
  api:
    build: demo1
    image: rudrasanjeev/fullstack-demo-api
    ports:
      - 4000:8000
    environment:
      PORT: 8000
      MONGO_URI: mongodb://mongo_db:27017/
      DB_NAME: my_db
    volumes:
      - ./demo1:/app/api
    depends_on:
      - mongo_db

volumes:
  mongo_db: {}
```
