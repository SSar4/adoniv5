import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Jogo from './Jogo'

export default class Jogador extends BaseModel {
  @column({ isPrimary: true })
  public id_jogador: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'id' })
  public jogador: BelongsTo<typeof Usuario>

  @manyToMany(() => Jogo, {
    pivotTable: 'games_jogadors',
  })
  public jogo: ManyToMany<typeof Jogo>

}
