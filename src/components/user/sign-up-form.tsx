'use client';

import { useFormState } from 'react-dom';
import { Input, Select, SelectItem } from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';

export default function SignUpForm() {
  const [formState, action] = useFormState(actions.signUp, {
    errors: {},
  });

  return (
    <form action={action}>
      <div className='flex flex-col gap-4 p-4 w-80 mx-auto'>
        <h3 className='text-lg'>Sign Up</h3>

        <Input
          isInvalid={!!formState.errors.username}
          errorMessage={formState.errors.username?.join(', ')}
          name='username'
          label='Username'
          labelPlacement='outside'
          placeholder='Username'
        />

        {/* <Input
          isInvalid={!!formState.errors.username}
          errorMessage={formState.errors.username?.join(', ')}
          name='role'
          label='Role'
          labelPlacement='outside'
          placeholder='Role'
        /> */}

        <Select
          isInvalid={!!formState.errors.role}
          errorMessage={formState.errors.role?.join(', ')}
          name='role'
          label='Role'
          labelPlacement='outside'
          placeholder='Role'
        >
          <SelectItem key='admin' value='admin'>
            Admin
          </SelectItem>
          <SelectItem key='user' value='user'>
            User
          </SelectItem>
        </Select>

        <Input
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password?.join(', ')}
          name='password'
          label='Password'
          labelPlacement='outside'
          placeholder='Password'
          type='password'
        />

        <Input
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password?.join(', ')}
          name='pwrepeat'
          label='Confirm Password'
          labelPlacement='outside'
          placeholder='Confirm Password'
          type='password'
        />

        {formState.errors._form ? (
          <div className='rounded p-2 bg-red-200 border border-red-400'>
            {formState.errors._form.join(', ')}
          </div>
        ) : null}

        <FormButton>Sign Up</FormButton>
      </div>
    </form>
  );
}
