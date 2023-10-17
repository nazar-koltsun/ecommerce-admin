import prismadb from "@/lib/prismadb";
import OrderClient from "./components/OrderClient";
import { OrderColumn } from "./components/Columns";
import { format } from 'date-fns'

const OrdersPage = async ({params}: {params: {storeId: string}}) => {
  const { storeId } = params;

  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const formatedOrders: OrderColumn[] = orders.map(order => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems.map(item => item.product.name).join(', '),
    totalPrice: order.orderItems.reduce((acc, item) => acc + +item.product.price, 0) + ' $',
    createdAt: format (order.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient orders={formatedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;