"use client";

import { EmployeePagination } from "@/types/employees.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

/**
 * EmployeesPagination component
 *
 * This component renders a pagination section for the Employee Management page.
 * It renders a left chevron button to navigate to the previous page,
 * buttons for each page number, and a right chevron button to navigate to the next page.
 * The current page is highlighted with the "active" class name.
 *
 * Props:
 * - totalPages: The total number of pages.
 * - currentPage: The current page number.
 * - handlePageChange: A function to update the current page number.
 */
const EmployeesPagination = ({
  totalPages,
  currentPage,
  handlePageChange,
}: EmployeePagination) => {
  return (
    totalPages > 1 && (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    )
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(EmployeesPagination);
