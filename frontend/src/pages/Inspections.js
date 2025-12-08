import React, { useState } from 'react';
import {
    Search,
    ChevronDown,
    Printer,
    FileSpreadsheet,
    Calendar,
    Settings,
    HelpCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import MaintenanceCalendar from '../components/MaintenanceCalendar';
import CustomizeFieldsModal from '../components/CustomizeFieldsModal';
import NewInspectionModal from '../components/NewInspectionModal';
import { useModal } from '../context/ModalContext';

const Inspections = () => {
    const { isNewInspectionModalOpen, openNewInspectionModal, closeNewInspectionModal } = useModal();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [locationFilter, setLocationFilter] = useState('All Locations');
    const [filterNone, setFilterNone] = useState('Filter: None');
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [customizeOpen, setCustomizeOpen] = useState(false);

    // Inspections data
    const inspectionsData = [
        {
            id: 1,
            date: 'Dec 7, 2025',
            equipmentId: 'T-350-4',
            equipmentName: 'Pickup',
            equipmentModel: 'Ford F350',
            equipmentImage: '/images/equipment/pickup.jpg',
            status: 'Passed',
            user: 'Brad Cooke',
        },
        {
            id: 2,
            date: 'Dec 7, 2025',
            equipmentId: 'AC-001-07',
            equipmentName: 'Class 8',
            equipmentModel: 'International HV607',
            equipmentImage: '/images/equipment/truck.jpg',
            status: 'Passed',
            user: 'Brad Cooke',
        },
        {
            id: 3,
            date: 'Dec 4, 2025',
            equipmentId: 'R-531-001',
            equipmentName: '50 Ton Air Ride Paver Chassis',
            equipmentModel: 'Kaufman Lowboy',
            equipmentImage: '/images/equipment/paver.jpg',
            status: 'Passed',
            user: 'Brad Cooke',
        },
        {
            id: 4,
            date: 'Oct 25, 2025',
            equipmentId: 'R-531-001',
            equipmentName: '50 Ton Air Ride Paver Chassis',
            equipmentModel: 'Kaufman Lowboy',
            equipmentImage: '/images/equipment/paver.jpg',
            status: 'Passed',
            user: 'Brad Cooke',
        },
    ];

    // Filter inspections based on search term
    const filteredInspections = inspectionsData.filter(inspection => {
        const searchLower = searchTerm.toLowerCase();
        return (
            inspection.equipmentId.toLowerCase().includes(searchLower) ||
            inspection.equipmentName.toLowerCase().includes(searchLower) ||
            inspection.user.toLowerCase().includes(searchLower) ||
            inspection.date.toLowerCase().includes(searchLower)
        );
    });

    const getStatusBadge = (status) => {
        if (status === 'Passed') {
            return (
                <span className="px-3 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                    Passed
                </span>
            );
        }
        if (status === 'Failed') {
            return (
                <span className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                    Failed
                </span>
            );
        }
        return (
            <span className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded-full">
                Pending
            </span>
        );
    };

    // Handle print for inspections
    const handlePrint = () => {
        const today = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const printHTML = `
      <div class="print-header">
        <h1>Inspections</h1>
        <p>Generated on ${today}</p>
      </div>
      <table class="print-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Equipment</th>
            <th>Status</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          ${filteredInspections.map(inspection => `
            <tr>
              <td>${inspection.date}</td>
              <td>${inspection.equipmentId} ${inspection.equipmentName}</td>
              <td>${inspection.status}</td>
              <td>${inspection.user}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="print-footer">
        <p>Total: ${filteredInspections.length} inspections</p>
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

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium text-gray-800">
                    Inspections <span className="text-gray-400 text-lg">{filteredInspections.length}</span>
                </h1>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Status Dropdown */}
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                        {statusFilter}
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {/* Location Dropdown */}
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
                        onClick={openNewInspectionModal}
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

            {/* Inspections Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[40px_120px_1fr_100px_150px] items-center px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
                    <div className="flex items-center justify-center">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    </div>
                    <div className="flex items-center gap-1">
                        Date
                        <ChevronDown className="w-3 h-3" />
                    </div>
                    <div>Equipment</div>
                    <div>Status</div>
                    <div>Users</div>
                </div>

                {/* Table Rows */}
                {filteredInspections.map((inspection) => (
                    <div
                        key={inspection.id}
                        className="grid grid-cols-[40px_120px_1fr_100px_150px] items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        {/* Checkbox */}
                        <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                        </div>

                        {/* Date */}
                        <div className="text-sm text-gray-700">
                            {inspection.date}
                        </div>

                        {/* Equipment */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                <img
                                    src={inspection.equipmentImage}
                                    alt={inspection.equipmentName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <div className="text-sm">
                                    <span className="text-blue-500 font-medium">{inspection.equipmentId}</span>
                                    <span className="text-gray-700 ml-1">{inspection.equipmentName}</span>
                                </div>
                                <div className="text-xs text-gray-400">{inspection.equipmentModel}</div>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            {getStatusBadge(inspection.status)}
                        </div>

                        {/* Users */}
                        <div className="text-sm text-blue-500">
                            {inspection.user}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                    <span className="text-blue-500">Showing 1 to {filteredInspections.length} of {filteredInspections.length} entries</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                        Previous
                    </button>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded">1</span>
                    <button className="px-3 py-1 text-gray-400 hover:text-gray-600 disabled:opacity-50" disabled>
                        Next
                    </button>
                </div>
            </div>

            {/* Maintenance Calendar Sidebar */}
            <MaintenanceCalendar
                isOpen={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                equipmentData={filteredInspections}
            />

            {/* Customize Fields Modal */}
            <CustomizeFieldsModal
                isOpen={customizeOpen}
                onClose={() => setCustomizeOpen(false)}
                onSave={(settings) => {
                    console.log('Saved customization settings:', settings);
                }}
            />

            {/* New Inspection Modal */}
            <NewInspectionModal
                isOpen={isNewInspectionModalOpen}
                onClose={closeNewInspectionModal}
                onSave={(data) => {
                    console.log('New inspection data:', data);
                }}
            />
        </div>
    );
};

export default Inspections;
