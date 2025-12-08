import React, { useState } from 'react';
import { Search, ChevronDown, Menu, ChevronLeft, ChevronRight, Printer, FileSpreadsheet, Settings, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import NewPurchaseOrderModal from '../components/NewPurchaseOrderModal';
import { useModal } from '../context/ModalContext';

const PurchaseOrders = () => {
  const { isNewPurchaseOrderModalOpen, openNewPurchaseOrderModal, closeNewPurchaseOrderModal } = useModal();
  const [statusFilter, setStatusFilter] = useState('Incomplete');
  const [warehouseFilter, setWarehouseFilter] = useState('All Warehouses');
  const [additionalFilter, setAdditionalFilter] = useState('None');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  // Mock purchase orders data
  const purchaseOrdersData = [
    {
      id: 1,
      number: '1000',
      created: '12/07/2025',
      required: '12/07/2025',
      invoice: '',
      vendor: 'Davis Plumbing',
      warehouse: 'Warehouse #2',
      status: 'Requisition',
    },
    {
      id: 2,
      number: '1001',
      created: '12/07/2025',
      required: '',
      invoice: '',
      vendor: '',
      warehouse: 'Warehouse #1',
      status: 'Requisition',
    },
  ];

  const filteredOrders = purchaseOrdersData.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.number.toLowerCase().includes(searchLower) ||
      order.vendor.toLowerCase().includes(searchLower) ||
      order.warehouse.toLowerCase().includes(searchLower)
    );
  });

  const totalEntries = filteredOrders.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-700">
          Purchase Orders <span className="text-gray-400 text-lg">{totalEntries}</span>
        </h1>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex items-center justify-between mb-4">
        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option>Incomplete</option>
              <option>Complete</option>
              <option>All</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Warehouse Filter */}
          <div className="relative">
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="h-9 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option>All Warehouses</option>
              <option>Warehouse #1</option>
              <option>Warehouse #2</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Additional Filter */}
          <div className="relative">
            <select
              value={additionalFilter}
              onChange={(e) => setAdditionalFilter(e.target.value)}
              className="h-9 pl-3 pr-8 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="None">Filter: None</option>
              <option value="By Vendor">Filter: By Vendor</option>
              <option value="By Date">Filter: By Date</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="h-9 pl-9 pr-4 w-48 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Button */}
          <Button
            onClick={openNewPurchaseOrderModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 h-9"
          >
            New
          </Button>

          {/* Hamburger Menu with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>

            {hamburgerMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setHamburgerMenuOpen(false)}
                />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={() => {
                      console.log('Print clicked');
                      setHamburgerMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Printer className="w-4 h-4 text-gray-400" />
                    Print
                  </button>
                  <button
                    onClick={() => {
                      console.log('Export to CSV clicked');
                      setHamburgerMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-gray-400" />
                    Export to CSV
                  </button>
                  <button
                    onClick={() => {
                      console.log('Customize clicked');
                      setHamburgerMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    Customize
                  </button>
                  <button
                    onClick={() => {
                      console.log('Help clicked');
                      setHamburgerMenuOpen(false);
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-600">
                <div className="flex items-center gap-1">
                  Number
                  <span className="text-xs">▲</span>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-600">Created</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-red-500">Required</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-600">Invoice</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-600">Vendor</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-600">Warehouse</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </td>
                <td className="px-4 py-3 text-sm text-blue-600">{order.number}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.created}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.required}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.invoice}</td>
                <td className="px-4 py-3 text-sm text-blue-500">{order.vendor}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.warehouse}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-blue-500">
            Showing <span className="text-blue-600">1</span> to <span className="text-blue-600">{totalEntries}</span> of <span className="text-blue-600">{totalEntries}</span> entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="px-3 py-1 text-sm text-gray-400 hover:text-gray-600"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded text-gray-700">
              1
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 text-sm text-gray-400 hover:text-gray-600"
              disabled={totalEntries <= 10}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* New Purchase Order Modal */}
      <NewPurchaseOrderModal
        isOpen={isNewPurchaseOrderModalOpen}
        onClose={closeNewPurchaseOrderModal}
        onSave={(data) => {
          console.log('New purchase order data:', data);
        }}
      />
    </div>
  );
};

export default PurchaseOrders;
