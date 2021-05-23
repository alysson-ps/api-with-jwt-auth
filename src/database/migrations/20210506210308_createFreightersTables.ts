import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("freighters", (table: Knex.TableBuilder) => {
    table.increments().primary();
    table.string("car_license_plate").unique().notNullable();
    table.string("tracking_number").notNullable();
    table.string("driver_name").notNullable();
    table.string("freight_weight").notNullable();
    table.string("freight_type").notNullable();
    table.string("description").notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("freighters");
}
