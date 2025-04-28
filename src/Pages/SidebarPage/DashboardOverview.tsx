// import SalesMetrics from "../../component/charts/SalesMetrics";
// import RevenueChart from "../../component/charts/RevenueChart";
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
import { FunnelPlus } from "lucide-react";
import  RevenueChart  from "../../component/charts/RevenueChart";
import  Salesmetrice  from "../../component/charts/Salesmetrice";
import RecentAlert from "../../component/charts/RecentAlert";

const DashboardOverview = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="p-3">
        <div className="">
          {/* Search + Visual Dropdowns */}
          <div className="flex gap-4 bg-[#fcfcfc] p-5 rounded-xl">
            <Input
              type="text"
              placeholder="Search by email or name..."
              value={search}
              className="max-w-6xl border-gray-300"
            />
            <button
              className="flex items-center  bg-[#F3F4F6] hover:bg-[#e2e5ff] text-black py-2 px-4  rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60  cursor-pointer"
              aria-label="logout"
            >
              <span className="font-medium">mm/dd/yyyy</span>
            </button>

            <Select>
              <SelectTrigger className="w-[180px] border-gray-300 cursor-not-allowed">
                <SelectValue placeholder="Lease Type" />
              </SelectTrigger>
              <SelectContent className="border-gray-300">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <button
              className="flex items-center  bg-[#F3F4F6] hover:bg-[#e2e5ff] text-black py-2 px-4  rounded-md transition-colors duration-200 shadow-sm disabled:opacity-60  cursor-pointer"
              aria-label="logout"
            >
              <FunnelPlus size={16} className="m-1" />
              <span className="font-medium">More filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1  overflow-y-auto m-5 min-h-screen">
        <div
          id="main-stats"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: "Active Leases", value: "247" , text:"+12 this month" },
            { label: "ROU Asset Value", value: "$2.4M" ,text:"Total value"},
            { label: "Lease Liability", value: "$1.8M", text:"Outstanding" },
            { label: "Expiring Soon", value: "15" , text:"Next 90 days"},
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

        <div
          id="data-visualization"
          className="grid grid-cols-1 lg:grid-cols-[48%_50%] gap-6 h-[400px]"
        >
         <RevenueChart />
             <Salesmetrice />
          
        </div>
        <div className="py-12 w-[900]">
        <RecentAlert/>
        </div>
       
      </div>
    </>
  );
};

export default DashboardOverview;
