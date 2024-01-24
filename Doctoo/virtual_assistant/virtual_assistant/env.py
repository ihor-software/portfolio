import os

db_user = os.getenv("POSTGRES_USER", "user")
db_password = os.getenv("POSTGRES_PASSWORD", "user")
db_db = os.getenv("POSTGRES_DB", "db")
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", 5432)
