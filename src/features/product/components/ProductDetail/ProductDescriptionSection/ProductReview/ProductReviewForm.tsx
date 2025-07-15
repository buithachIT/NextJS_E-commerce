import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

type FormData = {
  name: string;
  content: string;
  rating: number;
};

type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

export default function ProductReviewForm({ onSubmit, onCancel }: Props) {
  const { user } = useAuth();
  const form = useForm<FormData>({
    defaultValues: { name: '', content: '', rating: 5 },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
          form.reset();
        })}
        className="mb-6 p-4 border rounded bg-gray-50 flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>{user?.username}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  hidden
                  value={user?.username || ''}
                  placeholder="Your name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your comment</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Your comment"
                  className="border rounded px-3 py-2"
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Submit
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
