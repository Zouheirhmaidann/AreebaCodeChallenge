export type Employee = {
  _id: string;
  full_name: string;
  email: string;
  department: string;
  position: string;
  address: string;
  phone: string;
  salary: number;
};

export type EmployeePagination = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

export type EmployeeModalTypes = {
  closeModal: () => void;
  formData?: Employee;
  setFormData: React.Dispatch<React.SetStateAction<Employee>>;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};
