# library-management
An API that handles basic library operations like brrowing and returning of book.
Built with express.js and postgres with automatic openapi doc generation

## Installation
npm install
sudo docker pull postgres:17

## Run
### dev
> No typescript compillation
```
sudo docker run -d --network host  --name custom-postgres  -e POSTGRES_DB=my_db  -e POSTGRES_USER=postgres  -e POSTGRES_PASSWORD=test1234 -p 5432:5432  postgres || sudo docker start custom-postgres
npm run dev
```
### prod
```
sudo docker run -d --network host  --name custom-postgres  -e POSTGRES_DB=my_db  -e POSTGRES_USER=postgres  -e POSTGRES_PASSWORD=test1234 -p 5432:5432  postgres || sudo docker start custom-postgres
PORT=3000 NODE_ENV=development JWT_SECRET=mysecret POSTGRESQL_PORT=5432 POSTGRESQL_DB=my_db POSTGRESQL_USER=postgres POSTGRES_PASSWORD=test1234 POSTGRES_HOST=localhost npm run start
```

## API Doc
### URL:
```http://localhost:3000/docs```
