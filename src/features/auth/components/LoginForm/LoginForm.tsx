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
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginFormSchema, LoginFormValues } from './LoginFormSchema';
import { InputPassword } from '@/components/ui/passwordInputCustom';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '@/lib/action/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import parse from 'html-react-parser'

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginUser(data);
      toast.success(`Hi best friend!`);
      router.push('/');
    } catch (err) {
      const message = parse(err instanceof Error ? err.message : 'Login failed!');
      toast.error(<div>{message}</div>);
    }
  };
  return (
    <div className="p-10 md:bg-[url('/assets/images/herosection.png')] md:min-h-full">
      <p className="font-display text-3xl font-bold mb-5">Welcome to Aurore!</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="px-[15px] py-3 text-[12px] text-sm"
                    {...field}
                    placeholder="Enter email address"
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
                    className="px-[15px] py-3 text-[12px] text-sm"
                    {...field}
                    placeholder="Enter password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center ">
            <Link href="" className="text-[12px] text-primary underline">
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full rounded-3xl h-[50px] cursor-pointer"
            type="submit"
          >
            Submit
          </Button>
          <Link href={ROUTES.REGISTER}>
            <Button
              className="w-full rounded-3xl h-[50px] cursor-pointer"
              variant={'outline'}
            >
              Create an account
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
};
export default LoginForm;
