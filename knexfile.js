"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knexConfig = {
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
exports.default = knexConfig;
