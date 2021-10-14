import Route from '@ioc:Adonis/Core/Route'




Route.group(() => {
   Route.get('index/:page', 'JogosController.index')
   Route.get('indexAdmin/:id', 'JogosController.indexAdmin')
}).prefix('games')

Route.group(() => {
   Route.post('create', 'JogosController.store')
   Route.post('update/:id', 'JogosController.update')
   Route.delete('delete/:id', 'JogosController.delete')
}).middleware('auth').prefix('games')