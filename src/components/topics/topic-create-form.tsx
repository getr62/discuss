'use client';

import { useFormState } from 'react-dom';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  const session = useSession();
  console.log('session user in topic-create-form: ', session.data?.user);

  const sessionUser: User = session.data?.user as User;

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button
          // className={session.data?.user.role !== 'admin' ? 'hidden' : ''}
          className={sessionUser.role !== 'admin' ? 'hidden' : ''}
          color='primary'
        >
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input
              name='name'
              label='Name'
              labelPlacement='outside'
              placeholder='Name'
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />

            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Describe your topic'
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />

            {formState.errors._form ? (
              <div className='rounded p-2 bg-red-200 border border-red-400'>
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
