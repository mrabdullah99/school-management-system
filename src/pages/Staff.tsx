import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  Filter,
  Download,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Pagination } from "../components/ui/Pagination";
import { dummyStaff, Staff as StaffType } from "../data/dummyData";

export const Staff: React.FC = () => {
  const [staff] = useState<StaffType[]>(dummyStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffType | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDesignation === "" ||
        member.designation === selectedDesignation),
  );

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStaff = filteredStaff.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const designations = [...new Set(staff.map((member) => member.designation))];

  const handleViewStaff = (member: StaffType) => {
    setSelectedStaff(member);
    setIsViewModalOpen(true);
  };

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
    }).format(salary);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">
            Manage staff members and their information
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Designations</option>
              {designations.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Staff Table */}
      <Card padding="none">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Staff Member</TableHeader>
              <TableHeader>Designation</TableHeader>
              <TableHeader>Contact</TableHeader>
              <TableHeader>Joining Date</TableHeader>
              <TableHeader>Salary</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStaff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        member.photo ||
                        `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop`
                      }
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{member.designation}</p>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{member.phone}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {member.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">
                    {new Date(member.joiningDate).toLocaleDateString()}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{formatSalary(member.salary)}</p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={member.status === "active" ? "success" : "danger"}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewStaff(member)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="danger">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredStaff.length > itemsPerPage && (
          <div className="p-6 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>

      {/* View Staff Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Staff Member Details"
        size="lg"
      >
        {selectedStaff && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={
                  selectedStaff.photo ||
                  `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`
                }
                alt={selectedStaff.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedStaff.name}
                </h3>
                <p className="text-gray-600">{selectedStaff.designation}</p>
                <Badge
                  variant={
                    selectedStaff.status === "active" ? "success" : "danger"
                  }
                >
                  {selectedStaff.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Personal Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      CNIC
                    </label>
                    <p className="text-gray-900">{selectedStaff.cnic}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Address
                    </label>
                    <p className="text-gray-900">{selectedStaff.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedStaff.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Employment Information
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Designation
                    </label>
                    <p className="text-gray-900">{selectedStaff.designation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Joining Date
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedStaff.joiningDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Salary
                    </label>
                    <p className="text-gray-900 text-lg font-semibold">
                      {formatSalary(selectedStaff.salary)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          selectedStaff.status === "active"
                            ? "success"
                            : "danger"
                        }
                      >
                        {selectedStaff.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
              <Button>Edit Staff Member</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Staff Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Staff Member"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" required />
            <Input label="Designation" required />
            <Input label="CNIC Number" required />
            <Input label="Address" required />
            <Input label="Phone Number" required />
            <Input label="Email Address" type="email" required />
            <Input label="Joining Date" type="date" required />
            <Input label="Salary" type="number" required />
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button>Add Staff Member</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
