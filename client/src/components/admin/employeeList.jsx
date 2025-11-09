import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees,exportEmployees,changeEmployeePassword  } from "@/features/employees/employeeSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";

import { MoreVertical, Search, Download } from "lucide-react";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { data: employees, status, error,exportStatus  } = useSelector(
    (state) => state.employees
  );

  // 🔍 Search and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  // 🔁 Fetch employees on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  // 🔍 Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      Object.values(emp)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 📤 Export CSV function
  const handleExport = () => {
   dispatch(exportEmployees());
  };

  // 🧠 UI Conditions
  if (status === "loading") return <p className="p-6">Loading employees...</p>;
  if (status === "failed")
    return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Employee List</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center justify-end">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Export CSV Button */}
          <Button
            onClick={handleExport}
            disabled={exportStatus === "loading"}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {exportStatus === "loading" ? "Exporting..." : "Export Employees"}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border shadow-sm bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Activity Count</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell>{emp.user?.username}</TableCell>
                  <TableCell>{emp.user?.email}</TableCell>
                  <TableCell>{emp.designation}</TableCell>
                  <TableCell>{emp.activities_count}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem
                          onClick={() =>
                            alert(`View history for ${emp.name}`)
                          }
                        >
                          View History
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setIsModalOpen(true);
                          }}
                        >
                          Change Password
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="7"
                  className="text-center py-6 text-muted-foreground"
                >
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      

      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

        {/* Modal OUTSIDE the table */}
<Dialog.Root>
    <Dialog.Trigger asChild>
      <button>Open Dialog</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Description>This is a description of the dialog content.</Dialog.Description>
        <Dialog.Close asChild>
          <button>Close</button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
    </div>
  );
};

export default EmployeeList;
