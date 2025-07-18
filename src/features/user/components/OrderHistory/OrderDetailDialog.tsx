import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { formatDateToLongString } from '@/helper/format';
import { formatCurrency } from '@/helper/formatCurrency';
import { OrderNode } from '@/types/order';
import Image from 'next/image';
type IProps = {
  openDrawerDetail: boolean;
  setOpenDrawerDetail: (v: boolean) => void;
  order: OrderNode;
};
const OrderDetailDialog = (props: IProps) => {
  const { openDrawerDetail, setOpenDrawerDetail, order } = props;
  return (
    <>
      <Drawer
        open={openDrawerDetail}
        direction="right"
        onClose={() => setOpenDrawerDetail(false)}
      >
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>Oder: #{order.orderNumber}</DrawerTitle>
            <DrawerDescription>
              Date: {formatDateToLongString(order.date || '')}
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-2">
            <p>
              <strong>Status :</strong> {order.status}
            </p>
            <p>
              <strong>Total :</strong> {formatCurrency(order.total)}
            </p>

            <div className="mt-4">
              <p className="font-semibold">Product detail</p>
              <div className="space-y-4 mt-2">
                {order.lineItems?.nodes?.map((item, idx) => {
                  const attributes =
                    item.variation?.node?.attributes?.nodes || [];
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 border-b pb-2"
                    >
                      <Image
                        src={
                          item.variation?.node?.image?.sourceUrl ??
                          item.product?.node?.image?.sourceUrl ??
                          '/placeholder.jpg'
                        }
                        width={100}
                        height={100}
                        alt={item.product?.node?.name || ''}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 text-sm">
                        <p className="font-semibold">
                          {item.product?.node?.name}
                        </p>
                        <p className="text-muted-foreground">
                          {attributes
                            .map(
                              (attr) =>
                                `${attr.name === 'pa_size' ? 'Size' : 'Color'}: ${attr.value}`
                            )
                            .join(' | ')}
                        </p>
                        <p className="mt-1">
                          Quantity: {item.quantity} – Total:{' '}
                          {formatCurrency(item.total)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <DrawerClose asChild>
            <Button onClick={() => setOpenDrawerDetail(false)} className="mt-4">
              Close
            </Button>
          </DrawerClose>
          <p className="italic font-light text-xs underline mt-2">
            Contact to seller for more details!
          </p>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default OrderDetailDialog;
