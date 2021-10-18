import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jogo from 'App/Models/Jogo'
import JogoValidator from 'App/Validators/JogoValidator'
import Admin from 'App/Models/Admin'

export default class JogosController {
    public async store({ request, response }: HttpContextContract) {
        const { type, description, max_number, range, price, id_adminfk } =
            await request.validate(JogoValidator)
        const jogo = await Jogo.create({
            type,
            description,
            max_number,
            range,
            price,
            id_adminfk
        })
        response.status(200).json(jogo)
    }

    public async update({ request, params, response }: HttpContextContract) {
        const gameSchema = await request.validate(JogoValidator)
        const game = await Jogo.findByOrFail('id', params.id)
        game.merge(gameSchema)
        await game.save()
        response.status(200).json(game)
    }

    public async delete({ params }: HttpContextContract) {
        const game = await Jogo.findByOrFail('id', params.id)
        await game.delete()
    }

    public async index({ response, params }: HttpContextContract) {
        const limit = 10
        const game = await Jogo.query().select('*').paginate(params.page, limit)
        response.status(200).json(game)
    }

    public async indexAdmin({ response, params }: HttpContextContract) {

        const admin = await Admin.query().preload('jogo').where('id_admin', params.id)

        response.status(200).json(admin)
    }
}
