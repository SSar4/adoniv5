import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Admin from './Admin'
import Jogador from './Jogador'

export default class Jogo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public range: number

  @column()
  public type: string

  @column()
  public description: string

  @column()
  public max_number: number

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public id_adminfk: string

  @beforeCreate()
  public static assignUuid(jogo: Jogo) {
    jogo.id = uuid()
  }

  @belongsTo(() => Admin)
  public admin: BelongsTo<typeof Admin>

  @manyToMany(() => Jogador, {
    localKey: 'id',
    pivotForeignKey: 'id_jogofk',
    pivotRelatedForeignKey: 'id_jogadorfk',
    pivotTable: 'games_jogadors',
    relatedKey: 'id_jogador',
    pivotColumns: ['numeros_sorte'],
    pivotTimestamps:{
      createdAt: true,
      updatedAt: true
    }
  })
  public jogador: ManyToMany<typeof Jogador>
}
