// Update with your config settings.
interface IKnexConfig {
  [key: string]: object;
}
const knexConfig: IKnexConfig = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "frost",
      password: "zard",
      database: "testeVaga",
    },
    migrations: {
      directory: "src/database/migrations",
    },
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
};

export default knexConfig;
