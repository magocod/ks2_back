KS2 BACKEND

## Description

ks2 - user management and property sales api

## Project setup

requirements
- nodejs = 22.19.0
- Database Postgresql >= 17.4
- Docker (optional)

1 - install dependencies
```bash
npm install
```

2 - configure env

Clone the ```.env.template``` file and rename it to ```.env```

3 - configure database and add credentials (update .env)
```
file: ./env

# example
DB_PASSWORD=postgres
DB_NAME=real_estate_management
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
```

3.1 - Configure database with docker (optional)
```bash
docker compose up -d
```

## Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```
