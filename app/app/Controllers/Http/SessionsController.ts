import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class SessionsController {
    public async store({ request, response, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const user = await Usuario.findBy('email', email)

            const token = await auth.use('api').attempt(email, password, {
                name: user?.serialize().type,
                expiresIn: '30mins'
            })
            return {
                token,
                email: user?.serialize().email,
                name: user?.serialize().name,
                id: user?.serialize().id
            }
        } catch {
            return response.badRequest('Invalid credentials')
        }
    }

    public async logout({ auth }: HttpContextContract) {
        try {
            await auth.use('api').revoke()
            return {
              revoked: true
            } 
        } catch (error) {
            return error
        }
    }
}

