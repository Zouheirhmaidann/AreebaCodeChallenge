"use client";

import { Search } from "lucide-react";
import { memo } from "react";

/**
 * EmployeeSearchFilter component
 *
 * This component renders a search input for filtering employees by
 * name, email, department, position, phone, or address.
 *
 * Props:
 * - search: The current search query.
 * - setSearch: A function to update the search query state.
 *
 * Returns:
 * - A JSX element representing the search input section.
 */
const EmployeeSearchFilter = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="search-section">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search employees by name, email, department, position, phone, or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(EmployeeSearchFilter);
