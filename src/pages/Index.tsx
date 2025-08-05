import { useState } from "react";
import { RoleSelector } from "@/components/dashboard/RoleSelector";
import { Dashboard } from "@/components/dashboard/Dashboard";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userName] = useState("Dr. Martin"); // Simulated user

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  if (!selectedRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  return <Dashboard userRole={selectedRole} userName={userName} />;
};

export default Index;
