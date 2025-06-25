import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import DateTimeService from '#services/date_time_service'

export default class AuthController {
  async register({ request, response }: HttpContext) {

    try {
      const data: any = await request.validateUsing(registerValidator)
      const user = await User.create(data)
      let json: any = []
      json.push(await User.accessTokens.create(user))

      return response.ok({ ok: true, data: json })
    } catch (error) {
      return response.ok({ ok: false, message: error.message })
    }

  }

  async login({ request, response, auth }: HttpContext) {
    const { username, password } = await request.validateUsing(loginValidator)

    let userData: any

    const user: any = [await User.verifyCredentials(username, password)]

    if (user.length > 0) {
      if (user[0].active == 'Y') {
        await User.accessTokens.create(user[0])

        const token: any = await auth.use('jwt').generate(user[0])

        userData = user.map((data: { pic: any; user_id: any; fullname: any; username: any; email: any; position_id: any; is_admin: any; last_login: any; active: any }) => {
          return {
            userId: data.user_id,
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            positionId: data.position_id,
            isAdmin: data.is_admin,
            lastLogin: data.last_login,
            active: data.active,
            token: token.token,
            //pic: blobData != null ? Buffer.from(blobData).toString('base64') : null,
          }
        })

        if (userData.length > 0) {
          const checkUser: any = await User.find(user[0].user_id)
          checkUser.last_login = await DateTimeService.getCurrentDateTime()
          await checkUser.save()
        }
      } else {
        userData = [{ message: 'User not active!' }]
      }
    }

    try {
      return response.ok({ ok: true, data: userData })
    } catch (error) {
      return response.ok({ ok: false, message: error.message })
    }
  }

  async logout({ auth }: HttpContext) {
    const user: any = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }
  async checkAuth({ params, auth }: HttpContext) {
    const user = await User.query().where({ user_id: params.id })

    const token = await User.accessTokens.create(user[0])
    return {
      type: 'bearer',
      value: token.value!.release(),
      check: await auth.check(),
    }
  }
  async updatePassword({ request, response }: HttpContext) {
    try {
      const user: any = await User.findBy({ username: request.input('username') })
      user.password = request.input('password')
      await user.save()
      return response.ok({ ok: true, message: 'Password updated successfully' })
    } catch (error) {
      return response.ok({ ok: false, message: error })
    }
  }

  async checkToken({ auth, response }: HttpContext) {
    const ckToken: any = await auth.check()
    let json: any = []

    if (ckToken) {
      json.push(auth.user)
    } else {
      json = []
    }

    const userData: any = json.map(
      (data: {
        pic: any
        user_id: any
        fullname: any
        username: any
        email: any
        position_id: any
        is_admin: any
        last_login: any
        active: any
      }) => {
        const blobData: any = data.pic
        return {
          userId: data.user_id,
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          positionId: data.position_id,
          isAdmin: data.is_admin,
          lastLogin: data.last_login,
          active: data.active,
          pic: blobData != null ? Buffer.from(blobData).toString('base64') : null,
        }
      }
    )

    try {
      return response.ok({ ok: true, data: ckToken, user: userData })
    } catch (error) {
      return response.ok({ ok: false, message: error })
    }
  }

  async jwtLogin({ request, auth }: HttpContext) {
    const { username, password } = request.all()
    const user = await User.verifyCredentials(username, password)
    //await User.accessTokens.create(user)
    return await auth.use('jwt').generate(user)
  }



}
