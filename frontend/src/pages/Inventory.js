import React, { useState } from 'react';
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Printer,
  Settings,
  Pencil,
  MoreVertical,
  Plus,
  ArrowLeftRight,
  Clock,
  FileText,
  Package,
  Tag,
  Bell,
  Trash2,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import NewPartModal from '../components/NewPartModal';
import AdjustInventoryModal from '../components/AdjustInventoryModal';
import TransferPartModal from '../components/TransferPartModal';
import UpdatePhysicalInventoryModal from '../components/UpdatePhysicalInventoryModal';
import { useModal } from '../context/ModalContext';

const Inventory = () => {
  const { isNewPartModalOpen, openNewPartModal, closeNewPartModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [partsFilter, setPartsFilter] = useState('All Parts');
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [printMenuOpen, setPrintMenuOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [physicalCountModalOpen, setPhysicalCountModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);

  // Parts inventory data
  const inventoryData = [
    {
      id: 1,
      partNumber: 'AM74882',
      name: '2 1/2 inch galvanized pipe nipple',
      description: '24" length',
      category: 'Pump Equipment',
      vendor: '',
      onHand: 4,
      unitCost: 7.60,
      poNumber: '',
      isLowStock: false,
    },
    {
      id: 2,
      partNumber: 'PR19026445',
      name: 'Air Filter',
      description: 'for compressors',
      category: 'Filters',
      vendor: '',
      onHand: 10,
      unitCost: 15.90,
      poNumber: '',
      isLowStock: true,
      isSelected: true,
    },
    {
      id: 3,
      partNumber: 'SG-3181',
      name: 'Ball Valve',
      description: '6"',
      category: 'Pump Equipment',
      vendor: 'Davis Plumbing',
      onHand: 1,
      unitCost: 86.00,
      poNumber: '',
      isLowStock: true,
    },
    {
      id: 4,
      partNumber: 'FRD110',
      name: 'Caution Tape',
      description: 'Roll',
      category: 'Safety Equipment',
      vendor: '',
      onHand: 24,
      unitCost: 12.50,
      poNumber: '',
      isLowStock: false,
    },
    {
      id: 5,
      partNumber: 'SM-7105',
      name: 'Check Valve',
      description: '1 1/2"',
      category: 'Plumbing',
      vendor: 'Davis Plumbing',
      onHand: 21,
      unitCost: 7.70,
      poNumber: '',
      isLowStock: false,
    },
    {
      id: 6,
      partNumber: '329057',
      name: 'Drive Belt',
      description: '',
      category: 'Belts',
      vendor: 'International Belt Supply',
      onHand: 0,
      unitCost: 130.00,
      poNumber: '',
      isLowStock: false,
    },
    {
      id: 7,
      partNumber: 'N45886294',
      name: 'General Purpose Toggle Switch',
      description: '',
      category: '',
      vendor: '',
      onHand: 50,
      unitCost: 2.30,
      poNumber: '',
      isLowStock: false,
    },
    {
      id: 8,
      partNumber: 'TM90',
      name: 'Grease',
      description: '12 tubes per case',
      category: 'Lubricants',
      vendor: '',
      onHand: 6.07,
      unitCost: 56.00,
      poNumber: '4446',
      isLowStock: true,
    },
    {
      id: 9,
      partNumber: '002637',
      name: 'Pump Gasket',
      description: 'For vacuum pumps',
      category: 'Gaskets',
      vendor: '',
      onHand: 1,
      unitCost: 56.70,
      poNumber: '',
      isLowStock: true,
    },
    {
      id: 10,
      partNumber: '846592',
      name: 'Quick Connect',
      description: '',
      category: 'Hydraulics',
      vendor: 'The Instrument Group',
      onHand: 3,
      unitCost: 25.75,
      poNumber: '',
      isLowStock: false,
    },
    {
      id: 11,
      partNumber: 'Test',
      name: 'Test',
      description: 'Test',
      category: 'Belts',
      vendor: 'Davis Plumbing',
      onHand: 0,
      unitCost: 250.00,
      poNumber: '4447',
      isLowStock: false,
    },
  ];

  // Filter inventory based on search term
  const filteredInventory = inventoryData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.partNumber.toLowerCase().includes(searchLower) ||
      item.name.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.vendor.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-medium text-gray-800">Parts Inventory</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={openNewPartModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-9 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            New
          </Button>
          {/* Hamburger Menu with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {hamburgerMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setHamburgerMenuOpen(false)}
                />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={() => {
                      console.log('Import (MAP)');
                      setHamburgerMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span className="underline">I</span>mport (MAP)
                  </button>
                  <button
                    onClick={() => {
                      console.log('Part Kits');
                      setHamburgerMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span>Par<span className="underline">t</span> Kits</span>
                    <span className="text-xs text-gray-400">Ctrl+K</span>
                  </button>
                  <button
                    onClick={() => {
                      setPhysicalCountModalOpen(true);
                      setHamburgerMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span>Update Ph<span className="underline">y</span>sical Count</span>
                    <span className="text-xs text-gray-400">Ctrl+Y</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 h-9 pl-9 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Parts Filter Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={partsFilter}
              onChange={(e) => setPartsFilter(e.target.value)}
              className="h-9 px-3 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Parts</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* Print Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPrintMenuOpen(!printMenuOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              <Printer className="w-5 h-5" />
            </button>

            {printMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setPrintMenuOpen(false)}
                />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-72 bg-white rounded shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={() => {
                      console.log('Inventory Listing...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory Listing...
                  </button>
                  <button
                    onClick={() => {
                      console.log('Inventory Listing (by Vendor)...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory Listing (by <span className="underline">V</span>endor)...
                  </button>
                  <button
                    onClick={() => {
                      console.log('Inventory Listing (by Category)...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory Listing (by <span className="underline">C</span>ategory)...
                  </button>
                  <button
                    onClick={() => {
                      console.log('Inventory Listing (Need Reordered)...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory Listing (<span className="underline">N</span>eed Reordered)...
                  </button>
                  <button
                    onClick={() => {
                      console.log('Inventory Usage (Detailed - by Equip)...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory Usage (Detailed - by Equip)...
                  </button>
                  <button
                    onClick={() => {
                      console.log('Inventory Usage (Detailed)...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory Usage (Detailed)...
                  </button>
                  <button
                    onClick={() => {
                      console.log('Inventory Stock Value (Detailed)...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory Stock Value (Detailed)...
                  </button>
                  <button
                    onClick={() => {
                      console.log('Inventory Stock Value (Summary)...');
                      setPrintMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Inventory S<span className="underline">t</span>ock Value (Summary)...
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[40px_100px_1fr_150px_150px_80px_80px_60px_80px] items-center px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
          <div className="flex items-center justify-center">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
          </div>
          <div className="flex items-center gap-1">
            Part #
          </div>
          <div className="flex items-center gap-1">
            Name
            <ChevronDown className="w-3 h-3" />
          </div>
          <div>Category</div>
          <div>Vendor</div>
          <div className="text-center">On Hand</div>
          <div className="text-center">Unit Cost</div>
          <div className="text-center">PO #</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Table Rows */}
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className={`grid grid-cols-[40px_100px_1fr_150px_150px_80px_80px_60px_80px] items-center px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors
                            ${item.isSelected ? 'bg-blue-50' : ''}
                        `}
          >
            {/* Checkbox */}
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
                defaultChecked={item.isSelected}
              />
            </div>

            {/* Part # */}
            <div className="text-sm text-blue-500 font-medium">
              {item.partNumber}
            </div>

            {/* Name */}
            <div>
              <div className="text-sm text-blue-500">{item.name}</div>
              {item.description && (
                <div className="text-xs text-gray-400">{item.description}</div>
              )}
            </div>

            {/* Category */}
            <div className="text-sm text-blue-500">
              {item.category}
            </div>

            {/* Vendor */}
            <div className="text-sm text-blue-500">
              {item.vendor}
            </div>

            {/* On Hand */}
            <div className={`text-sm text-center font-medium
                            ${item.isLowStock ? 'text-red-500' : 'text-gray-600'}
                        `}>
              {item.onHand}
            </div>

            {/* Unit Cost */}
            <div className="text-sm text-gray-600 text-center">
              ${item.unitCost.toFixed(2)}
            </div>

            {/* PO # */}
            <div className="text-sm text-blue-500 text-center">
              {item.poNumber}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-1">
              <button className="p-1 text-gray-400 hover:text-blue-500 hover:bg-gray-100 rounded">
                <Pencil className="w-4 h-4" />
              </button>

              {/* More Actions Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActionMenuOpen(actionMenuOpen === item.id ? null : item.id);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {actionMenuOpen === item.id && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setActionMenuOpen(null)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded shadow-lg border border-gray-200 py-1 z-20">
                      <button
                        onClick={() => {
                          setSelectedPart(item);
                          setAdjustModalOpen(true);
                          setActionMenuOpen(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                        Adjust
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPart(item);
                          setTransferModalOpen(true);
                          setActionMenuOpen(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                        Transfer
                      </button>
                      <button
                        onClick={() => {
                          console.log('History clicked for:', item.partNumber);
                          setActionMenuOpen(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        History
                      </button>
                      <button
                        onClick={() => {
                          console.log('E-mail Notification clicked for:', item.partNumber);
                          setActionMenuOpen(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Bell className="w-4 h-4 text-gray-400" />
                        E-mail Notification
                      </button>

                      <div className="border-t border-gray-100 my-1" />

                      <button
                        onClick={() => {
                          console.log('Delete clicked for:', item.partNumber);
                          setActionMenuOpen(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Part Modal */}
      <NewPartModal
        isOpen={isNewPartModalOpen}
        onClose={closeNewPartModal}
        onSave={(data) => {
          console.log('New part data:', data);
        }}
      />

      {/* Adjust Inventory Modal */}
      <AdjustInventoryModal
        isOpen={adjustModalOpen}
        onClose={() => {
          setAdjustModalOpen(false);
          setSelectedPart(null);
        }}
        onSave={(data) => {
          console.log('Adjust data:', data);
        }}
        part={selectedPart}
      />

      {/* Transfer Part Modal */}
      <TransferPartModal
        isOpen={transferModalOpen}
        onClose={() => {
          setTransferModalOpen(false);
          setSelectedPart(null);
        }}
        onSave={(data) => {
          console.log('Transfer data:', data);
        }}
        part={selectedPart}
      />

      {/* Update Physical Inventory Modal */}
      <UpdatePhysicalInventoryModal
        isOpen={physicalCountModalOpen}
        onClose={() => setPhysicalCountModalOpen(false)}
        onSave={(data) => {
          console.log('Physical count data:', data);
        }}
      />
    </div>
  );
};

export default Inventory;
