import React, { useState } from 'react';
import {
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Plus,
  Printer,
  Settings,
  Pencil,
  MoreVertical,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import NewEmployeeModal from '../components/NewEmployeeModal';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [sortColumn, setSortColumn] = useState('employeeNumber');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);

  // Sample employees data matching the image
  const employeesData = [
    {
      id: 1,
      employeeNumber: '139',
      name: 'Little, James',
      type: 'Manager',
      driversLicense: '99886740',
      contact: {
        email: 'jlittle@456.com',
        homePhone: '444-444-4444',
        cellPhone: '555-555-5555',
      },
      location: 'Main Office',
      status: 'Active',
    },
    {
      id: 2,
      employeeNumber: '330',
      name: 'Daniels, Roger',
      type: 'Technician',
      driversLicense: '88760098764',
      contact: {
        email: 'roger@a.com',
        homePhone: '555-555-5555',
        cellPhone: '23-45645-4564',
      },
      location: 'Workshop',
      status: 'Active',
    },
    {
      id: 3,
      employeeNumber: '423',
      name: 'Boyce, Robert',
      type: 'Technician',
      driversLicense: '432267867',
      contact: {
        email: 'rob@123.com',
        homePhone: null,
        cellPhone: '897-999-9987',
      },
      location: 'Field',
      status: 'Active',
    },
  ];

  // Filter employees
  const filteredEmployees = employeesData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeNumber.includes(searchTerm) ||
      emp.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.contact.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    const matchesLocation = locationFilter === 'All Locations' || emp.location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aVal, bVal;
    if (sortColumn === 'employeeNumber') {
      aVal = parseInt(a.employeeNumber);
      bVal = parseInt(b.employeeNumber);
    } else if (sortColumn === 'name') {
      aVal = a.name;
      bVal = b.name;
    } else if (sortColumn === 'type') {
      aVal = a.type;
      bVal = b.type;
    }

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows({});
    } else {
      const allSelected = {};
      sortedEmployees.forEach((emp) => {
        allSelected[emp.id] = true;
      });
      setSelectedRows(allSelected);
    }
    setSelectAll(!selectAll);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsNewEmployeeModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-9"
          >
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right side filters and icons */}
        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none h-9 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="All">All</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none h-9 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All Locations">All Locations</option>
              <option value="Main Office">Main Office</option>
              <option value="Workshop">Workshop</option>
              <option value="Field">Field</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Print Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
            <Printer className="w-5 h-5" />
          </button>

          {/* Settings Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_40px_100px_180px_120px_150px_1fr_100px] items-center px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
          <div>{/* Expand */}</div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded border-gray-300"
            />
          </div>
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('employeeNumber')}
          >
            Employee #
            {sortColumn === 'employeeNumber' && (
              sortDirection === 'asc' ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )
            )}
          </div>
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('name')}
          >
            Name
            {sortColumn === 'name' && (
              sortDirection === 'asc' ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )
            )}
          </div>
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
            onClick={() => handleSort('type')}
          >
            Type
            {sortColumn === 'type' && (
              sortDirection === 'asc' ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )
            )}
          </div>
          <div>Drivers License #</div>
          <div>Contact</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        {sortedEmployees.map((employee) => (
          <div key={employee.id}>
            {/* Main Row */}
            <div className="grid grid-cols-[40px_40px_100px_180px_120px_150px_1fr_100px] items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              {/* Expand Button */}
              <div>
                <button
                  onClick={() => toggleRow(employee.id)}
                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-300 rounded"
                >
                  {expandedRows[employee.id] ? (
                    <span className="text-xs font-bold">−</span>
                  ) : (
                    <Plus className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Checkbox */}
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedRows[employee.id] || false}
                  onChange={() => toggleRowSelection(employee.id)}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </div>

              {/* Employee Number */}
              <div className="text-sm text-blue-600 font-medium">
                {employee.employeeNumber}
              </div>

              {/* Name */}
              <div className="text-sm text-gray-700">{employee.name}</div>

              {/* Type */}
              <div className="text-sm text-gray-700">{employee.type}</div>

              {/* Drivers License */}
              <div className="text-sm text-gray-700">{employee.driversLicense}</div>

              {/* Contact */}
              <div className="text-sm">
                <a href={`mailto:${employee.contact.email}`} className="text-blue-600 hover:underline">
                  {employee.contact.email}
                </a>
                <div className="text-gray-600">
                  {employee.contact.homePhone && (
                    <span>{employee.contact.homePhone} (H)</span>
                  )}
                  {employee.contact.homePhone && employee.contact.cellPhone && <br />}
                  {employee.contact.cellPhone && (
                    <span>{employee.contact.cellPhone} (C)</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Row Content */}
            {expandedRows[employee.id] && (
              <div className="px-4 py-4 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-600">{employee.location}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 ${employee.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                      {employee.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Full Contact:</span>
                    <div className="ml-2 text-gray-600">
                      <div>{employee.contact.email}</div>
                      {employee.contact.homePhone && <div>Home: {employee.contact.homePhone}</div>}
                      {employee.contact.cellPhone && <div>Cell: {employee.contact.cellPhone}</div>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {sortedEmployees.length === 0 && (
          <div className="px-4 py-12 text-center text-gray-500">
            No employees found matching your search criteria.
          </div>
        )}
      </div>

      {/* New Employee Modal */}
      <NewEmployeeModal
        isOpen={isNewEmployeeModalOpen}
        onClose={() => setIsNewEmployeeModalOpen(false)}
        onSave={(data) => {
          console.log('New employee data:', data);
          // Add employee logic would go here
        }}
      />
    </div>
  );
};

export default Employees;
