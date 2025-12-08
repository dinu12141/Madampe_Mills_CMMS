import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';

const AdjustInventoryModal = ({ isOpen, onClose, onSave, part }) => {
    const [formData, setFormData] = useState({
        type: 'Receipt',
        partNumber: '',
        name: '',
        date: new Date().toLocaleDateString('en-US'),
        quantity: '1',
        tax1: '0.00000',
        tax2: '0.00000',
        unitCost: '0.00',
        extendedCost: '0.00',
        warehouse: 'Warehouse #1',
        invoiceNumber: '',
        vendor: '',
        reason: '',
    });

    useEffect(() => {
        if (part) {
            const extCost = (parseFloat(part.unitCost) * parseFloat(formData.quantity || 1)).toFixed(2);
            setFormData(prev => ({
                ...prev,
                partNumber: part.partNumber,
                name: part.name,
                unitCost: part.unitCost.toFixed(2),
                extendedCost: extCost,
            }));
        }
    }, [part]);

    useEffect(() => {
        // Calculate extended cost when quantity or unit cost changes
        const qty = parseFloat(formData.quantity) || 0;
        const cost = parseFloat(formData.unitCost) || 0;
        setFormData(prev => ({
            ...prev,
            extendedCost: (qty * cost).toFixed(2)
        }));
    }, [formData.quantity, formData.unitCost]);

    if (!isOpen || !part) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving adjustment:', formData);
        onSave?.(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 text-blue-500">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-medium text-gray-700">Adjust Inventory for Part {part.partNumber}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 bg-red-500 rounded hover:bg-red-600"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-4 space-y-3">
                    {/* Type */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Type:</label>
                        <select
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="Receipt">Receipt</option>
                            <option value="Adjustment">Adjustment</option>
                            <option value="Usage">Usage</option>
                            <option value="Transfer">Transfer</option>
                        </select>
                    </div>

                    {/* Part # */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Part #:</label>
                        <input
                            type="text"
                            value={formData.partNumber}
                            readOnly
                            className="h-8 px-2 border border-gray-300 rounded text-sm bg-blue-50 focus:outline-none"
                        />
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Name:</label>
                        <span className="text-sm text-blue-500">{formData.name}</span>
                    </div>

                    {/* Date */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Date:</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Quantity */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Quantity:</label>
                        <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => handleInputChange('quantity', e.target.value)}
                            className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Tax 1 */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Tax:</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={formData.tax1}
                                onChange={(e) => handleInputChange('tax1', e.target.value)}
                                className="w-24 h-8 px-2 border border-gray-300 rounded text-sm text-right bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="ml-1 text-sm text-gray-500">%</span>
                        </div>
                    </div>

                    {/* Tax 2 */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Tax:</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={formData.tax2}
                                onChange={(e) => handleInputChange('tax2', e.target.value)}
                                className="w-24 h-8 px-2 border border-gray-300 rounded text-sm text-right bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="ml-1 text-sm text-gray-500">%</span>
                        </div>
                    </div>

                    {/* Unit Cost */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Unit Cost:</label>
                        <div className="flex items-center">
                            <span className="mr-1 text-sm text-gray-500">$</span>
                            <input
                                type="text"
                                value={formData.unitCost}
                                onChange={(e) => handleInputChange('unitCost', e.target.value)}
                                className="w-24 h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Extended Cost */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Extended Cost:</label>
                        <span className="text-sm text-blue-500 bg-blue-50 px-2 py-1 rounded">${formData.extendedCost}</span>
                    </div>

                    {/* Warehouse */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Warehouse:</label>
                        <select
                            value={formData.warehouse}
                            onChange={(e) => handleInputChange('warehouse', e.target.value)}
                            className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="Warehouse #1">Warehouse #1</option>
                            <option value="Warehouse #2">Warehouse #2</option>
                        </select>
                    </div>

                    {/* Invoice # */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Invoice #:</label>
                        <input
                            type="text"
                            value={formData.invoiceNumber}
                            onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                            className="w-24 h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Vendor */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Vendor:</label>
                        <div className="flex items-center gap-2">
                            <select
                                value={formData.vendor}
                                onChange={(e) => handleInputChange('vendor', e.target.value)}
                                className="flex-1 h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value=""></option>
                                <option value="Davis Plumbing">Davis Plumbing</option>
                                <option value="The Instrument Group">The Instrument Group</option>
                            </select>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="grid grid-cols-[100px_1fr] items-start gap-2">
                        <label className="text-sm text-gray-600 text-right pt-2">Reason:</label>
                        <textarea
                            value={formData.reason}
                            onChange={(e) => handleInputChange('reason', e.target.value)}
                            rows={3}
                            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 border-t border-gray-200 rounded-b-lg">
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
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save +
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdjustInventoryModal;
