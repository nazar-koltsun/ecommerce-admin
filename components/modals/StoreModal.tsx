'use client';
import Modal from '@/components/ui/modal';
import useStoreModal from '@/hooks/use-store-modal';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const formSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
});

const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const resp = await axios.post('/api/stores', values);
      
      window.location.assign(`/${resp.data.id}`);
    }
    catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
    finally {
      setLoading(false);
      
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      tittle="Create Store"
      description="Add a new store to manage your products and categories."
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex justify-end">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
