import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const NewPurchaseOrderModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        warehouse: 'Warehouse #1',
        vendor: '',
        dateCreated: new Date().toLocaleDateString('en-US'),
        dateRequired: '',
        buyer: 'Dinusha Madushanka',
        terms: '',
        shipVia: '',
        invoice: '',
        workOrderNumber: '',
        notes: '',
    });

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving purchase order:', formData);
        onSave?.(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20"
                onClick={onClose}
            />

            {/* Slide-in Panel */}
            <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-gray-700">New Purchase Order</h2>
                    <button
                        onClick={onClose}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="max-w-lg space-y-4">
                        {/* Warehouse */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Warehouse
                            </label>
                            <select
                                value={formData.warehouse}
                                onChange={(e) => handleInputChange('warehouse', e.target.value)}
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option>Warehouse #1</option>
                                <option>Warehouse #2</option>
                                <option>Warehouse #3</option>
                            </select>
                        </div>

                        {/* Vendor */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">Vendor</label>
                            <select
                                value={formData.vendor}
                                onChange={(e) => handleInputChange('vendor', e.target.value)}
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select or type Vendor name</option>
                                <option value="Davis Plumbing">Davis Plumbing</option>
                                <option value="The Instrument Group">The Instrument Group</option>
                            </select>
                        </div>

                        {/* Date Created */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Date Created
                            </label>
                            <input
                                type="text"
                                value={formData.dateCreated}
                                onChange={(e) => handleInputChange('dateCreated', e.target.value)}
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-32"
                            />
                        </div>

                        {/* Date Required */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">Date Required</label>
                            <input
                                type="text"
                                value={formData.dateRequired}
                                onChange={(e) => handleInputChange('dateRequired', e.target.value)}
                                placeholder=""
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-32"
                            />
                        </div>

                        {/* Buyer */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">Buyer</label>
                            <select
                                value={formData.buyer}
                                onChange={(e) => handleInputChange('buyer', e.target.value)}
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option>Dinusha Madushanka</option>
                                <option>John Smith</option>
                                <option>Jane Doe</option>
                            </select>
                        </div>

                        {/* Terms */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">Terms</label>
                            <select
                                value={formData.terms}
                                onChange={(e) => handleInputChange('terms', e.target.value)}
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value=""></option>
                                <option value="Net 30">Net 30</option>
                                <option value="Net 60">Net 60</option>
                                <option value="Due on Receipt">Due on Receipt</option>
                            </select>
                        </div>

                        {/* Ship Via */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">Ship Via</label>
                            <select
                                value={formData.shipVia}
                                onChange={(e) => handleInputChange('shipVia', e.target.value)}
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value=""></option>
                                <option value="Ground">Ground</option>
                                <option value="Express">Express</option>
                                <option value="Overnight">Overnight</option>
                            </select>
                        </div>

                        {/* Invoice */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <label className="text-sm text-gray-600">Invoice</label>
                            <input
                                type="text"
                                value={formData.invoice}
                                onChange={(e) => handleInputChange('invoice', e.target.value)}
                                className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Work Order Number */}
                        <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                            <label className="text-sm text-gray-600 pt-2">Work Order Number</label>
                            <div>
                                <input
                                    type="text"
                                    value={formData.workOrderNumber}
                                    onChange={(e) => handleInputChange('workOrderNumber', e.target.value)}
                                    className="h-9 px-3 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                />
                                <p className="text-xs text-gray-400 italic mt-1">
                                    Enter work order numbers only. Do not enter any prefix characters.
                                </p>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                            <label className="text-sm text-gray-600 pt-2">Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                rows={4}
                                className="px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                            />
                        </div>

                        {/* New Custom Field Link */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                            <div></div>
                            <button className="text-sm text-blue-500 hover:text-blue-600 hover:underline text-left">
                                New Custom Field
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 px-6 py-4 bg-gray-100 border-t border-gray-200">
                    <Button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                    >
                        Save
                    </Button>
                    <button
                        onClick={onClose}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPurchaseOrderModal;
