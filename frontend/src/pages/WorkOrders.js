import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  Wrench,
  Plus,
  Printer,
  FileSpreadsheet,
  Calendar,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import WorkOrderDetails from '../components/WorkOrderDetails';
import NewWorkOrderModal from '../components/NewWorkOrderModal';
import MaintenanceCalendar from '../components/MaintenanceCalendar';
import CustomizeFieldsModal from '../components/CustomizeFieldsModal';
import { useModal } from '../context/ModalContext';

const WorkOrders = () => {
  const { isNewWorkOrderModalOpen, openNewWorkOrderModal, closeNewWorkOrderModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [filterNone, setFilterNone] = useState('Filter: None');
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  // Work orders data
  const workOrdersData = [
    {
      number: 1004,
      equipmentId: 'PD-000-01',
      equipmentName: 'Police Cruiser',
      equipmentModel: 'Ford Explorer',
      image: '/equipment-police.jpg',
      assignees: [],
      scheduled: null,
      status: 'Open',
      tasks: 1,
      progress: 30,
    },
    {
      number: 1003,
      equipmentId: 'T-350-4',
      equipmentName: 'Pickup',
      equipmentModel: 'Ford F350',
      image: '/equipment-truck.jpg',
      assignees: [],
      scheduled: null,
      status: 'Closed',
      tasks: 1,
      progress: 100,
    },
    {
      number: 1002,
      equipmentId: 'T-350-4',
      equipmentName: 'Pickup',
      equipmentModel: 'Ford F350',
      image: '/equipment-truck.jpg',
      assignees: [],
      scheduled: null,
      status: 'Open',
      tasks: 1,
      progress: 30,
    },
    {
      number: 1001,
      equipmentId: 'R-531-001',
      equipmentName: '50 Ton Air Ride Paver Chassis',
      equipmentModel: 'Kaufman Lowboy',
      image: '/equipment-paver.jpg',
      assignees: [],
      scheduled: null,
      status: 'Closed',
      tasks: 1,
      progress: 100,
    },
    {
      number: 1000,
      equipmentId: 'T-350-4',
      equipmentName: 'Pickup',
      equipmentModel: 'Ford F350',
      image: '/equipment-truck.jpg',
      assignees: [],
      scheduled: null,
      status: 'Closed',
      tasks: 2,
      progress: 100,
    },
  ];

  const filteredWorkOrders = workOrdersData.filter(wo => {
    const matchesSearch =
      wo.number.toString().includes(searchTerm.toLowerCase()) ||
      wo.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.equipmentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status) => {
    if (status === 'Open') {
      return (
        <span className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
          Open
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
        Closed
      </span>
    );
  };

  const getProgressBar = (progress, tasks) => {
    const isComplete = progress === 100;
    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">{tasks} task{tasks > 1 ? 's' : ''}</span>
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-yellow-400'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  // Handle print for work orders
  const handlePrint = () => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const printHTML = `
      <div class="print-header">
        <h1>Work Orders</h1>
        <p>Generated on ${today}</p>
      </div>
      <table class="print-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Equipment</th>
            <th>Status</th>
            <th>Tasks</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          ${filteredWorkOrders.map(wo => `
            <tr>
              <td>${wo.number}</td>
              <td>${wo.equipmentId} ${wo.equipmentName}</td>
              <td>${wo.status}</td>
              <td>${wo.tasks} task${wo.tasks > 1 ? 's' : ''}</td>
              <td>${wo.progress}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="print-footer">
        <p>Total: ${filteredWorkOrders.length} work orders</p>
      </div>
    `;

    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    printContainer.className = 'print-area';
    printContainer.innerHTML = printHTML;

    document.body.appendChild(printContainer);
    window.print();
    document.body.removeChild(printContainer);
    setMenuDropdownOpen(false);
  };

  // Show work order details if a work order is selected
  if (selectedWorkOrder) {
    return (
      <WorkOrderDetails
        workOrder={selectedWorkOrder}
        onBack={() => setSelectedWorkOrder(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Work Orders <span className="text-gray-400 font-normal">{filteredWorkOrders.length}</span>
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* All Dropdown */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            {statusFilter}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* All Locations Dropdown */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            {locationFilter}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Filter: None Dropdown */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            {filterNone}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 h-9 pl-9 pr-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* New Button */}
          <Button
            onClick={openNewWorkOrderModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-9"
          >
            New
          </Button>

          {/* Menu Icon */}
          <div className="relative">
            <button
              onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {menuDropdownOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuDropdownOpen(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Printer className="w-4 h-4 text-gray-400" />
                    Print
                  </button>
                  <button
                    onClick={() => {
                      console.log('Export to CSV clicked');
                      setMenuDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-gray-400" />
                    Export to CSV
                  </button>
                  <button
                    onClick={() => {
                      setCalendarOpen(true);
                      setMenuDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Calendar className="w-4 h-4 text-gray-400" />
                    View Calendar
                  </button>
                  <button
                    onClick={() => {
                      setCustomizeOpen(true);
                      setMenuDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    Customize
                  </button>
                  <button
                    onClick={() => {
                      console.log('Help clicked');
                      setMenuDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    Help
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_80px_1fr_120px_120px_100px_150px] items-center px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
          <div className="flex items-center justify-center">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          </div>
          <div className="flex items-center gap-1">
            Number
            <ChevronDown className="w-3 h-3" />
          </div>
          <div>Equipment</div>
          <div>Assignees</div>
          <div>Scheduled</div>
          <div>Status</div>
          <div>Progress</div>
        </div>

        {/* Table Rows */}
        {filteredWorkOrders.map((wo) => (
          <div
            key={wo.number}
            className="grid grid-cols-[40px_80px_1fr_120px_120px_100px_150px] items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setSelectedWorkOrder(wo)}
          >
            {/* Checkbox */}
            <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
            </div>

            {/* Number */}
            <div className="text-sm text-gray-700">
              {wo.number}
            </div>

            {/* Equipment Info */}
            <div className="flex items-center gap-3">
              {/* Image */}
              <div className="w-14 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <Wrench className="w-full h-full p-2 text-gray-400" />
              </div>
              {/* Name and Model */}
              <div>
                <p className="text-sm font-medium text-blue-600">{wo.equipmentId} {wo.equipmentName}</p>
                <p className="text-xs text-gray-500">{wo.equipmentModel}</p>
              </div>
            </div>

            {/* Assignees */}
            <div className="text-sm text-gray-500">
              {wo.assignees.length > 0 ? wo.assignees.join(', ') : '-'}
            </div>

            {/* Scheduled */}
            <div className="text-sm text-gray-500">
              {wo.scheduled || '-'}
            </div>

            {/* Status */}
            <div>
              {getStatusBadge(wo.status)}
            </div>

            {/* Progress */}
            <div>
              {getProgressBar(wo.progress, wo.tasks)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <span className="text-blue-500">Showing 1 to {filteredWorkOrders.length} of {filteredWorkOrders.length} entries</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
            Previous
          </button>
          <span className="text-gray-300">|</span>
          <button className="px-3 py-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>

      {/* New Work Order Modal */}
      <NewWorkOrderModal
        isOpen={isNewWorkOrderModalOpen}
        onClose={closeNewWorkOrderModal}
        onSave={(data) => {
          console.log('New work order data:', data);
          // Add work order logic would go here
        }}
      />

      {/* Maintenance Calendar Sidebar */}
      <MaintenanceCalendar
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        equipmentData={filteredWorkOrders}
      />

      {/* Customize Fields Modal */}
      <CustomizeFieldsModal
        isOpen={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        onSave={(settings) => {
          console.log('Saved customization settings:', settings);
        }}
      />
    </div>
  );
};

export default WorkOrders;
