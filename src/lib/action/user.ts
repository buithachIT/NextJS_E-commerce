import { UpdateUserFormValues } from '@/features/user/components/UpdateUser/UpdateUserFormSchema';
import { getClient } from '../apollo/apollo-client';
import { UPDATE_USER_MUTATION } from '@/graphql/mutations/user';
import { ChangePasswordFormValues } from '@/features/user/components/ChangePassword/ChangePasswordTabFormSchema';

export const updateUser = (values: UpdateUserFormValues) => {
  const { id, email, firstName, lastName } = values;
  const client = getClient();
  try {
    const res = client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        input: {
          id,
          email,
          firstName,
          lastName,
        },
      },
    });
    return res;
  } catch (err) {
    console.log('Error: ', err);
  }
};

export const changePassword = async (
  values: ChangePasswordFormValues,
  uid: number,
  userName: string
) => {
  const { newPassword, currentPassword, confirmNewPassword } = values;

  try {
    const res = await fetch('/api/user/changePassword', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: uid,
        userName: userName,
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Change password failed');
    }

    return data;
  } catch (err) {
    console.error('Error in changePassword:', err);
    throw err;
  }
};
