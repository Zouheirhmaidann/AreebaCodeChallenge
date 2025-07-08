"use client";

import AxiosInstance from "@/lib/AxiosInstance";
import { Employee, EmployeeModalTypes } from "@/types/employees.type";
import { AxiosError } from "axios";
import { Save, X } from "lucide-react";
import { memo, useCallback, useState } from "react";
import toast from "react-hot-toast";

/**
 * EmployeeModal component
 *
 * This component renders a modal for creating or editing an employee.
 * It handles form data changes and submission to save employee details.
 * It includes fields for full name, email, department, position, salary, phone, and address.
 * The modal can be closed using the "Cancel" button or the close icon.
 *
 * Props:
 * - closeModal: A function to close the modal.
 * - formData: An object containing the current form data for the employee.
 * - setFormData: A function to update the form data state.
 * - setEmployees: A function to update the list of employees.
 */

const EmployeeModal = ({
  closeModal,
  formData,
  setFormData,
  setEmployees,
}: EmployeeModalTypes) => {
  // State to show the loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Function to hanfle data change
  const onChangeData = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      // Destruct the values
      const { name, value } = e.target;
      // if name is empty return
      if (!name) return;
      // Update the form data
      setFormData((prevFormData) => {
        const updated = {
          ...(prevFormData || {}),
          [name]: name === "salary" ? Number(value) : value,
        };
        return updated as Employee;
      });
    },
    [setFormData]
  );
  // function to submit the form
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    try {
      //stop the form from submitting
      e.preventDefault();
      // Set loading state
      setIsLoading(true);
      // Submit the form
      await AxiosInstance.post(`/employees/upsertEmployee`, formData);
      // Update the employees
      if(formData?._id) {
        setEmployees((prevState: Employee[]) =>
        prevState.map((employee) =>
          employee._id === formData?._id ? { ...employee, ...formData } : employee
        )
      );
      } else {
        setEmployees((prevState: Employee[]) => [...prevState, formData as Employee]);
      }
      toast.success("Employee saved successfully");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      closeModal(formData?._id ? false : true);
    }
  }, [formData, closeModal, setEmployees]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {formData?._id ? `Edit ${formData?.full_name}` : "Add New Employee"}
          </h2>
          <button className="close-button" onClick={() => closeModal(false)}>
            <X size={24} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                id="full_name"
                type="text"
                value={formData?.full_name}
                name="full_name"
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData?.email}
                onChange={onChangeData}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Department</label>
              <input
                id="department"
                type="text"
                name="department"
                value={formData?.department}
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                id="position"
                type="text"
                name="position"
                value={formData?.position}
                onChange={onChangeData}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                id="salary"
                type="number"
                name="salary"
                value={formData?.salary}
                onChange={onChangeData}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="number"
                name="phone"
                value={formData?.phone}
                onChange={onChangeData}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData?.address}
              onChange={onChangeData}
              required
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`save-button ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <Save size={20} />
                  {formData?._id ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(EmployeeModal);
