import z from 'zod'

export const loginSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),

  password: z
    .string({ message: 'Please enter your password.' })
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(128, { message: 'Password must be less than 128 characters.' }),
})

export const registerSchema = loginSchema.extend({
  name: z
    .string({ message: 'Please enter your name.' })
    .min(2, { message: 'Name must have at least 2 characters.' })
    .max(256, { message: 'Name must be shorter than 256 characters.' }),
})
