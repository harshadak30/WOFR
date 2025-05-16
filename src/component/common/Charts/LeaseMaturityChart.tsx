import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "../ui/Card";

const data = [
  { year: "0 - 1 year", income: 20, expense: 30 },
  { year: "1 - 5 years", income: 25, expense: 25 },
  { year: "+5 years", income: 30, expense: 35 },
];

const LeaseMaturityChart = () => {
  return (
    <Card className="bg-white p-8 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
              Lease Maturity Distribution
            </h2>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="year" />

              <Tooltip />
              <Bar
                type="monotone"
                dataKey="income"
                stroke=""
                strokeWidth={2}
                fill="#93C5FD"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaseMaturityChart;
