
import { Card, CardContent } from "../ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TrendingUp } from "lucide-react";

const RecentAlert = () => {
  return (
    <Card className="bg-[#fcfcfc] p-8 cursor-pointer mt-10">
      <CardContent className="p-6 ">
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Recent Alerts</h2>
          </div>

        </div>

        <div className="space-y-6 mt-8">
          <div className="bg-[#FEF2F2]">
            <p className="text-gray-700 mb-1 font-bold">Payment Due Alert</p>
            <div className="flex items-center justify-between">
              <p className="text-l f">Office Lease #123 payment due in 3 days</p>
              <span className="flex items-center text-[#EF4444] rounded-md ">
               
                View
              </span>
            </div>
          </div>

          <div className="bg-[#FFFBEB]">
            <p className="text-gray-700 mb-1 font-bold">Lease Expiring</p>
            <div className="flex items-center justify-between">
              <p className="text-l ">Warehouse Lease #456 expires in 30 days</p>
              <span className="flex items-center text-[#F59E0B]   rounded-md ">
            
                View              </span>
            </div>
          </div>

          <div className="bg-[#EFF6FF]">
            <p className="text-gray-700 mb-1 font-bold">Modification Required</p>
            <div className="flex items-center justify-between">
              <p className="text-l ">Retail Space #789 needs contract update</p>
              <span className="flex items-center text-[#3B82F6]  rounded-md ">
               
               View
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlert;
