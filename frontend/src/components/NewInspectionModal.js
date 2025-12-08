import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';

const NewInspectionModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        equipment: '',
        date: new Date().toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '/'),
        notes: '',
    });

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!formData.equipment.trim()) {
            alert('Equipment is required');
            return;
        }
        console.log('Saving inspection:', formData);
        onSave?.(formData);
        onClose();
    };

    return (
        <>
            {/* CSS Animation */}
            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .slide-in-right {
                    animation: slideInRight 0.3s ease-out forwards;
                }
            `}</style>

            <div className="fixed inset-0 z-50 flex">
                {/* Backdrop */}
                <div
                    className="flex-1 bg-black/20 transition-opacity"
                    onClick={onClose}
                />

                {/* Slide-out Panel from Right */}
                <div className="w-full max-w-xl bg-white shadow-2xl flex flex-col h-full slide-in-right">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-normal text-blue-500">New Inspection</h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Form Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto px-6 py-8">
                        <div className="space-y-6">
                            {/* Equipment */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">
                                    <span className="text-red-500">*</span>Equipment
                                </label>
                                <input
                                    type="text"
                                    value={formData.equipment}
                                    onChange={(e) => handleInputChange('equipment', e.target.value)}
                                    placeholder="Enter Equipment"
                                    className="w-full h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Date */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">Date</label>
                                <input
                                    type="text"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    className="w-36 h-10 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Notes */}
                            <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                                <label className="text-sm text-gray-600 pt-2">Notes</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                        >
                            Save
                        </Button>
                        <button
                            onClick={onClose}
                            className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewInspectionModal;
