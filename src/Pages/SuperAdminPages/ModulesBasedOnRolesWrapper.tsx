import { useState } from "react";
import { ModulesBasedOnRoles } from "./ModulesBasedOnRoles";

const ModulesBasedOnRolesWrapper = () => {
  const [activeTab, setActiveTab] = useState<"current" | "available">(
    "current"
  );
  return <ModulesBasedOnRoles activeTab={activeTab} onChange={setActiveTab} />;
};

export default ModulesBasedOnRolesWrapper;
