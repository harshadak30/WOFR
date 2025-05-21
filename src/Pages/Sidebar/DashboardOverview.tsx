import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  FileText,
  FunnelIcon,
  Repeat,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../component/common/ui/Select";
import { Input } from "../../component/common/ui/Input";
import { Card } from "../../component/common/ui/Card";
import RecentAlerts from "../../component/common/Charts/RecentAlert";
import MonthlyExpenseChart from "../../component/common/Charts/MonthlyExpenseChart";

const DashboardOverview = () => {
  const [search, setSearch] = useState("");
  // const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem("user_type");
    // setUserType(type);
  }, []);

  const leaseStats = {
    active: 237,
    pending: 42,
    approved: 18,
    rejected: 5,
    percentChange: 12.5,
  };

  const activityData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 78 },
    { name: "Mar", value: 82 },
    { name: "Apr", value: 70 },
    { name: "May", value: 85 },
    { name: "Jun", value: 90 },
    { name: "Jul", value: 105 },
    { name: "Aug", value: 115 },
  ];

  const leaseTypeData = [
    { name: "Commercial", value: 45 },
    { name: "Residential", value: 30 },
    { name: "Industrial", value: 15 },
    { name: "Agricultural", value: 10 },
  ];

  interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change: string;
    trend: "up" | "down";
    trendIsGood?: boolean;
  }

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    change,
    trend,
    trendIsGood = true,
  }) => {
    const isTrendPositive =
      (trend === "up" && trendIsGood) || (trend === "down" && !trendIsGood);

    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-primary-50 text-primary-600">
            {icon}
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">
              {value}
            </h3>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {trend === "up" ? (
            <TrendingUp
              className={`h-4 w-4 ${
                isTrendPositive ? "text-green-500" : "text-red-500"
              }`}
            />
          ) : (
            <TrendingDown
              className={`h-4 w-4 ${
                isTrendPositive ? "text-green-500" : "text-red-500"
              }`}
            />
          )}
          <span
            className={`ml-1 text-sm font-medium ${
              isTrendPositive ? "text-green-700" : "text-red-700"
            }`}
          >
            {change}
          </span>
          <span className="ml-1.5 text-sm text-gray-500">vs last month</span>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className=" mx-auto">
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-start gap-4 bg-[#fcfcfc] p-5 rounded-xl shadow-sm ">
            <Input
              type="text"
              placeholder="Search leases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow max-w-3xl border-gray-300 mr-10"
            />

            <button className="flex items-center bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-700 py-2 px-4 rounded-md transition-colors duration-200">
              <span className="font-medium">mm/dd/yyyy</span>
            </button>

            <Select>
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Lease Type" />
              </SelectTrigger>
              <SelectContent className="border-gray-300">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
              </SelectContent>
            </Select>

            <button className="flex items-center gap-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-gray-700 py-2 px-4 rounded-md transition-colors duration-200">
              <FunnelIcon size={16} />
              <span className="font-medium">More Filters</span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Super Admin Only */}
          {/* {userType === "master_admin" && ( */}
          <>
            <StatCard
              title="Total Leases"
              value={leaseStats.active}
              icon={<FileText />}
              change={`${leaseStats.percentChange}%`}
              trend="up"
            />
            <StatCard
              title="Active Users"
              value={128}
              icon={<Users />}
              change="8%"
              trend="up"
            />
            <StatCard
              title="System Uptime"
              value="99.9%"
              icon={<Repeat />}
              change="0.1%"
              trend="up"
            />
            <StatCard
              title="Resource Usage"
              value="68%"
              icon={<TrendingUp />}
              change="5%"
              trend="down"
              trendIsGood={true}
            />
          </>
          {/* )} */}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <Card
            className="lg:col-span-2 bg-white p-5"
            title="Lease Activity"
            // subtitle="Monthly trends"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Super Admin Only Pie Chart */}
          {/* {userType === "super_admin" && ( */}
          <Card title="Lease Distribution" className="bg-white">
            {/* <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leaseTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leaseTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer> */}

            <MonthlyExpenseChart />
          </Card>
          {/* )} */}
        </div>
        <div className="grid grid-cols-1 mt-10">
          <Card title="Lease Distribution" className="bg-white">
            {/* <div className="h-80 flex items-center justify-center p-5">
         
            </div> */}
            <RecentAlerts />
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
