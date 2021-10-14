import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Jogo from './Jogo'

export default class Admin extends BaseModel {

  @column({ isPrimary: true })
  public id_admin: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Usuario, { foreignKey: 'id_admin' })
  public admin: BelongsTo<typeof Usuario>

  @hasMany(() => Jogo, {foreignKey: 'id_adminfk'})
  public jogo: HasMany<typeof Jogo>
}
