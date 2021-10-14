import Route from '@ioc:Adonis/Core/Route'

Route.post('/user','UsuariosController.store')
Route.post('login', 'SessionsController.store')
Route.post('/resetPass','ResetPassesController.resetPass')
Route.group(() => {
   Route.get('/','UsuariosController.index')
   Route.post('/update/:id','UsuariosController.update')
   Route.delete('/delete/:id','UsuariosController.delete')
   Route.post('/logout','SessionsController.logout')
   
}).middleware('auth').prefix('user')
