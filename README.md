# Information

This project was created for CS498 as a final project.

# Environment

This program requires two environment variables: `PORT` and `SESSION_SECRET`. However, if they are not set, the program provides default values for testing.

# Command

### Create secret key

```cmd
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Create container

```cmd
docker-compose up -d
```

### Re-Build All

```cmd
docker compose down --rmi all --volumes --remove-orphans && docker compose build --no-cache && docker compose up -d
```

PowerShell
```cmd
docker compose down --rmi all --volumes --remove-orphans
docker compose build --no-cache
docker compose up -d
```

# Step-by-Step Guide

1. Rename `docker-compose.yml.example` to `docker-compose.yml`.

2. In `docker-compose.yml`, locate the `SESSION_SECRET` under the `environment` section.

3. Create a [`SESSION_SECRET`](#create-secret-key).

4. Update the database values under `postgresql` in the app section:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

5. Run the container using one of the following methods:
   - [`Normal`](#create-container)
   - [`Advanced (Delete all and re-build everything)`](#re-build-all)

6. Cmd to check db tables if exist
```cmd
docker exec -it postgres_db psql -U postgres -d mydb -c "\dt"
```

# Reference

[`Test1`](https://github.com/University-Bangkok-JW/cs498-project-test-3d)
[`Test2`](https://github.com/University-Bangkok-JW/cs498-project-test-3d-2)
[`Test3`](https://github.com/University-Bangkok-JW/cs498-project-test-3d-3)
