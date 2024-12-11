import { ReactNode } from 'react'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { storeId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  // If the store doesn't exist or doesn't belong to the user, redirect to the homepage
  if (!store) {
    redirect('/')
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
