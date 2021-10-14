import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import Mail from '@ioc:Adonis/Addons/Mail'

function randonPass(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

export default class ResetPassesController {
    public async resetPass({ response, request }: HttpContextContract) {
        const email = request.input('email')
        try {
            const user = await Usuario.findByOrFail('email', email)
            const newPass = randonPass(5)
            const us = user
            us.password = newPass
            user.merge(us)
            await Mail.send((message) => {
                message
                    .from('info@example.com')
                    .to(email)
                    .subject('reset password!')
                    .htmlView('emails/forgotpass', {
                        newPass,
                        name: user.name
                    })
            }).catch((e) => console.log(e))
            await user.save()
            response.status(200).json(user)
        } catch (error) {
            response.status(400).json({badRequest:'invalid email'})
        }
    }
}
