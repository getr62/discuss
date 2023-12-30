import type { User } from '@prisma/client';
import { db } from '@/db';

export async function getUser(name: string): Promise<User | null> {
  try {
    const user = await db.user.findUnique({
      where: { name },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
