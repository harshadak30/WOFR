import { Card, CardContent } from "../../component/ui/Card";
import { Input } from "../../component/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../component/ui/select";
import { FunnelIcon } from "lucide-react";
import LeaseMaturityChart from "../../component/charts/LeaseMaturityChart";
import MonthlyExpenseChart from "../../component/charts/MonthlyExpenseChart";
import RecentAlerts from "../../component/charts/RecentAlert";

const DashboardOverview = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="">
        <div className="container mx-auto  ">
          {/* Search and filters */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 bg-[#fcfcfc] p-5 rounded-xl shadow-sm">
              <Input
                type="text"
                placeholder="Search leases..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow max-w-3xl border-gray-300"
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
        </div>{" "}
      </div>

      <div className="flex flex-col flex-1  overflow-y-auto m-5 min-h-screen">
        <div
          id="main-stats"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Active Leases", value: "247", text: "+12 this month" },
            // { label: "ROU Asset Value", value: "$2.4M", text: "Total value" },
            { label: "Lease Liability", value: "$1.8M", text: "Outstanding" },
            { label: "Expiring Soon", value: "15", text: "Next 90 days" },
            { label: "Pending Leases", value: "15", text: "Next 90 days" },

          ].map((stat, idx) => (
            <Card key={idx} className="bg-[#fcfcfc] h-40 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-500 leading-none">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold mt-6">{stat.value}</h3>{" "}
                    <h3 className="text-l">{stat.text}</h3>{" "}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LeaseMaturityChart />
          <MonthlyExpenseChart />
        </div>

        {/* Recent alerts */}
        <div className="mb-8">
          <RecentAlerts />
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
