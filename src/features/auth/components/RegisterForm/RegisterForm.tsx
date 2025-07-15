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
import { InputPassword } from '@/components/ui/passwordInputCustom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { registerUser } from '@/lib/action/auth';
import { registerFormSchema, RegisterFormValues } from './RegisterFromSchema';
import { ROUTES } from '@/config/routes';

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log('check client', data);
    try {
      await registerUser(data);
      toast.success('Register success! Please login.');
      router.push('/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Register failed!';
      toast.error(message);
    }
  };

  return (
    <div className="p-10 md:bg-[url('/assets/images/herosection.png')] md:min-h-full">
      <p className="font-display text-3xl font-bold mb-5">
        Create your account
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter username"
                    className="px-[15px] py-3 text-[12px] text-sm"
                  />
                </FormControl>
                <FormMessage />
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
                  <Input
                    {...field}
                    placeholder="Enter email"
                    className="px-[15px] py-3 text-[12px] text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    placeholder="Enter password"
                    className="px-[15px] py-3 text-[12px] text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    placeholder="Confirm your password"
                    className="px-[15px] py-3 text-[12px] text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    id="acceptTerms"
                  />
                  <FormLabel htmlFor="acceptTerms" className="text-sm">
                    I agree to the terms and conditions
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full rounded-3xl h-[50px] cursor-pointer"
            type="submit"
          >
            Register
          </Button>
          <p className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link href={ROUTES.LOGIN} className="text-primary">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
