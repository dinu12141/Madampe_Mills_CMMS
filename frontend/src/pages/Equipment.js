import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Settings,
  Clock,
  Wrench,
  Filter,
  Plus,
  Printer,
  FileSpreadsheet,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import EquipmentDetails from '../components/EquipmentDetails';
import NewEquipmentModal from '../components/NewEquipmentModal';
import MaintenanceCalendar from '../components/MaintenanceCalendar';
import CustomizeFieldsModal from '../components/CustomizeFieldsModal';
import { useModal } from '../context/ModalContext';

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const { isNewEquipmentModalOpen, openNewEquipmentModal, closeNewEquipmentModal } = useModal();

  // Equipment data (replace with Firebase data source)
  const equipmentData = [
    {
      id: 'AC-001-07',
      name: 'Class 8',
      description: 'International HV607',
      image: '/equipment-truck.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '650 mi', secondary: '0 hr' },
      tasks: { overdue: 1, label: 'Issue Work Orders', hasLink: true },
      inspections: { status: 'Passed', date: '12/07/2025' },
      // Extended details
      yearMakeModel: '2023 International HV607',
      serialNumber: 'FLC234723662435234',
      status: 'Active',
      location: 'Location #1',
      locationGroup: 'Fleet Equipment',
      pmTemplate: 'Class 8',
      inspection: 'DVIR Vehicle',
      purchaseDate: 'Mar 7, 2025',
      ownership: 'Owned',
      miles: 650,
      hours: 0,
      fuelVolumeUnits: 'Gallons',
      maintCost: 0,
      fuelCost: 0,
    },
    {
      id: 'C-452-75',
      name: 'Crane',
      description: 'Grove C120',
      image: '/equipment-crane.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '0 hr', secondary: null },
      tasks: null,
      inspections: null,
      yearMakeModel: '2022 Grove C120',
      serialNumber: 'GRV982374623845',
      status: 'Active',
      location: 'Location #2',
      locationGroup: 'Heavy Equipment',
      pmTemplate: 'Crane',
      inspection: 'Heavy Lift',
      purchaseDate: 'Jan 15, 2022',
      ownership: 'Leased',
      miles: 0,
      hours: 1250,
      fuelVolumeUnits: 'Gallons',
      maintCost: 2500,
      fuelCost: 800,
    },
    {
      id: 'L-007-02',
      name: 'Loader',
      description: 'John Deere 544K',
      image: '/equipment-loader.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '8,450 hr', secondary: null },
      tasks: { soon: 2, label: 'Issue Work Orders', hasLink: true, hasClock: true },
      inspections: null,
      yearMakeModel: '2020 John Deere 544K',
      serialNumber: 'JD544K2837462',
      status: 'Active',
      location: 'Location #1',
      locationGroup: 'Heavy Equipment',
      pmTemplate: 'Loader',
      inspection: 'Standard',
      purchaseDate: 'Jun 20, 2020',
      ownership: 'Owned',
      miles: 0,
      hours: 8450,
      fuelVolumeUnits: 'Gallons',
      maintCost: 5200,
      fuelCost: 3400,
    },
    {
      id: 'M-336-GN',
      name: 'Generator',
      description: 'Onan XP560',
      image: '/equipment-generator.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '878 hr', secondary: null },
      tasks: null,
      inspections: null,
      yearMakeModel: '2021 Onan XP560',
      serialNumber: 'ONAN560983746',
      status: 'Active',
      location: 'Location #3',
      locationGroup: 'Power Equipment',
      pmTemplate: 'Generator',
      inspection: 'Electrical',
      purchaseDate: 'Mar 10, 2021',
      ownership: 'Owned',
      miles: 0,
      hours: 878,
      fuelVolumeUnits: 'Gallons',
      maintCost: 350,
      fuelCost: 1200,
    },
    {
      id: 'PD-000-01',
      name: 'Police Cruiser',
      description: 'Ford Explorer',
      image: '/equipment-police.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '25,670 mi', secondary: null },
      tasks: { overdue: 2, label: 'Issue Work Orders', hasLink: true, hasClock: true },
      inspections: null,
      yearMakeModel: '2023 Ford Explorer',
      serialNumber: 'FORD23EXP98374',
      status: 'Active',
      location: 'Location #4',
      locationGroup: 'Public Safety',
      pmTemplate: 'Police Vehicle',
      inspection: 'Emergency Vehicle',
      purchaseDate: 'Feb 28, 2023',
      ownership: 'Owned',
      miles: 25670,
      hours: 0,
      fuelVolumeUnits: 'Gallons',
      maintCost: 1800,
      fuelCost: 4500,
    },
    {
      id: 'PD-000-02',
      name: 'K9 Unit SUV',
      description: 'Chevrolet Tahoe',
      image: '/equipment-suv.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '17,000 mi', secondary: null },
      tasks: null,
      inspections: null,
      yearMakeModel: '2022 Chevrolet Tahoe',
      serialNumber: 'CHEV22TAH72634',
      status: 'Active',
      location: 'Location #4',
      locationGroup: 'Public Safety',
      pmTemplate: 'K9 Vehicle',
      inspection: 'K9 Unit',
      purchaseDate: 'Sep 12, 2022',
      ownership: 'Owned',
      miles: 17000,
      hours: 0,
      fuelVolumeUnits: 'Gallons',
      maintCost: 900,
      fuelCost: 3200,
    },
    {
      id: 'PD-000-03',
      name: 'Police Cruiser',
      description: 'Ford Explorer',
      image: '/equipment-police2.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '35,900 mi', secondary: null },
      tasks: null,
      inspections: null,
      yearMakeModel: '2022 Ford Explorer',
      serialNumber: 'FORD22EXP63847',
      status: 'Active',
      location: 'Location #4',
      locationGroup: 'Public Safety',
      pmTemplate: 'Police Vehicle',
      inspection: 'Emergency Vehicle',
      purchaseDate: 'Jan 15, 2022',
      ownership: 'Owned',
      miles: 35900,
      hours: 0,
      fuelVolumeUnits: 'Gallons',
      maintCost: 2100,
      fuelCost: 5800,
    },
    {
      id: 'PW-000-04',
      name: '½ Ton Truck',
      description: 'RAM 1500',
      image: '/equipment-truck2.jpg',
      keywords: ['sample', 'fleet'],
      meters: { value: '14,232 mi', secondary: null },
      tasks: null,
      inspections: null,
      yearMakeModel: '2023 RAM 1500',
      serialNumber: 'RAM23150072634',
      status: 'Active',
      location: 'Location #2',
      locationGroup: 'Public Works',
      pmTemplate: 'Light Duty',
      inspection: 'Standard',
      purchaseDate: 'Apr 5, 2023',
      ownership: 'Owned',
      miles: 14232,
      hours: 0,
      fuelVolumeUnits: 'Gallons',
      maintCost: 450,
      fuelCost: 2800,
    },
  ];

  const toggleRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEquipmentClick = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleBackToList = () => {
    setSelectedEquipment(null);
  };

  // Status filter options
  const statusOptions = [
    { label: 'My', value: 'my' },
    { label: 'Active', value: 'active' },
    { label: 'Due', value: 'due' },
    { label: 'Work Order Assigned', value: 'work-order-assigned' },
    { type: 'separator' },
    { label: 'Parent', value: 'parent' },
    { label: 'In Shop', value: 'in-shop' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Out of Service', value: 'out-of-service' },
    { label: 'Sold', value: 'sold' },
    { label: 'Transferred', value: 'transferred' },
    { label: 'Deleted', value: 'deleted' },
    { label: 'All', value: 'all' },
  ];

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const filteredEquipment = equipmentData.filter(eq => {
    const matchesSearch =
      eq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Handle Print function - uses current page with CSS print styles
  const handlePrint = () => {
    const today = new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    // Create print content HTML
    const printHTML = `
      <div class="print-header">
        <h1>Active Equipments</h1>
      </div>
      <table class="print-table">
        <thead>
          <tr>
            <th>Equipment</th>
            <th>Keywords</th>
            <th>Meters</th>
            <th>Tasks</th>
            <th>Inspections</th>
          </tr>
        </thead>
        <tbody>
          ${filteredEquipment.map(eq => {
      const taskText = eq.tasks
        ? (eq.tasks.overdue
          ? `<span class="task-due">${eq.tasks.overdue} due</span>`
          : eq.tasks.soon
            ? `<span class="task-due-soon">${eq.tasks.soon} due soon</span>`
            : '')
        : '';
      const inspectionText = eq.inspections
        ? `<span class="inspection-ok">OK ${eq.inspections.date}</span>`
        : '';
      return `
              <tr>
                <td>
                  <span class="equipment-id">${eq.id} ${eq.name}</span><br/>
                  <span class="equipment-model">${eq.yearMakeModel}</span>
                </td>
                <td>${eq.keywords.join(', ')}</td>
                <td>${eq.meters.value}${eq.meters.secondary ? '<br/>' + eq.meters.secondary : ''}</td>
                <td>${taskText}</td>
                <td>${inspectionText}</td>
              </tr>
            `;
    }).join('')}
        </tbody>
      </table>
      <div class="print-footer">
        <span>${today} | cttechengineering.com | Powered by www.mtcproweb.com</span>
        <span>page 1 of 1</span>
      </div>
    `;

    // Create print container element
    const printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    printContainer.className = 'print-area';
    printContainer.innerHTML = printHTML;

    // Add to body
    document.body.appendChild(printContainer);

    // Print
    window.print();

    // Remove print container after printing
    document.body.removeChild(printContainer);
  };

  // Show equipment details if an equipment is selected
  if (selectedEquipment) {
    return (
      <EquipmentDetails
        equipment={selectedEquipment}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Equipment <span className="text-gray-400 font-normal">{filteredEquipment.length}</span>
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Filter Icon */}
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
            <Filter className="w-4 h-4" />
          </button>

          {/* Active/Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50"
            >
              {statusFilter}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {statusDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-1">
                {statusOptions.map((option, index) => (
                  option.type === 'separator' ? (
                    <div key={index} className="border-t border-gray-200 my-1" />
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        setStatusFilter(option.label);
                        setStatusDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {option.label}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>

          {/* All Locations Dropdown */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            {locationFilter}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Filter: None Dropdown */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50">
            Filter: None
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

          {/* New Button - Direct Open */}
          <Button
            onClick={() => openNewEquipmentModal()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-9 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New
          </Button>

          {/* Menu Icon with Dropdown */}
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
                {/* Backdrop to close menu when clicking outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-2">
                  <button
                    onClick={() => {
                      handlePrint();
                      setMenuDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Printer className="w-4 h-4 text-gray-400" />
                    Print
                  </button>
                  <button
                    onClick={() => {
                      // Export to CSV logic
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
                      // View Calendar logic
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
                      // Customize logic
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
                      // Help logic
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

      {/* Equipment Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_40px_1fr_120px_100px_180px_140px_80px] items-center px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
          <div className="flex items-center justify-center">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          </div>
          <div></div>
          <div className="flex items-center gap-1">
            Equipment
            <ChevronDown className="w-3 h-3" />
          </div>
          <div>Keywords</div>
          <div>Meters</div>
          <div>Tasks</div>
          <div>Inspections</div>
          <div>Actions</div>
        </div>

        {/* Table Rows */}
        {filteredEquipment.map((eq) => (
          <div
            key={eq.id}
            className="grid grid-cols-[40px_40px_1fr_120px_100px_180px_140px_80px] items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleEquipmentClick(eq)}
          >
            {/* Checkbox */}
            <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
            </div>

            {/* Expand Arrow */}
            <div className="flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRow(eq.id);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                {expandedRows[eq.id] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Equipment Info */}
            <div className="flex items-center gap-3">
              {/* Image */}
              <div className="w-12 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                <Wrench className="w-full h-full p-2 text-gray-400" />
              </div>
              {/* Name and Description */}
              <div>
                <p className="text-sm font-medium text-gray-900">{eq.id} {eq.name}</p>
                <p className="text-xs text-gray-500">{eq.description}</p>
              </div>
            </div>

            {/* Keywords */}
            <div className="flex gap-1">
              {eq.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded border border-gray-200"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* Meters */}
            <div className="text-sm text-gray-600">
              <p>{eq.meters.value}</p>
              {eq.meters.secondary && (
                <p className="text-xs text-gray-400">{eq.meters.secondary}</p>
              )}
            </div>

            {/* Tasks */}
            <div>
              {eq.tasks ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {eq.tasks.overdue && (
                      <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded">
                        {eq.tasks.overdue} Overdue
                      </span>
                    )}
                    {eq.tasks.soon && (
                      <span className="px-2 py-0.5 text-xs bg-yellow-500 text-white rounded flex items-center gap-1">
                        {eq.tasks.soon} Soon
                        {eq.tasks.hasClock && <Clock className="w-3 h-3" />}
                      </span>
                    )}
                    {eq.tasks.hasLink && <Wrench className="w-3 h-3 text-gray-400" />}
                  </div>
                  <a href="#" className="text-xs text-blue-500 hover:underline" onClick={(e) => e.stopPropagation()}>
                    {eq.tasks.label}
                  </a>
                </div>
              ) : (
                <span className="text-gray-300">-</span>
              )}
            </div>

            {/* Inspections */}
            <div>
              {eq.inspections ? (
                <div className="flex flex-col gap-0.5">
                  <span className="px-2 py-0.5 text-xs bg-green-500 text-white rounded w-fit">
                    {eq.inspections.status}
                  </span>
                  <span className="text-xs text-gray-500">{eq.inspections.date}</span>
                </div>
              ) : (
                <span className="text-gray-300">-</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Equipment Modal */}
      <NewEquipmentModal
        isOpen={isNewEquipmentModalOpen}
        onClose={() => closeNewEquipmentModal()}
        onSave={(data) => {
          console.log('New equipment data:', data);
          // Firebase submission logic would go here
        }}
      />

      {/* Maintenance Calendar Sidebar */}
      <MaintenanceCalendar
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        equipmentData={filteredEquipment}
      />

      {/* Customize Fields Modal */}
      <CustomizeFieldsModal
        isOpen={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        onSave={(settings) => {
          console.log('Saved customization settings:', settings);
          // Apply settings logic would go here
        }}
      />
    </div>
  );
};

export default Equipment;
