
import UsersController from "#controllers/users_controller";
import router from "@adonisjs/core/services/router";

export function userRoute(){

    const usersController = new UsersController();

    router.group(() => {
        router.get('/list', usersController.index)           // GET /users/list
        router.post('/create', usersController.store)        // POST /users/create
        router.get('/details/:id', usersController.show)     // GET /users/details/:id
        router.put('/update/:id', usersController.update)    // PUT /users/update/:id  
        router.delete('/remove/:id', usersController.destroy) // DELETE /users/remove/:id
    }).prefix('/users')
   
}