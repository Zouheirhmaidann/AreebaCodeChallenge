"use client";

import { memo } from "react";
import { Plus, Users } from "lucide-react";

interface EmployeeHeaderProps {
  openModal: () => void;
}
const EmployeeHeader = ({ openModal }: EmployeeHeaderProps) => {
  return (
    <div className="employee-header">
      <div className="header-content">
        <div className="header-title">
          <Users className="header-icon" size={50} />
          <div>
            <h1>Employee Management</h1>
          </div>
        </div>
        <button className="add-button" onClick={() => openModal()}>
          <Plus size={25} />
          Add Employee
        </button>
      </div>
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(EmployeeHeader);
