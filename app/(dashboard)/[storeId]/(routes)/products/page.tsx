import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'
import { formatter } from '@/lib/utils'

import { ProductClient } from './components/client'
import { ProductColumn } from './components/columns'

const ProductsPage = async ({
  params,
}: {
  params: {
    storeId: string
  }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    nameEn: product.nameEn, // Added English name
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    productDescription: product.productDescription,
    productDescriptionEn: product.productDescriptionEn, // Added English description
    price: formatter.format(product.price),
    category: product.category.name,
    createdAt: format(product.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
