'use client';

import AlertModal from '@/components/modals/AlertModal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as zood from 'zod';
import ImageUpload from '@/components/ImageUpload';

const formSchema = zood.object({
  label: zood.string().min(1),
  imageUrl: zood.string().url(),
});

type BillBoardFormValues = zood.infer<typeof formSchema>;

interface BillBoardFormProps {
  initialData: Billboard | null;
}

const BillBoardForm: React.FC<BillBoardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit billboard' : 'Create a new billboard';
  const toastMessage = initialData
    ? 'Billboard updated.'
    : 'Billboard created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BillBoardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: BillBoardFormValues) => {
    try {
      setLoading(true);

      if(initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values);
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values);
      }

      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeId}/billboards`);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDeleteBillboard = async () => {
    try {
      setOpen(true);
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh();
      router.push('/');
      toast.success('Billboard deleted.');
    } catch (error) {
      toast.error(
        'Make sute that you are deleted all categories using the billboard first.'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteBillboard}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description}></Heading>
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard label"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default BillBoardForm;
