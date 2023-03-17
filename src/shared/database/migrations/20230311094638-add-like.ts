import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'like';

export class AddPost extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createTable = knex.schema.createTable(TABLE_NAME, (table) => {
      table.integer('user_id').notNullable();
      table.integer('post_id').notNullable();
      table.primary(['user_id', 'post_id']);
      table.foreign('user_id').references('user.id').onDelete('CASCADE');
      table.foreign('post_id').references('post.id').onDelete('CASCADE');
      table
        .timestamp('created_at', { useTz: true })
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
