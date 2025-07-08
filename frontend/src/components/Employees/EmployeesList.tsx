"use client";

import AxiosInstance from "@/lib/AxiosInstance";
import { Employee } from "@/types/employees.type";
import {
  Building,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";
import { memo, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

/**
 * EmployeesList component
 *
 * This component renders a grid of employee cards.
 * Each card displays the employee's name, position, email, phone, department, salary, and address.
 * Each card also has edit and delete buttons.
 * The edit button opens the employee modal with the employee's data pre-filled.
 * The delete button deletes the employee from the database.
 *
 * Props:
 * - employees: An array of Employee objects.
 * - openModal: A function to open the employee modal.
 * - setEmployees: A function to update the list of employees.
 */
const EmployeesList: React.FC<{
  employees: Employee[];
  openModal: (employee?: Employee) => void;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}> = ({ employees, openModal, setEmployees }) => {
  // State to show the loading indicator for delete
  const [activeDeleteId, setActiveDeleteId] = useState<string | null>(null);
  // Function to delete employee
  const handleDelete = async (id: string | null) => {
    try {
      if(!id) return
      setActiveDeleteId(id);
      // Confirm delete
      if (window.confirm("Are you sure you want to delete this employee?")) {
        // Delete employee
        await AxiosInstance.delete(`/employees/deleteEmployee/${id}`);
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        toast.success("Employee deleted successfully");
      }
    } catch  {
      toast.error("Error deleting employee");
    } finally {
      setActiveDeleteId(null);
    }
  };
  return (
    <div className="employee-grid">
      {employees.map((employee, index) => (
        <div
          key={employee?._id}
          className="employee-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="employee-info">
            <div className="employee-name">
              <h3>{employee?.full_name}</h3>
              <span className="employee-position">{employee?.position}</span>
            </div>

            <div className="employee-details">
              <div className="detail-item">
                <Mail size={16} />
                <span>{employee?.email}</span>
              </div>
              <div className="detail-item">
                <Phone size={16} />
                <span>{employee?.phone}</span>
              </div>
              <div className="detail-item">
                <Building size={16} />
                <span>{employee?.department}</span>
              </div>
              <div className="detail-item">
                <DollarSign size={16} />
                <span>{employee?.salary}</span>
              </div>
              <div className="detail-item">
                <MapPin size={16} />
                <span>{employee?.address}</span>
              </div>
            </div>
          </div>

          <div className="employee-actions">
            <button
              className="action-button edit-button"
              onClick={() => openModal(employee)}
            >
              <Edit size={16} />
            </button>
            <button
              className="action-button delete-button"
              onClick={() => handleDelete(employee?._id || null)}
            >
              {activeDeleteId === employee?._id ?  <LoaderIcon /> : <Trash2 size={16} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(EmployeesList);
