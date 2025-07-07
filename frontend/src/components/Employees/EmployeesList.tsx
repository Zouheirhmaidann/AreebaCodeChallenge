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

const EmployeesList: React.FC<{
  employees: Employee[];
  openModal: (employee?: Employee) => void;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}> = ({ employees, openModal, setEmployees }) => {
  // State to show the loading indicator
  const [loading, setLoading] = useState<Boolean>(false);
  // Function to delete employee
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      if (window.confirm("Are you sure you want to delete this employee?")) {
        await AxiosInstance.delete(`/employees/deleteEmployee/${id}`);
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        toast.success("Employee deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting employee");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="employee-grid">
      {employees.map((employee, index) => (
        <div
          key={employee._id}
          className="employee-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="employee-info">
            <div className="employee-name">
              <h3>{employee.full_name}</h3>
              <span className="employee-position">{employee.position}</span>
            </div>

            <div className="employee-details">
              <div className="detail-item">
                <Mail size={16} />
                <span>{employee.email}</span>
              </div>
              <div className="detail-item">
                <Phone size={16} />
                <span>{employee.phone}</span>
              </div>
              <div className="detail-item">
                <Building size={16} />
                <span>{employee.department}</span>
              </div>
              <div className="detail-item">
                <DollarSign size={16} />
                <span>{employee.salary}</span>
              </div>
              <div className="detail-item">
                <MapPin size={16} />
                <span>{employee.address}</span>
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
              onClick={() => handleDelete(employee?._id)}
            >
              {loading ? <LoaderIcon /> : <Trash2 size={16} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(EmployeesList);
