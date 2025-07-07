"use client";

import { memo } from "react";
import { Plus, Users } from "lucide-react";

interface EmployeeHeaderProps {
  openModal: () => void;
}
/**
 * EmployeeHeader component
 *
 * This component renders the header section for the Employee Management page.
 * It includes a title and an "Add Employee" button.
 *
 * Props:
 * - openModal: A function to open the employee modal when the "Add Employee" button is clicked.
 */

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
