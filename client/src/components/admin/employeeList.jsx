import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchEmployees,
  exportEmployees,
  changeEmployeePassword,
  openPasswordModal,
  closePasswordModal
} from "@/features/employees/employeeSlice";

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

import { MoreVertical, Search, Download } from "lucide-react";
import CommonDialog from "@/components/dialog/CommonDialog";
import { useTranslation } from "react-i18next";

const EmployeeList = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
const isRTL = i18n.language === "ar";

  const { data: employees, status, error,exportStatus, isModalOpen,
    selectedEmployee,
    passwordStatus,
    passwordMessage } = useSelector(
    (state) => state.employees
  );

  // 🔍 Search and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const itemsPerPage = 8;

  // 🔁 Fetch employees on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmployees());
    }
  }, [dispatch, status]);

  useEffect(() => {
  document.body.dir = isRTL ? "rtl" : "ltr";
}, [isRTL]);

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

  const handleSubmitPassword = () => {
    if (!newPassword.trim()) return;
    dispatch(
      changeEmployeePassword({
        employeeId: selectedEmployee.id,
        newPassword,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setNewPassword("");
        setTimeout(() => dispatch(closePasswordModal()), 1000);
      }
    });
  };

  // 🧠 UI Conditions
  if (status === "loading") return <p className="p-6">Loading employees...</p>;
  if (status === "failed")
    return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">{t("employee_list.page_title")}</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center justify-end">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("employee_list.search_placeholder")}
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
            {exportStatus === "loading"
    ? t("employee_list.exporting")
    : t("employee_list.export_button")}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border shadow-sm bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("employee_list.table.id")}</TableHead>
              <TableHead>{t("employee_list.table.name")}</TableHead>
              <TableHead>{t("employee_list.table.username")}</TableHead>
              <TableHead>{t("employee_list.table.email")}</TableHead>
              <TableHead>{t("employee_list.table.designation")}</TableHead>
              <TableHead>{t("employee_list.table.activity")}</TableHead>
              <TableHead className="text-right">
                {t("employee_list.table.actions")}
              </TableHead>
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
                          onClick={() => dispatch(openPasswordModal(emp))}
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
                {t("employee_list.table.no_employees")}
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
             {t("employee_list.pagination.page")} {currentPage} {t("employee_list.pagination.of")} {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              {t("employee_list.pagination.previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              {t("employee_list.pagination.next")}
            </Button>
          </div>
        </div>
      )}

        {/* Password Change Modal */}
        <CommonDialog
          open={isModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              setNewPassword("");
              dispatch(closePasswordModal());
            }
          }}
          title={`${t("employee_list.modal.title")} ${selectedEmployee?.name || ""}`}
          description={t("employee_list.modal.description")}
          footer={
            <>
              <Button variant="outline" onClick={() => dispatch(closePasswordModal())}>
              {t("employee_list.modal.cancel")}
              </Button>
              <Button
                onClick={handleSubmitPassword}
                disabled={passwordStatus === "loading"}
              >
                {passwordStatus === "loading"
                    ? t("employee_list.modal.saving")
                    : t("employee_list.modal.change")}
              </Button>
            </>
          }
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium">{t("employee_list.modal.new_password")}</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              placeholder={t("employee_list.modal.placeholder")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordMessage && (
              <p
                className={`text-sm ${
                  passwordStatus === "failed" ? "text-red-500" : "text-green-600"
                }`}
              >
                {passwordMessage}
              </p>
            )}
          </div>
        </CommonDialog>
    </div>
  );
};

export default EmployeeList;
