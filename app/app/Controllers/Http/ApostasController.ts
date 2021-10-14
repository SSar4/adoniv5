import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jogador from 'App/Models/Jogador'
export default class ApostasController {
    public async store({ response }: HttpContextContract) {
        try {

            const user = await Jogador.query().preload('jogo')

            response.json(user)

        } catch (error) {
            response.status(400).json(error)
        }
    }
}
