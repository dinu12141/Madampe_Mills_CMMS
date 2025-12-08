import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const TransferPartModal = ({ isOpen, onClose, onSave, part }) => {
    const [formData, setFormData] = useState({
        transferTo: '',
        quantity: '1',
        transferAll: false,
        reason: '',
    });

    useEffect(() => {
        if (part) {
            setFormData(prev => ({
                ...prev,
                quantity: '1',
                transferAll: false,
                reason: '',
            }));
        }
    }, [part]);

    if (!isOpen || !part) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTransferAllChange = (checked) => {
        setFormData(prev => ({
            ...prev,
            transferAll: checked,
            quantity: checked ? String(part.onHand) : '1',
        }));
    };

    const handleSave = () => {
        console.log('Transferring:', formData);
        onSave?.(formData);
        onClose();
    };

    // Truncate name for header
    const truncatedName = part.name.length > 15 ? part.name.substring(0, 15) + '...' : part.name;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-white rounded-lg shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-100 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 text-blue-500">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-medium text-gray-700">
                            Transfer Part #{part.partNumber} - {truncatedName}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 bg-red-500 rounded hover:bg-red-600"
                    >
                        <X className="w-3 h-3 text-white" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-4 space-y-4">
                    {/* Transfer to */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Transfer to:</label>
                        <select
                            value={formData.transferTo}
                            onChange={(e) => handleInputChange('transferTo', e.target.value)}
                            className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value=""></option>
                            <option value="Warehouse #1">Warehouse #1</option>
                            <option value="Warehouse #2">Warehouse #2</option>
                            <option value="Warehouse #3">Warehouse #3</option>
                        </select>
                    </div>

                    {/* Quantity & Transfer All */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Quantity:</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={formData.quantity}
                                onChange={(e) => handleInputChange('quantity', e.target.value)}
                                disabled={formData.transferAll}
                                className="w-16 h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.transferAll}
                                    onChange={(e) => handleTransferAllChange(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">Transfer All</span>
                            </label>
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="grid grid-cols-[80px_1fr] items-start gap-2">
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
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                    >
                        OK
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
    );
};

export default TransferPartModal;
