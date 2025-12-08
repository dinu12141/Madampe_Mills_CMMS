import React, { useState } from 'react';
import { X, Search, Menu } from 'lucide-react';
import { Button } from './ui/button';

const UpdatePhysicalInventoryModal = ({ isOpen, onClose, onSave, inventoryData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showRowFilter, setShowRowFilter] = useState(false);
    const [includeComments, setIncludeComments] = useState(false);
    const [items, setItems] = useState([
        { id: 1, partNumber: '002837', name: 'Pump Gasket', category: 'Gaskets', aisle: 'a', row: 'b', bin: '9', currentQty: 1, actualQty: 1, notes: '' },
        { id: 2, partNumber: '329857', name: 'Drive Belt', category: 'Belts', aisle: '', row: '', bin: '', currentQty: 8, actualQty: 8, notes: '' },
        { id: 3, partNumber: 'AM74882', name: '2 1/2 inch galvanized pipe nipple', category: 'Pump Equipment', aisle: '', row: '', bin: '', currentQty: 4, actualQty: 4, notes: '' },
        { id: 4, partNumber: 'B48592', name: 'Quick Connect', category: 'Hydraulics', aisle: '', row: '', bin: '', currentQty: 3, actualQty: 3, notes: '' },
        { id: 5, partNumber: 'FRD110', name: 'Caution Tape', category: 'Safety Equipment', aisle: '', row: '', bin: '', currentQty: 24, actualQty: 24, notes: '' },
        { id: 6, partNumber: 'N4588829A', name: 'General Purpose Toggle Switch', category: '', aisle: '', row: '', bin: '', currentQty: 50, actualQty: 50, notes: '' },
        { id: 7, partNumber: 'PR19026445', name: 'Air Filter', category: 'Filters', aisle: '', row: '', bin: '', currentQty: 10, actualQty: 10, notes: '' },
        { id: 8, partNumber: 'SM-7109', name: 'Check Valve', category: 'Plumbing', aisle: '', row: '', bin: '', currentQty: 21, actualQty: 21, notes: '' },
        { id: 9, partNumber: 'TM90', name: 'Grease', category: 'Lubricants', aisle: '', row: '', bin: '', currentQty: 6.07, actualQty: 6.07, notes: '' },
        { id: 10, partNumber: 'Test', name: 'Test', category: 'Belts', aisle: '', row: '', bin: '', currentQty: 0, actualQty: 0, notes: '' },
    ]);

    if (!isOpen) return null;

    const handleActualQtyChange = (id, value) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, actualQty: parseFloat(value) || 0 } : item
        ));
    };

    const handleNotesChange = (id, value) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, notes: value } : item
        ));
    };

    const handleSave = () => {
        console.log('Saving physical count:', items);
        onSave?.(items);
        onClose();
    };

    const filteredItems = items.filter(item =>
        item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-5xl h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-blue-600 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 text-yellow-300">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-medium text-white">Update Physical Inventory</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-6 h-6 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded"
                    >
                        <X className="w-3 h-3 text-white" />
                    </button>
                </div>

                {/* Title */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-medium text-gray-800">Update Physical Inventory</h1>
                </div>

                {/* Search Bar */}
                <div className="px-6 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative flex-1 max-w-xs">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search inventory..."
                                className="w-full h-8 pl-3 pr-8 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="p-1 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full">
                        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 w-24">Part #</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 w-32">Category</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 w-12">Aisle</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 w-12">Row</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 w-12">Bin</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 w-24">Current Qty</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 w-24">Actual Qty</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item, index) => (
                                <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index === 0 ? 'bg-blue-50' : ''}`}>
                                    <td className="px-4 py-2 text-sm text-red-600">{item.partNumber}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{item.category}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.aisle}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.row}</td>
                                    <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.bin}</td>
                                    <td className="px-4 py-2 text-sm text-blue-500 text-right">{item.currentQty}</td>
                                    <td className="px-4 py-2">
                                        <input
                                            type="number"
                                            value={item.actualQty}
                                            onChange={(e) => handleActualQtyChange(item.id, e.target.value)}
                                            className="w-full h-7 px-2 text-sm text-right border border-gray-300 rounded bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            type="text"
                                            value={item.notes}
                                            onChange={(e) => handleNotesChange(item.id, e.target.value)}
                                            className="w-full h-7 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showRowFilter}
                                onChange={(e) => setShowRowFilter(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600">Show row filter</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeComments}
                                onChange={(e) => setIncludeComments(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600">Include 'Comments' column in data entry sequence</span>
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 border-gray-300"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePhysicalInventoryModal;
