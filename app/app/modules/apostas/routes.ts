import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('create', 'ApostasController.store')
    Route.get('/jogadores/:id','ApostasController.index')
 }).prefix('aposta').middleware('auth')

 Route.get('i','ApostasController.i')