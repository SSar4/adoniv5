import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GamesJogadors extends BaseSchema {
  protected tableName = 'games_jogadors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.uuid('id_jogadorfk').
      unsigned().
      notNullable().
      references('id_jogador').inTable('jogadors').
      onDelete('CASCADE').
      onUpdate('CASCADE')

      table.uuid('id_jogofk').
      unsigned().
      notNullable().
      references('id').inTable('jogos').
      onDelete('CASCADE').
      onUpdate('CASCADE')
      table.unique(['id_jogofk', 'id_jogadorfk'])


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
