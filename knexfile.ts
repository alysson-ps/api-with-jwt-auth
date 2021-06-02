// Update with your config settings.
interface IKnexConfig {
  [key: string]: object;
}
const knexConfig: IKnexConfig = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "src/database/database.sqlite"
    },
    migrations: {
      directory: "src/database/migrations",
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "src/database/migrations",
    },
  },
};

export default knexConfig;
