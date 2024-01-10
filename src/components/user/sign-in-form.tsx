'use client';

import { useFormState } from 'react-dom';
import { Input } from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

export default function SignInForm() {
  const [formState, action] = useFormState(actions.signIn, {
    errors: {},
  });

  return (
    <form action={action}>
      <div className='flex flex-col gap-4 p-4 w-80 mx-auto'>
        <h3 className='text-lg'>Sign In</h3>

        <Input
          isInvalid={!!formState.errors.username}
          errorMessage={formState.errors.username?.join(', ')}
          name='username'
          label='Username'
          labelPlacement='outside'
          placeholder='Username'
        />

        <Input
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password?.join(', ')}
          name='password'
          label='Password'
          labelPlacement='outside'
          placeholder='Password'
          type='password'
        />

        {formState.errors._form ? (
          <div className='rounded p-2 bg-red-200 border border-red-400'>
            {formState.errors._form.join(', ')}
          </div>
        ) : null}

        <FormButton>Sign In</FormButton>
      </div>
    </form>
  );
}
