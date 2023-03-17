import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'post';

export class AddPost extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createTable = knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments('id');
      table.text('content');
      table.integer('user_id').notNullable();
      table.foreign('user_id').references('user.id').onDelete('CASCADE');
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
