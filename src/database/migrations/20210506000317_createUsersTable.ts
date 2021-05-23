import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments().primary();
    table.string("username").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("password_reset_token").nullable();
    table.string("password_reset_token_expire").nullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists("users");
}
