"use client";

import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import EmployeeHeader from "@/components/Employees/EmployeeHeader";
import "@/styles/components/employees.scss";
import EmployeesList from "@/components/Employees/EmployeesList";
import AxiosInstance from "@/lib/AxiosInstance";
import toast, { LoaderIcon } from "react-hot-toast";
import { AxiosError } from "axios";
import { Employee } from "@/types/employees.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EmployeesPagination from "@/components/Employees/EmployeesPagination";
import EmployeeModal from "@/components/Employees/EmployeeModal";
import EmployeeSearchFilter from "@/components/Employees/EmployeeSearchFilter";
import useDebounce from "@/hooks/debounce";

export default function EmployeesWindow() {
  // state to hold the employees data
  const [employees, setEmployees] = useState<Employee[]>([]);
  // State to show the loading indicator
  const [loading, setLoading] = useState(true);
  // state to hold the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // State to hold the total number of pages to be displayed
  const [totalPages, setTotalPages] = useState(0);
  // State to open the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state to store the form data
  const [formData, setFormData] = useState({});
  // state to hold the search query
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  // use router
  const router = useRouter();
  // function to fetch the employees
  const fetchEmployees = useCallback(
    async (page: number = 1, search: string | null = null) => {
      try {
        setLoading(true);
        // call the api
        const { data: response } = await AxiosInstance.get(
          `/employees/getEmployees?page=${page}&limit=4` +
            (search ? `&search=${search}` : "")
        );
        // Check if the response is null
        if (!response?.data) throw Error;
        console.log(response);
        setEmployees(response.data);
        setTotalPages(Math.ceil(response.total / 4));
        setCurrentPage(page);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  // useEffect to fetch the employees
  useEffect(() => {
    fetchEmployees();
  }, []);
  // function to open the modal
  const openModal = useCallback((employee?: Employee) => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({});
    }
    // Check if the user is logged in
    setIsModalOpen(true);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      fetchEmployees(page);
    },
    [fetchEmployees]
  );

  // useEffect to search for employees
  useEffect(() => {
    fetchEmployees(1, debouncedSearch);
  }, [debouncedSearch, fetchEmployees]);

  return (
    <div>
      <EmployeeHeader openModal={openModal} />
      <EmployeeSearchFilter search={search} setSearch={setSearch} />
      {loading ? (
        <div className="loader-container">
          <LoaderIcon style={{ width: "100px", height: "100px" }} />
        </div>
      ) : employees.length > 0 && !loading ? (
        <EmployeesList
          employees={employees}
          openModal={openModal}
          setEmployees={setEmployees}
        />
      ) : (
        <div className="empty-state">
          No employees found, try adjusting your search
        </div>
      )}
      <EmployeesPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      {isModalOpen && (
        <EmployeeModal
          closeModal={() => setIsModalOpen(false)}
          formData={formData as Employee}
          setFormData={setFormData}
          setEmployees={setEmployees}
        />
      )}
    </div>
  );
}
