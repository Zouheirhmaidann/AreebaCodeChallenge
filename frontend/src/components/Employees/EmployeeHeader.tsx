"use client";

import { memo, useCallback } from "react";
import { LogOut, Plus, Users } from "lucide-react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
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
  // Funciton to logout the user
  const handleLogout = useCallback(() => {
    // Confirm logout
   if(window.confirm("Are you sure you want to logout?")) {
    // Remove the token from the cookie
    Cookies.remove("auth-token");
    // Redirect to the login page
    redirect("/login");
   }
  }, [])
  return (
    <div className="employee-header">
      <div className="header-content">
        <div className="header-title">
          <Users className="header-icon" size={50} />
          <div>
            <h1>Employee Management</h1>
          </div>
        </div>
        <div className="row">
          <button className="add-button" onClick={() => openModal()}>
          <Plus size={25} />
          Add Employee
        </button>
         <button className="add-button" onClick={handleLogout}>
          <LogOut size={25} />
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(EmployeeHeader);
