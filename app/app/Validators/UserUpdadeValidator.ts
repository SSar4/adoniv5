import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
'use strict'
export default class UserUpdadeValidator {
  constructor (protected ctx: HttpContextContract) {
	  console.log(ctx)
  }

  public schema = schema.create({
	name: schema.string({ trim: true }, [
		rules.maxLength(10),
		rules.minLength(3),
		//  rules.regex(/^[a-zA-Z0-9]+$/)
	]),

	email: schema.string({}, [
		rules.exists({ table: 'usuarios', column: 'email' }),
		rules.email(),
		rules.unique({ table: 'usuarios', column: 'email' })
	]),

	password: schema.string({}, [
		rules.maxLength(10),
		rules.minLength(5),
		rules.regex(/^[a-zA-Z0-9]+$/)
	]),

  })

  public messages = {
	'name.maxLength': 'for name max 10 caracters',
	'name.minLength': 'for name min 3 caracters',
	'email.unique': 'unique email',
	'email.email': 'invalid aderress email',
	'senha.maxLength': 'for max password 10 caracters',
	'password.minLength': 'for min password 5 caracters',
	'password.regex': 'somente caracteris alfanumericos',
  }
}
