import { OrderDetailClientView } from "@/components/orders/order-detail-client-view"

export default async function ClientOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <OrderDetailClientView orderId={id} />
}
