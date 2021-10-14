import Usuario from 'App/Models/Usuario'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuarioValidator from 'App/Validators/UsuarioValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import Admin from 'App/Models/Admin'
import Jogador from 'App/Models/Jogador'
import UserUpdadeValidator from 'App/Validators/UserUpdadeValidator'

export default class UsuariosController {

    public async store({ request, response }: HttpContextContract) {
        const trx = await Database.beginGlobalTransaction('pg')
        try {
            const { name, email, password, type } = await request.validate(UsuarioValidator)
            if (type.toUpperCase() != 'ADMIN' && type.toUpperCase() != 'JOGADOR')
                return response.status(400).json({ req: 'tipo de usuario invalido' })

            const user = await Usuario.create({ name, email, password, type }, trx)

            if (type.toUpperCase() == 'ADMIN') await Admin.create({ id_admin: user.id })
            if (type.toUpperCase() == 'JOGADOR') await Jogador.create({ id_jogador: user.id })

            await Mail.send((message) => {
                message
                    .from('info@example.com')
                    .to(email)
                    .subject('Welcome Onboard!')
                    .htmlView('emails/welcome', { name: name })
            }).catch((e) => console.log(e))
            await trx.commit()
            response.status(200).json({
                email: user.email,
                id: user.id,
                type: user.type,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            })
        } catch (error) {
            await trx.rollback()
            return response.status(400).json(error)
        }
    }

    public async index({ response }: HttpContextContract) {
        const user = await Usuario.query().
            select(['name', 'email', 'createdAt', 'updatedAt','id'])
        response.status(200).json(user)

    }

    public async update({ params, request, response }: HttpContextContract) {
        const userSchema = await request.validate(UserUpdadeValidator)
        const user = await Usuario.findByOrFail('id', params.id)
        user.merge(userSchema)
        await user.save()
        response.status(200).json(user)
    }

    public async delete({ params }: HttpContextContract) {
        const user = await Usuario.findByOrFail('id', params.id)
        await user.delete()
    }

}
