import vine from '@vinejs/vine'
const password = vine.string().minLength(8)
//const pic = vine.file() || undefined || null
export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .unique(async (db, value) => {
        const match = await db.from('users').select('user_id').where('username', value).first()
        return !match
      }),
    password,
    fullname: vine.string(),
   // pic,
    position_id: vine.number(),
    is_admin: vine.enum(['Y', 'N']),
    active: vine.enum(['Y', 'N']),
   
  })
)

export const loginValidator = vine.compile(
  vine.object({
    //email: vine.string().email().normalizeEmail(),
    username: vine.string(),
    password
  })
)
