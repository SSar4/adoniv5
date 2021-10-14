import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jogos extends BaseSchema {
  protected tableName = 'jogos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.integer('range').notNullable()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.integer('max_number').notNullable()
      table.decimal('price').notNullable()
      table.uuid('id_adminfk').
        unsigned().
        notNullable().
        references('id_admin').inTable('admins').
        onDelete('CASCADE').
        onUpdate('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
