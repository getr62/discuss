'use server';

import type { User } from '@prisma/client';
import { z } from 'zod';
import { hash } from 'bcrypt';
import { db } from '@/db';
import paths from '@/lib/paths';
import { redirect } from 'next/navigation';

const signUpSchema = z
  .object({
    username: z.string().min(3),
    role: z.string().min(3),
    password: z.string().min(7),
    pwrepeat: z.string().min(7),
  })
  .refine((data) => data.password === data.pwrepeat, {
    path: ['pwrepeat'],
    message: 'Passwords do not match',
  });

interface SignUpFormState {
  errors: {
    username?: string[];
    role?: string[];
    password?: string[];
    pwrepeat?: string[];
    _form?: string[];
  };
}

export async function signUp(
  formState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const result = signUpSchema.safeParse({
    username: formData.get('username'),
    role: formData.get('role'),
    password: formData.get('password'),
    pwrepeat: formData.get('pwrepeat'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const hashedPw = await hash(result.data.password, 10);
  let user: User;
  try {
    const user = await db.user.create({
      data: {
        name: result.data.username,
        role: result.data.role,
        password: hashedPw,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  redirect(paths.signin());
  //   return {
  //     errors: {},
  //   };
}
