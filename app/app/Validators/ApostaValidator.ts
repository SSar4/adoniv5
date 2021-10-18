import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ApostaValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		user_id: schema.string({}, [
			rules.required(),
			rules.uuid(),
			rules.exists({ table: 'jogadors', column: 'id_jogador' })
		]),

		aposta: schema.array().members(schema.object().members({
			id_game: schema.string({}, [
				rules.uuid(),
				rules.exists({ table: 'jogos', column: 'id' })
			]),
			numero_sorte: schema.array().members(schema.number([rules.integer()]))
		}))

	})
	public messages = {}
}
