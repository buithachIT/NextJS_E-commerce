'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChangePasswordFormValues,
  changePasswordFormSchema,
} from './ChangePasswordTabFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { changePassword } from '@/lib/action/user';
import { useAuth } from '@/contexts/AuthContext';
import { decodeDatabaseId } from '@/helper/decoded';
import toast from 'react-hot-toast';
import { InputPassword } from '@/components/ui/passwordInputCustom';

const ChangePasswordTab = () => {
  const { user } = useAuth();
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const uid = decodeDatabaseId(user?.id || '');
  const userName = user?.email || '';
  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const res = await changePassword(data, uid, userName);
      if (res && res.success) {
        toast.success('Password changed successfully');
        form.reset();
      } else {
        toast.error(res?.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to change password!');
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-bold text-xl">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      placeholder="Enter current password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      placeholder="Enter new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      placeholder="Enter confirm password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full cursor-pointer"
            >
              {form.formState.isSubmitting ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordTab;
