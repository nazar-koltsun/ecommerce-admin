import { auth } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import Navbar from '@/components/Navbar';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeid: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: { id: params.storeid, userId },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
