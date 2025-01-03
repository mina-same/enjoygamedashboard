import { ReactNode } from 'react'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import prismadb from '@/lib/prismadb'

export default async function SetupLayout({
  children,
}: {
  children: ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  })

  // const billboard = await prismadb.billboard.findFirst({
  //   where: {
  //     userId,
  //   },
  // })

  // disaple if you want to add new users to the store
  if (store) {
    redirect(`/${store.id}`)
  }

  return <>{children}</>
}
