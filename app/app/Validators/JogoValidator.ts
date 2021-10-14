import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'



export default class JogoValidator {
	constructor(protected ctx: HttpContextContract) {
	}


	public schema = schema.create({
		type: schema.string({ trim: true }, [
			rules.required(),
			rules.maxLength(20),
			rules.minLength(5),
			//  rules.regex(/^[a-zA-Z0-9]+$/)
		]),
		range: schema.number([
			rules.required(),
			rules.integer()
		]),

		description: schema.string({ trim: true }, [
			rules.required(),
			rules.maxLength(100),
			rules.minLength(10),
			//  rules.regex(/^[a-zA-Z0-9]+$/)
		]),

		max_number: schema.number([
			rules.required(),
			rules.integer()
		]),

		price: schema.number([
			rules.required(),
			//rules.regex(/^\d+(,\d{1,2})?$/)
		]),

		id_adminfk: schema.string({}, [
			rules.exists({ table: 'admins', column: 'id_admin' }),
		]),
	})

	public messages = {
		'range.integer': 'the number integer',
		'max_number.integer': 'the number integer'
	}
}
