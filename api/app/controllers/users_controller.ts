import User from '#models/user'
import { DynamicModelService } from '#services/dynamic_service'
import JsonService from '#services/json_service'
import SerialService from '#services/serial_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async index({ request, response }: HttpContext) {
    // Create service instance directly
    const userService = new DynamicModelService<User>(User, 'user_id')
    const users = await userService.findAll()
    
    const jsonService = new JsonService()
    
    const data: any = await jsonService.jsonData({
      data: users,
      sort: request.input('sort'),
      order: request.input('order'),
      page: request.input('page'),
      size: request.input('size'),
      search: request.input('search'),
    })
    
    // Process image data
    data.data.map((user: any) => {
      user.pic = user.pic != null ? Buffer.from(user.pic.data).toString('base64') : null
      return user
    })
    
    return response.ok(data)
  }

  // Insert a new user
  public async store({ request, response }: HttpContext) {
    try {
      const data: any = {
        user_id: await SerialService.getSerial('user_id'),
        fullname: request.input('fullname'),
        email: request.input('email'),
        username: request.input('username'),
        password: request.input('password'),
        is_admin: request.input('is_admin'),
        last_login: request.input('last_login'),
        active: request.input('active'),
      }

      // Use dynamic service to create user
      const userService = new DynamicModelService<User>(User, 'user_id')
      const user: any = await userService.insert(data)

      const userData = {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.is_admin,
        active: user.active,
        userId: user.user_id,
      }

      return response.ok({ ok: true, data: userData })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to create user', error: error.message })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      // Use dynamic service to find user by primary key
      const userService = new DynamicModelService<User>(User, 'user_id')
      const user: any = await userService.findByPrimaryKey(params.id)

      if (!user) {
        return response.notFound({ ok: false, message: 'User not found' })
      }

      const userData = {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.is_admin,
        active: user.active,
        userId: user.user_id,
      }

      return response.ok({ ok: true, data: userData })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to fetch user', error: error.message })
    }
  }

  // Update a user by ID
  public async update({ params, request, response }: HttpContext) {
    try {
      const updateData = request.only([
        'fullname',
        'email',
        'username',
        'password',
        'position_id',
        'is_admin',
        'active',
      ])

      // Use dynamic service to update user by primary key
      const userService = new DynamicModelService<User>(User, 'user_id')
      const user: any = await userService.update(params.id, updateData)

      if (!user) {
        return response.notFound({ ok: false, message: 'User not found' })
      }

      const userData = {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.is_admin,
        active: user.active,
        userId: user.user_id,
      }

      return response.ok({ ok: true, data: userData })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to update user', error: error.message })
    }
  }

  // Delete a user by ID
  public async destroy({ params, response }: HttpContext) {
    try {
      // Use dynamic service to delete user by primary key
      const userService = new DynamicModelService<User>(User, 'user_id')
      const deletedUser = await userService.delete(params.id)

      if (!deletedUser) {
        return response.notFound({ ok: false, message: 'User not found' })
      }

      return response.ok({ ok: true, message: 'User deleted successfully' })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to delete user', error: error.message })
    }
  }

  // Additional methods showcasing dynamic service capabilities

  // Find user by email
  public async findByEmail({ params, response }: HttpContext) {
    try {
      const userService = new DynamicModelService<User>(User, 'id')
      const user: any = await userService.findBy({ email: params.email })

      if (!user) {
        return response.notFound({ ok: false, message: 'User not found' })
      }

      const userData = {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.is_admin,
        active: user.active,
        userId: user.user_id,
      }

      return response.ok({ ok: true, data: userData })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to fetch user', error: error.message })
    }
  }

  // Update user by email
  public async updateByEmail({ params, request, response }: HttpContext) {
    try {
      const updateData = request.only([
        'fullname',
        'username',
        'password',
        'position_id',
        'is_admin',
        'active',
      ])

      // Use dynamic service to update user by email
      const userService = new DynamicModelService<User>(User, 'id')
      const user: any = await userService.updateBy({ email: params.email }, updateData)

      if (!user) {
        return response.notFound({ ok: false, message: 'User not found' })
      }

      const userData = {
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.is_admin,
        active: user.active,
        userId: user.user_id,
      }

      return response.ok({ ok: true, data: userData })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to update user', error: error.message })
    }
  }

  // Delete user by username
  public async destroyByUsername({ params, response }: HttpContext) {
    try {
      // Use dynamic service to delete user by username
      const userService = new DynamicModelService<User>(User, 'id')
      const deletedUser = await userService.deleteBy({ username: params.username })

      if (!deletedUser) {
        return response.notFound({ ok: false, message: 'User not found' })
      }

      return response.ok({ ok: true, message: 'User deleted successfully' })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to delete user', error: error.message })
    }
  }

  // Get users by position
  public async getUsersByPosition({ params, response }: HttpContext) {
    try {
      const userService = new DynamicModelService<User>(User, 'id')
      const users = await userService.findManyBy({ position_id: params.positionId })

      const usersData = users.map((user: any) => ({
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.is_admin,
        active: user.active,
        userId: user.user_id,
      }))

      return response.ok({ ok: true, data: usersData })
    } catch (error) {
      return response.badRequest({ ok: false, message: 'Failed to fetch users', error: error.message })
    }
  }

  // Bulk update users by position
  public async updateUsersByPosition({ params, request, response }: HttpContext) {
    try {
      const updateData = request.only(['is_admin', 'active'])
      
      const userService = new DynamicModelService<User>(User, 'id')
      
      // Use dynamic service to bulk update users by position
      const affectedRows = await userService.updateManyBy(
        { position_id: params.positionId },
        updateData
      )

      return response.ok({ 
        ok: true, 
        message: `${affectedRows} users updated successfully` 
      })
    } catch (error) {
      return response.badRequest({ 
        ok: false, 
        message: 'Failed to update users', 
        error: error.message 
      })
    }
  }
}