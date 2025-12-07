import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const NewVendorModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        location: 'Location #1',
        laborRate: '0.0',
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
        contactName: '',
        phone: '',
        altPhone: '',
        fax: '',
        email: '',
        website: '',
    });

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving vendor:', formData);
        if (onSave) onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">New Vendor</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {/* Main Fields */}
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Number */}
                        <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">Number</label>
                            <input
                                type="text"
                                value={formData.number}
                                onChange={(e) => handleInputChange('number', e.target.value)}
                                className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Location
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="w-full h-9 px-3 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="Location #1">Location #1</option>
                                    <option value="Location #2">Location #2</option>
                                    <option value="Location #3">Location #3</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Labor rate */}
                        <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                            <label className="text-sm text-gray-600">
                                <span className="text-red-500">*</span> Labor rate
                            </label>
                            <div className="flex items-center">
                                <span className="px-2 h-9 flex items-center bg-gray-100 border border-r-0 border-gray-300 rounded-l text-sm text-gray-600">$</span>
                                <input
                                    type="text"
                                    value={formData.laborRate}
                                    onChange={(e) => handleInputChange('laborRate', e.target.value)}
                                    className="w-24 h-9 px-3 border border-gray-300 rounded-r text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Address</h3>
                        <div className="space-y-3">
                            {/* Street */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Street</label>
                                <input
                                    type="text"
                                    value={formData.street}
                                    onChange={(e) => handleInputChange('street', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* City */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">City</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    className="w-32 h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* State/Prov */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">State/Prov</label>
                                <input
                                    type="text"
                                    value={formData.stateProvince}
                                    onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                                    className="w-32 h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Postal Code */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Postal Code</label>
                                <input
                                    type="text"
                                    value={formData.postalCode}
                                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                    className="w-32 h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Country */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Country</label>
                                <div className="relative w-32">
                                    <select
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}
                                        className="w-full h-9 px-3 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Select...</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Contact</h3>
                        <div className="space-y-3">
                            {/* Name */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Name</label>
                                <input
                                    type="text"
                                    value={formData.contactName}
                                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Phone */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Alt Phone */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Alt Phone</label>
                                <input
                                    type="text"
                                    value={formData.altPhone}
                                    onChange={(e) => handleInputChange('altPhone', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Fax */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Fax</label>
                                <input
                                    type="text"
                                    value={formData.fax}
                                    onChange={(e) => handleInputChange('fax', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Email */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Website */}
                            <div className="grid grid-cols-[80px_1fr] items-center gap-3">
                                <label className="text-sm text-gray-600">Website</label>
                                <input
                                    type="text"
                                    value={formData.website}
                                    onChange={(e) => handleInputChange('website', e.target.value)}
                                    className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 px-5 py-4 border-t border-gray-200">
                    <Button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                    >
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewVendorModal;
