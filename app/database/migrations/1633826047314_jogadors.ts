import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jogadors extends BaseSchema {
  protected tableName = 'jogadors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id_jogador').
        unsigned().
        notNullable().
        references('id').inTable('usuarios').
        onDelete('CASCADE').
        onUpdate('CASCADE').
        unique().
        primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
