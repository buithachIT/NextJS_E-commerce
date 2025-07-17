'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import {
  UpdateUserFormValues,
  updateUserSchema,
} from '@/features/user/components/UpdateUser/UpdateUserFormSchema';
import { updateUser } from '@/lib/action/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user?.id || '',
      email: user?.email || '',
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });
  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id,
        email: user.email || '',
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
    }
  }, [form, user]);

  const onSubmit = async (values: UpdateUserFormValues) => {
    try {
      const res = await updateUser(values);
      if (res && res.data) {
        toast.success('Update successful!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Undefined error');
    }
  };
  return (
    <>
      <p className="font-display text-xl underline md:pb-2">
        Hi, {user?.firstName}!
      </p>
      <hr />
      <div className="md:grid pt-5 md:grid-cols-2">
        <div className="mx-auto w-5/6">
          <p className="font-bold text-xl">Your information</p>
          <hr className="pb-3" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Update
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <p className="font-bold text-xl">Your address</p>
          <hr className="pb-3" />
        </div>
      </div>
    </>
  );
};
export default Profile;
