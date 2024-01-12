import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formater } from '@/lib/utils';
import getTotalRevenue from '@/actions/get-total-revenue';
import { CreditCard, DollarSign, Package } from 'lucide-react';

interface DashboardPageProps {
  params: {
    storeid: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { storeid } = params;
  const totalRevenue = await getTotalRevenue(storeid);

  return (
    <div className="p-8 pt-6">
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator />
      <div className="mt-8 grid gap-4 grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-4 justify-between items-center text-sm">
              Total revenue
              <DollarSign size={15} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">{formater.format(totalRevenue)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex gap-4 justify-between items-center text-sm">
              Sales
              <CreditCard size={15} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">+25</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex gap-4 justify-between items-center text-sm">
              Total in Stock
              <Package size={15} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold">12</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
