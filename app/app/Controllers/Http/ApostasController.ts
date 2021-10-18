import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jogador from 'App/Models/Jogador'
import Jogo from 'App/Models/Jogo'
import ApostaValidator from 'App/Validators/ApostaValidator'


export default class ApostasController {
    public async store({ response, request }: HttpContextContract) {
        try {

            const gameSchema = await request.validate(ApostaValidator)
            const jogador = await Jogador.find(gameSchema.user_id)
            var valTotal = 0
            var index = 0
            var err: object[] = [];
            while (index < gameSchema.aposta.length && valTotal <= 30) {
                const { type,
                    description,
                    max_number,
                    range,
                    price,
                    id,
                    id_adminfk } = await Jogo.findByOrFail('id', gameSchema.aposta[index].id_game)
                const length = gameSchema.aposta[index].numero_sorte.length
                var arr = gameSchema.aposta[index].numero_sorte.filter(item => {
                    return item > range
                })
                valTotal = valTotal + price
                if (valTotal > 30) return err.push([{
                    err: 'valor maximo de 30.00 R$ exedido para apostas',
                    game: type,
                    'rule valor carrinho': '30.00 R$',
                    numeros: gameSchema.aposta[index].numero_sorte
                }])
                if (max_number === length) {
                    if (arr.length == 0) {
                        await jogador?.related('jogo').create({
                            type,
                            description,
                            max_number,
                            range,
                            price,
                            id,
                            id_adminfk
                        }, { numeros_sorte: gameSchema.aposta[index].numero_sorte })
                    } else {
                        err.push([{
                            err: 'o jogo ' + type + ' viola as regras do jogo',
                            game: type,
                            'rule range': range,
                            numeros: gameSchema.aposta[index].numero_sorte
                        }])
                    }

                } else {
                    err.push([{
                        err: 'o jogo ' + type + ' viola as regras do jogo',
                        game: type,
                        'rule max_number': max_number,
                        numeros: gameSchema.aposta[index].numero_sorte
                    }])
                }
                index++
            }
            if (err.length > 1) response.status(200).json(err)
            response.status(200).json({ sucesso: 'todas as apostas registradas' })


        } catch (error) {
            response.status(400).json(error)
        }
    }

    public async index({ response, params }: HttpContextContract) {
        try {
            const users = await Jogador
                .query()
                .preload('jogo', (query) => {
                    query.pivotColumns(['numeros_sorte', 'created_at'])
                }).
                where('jogadors.id_jogador', params.id)
            var jogador_games: Object[] = []
            users.map((user) => {
                user.jogo.forEach((skill) => {
                    var obg = {
                        id: skill.id,
                        range: skill.range,
                        type: skill.type,
                        description: skill.description,
                        max_number: skill.max_number,
                        price: skill.price,
                        numero_da_sorte: skill.$extras.pivot_numeros_sorte.replace(/[\\{}"]/g, ""),
                        created_at: skill.$extras.pivot_created_at
                    }
                    var date = new Date(skill.$extras.pivot_created_at)
                    const today = new Date();
                    const mes = today.getMonth() + 1;
                    if (date.getMonth() + 1 === mes) jogador_games.push(obg)
                })
            })
            response.status(200).json(jogador_games)
        } catch (error) {
            response.status(400).json({ ok: error })
        }
    }
    public async i({ response }: HttpContextContract){
response.status(200).json({ola:'ola'})
    }
  
}
/**
 * return Database.from('usuarios')
       .join('jogadors', (query) => {
        query
          .on('usuarios.id', '=', 'jogadors.id_jogador')
          //.andOn('user_logins.created_at', '>', '2020-10-09')
      }).leftJoin('games_jogadors',(subquery)=>{
          subquery.
          on('usuarios.id','=','games_jogadors.id_jogadorfk')
      })
      .orderBy('games_jogadors.created_at', 'desc')
 */