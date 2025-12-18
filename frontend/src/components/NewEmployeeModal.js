import React, { useState } from 'react';
import { X, HelpCircle, Check } from 'lucide-react';
import { Button } from './ui/button';

const NewEmployeeModal = ({ isOpen, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('employee');
    const [renewals, setRenewals] = useState([]);
    const [renewalNotificationContact, setRenewalNotificationContact] = useState('');
    const [selectedRenewalIndex, setSelectedRenewalIndex] = useState(null);
    const [notificationLocation, setNotificationLocation] = useState('General Equipment');
    const [equipmentNotifications, setEquipmentNotifications] = useState([
        { id: '124', name: '124 - Toyota 5FBE15 Forklift', maintenance: false, renewals: false, workOrders: false },
        { id: '290', name: '290 - Mig Welder Davidson', maintenance: false, renewals: false, workOrders: false },
        { id: 'AC-2', name: 'AC-2 - Air Compressor Sullair', maintenance: false, renewals: false, workOrders: false },
    ]);
    const [photos, setPhotos] = useState([]);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [formData, setFormData] = useState({
        // Employee tab - Name/Address
        id: '',
        lastName: '',
        firstName: '',
        middleInitial: '',
        address1: '',
        address2: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        // Contact section
        homePhone: '',
        altPhone: '',
        cellPhone: '',
        email: '',
        // Miscellaneous (user-defined fields)
        custom1Label: '(click to define)',
        custom1Value: '',
        custom2Label: '(click to define)',
        custom2Value: '',
        custom3Label: '(click to define)',
        custom3Value: '',
        custom4Label: '(click to define)',
        custom4Value: '',
        // Details tab - Employment
        status: 'Active',
        hireDate: '',
        leaveDate: '',
        dob: '',
        ssn: '',
        type: 'Technician',
        laborRate: '',
        billingRate: '',
        location: 'General Equipment',
        category: '',
        // Details tab - Driver's License
        licenseNumber: '',
        licenseClass: '',
        licenseStateProv: '',
        licenseNotes: '',
        // Details tab - Notes
        notes: '',
    });

    const tabs = [
        { id: 'employee', label: 'Employee' },
        { id: 'details', label: 'Details' },
        { id: 'renewals', label: 'Renewals' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'photos', label: 'Photos' },
        { id: 'attachments', label: 'Attachments' },
    ];

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving employee:', formData);
        if (onSave) onSave(formData);
        onClose();
    };

    const handleSaveAndNew = () => {
        console.log('Saving employee and opening new:', formData);
        if (onSave) onSave(formData);
        // Reset form for new entry
        setFormData({
            id: '',
            lastName: '',
            firstName: '',
            middleInitial: '',
            address1: '',
            address2: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            homePhone: '',
            altPhone: '',
            cellPhone: '',
            email: '',
            custom1Label: '(click to define)',
            custom1Value: '',
            custom2Label: '(click to define)',
            custom2Value: '',
            custom3Label: '(click to define)',
            custom3Value: '',
            custom4Label: '(click to define)',
            custom4Value: '',
            status: 'Active',
            hireDate: '',
            leaveDate: '',
            dob: '',
            ssn: '',
            type: 'Technician',
            laborRate: '',
            billingRate: '',
            location: 'General Equipment',
            category: '',
            licenseNumber: '',
            licenseClass: '',
            licenseStateProv: '',
            licenseNotes: '',
            notes: '',
        });
    };

    // Employee Tab Content
    const EmployeeTabContent = () => (
        <div className="space-y-6">
            {/* Name / Address Section */}
            <fieldset className="border border-gray-300 rounded px-4 pb-4 pt-2">
                <legend className="text-sm text-gray-700 px-1">Name / Address</legend>
                <div className="space-y-3 mt-2">
                    {/* ID */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">ID:</label>
                        <input
                            type="text"
                            value={formData.id}
                            onChange={(e) => handleInputChange('id', e.target.value)}
                            className="w-32 h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Last, First, M.I. */}
                    <div className="grid grid-cols-[80px_1fr_50px_1fr_40px_60px] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Last:</label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-600 text-right">First:</label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-600 text-right">M.I.:</label>
                        <input
                            type="text"
                            value={formData.middleInitial}
                            onChange={(e) => handleInputChange('middleInitial', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            maxLength={2}
                        />
                    </div>

                    {/* Address 1 */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Address 1:</label>
                        <input
                            type="text"
                            value={formData.address1}
                            onChange={(e) => handleInputChange('address1', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Address 2 */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Address 2:</label>
                        <input
                            type="text"
                            value={formData.address2}
                            onChange={(e) => handleInputChange('address2', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* City, State/Prov */}
                    <div className="grid grid-cols-[80px_180px_70px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">City:</label>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-600 text-right">State/Prov:</label>
                        <input
                            type="text"
                            value={formData.stateProvince}
                            onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Postal Code */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Postal Code:</label>
                        <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            className="w-40 h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </fieldset>

            {/* Contact Section */}
            <fieldset className="border border-gray-300 rounded px-4 pb-4 pt-2">
                <legend className="text-sm text-gray-700 px-1">Contact</legend>
                <div className="space-y-3 mt-2">
                    {/* Home, Alt. Phone */}
                    <div className="grid grid-cols-[80px_180px_70px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Home:</label>
                        <input
                            type="text"
                            value={formData.homePhone}
                            onChange={(e) => handleInputChange('homePhone', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-600 text-right">Alt. Phone:</label>
                        <input
                            type="text"
                            value={formData.altPhone}
                            onChange={(e) => handleInputChange('altPhone', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Cell */}
                    <div className="grid grid-cols-[80px_180px] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Cell:</label>
                        <input
                            type="text"
                            value={formData.cellPhone}
                            onChange={(e) => handleInputChange('cellPhone', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* E-mail */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">E-mail:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </fieldset>

            {/* Miscellaneous Section */}
            <fieldset className="border border-gray-300 rounded px-4 pb-4 pt-2">
                <legend className="text-sm text-gray-700 px-1">Miscellaneous</legend>
                <p className="text-xs text-gray-500 text-right mb-2">(user defined - click any label to define)</p>
                <div className="space-y-3">
                    {/* Custom Field 1 */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <button
                            className="text-sm text-gray-500 text-left hover:text-blue-500"
                            onClick={() => {
                                const label = prompt('Enter label name:', formData.custom1Label);
                                if (label) handleInputChange('custom1Label', label);
                            }}
                        >
                            {formData.custom1Label}
                        </button>
                        <input
                            type="text"
                            value={formData.custom1Value}
                            onChange={(e) => handleInputChange('custom1Value', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Custom Field 2 */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <button
                            className="text-sm text-gray-500 text-left hover:text-blue-500"
                            onClick={() => {
                                const label = prompt('Enter label name:', formData.custom2Label);
                                if (label) handleInputChange('custom2Label', label);
                            }}
                        >
                            {formData.custom2Label}
                        </button>
                        <input
                            type="text"
                            value={formData.custom2Value}
                            onChange={(e) => handleInputChange('custom2Value', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Custom Field 3 */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <button
                            className="text-sm text-gray-500 text-left hover:text-blue-500"
                            onClick={() => {
                                const label = prompt('Enter label name:', formData.custom3Label);
                                if (label) handleInputChange('custom3Label', label);
                            }}
                        >
                            {formData.custom3Label}
                        </button>
                        <input
                            type="text"
                            value={formData.custom3Value}
                            onChange={(e) => handleInputChange('custom3Value', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Custom Field 4 */}
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                        <button
                            className="text-sm text-gray-500 text-left hover:text-blue-500"
                            onClick={() => {
                                const label = prompt('Enter label name:', formData.custom4Label);
                                if (label) handleInputChange('custom4Label', label);
                            }}
                        >
                            {formData.custom4Label}
                        </button>
                        <input
                            type="text"
                            value={formData.custom4Value}
                            onChange={(e) => handleInputChange('custom4Value', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </fieldset>
        </div>
    );

    // Details Tab Content
    const DetailsTabContent = () => (
        <div className="space-y-6">
            {/* Employment Section */}
            <fieldset className="border border-gray-300 rounded px-4 pb-4 pt-2">
                <legend className="text-sm text-gray-700 px-1">Employment</legend>
                <div className="space-y-3 mt-2">
                    {/* Status & Leave Date */}
                    <div className="grid grid-cols-[80px_150px_80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Status:</label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                        <label className="text-sm text-gray-600 text-right">Leave Date:</label>
                        <select
                            value={formData.leaveDate}
                            onChange={(e) => handleInputChange('leaveDate', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value=""></option>
                        </select>
                    </div>

                    {/* Hire Date */}
                    <div className="grid grid-cols-[80px_150px] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Hire Date:</label>
                        <select
                            value={formData.hireDate}
                            onChange={(e) => handleInputChange('hireDate', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value=""></option>
                        </select>
                    </div>

                    {/* DOB & SSN */}
                    <div className="grid grid-cols-[80px_150px_80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">DOB:</label>
                        <select
                            value={formData.dob}
                            onChange={(e) => handleInputChange('dob', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value=""></option>
                        </select>
                        <label className="text-sm text-gray-600 text-right">SSN:</label>
                        <input
                            type="text"
                            value={formData.ssn}
                            onChange={(e) => handleInputChange('ssn', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Type */}
                    <div className="grid grid-cols-[80px_150px] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Type:</label>
                        <select
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value="Technician">Technician</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Manager">Manager</option>
                            <option value="Contractor">Contractor</option>
                        </select>
                    </div>

                    {/* Labor Rate & Billing Rate */}
                    <div className="grid grid-cols-[80px_150px_80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Labor Rate:</label>
                        <input
                            type="text"
                            value={formData.laborRate}
                            onChange={(e) => handleInputChange('laborRate', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-600 text-right">Billing Rate:</label>
                        <input
                            type="text"
                            value={formData.billingRate}
                            onChange={(e) => handleInputChange('billingRate', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Location & Category */}
                    <div className="grid grid-cols-[80px_150px_80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Location:</label>
                        <select
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value="General Equipment">General Equipment</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Production Floor">Production Floor</option>
                            <option value="Office">Office</option>
                        </select>
                        <label className="text-sm text-gray-600 text-right">Category:</label>
                        <select
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value=""></option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                </div>
            </fieldset>

            {/* Driver's License Section */}
            <fieldset className="border border-gray-300 rounded px-4 pb-4 pt-2">
                <legend className="text-sm text-gray-700 px-1">Driver's License</legend>
                <div className="space-y-3 mt-2">
                    {/* Number */}
                    <div className="grid grid-cols-[80px_180px] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Number:</label>
                        <input
                            type="text"
                            value={formData.licenseNumber}
                            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Class */}
                    <div className="grid grid-cols-[80px_180px] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Class:</label>
                        <input
                            type="text"
                            value={formData.licenseClass}
                            onChange={(e) => handleInputChange('licenseClass', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* State/Prov */}
                    <div className="grid grid-cols-[80px_180px] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">State/Prov:</label>
                        <input
                            type="text"
                            value={formData.licenseStateProv}
                            onChange={(e) => handleInputChange('licenseStateProv', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Notes (within Driver's License) */}
                    <div className="grid grid-cols-[80px_1fr] items-center gap-2">
                        <label className="text-sm text-gray-600 text-right">Notes:</label>
                        <input
                            type="text"
                            value={formData.licenseNotes}
                            onChange={(e) => handleInputChange('licenseNotes', e.target.value)}
                            className="h-7 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </fieldset>

            {/* Notes Section */}
            <fieldset className="border border-gray-300 rounded px-4 pb-4 pt-2">
                <legend className="text-sm text-gray-700 px-1">Notes</legend>
                <div className="mt-2">
                    <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="w-full h-24 px-2 py-1 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                        placeholder=""
                    />
                </div>
            </fieldset>
        </div>
    );

    // Renewals Tab Content
    const RenewalsTabContent = () => (
        <div className="space-y-4">
            {/* Data Table */}
            <div className="border border-gray-300 bg-white">
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_100px_100px_1fr] border-b border-gray-300 bg-gray-100">
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-300">Renewal</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-300 flex items-center gap-1">
                        Issued
                        <span className="text-xs">▲</span>
                    </div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-300">Expires</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700">Notes</div>
                </div>
                {/* Table Body */}
                <div className="min-h-[200px] flex items-center justify-center">
                    {renewals.length === 0 ? (
                        <p className="text-sm text-blue-500">&lt;No data to display&gt;</p>
                    ) : (
                        <div className="w-full">
                            {renewals.map((renewal, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedRenewalIndex(index)}
                                    className={`grid grid-cols-[1fr_100px_100px_1fr] border-b border-gray-200 cursor-pointer ${selectedRenewalIndex === index ? 'bg-blue-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="px-3 py-2 text-sm text-gray-700 border-r border-gray-200">{renewal.name}</div>
                                    <div className="px-3 py-2 text-sm text-gray-700 border-r border-gray-200">{renewal.issued}</div>
                                    <div className="px-3 py-2 text-sm text-gray-700 border-r border-gray-200">{renewal.expires}</div>
                                    <div className="px-3 py-2 text-sm text-gray-700">{renewal.notes}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        const name = prompt('Enter renewal name:');
                        if (name) {
                            const issued = prompt('Enter issued date (e.g., 2024-01-15):') || '';
                            const expires = prompt('Enter expiry date (e.g., 2025-01-15):') || '';
                            const notes = prompt('Enter notes:') || '';
                            setRenewals([...renewals, { name, issued, expires, notes }]);
                        }
                    }}
                    className="px-6 py-1.5 border border-gray-400 bg-white text-sm text-gray-700 hover:bg-gray-100"
                >
                    Add
                </button>
                <button
                    onClick={() => {
                        if (selectedRenewalIndex !== null && renewals[selectedRenewalIndex]) {
                            const renewal = renewals[selectedRenewalIndex];
                            const name = prompt('Edit renewal name:', renewal.name);
                            if (name) {
                                const issued = prompt('Edit issued date:', renewal.issued) || '';
                                const expires = prompt('Edit expiry date:', renewal.expires) || '';
                                const notes = prompt('Edit notes:', renewal.notes) || '';
                                const updated = [...renewals];
                                updated[selectedRenewalIndex] = { name, issued, expires, notes };
                                setRenewals(updated);
                            }
                        }
                    }}
                    className="px-6 py-1.5 border border-gray-400 bg-white text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    disabled={selectedRenewalIndex === null}
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        if (selectedRenewalIndex !== null) {
                            const updated = renewals.filter((_, i) => i !== selectedRenewalIndex);
                            setRenewals(updated);
                            setSelectedRenewalIndex(null);
                        }
                    }}
                    className="px-6 py-1.5 border border-gray-400 bg-white text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    disabled={selectedRenewalIndex === null}
                >
                    Delete
                </button>
            </div>

            {/* Renewal Notifications Section */}
            <fieldset className="border-l-4 border-l-blue-500 border border-gray-300 rounded px-4 pb-4 pt-2 bg-white">
                <legend className="text-sm text-blue-600 px-1 font-medium">Renewal Notifications</legend>
                <div className="space-y-3 mt-2">
                    <p className="text-sm text-gray-600">
                        Choose one or more recipients to be notified via e-mail when renewals for this employee are due or upcoming:
                    </p>
                    <select
                        value={renewalNotificationContact}
                        onChange={(e) => setRenewalNotificationContact(e.target.value)}
                        className="w-full h-8 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
                    >
                        <option value="">0 contact(s) listed.</option>
                    </select>
                </div>
            </fieldset>
        </div>
    );

    // Notifications Tab Content
    const NotificationsTabContent = () => {
        const allMaintenanceChecked = equipmentNotifications.every(eq => eq.maintenance);
        const allRenewalsChecked = equipmentNotifications.every(eq => eq.renewals);
        const allWorkOrdersChecked = equipmentNotifications.every(eq => eq.workOrders);

        const toggleAll = (field) => {
            const allChecked = equipmentNotifications.every(eq => eq[field]);
            setEquipmentNotifications(equipmentNotifications.map(eq => ({
                ...eq,
                [field]: !allChecked
            })));
        };

        const toggleOne = (index, field) => {
            const updated = [...equipmentNotifications];
            updated[index] = { ...updated[index], [field]: !updated[index][field] };
            setEquipmentNotifications(updated);
        };

        return (
            <div className="space-y-4">
                {/* Location Filter */}
                <select
                    value={notificationLocation}
                    onChange={(e) => setNotificationLocation(e.target.value)}
                    className="w-64 h-8 px-2 border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                    <option value="General Equipment">General Equipment</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Production Floor">Production Floor</option>
                    <option value="Office">Office</option>
                </select>

                {/* Notifications Table */}
                <div className="border border-gray-300 bg-white">
                    {/* Header Row with Select All Checkboxes */}
                    <div className="grid grid-cols-[1fr_100px_100px_100px] border-b border-gray-300">
                        <div className="px-3 py-2"></div>
                        <div className="px-3 py-2 flex items-center justify-center border-l border-gray-300">
                            <input
                                type="checkbox"
                                checked={allMaintenanceChecked}
                                onChange={() => toggleAll('maintenance')}
                                className="w-4 h-4 accent-blue-600"
                            />
                        </div>
                        <div className="px-3 py-2 flex items-center justify-center border-l border-gray-300">
                            <input
                                type="checkbox"
                                checked={allRenewalsChecked}
                                onChange={() => toggleAll('renewals')}
                                className="w-4 h-4 accent-blue-600"
                            />
                        </div>
                        <div className="px-3 py-2 flex items-center justify-center border-l border-gray-300">
                            <input
                                type="checkbox"
                                checked={allWorkOrdersChecked}
                                onChange={() => toggleAll('workOrders')}
                                className="w-4 h-4 accent-blue-600"
                            />
                        </div>
                    </div>

                    {/* Column Headers */}
                    <div className="grid grid-cols-[1fr_100px_100px_100px] border-b border-gray-300 bg-gray-50">
                        <div className="px-3 py-2 text-sm font-medium text-gray-700">Equipment</div>
                        <div className="px-3 py-2 text-sm font-medium text-gray-700 text-center border-l border-gray-300">Maintenance</div>
                        <div className="px-3 py-2 text-sm font-medium text-gray-700 text-center border-l border-gray-300">Renewals</div>
                        <div className="px-3 py-2 text-sm font-medium text-gray-700 text-center border-l border-gray-300">Work Orders</div>
                    </div>

                    {/* Equipment Rows */}
                    {equipmentNotifications.map((equipment, index) => (
                        <div
                            key={equipment.id}
                            className="grid grid-cols-[1fr_100px_100px_100px] border-b border-gray-200 hover:bg-gray-50"
                        >
                            <div className="px-3 py-2 text-sm text-gray-700">{equipment.name}</div>
                            <div className="px-3 py-2 flex items-center justify-center border-l border-gray-200">
                                <input
                                    type="checkbox"
                                    checked={equipment.maintenance}
                                    onChange={() => toggleOne(index, 'maintenance')}
                                    className="w-4 h-4 accent-blue-600"
                                />
                            </div>
                            <div className="px-3 py-2 flex items-center justify-center border-l border-gray-200">
                                <input
                                    type="checkbox"
                                    checked={equipment.renewals}
                                    onChange={() => toggleOne(index, 'renewals')}
                                    className="w-4 h-4 accent-blue-600"
                                />
                            </div>
                            <div className="px-3 py-2 flex items-center justify-center border-l border-gray-200">
                                <input
                                    type="checkbox"
                                    checked={equipment.workOrders}
                                    onChange={() => toggleOne(index, 'workOrders')}
                                    className="w-4 h-4 accent-blue-600"
                                />
                            </div>
                        </div>
                    ))}

                    {/* Empty space at bottom */}
                    <div className="min-h-[100px]"></div>
                </div>
            </div>
        );
    };

    // Photos Tab Content
    const PhotosTabContent = () => {
        const fileInputRef = React.useRef(null);

        const handleDrop = (e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            if (files.length > 0) {
                const newPhotos = files.map(file => ({
                    name: file.name,
                    url: URL.createObjectURL(file),
                    file: file
                }));
                setPhotos([...photos, ...newPhotos]);
            }
        };

        const handleDragOver = (e) => {
            e.preventDefault();
        };

        const handleAddClick = () => {
            fileInputRef.current?.click();
        };

        const handleFileSelect = (e) => {
            const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
            if (files.length > 0) {
                const newPhotos = files.map(file => ({
                    name: file.name,
                    url: URL.createObjectURL(file),
                    file: file
                }));
                setPhotos([...photos, ...newPhotos]);
            }
        };

        const handleDelete = () => {
            if (selectedPhotoIndex !== null) {
                const updated = photos.filter((_, i) => i !== selectedPhotoIndex);
                setPhotos(updated);
                setSelectedPhotoIndex(null);
            }
        };

        const handleViewImage = () => {
            if (selectedPhotoIndex !== null && photos[selectedPhotoIndex]) {
                window.open(photos[selectedPhotoIndex].url, '_blank');
            }
        };

        return (
            <div className="space-y-4">
                {/* Photo Drop Zone */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border border-gray-300 bg-white min-h-[350px] flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => photos.length === 0 && handleAddClick()}
                >
                    {photos.length === 0 ? (
                        <p className="text-sm text-gray-500">&lt;Add a photo or drag &amp; drop your photo into this area&gt;</p>
                    ) : (
                        <div className="w-full h-full p-4 grid grid-cols-4 gap-4">
                            {photos.map((photo, index) => (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPhotoIndex(index);
                                    }}
                                    className={`relative aspect-square border-2 rounded overflow-hidden cursor-pointer ${selectedPhotoIndex === index ? 'border-blue-500' : 'border-gray-300'
                                        }`}
                                >
                                    <img
                                        src={photo.url}
                                        alt={photo.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {/* Action Buttons */}
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddClick}
                            className="px-6 py-1.5 border border-gray-400 bg-white text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Add
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-6 py-1.5 border border-gray-400 bg-white text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                            disabled={selectedPhotoIndex === null}
                        >
                            Delete
                        </button>
                    </div>
                    <button
                        onClick={handleViewImage}
                        className="px-6 py-1.5 border border-gray-400 bg-white text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        disabled={selectedPhotoIndex === null}
                    >
                        View Image
                    </button>
                </div>
            </div>
        );
    };

    // Attachments Tab Content
    const AttachmentsTabContent = () => {
        const fileInputRef = React.useRef(null);

        const handleDrop = (e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);
            const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit
            if (validFiles.length > 0) {
                const newAttachments = validFiles.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file
                }));
                setAttachments([...attachments, ...newAttachments]);
            }
            if (validFiles.length < files.length) {
                alert('Some files were skipped because they exceed the 5MB size limit.');
            }
        };

        const handleDragOver = (e) => {
            e.preventDefault();
        };

        const handleAddClick = () => {
            fileInputRef.current?.click();
        };

        const handleFileSelect = (e) => {
            const files = Array.from(e.target.files);
            const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit
            if (validFiles.length > 0) {
                const newAttachments = validFiles.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file
                }));
                setAttachments([...attachments, ...newAttachments]);
            }
            if (validFiles.length < files.length) {
                alert('Some files were skipped because they exceed the 5MB size limit.');
            }
        };

        const formatFileSize = (bytes) => {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        };

        return (
            <div className="space-y-4">
                {/* Header */}
                <div className="border border-gray-300 bg-white">
                    <div className="px-3 py-2 border-b border-gray-300 bg-gray-50">
                        <span className="text-sm font-medium text-gray-700">Attachment Description</span>
                    </div>

                    {/* Drop Zone */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleAddClick}
                        className="min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                        {attachments.length === 0 ? (
                            <p className="text-sm text-gray-500">&lt;Add an attachment or drag &amp; drop your attachment into this area&gt;</p>
                        ) : (
                            <div className="w-full p-4 space-y-2">
                                {attachments.map((attachment, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-2 border border-gray-200 rounded bg-gray-50 hover:bg-gray-100"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-700">{attachment.name}</span>
                                            <span className="text-xs text-gray-500">({formatFileSize(attachment.size)})</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const updated = attachments.filter((_, i) => i !== index);
                                                setAttachments(updated);
                                            }}
                                            className="text-red-500 hover:text-red-700 text-sm px-2"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {/* Info Message */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-blue-500 mt-0.5">ⓘ</span>
                    <p>
                        Use this area to store employee documents for easy access such as manuals,
                        spreadsheets, or any other type of document. (5 MB file size limit)
                    </p>
                </div>
            </div>
        );
    };

    // Placeholder content for other tabs
    const PlaceholderTabContent = ({ tabName }) => (
        <div className="flex items-center justify-center h-64 text-gray-400">
            <p>{tabName} content will be displayed here</p>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'employee':
                return <EmployeeTabContent />;
            case 'details':
                return <DetailsTabContent />;
            case 'renewals':
                return <RenewalsTabContent />;
            case 'notifications':
                return <NotificationsTabContent />;
            case 'photos':
                return <PhotosTabContent />;
            case 'attachments':
                return <AttachmentsTabContent />;
            default:
                return <EmployeeTabContent />;
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
            {/* Modal Container */}
            <div className="bg-[#f0f0f0] rounded shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#2b579a] text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-yellow-500 rounded-sm flex items-center justify-center">
                            <span className="text-xs font-bold text-white">👤</span>
                        </div>
                        <h2 className="text-sm font-normal">New Employee</h2>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-white/20 rounded">
                            <HelpCircle className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-red-500 rounded"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-300 bg-white">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm border-r border-gray-200 transition-colors ${activeTab === tab.id
                                ? 'bg-[#f0f0f0] text-gray-800 font-medium border-b-2 border-b-white -mb-[1px]'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-4 bg-[#f0f0f0] overflow-y-auto max-h-[60vh]">
                    {renderTabContent()}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-gray-300 bg-[#f0f0f0]">
                    <Button
                        onClick={handleSave}
                        className="bg-[#2b579a] hover:bg-[#1e3f6f] text-white px-6 h-9 flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Save
                    </Button>
                    <Button
                        onClick={handleSaveAndNew}
                        className="bg-[#2b579a] hover:bg-[#1e3f6f] text-white px-6 h-9 flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Save +
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-400 text-gray-700 hover:bg-gray-200 px-6 h-9"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewEmployeeModal;
