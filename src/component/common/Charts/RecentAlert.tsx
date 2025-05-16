import React from "react";
// import { Card, CardContent } from "../ui/Card";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent } from "../ui/Card";

interface Alert {
  id: string;
  type: "warning" | "error" | "info";
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  actionColor: string;
}

const RecentAlerts: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "error",
      title: "Payment Due Alert",
      description: "Office Lease #123 payment due in 3 days",
      icon: <AlertTriangle size={18} className="text-red-500" />,
      bgColor: "bg-[#FEF2F2]",
      textColor: "text-red-500",
      actionColor: "text-[#EF4444]",
    },
    {
      id: "2",
      type: "warning",
      title: "Lease Expiring",
      description: "Warehouse Lease #456 expires in 30 days",
      icon: <AlertCircle size={18} className="text-amber-500" />,
      bgColor: "bg-[#FFFBEB]",
      textColor: "text-amber-500",
      actionColor: "text-[#F59E0B]",
    },
    {
      id: "3",
      type: "info",
      title: "Modification Required",
      description: "Retail Space #789 needs contract update",
      icon: <Info size={18} className="text-blue-500" />,
      bgColor: "bg-[#EFF6FF]",
      textColor: "text-blue-500",
      actionColor: "text-[#3B82F6]",
    },
  ];

  return (
    <Card className="bg-white hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Alerts</h2>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`${alert.bgColor} p-4 rounded-md transition-transform duration-200 hover:scale-[1.01]`}
            >
              <div className="flex items-center gap-2 mb-1">
                {alert.icon}
                <p className="font-bold text-gray-800">{alert.title}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-700">{alert.description}</p>
                <a
                  href="#"
                  className={`${alert.actionColor} font-medium hover:underline`}
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
