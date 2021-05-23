import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("industries", (table: Knex.TableBuilder) => {
    table.increments().primary();
    table.string("cnpj").unique().notNullable();
    table.string("number").notNullable();
    table.string("company_name").notNullable();
    table.string("commercial_name").notNullable();
    table.string("cadastral_situation").notNullable();
    table.string("descriptions_branch_office").notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("industries");
}
