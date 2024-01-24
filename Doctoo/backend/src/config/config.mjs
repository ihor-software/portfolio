const config = {
  development: {
    username: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'user',
    database: process.env.POSTGRES_DB || 'db',
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'user',
    database: process.env.POSTGRES_DB || 'db',
    port: parseInt(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};

export default config;
