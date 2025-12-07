import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const NewEmployeeModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        number: '',
        status: 'Active',
        laborRate: '0.0',
        allowLogin: false,
    });

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving employee:', formData);
        if (onSave) onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">New Employee</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="px-5 py-6">
                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* First name */}
                        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> First name
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Last name */}
                        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Last name
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Number */}
                        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">Number</label>
                            <input
                                type="text"
                                value={formData.number}
                                onChange={(e) => handleInputChange('number', e.target.value)}
                                className="w-32 h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Status */}
                        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Status
                            </label>
                            <div className="relative w-32">
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    className="w-full h-9 px-3 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="On Leave">On Leave</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Labor rate */}
                        <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Labor rate
                            </label>
                            <div className="flex items-center">
                                <span className="px-2 h-9 flex items-center bg-blue-50 border border-r-0 border-gray-300 rounded-l text-sm text-gray-600">$</span>
                                <input
                                    type="text"
                                    value={formData.laborRate}
                                    onChange={(e) => handleInputChange('laborRate', e.target.value)}
                                    className="w-24 h-9 px-3 border border-gray-300 rounded-r text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Activation Info */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-700 font-medium mb-4">
                            User Activation: Unlimited Full User and 10 Operator Users available
                        </p>

                        {/* Allow Login Toggle */}
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Allow Login</span>
                            <button
                                onClick={() => handleInputChange('allowLogin', !formData.allowLogin)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${formData.allowLogin ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.allowLogin ? 'translate-x-8' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className="text-sm text-gray-500">
                                {formData.allowLogin ? 'Yes' : 'No'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 px-5 py-4 border-t border-gray-100">
                    <Button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                    >
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewEmployeeModal;
