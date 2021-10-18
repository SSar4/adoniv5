import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeSave,
  beforeCreate,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'
import Jogador from './Jogador'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public type: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: Usuario) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static assignUuid(user: Usuario) {
    user.id = uuid()
  }

  @belongsTo(() => Admin)
  public admin: BelongsTo<typeof Admin>

  @belongsTo(() => Jogador,{foreignKey:'id'})
  public jogador: BelongsTo<typeof Jogador>

}
