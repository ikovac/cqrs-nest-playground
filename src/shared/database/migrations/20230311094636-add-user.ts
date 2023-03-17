import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'user';
const ROLES = ['ADMIN', 'USER'];

export class AddUser extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createTable = knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.enum('role', ROLES);
      table.string('email').notNullable().unique();
      table.string('password');
      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .timestamp('updated_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now());
    });

    this.addSql(createTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    const dropTable = knex.schema.dropTable(TABLE_NAME);

    this.addSql(dropTable.toQuery());
  }
}
