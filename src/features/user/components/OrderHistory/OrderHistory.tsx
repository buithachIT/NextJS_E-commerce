import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { decodeDatabaseId } from '@/helper/decoded';
import { formatDateToLongString } from '@/helper/format';
import { formatCurrency } from '@/helper/formatCurrency';
import { getOrderById } from '@/lib/action/order';
import { OrderNode } from '@/types/order';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import OrderDetailDialog from './OrderDetailDialog';
const OrderHistoryTab = () => {
  const [orders, setOrders] = useState<OrderNode[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderNode | null>(null);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const uid = decodeDatabaseId(user?.id || '');

  useEffect(() => {
    async function fetchOrders() {
      const data = await getOrderById(uid);
      setOrders(data as OrderNode[]);
      setIsLoading(false);
    }
    fetchOrders();
  }, [uid]);
  return (
    <>
      {!isLoading ? (
        <>
          {selectedOrder && (
            <OrderDetailDialog
              openDrawerDetail={!!selectedOrder}
              setOpenDrawerDetail={(val) => !val && setSelectedOrder(null)}
              order={selectedOrder}
            />
          )}
          <Table>
            <TableCaption> A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((o) => (
                <TableRow key={o.orderNumber}>
                  <TableCell className="font-medium">
                    <span
                      onClick={() => setSelectedOrder(o)}
                      className="text-blue-900 cursor-pointer underline italic"
                    >
                      {o.orderNumber}
                    </span>
                  </TableCell>
                  <TableCell>{formatDateToLongString(o.date || '')}</TableCell>
                  <TableCell>{o.status}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(o.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <ClipLoader size={60} />
        </div>
      )}
    </>
  );
};
export default OrderHistoryTab;
