'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface OverviewProps {
  data: {
    name: string;
    total: number;
  }[]
}

const Overview: React.FC<OverviewProps> = ({data}) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
        >
          <Bar dataKey="total" stackId="totalBar" fill="#3a9f55" />
          <XAxis dataKey="name" />
          <YAxis dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;
