'use client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

const UpdateUserTab = () => {
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
    <div className="md:grid gap-10 pt-5 md:grid-cols-2">
      <Card className="">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Your information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <Button type="submit" className="w-full cursor-pointer">
                  Update
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle className="font-bold text-xl">Your address</CardTitle>
        </CardHeader>
        <CardContent>
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
};
export default UpdateUserTab;
