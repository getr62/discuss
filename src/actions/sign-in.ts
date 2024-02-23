'use server';

import type { Profile } from '@prisma/client';
import { z } from 'zod';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import paths from '@/lib/paths';
import * as auth from '@/lib/auth';
import { compare } from 'bcrypt';

const signInSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(7),
});

interface SignInFormState {
  errors: {
    username?: string[];
    password?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function signIn(
  formState: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  const result = signInSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // console.log('result signInSchema safeParse: ', result);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: {
      name: result.data.username,
    },
  });

  if (!user) {
    return {
      errors: {
        _form: ['Wrong credentials'],
      },
    };
  }

  const passwordsMatch = await compare(result.data.password, user.password);

  if (!passwordsMatch) {
    return {
      errors: {
        _form: ['Wrong credentials'],
      },
    };
  }

  // console.log('user found in sign-in action: ', user);

  let profile: Profile;
  try {
    await auth.signIn('credentials', {
      redirect: false,
      username: result.data.username,
      password: result.data.password,
    });

    profile = await db.profile.upsert({
      where: {
        userId: user.id,
      },
      update: {
        lastLogin: new Date().toLocaleString(),
      },
      create: {
        userId: user.id,
        lastLogin: new Date().toLocaleString(),
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log('error in auth.signIn action: ', err);
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

  // redirect(paths.home());
  return {
    errors: {},
    success: true,
  };
}
