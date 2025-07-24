import { REGISTER_USER } from '@/graphql/mutations/auth';
import { getClient } from '@/lib/apollo/apollo-client';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const registerApiSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  email: z
    .string()
    .min(1, { message: 'required field' })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'weak password' })
    .max(16, { message: 'weak password' }),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const parsed = registerApiSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }
    const { username, email, password } = parsed.data;

    const client = getClient();

    const { data, errors } = await client.mutate({
      mutation: REGISTER_USER,
      variables: { username, email, password },
    });

    if (errors || !data?.registerUser?.user) {
      const message = errors?.[0]?.message || 'Registration failed';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in register API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
