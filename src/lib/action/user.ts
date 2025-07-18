import { UpdateUserFormValues } from '@/features/user/components/UpdateUser/UpdateUserFormSchema';
import { UPDATE_USER_MUTATION } from '@/graphql/queries/user';
import { getClient } from '../apollo/apollo-client';

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
