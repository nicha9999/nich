
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'


export default function authRoutes() {

    const authController = new AuthController()

    router.post('auth/register', authController.register)
    router.post('auth/login', authController.login)
    router.delete('auth/logout', authController.logout)
    router.get('auth/checkToken', authController.checkToken)

    

    router.post('auth/checkAuth/:id/token', authController.checkAuth)
    router.put('auth/updatePassword', authController.updatePassword)

    router.post('auth/jwtLogin', authController.jwtLogin)

}