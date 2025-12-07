import React, { useState } from 'react';
import {
    X,
    HelpCircle,
    Plus,
    Info,
    Check,
    ChevronDown,
} from 'lucide-react';

const NewEquipmentModal = ({ isOpen, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('main');
    const [saveAsDefaults, setSaveAsDefaults] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        // Identification
        unitNumber: '',
        make: '',
        model: '',
        year: '',
        serialNumber: '',
        tagNumber: '',
        type: '',
        description: '',
        // Assignment
        location: 'Emergency (Generators)',
        status: 'Active',
        operator: '',
        costCenter: '',
        parent: '',
        syncWithParentMeters: false,
        // PM Schedule Template
        pmScheduleTemplate: 'No Schedule',
        // Meter Configuration
        primaryMeter: 'no meter',
        primaryMeterValue: '0',
        secondaryMeter: 'no meter',
        secondaryMeterValue: '0',
        // Custom Fields (Main tab)
        btu: '',
        inputVolts: '',
        dateInstalled: '',
        customField1: '',
        customField2: '',
        // Specifications - Physical Attributes
        color: '',
        length: '',
        width: '',
        height: '',
        grossWeight: '0',
        // Specifications - Custom Fields (12 fields)
        specCustomField1: '',
        specCustomField2: '',
        specCustomField3: '',
        specCustomField4: '',
        specCustomField5: '',
        specCustomField6: '',
        specCustomField7: '',
        specCustomField8: '',
        specCustomField9: '',
        specCustomField10: '',
        specCustomField11: '',
        specCustomField12: '',
        // Warranty - Primary
        primaryWarrantyName: '',
        primaryWarrantyDate: '',
        primaryWarrantyMeter: '0',
        // Warranty - Secondary
        secondaryWarrantyName: '',
        secondaryWarrantyDate: '',
        secondaryWarrantyMeter: '0',
        // Warranty - Custom Fields (10 fields)
        warrantyCustomField1: '',
        warrantyUdf19: '',
        warrantyCustomField2: '',
        warrantyCustomField3: '',
        warrantyCustomField4: '',
        warrantyCustomField5: '',
        warrantyCustomField6: '',
        warrantyCustomField7: '',
        warrantyCustomField8: '',
        warrantyCustomField9: '',
        // Purchase Details
        purchaseDealer: '',
        purchaseDescription: '',
        purchaseDate: '',
        purchaseMeter: '',
        purchasePrice: '0.00',
        purchaseCustomField1: '',
        purchaseCustomField2: '',
        purchaseNotes: '',
        // Depreciation
        startingValue: '0.00',
        salvageValue: '0.00',
        termMonths: '0',
        depreciationMonthly: '0.00',
        currentValue: '0.00',
        // Ownership / Status
        ownership: '',
        ownershipExtra: '',
        inService: '',
        outOfService: '',
        transferred: '',
        dateSold: '',
        soldTo: '',
        ownershipNotes: '',
        // Notes tab
        notes: '',
    });

    const tabs = [
        { id: 'main', label: 'Main' },
        { id: 'specifications', label: 'Specifications' },
        { id: 'warranty', label: 'Warranty/Misc' },
        { id: 'purchase', label: 'Purchase' },
        { id: 'images', label: 'Images' },
        { id: 'attachments', label: 'Attachments' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'expenses', label: 'Expenses' },
        { id: 'notes', label: 'Notes' },
        { id: 'settings', label: 'Settings' },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (createAnother = false) => {
        try {
            // Firebase submission would go here
            if (onSave) {
                await onSave(formData);
            }
            if (!createAnother) {
                onClose();
            } else {
                // Reset form for new entry
                setFormData({
                    unitNumber: '',
                    make: '',
                    model: '',
                    year: '',
                    serialNumber: '',
                    tagNumber: '',
                    type: '',
                    description: '',
                    location: 'Emergency (Generators)',
                    status: 'Active',
                    operator: '',
                    costCenter: '',
                    parent: '',
                    syncWithParentMeters: false,
                    pmScheduleTemplate: 'No Schedule',
                    primaryMeter: 'no meter',
                    primaryMeterValue: '0',
                    secondaryMeter: 'no meter',
                    secondaryMeterValue: '0',
                    btu: '',
                    inputVolts: '',
                    dateInstalled: '',
                    customField1: '',
                    customField2: '',
                    color: '',
                    length: '',
                    width: '',
                    height: '',
                    grossWeight: '0',
                    specCustomField1: '',
                    specCustomField2: '',
                    specCustomField3: '',
                    specCustomField4: '',
                    specCustomField5: '',
                    specCustomField6: '',
                    specCustomField7: '',
                    specCustomField8: '',
                    specCustomField9: '',
                    specCustomField10: '',
                    specCustomField11: '',
                    specCustomField12: '',
                    primaryWarrantyName: '',
                    primaryWarrantyDate: '',
                    primaryWarrantyMeter: '0',
                    secondaryWarrantyName: '',
                    secondaryWarrantyDate: '',
                    secondaryWarrantyMeter: '0',
                    warrantyCustomField1: '',
                    warrantyUdf19: '',
                    warrantyCustomField2: '',
                    warrantyCustomField3: '',
                    warrantyCustomField4: '',
                    warrantyCustomField5: '',
                    warrantyCustomField6: '',
                    warrantyCustomField7: '',
                    warrantyCustomField8: '',
                    warrantyCustomField9: '',
                });
            }
        } catch (error) {
            console.error('Error saving equipment:', error);
        }
    };

    if (!isOpen) return null;

    // Dropdown component
    const SelectField = ({ label, value, onChange, options = [], placeholder = '' }) => (
        <div className="flex items-center gap-3">
            <label className="w-20 text-sm text-gray-600 text-right flex-shrink-0">{label}</label>
            <div className="relative flex-1">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );

    // Input field component
    const InputField = ({ label, value, onChange, required = false, placeholder = '' }) => (
        <div className="flex items-center gap-3">
            <label className="w-20 text-sm text-gray-600 text-right flex-shrink-0">
                {required && <span className="text-red-500 mr-1">*</span>}
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );

    // Main tab content
    const MainContent = () => (
        <div className="grid grid-cols-2 gap-6 p-4">
            {/* Left Column */}
            <div className="space-y-6">
                {/* Identification Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Identification</h3>
                    <div className="space-y-3">
                        <InputField
                            label="Unit #:"
                            value={formData.unitNumber}
                            onChange={(v) => handleInputChange('unitNumber', v)}
                            required
                        />
                        <SelectField
                            label="Make:"
                            value={formData.make}
                            onChange={(v) => handleInputChange('make', v)}
                            options={[
                                { value: 'caterpillar', label: 'Caterpillar' },
                                { value: 'john-deere', label: 'John Deere' },
                                { value: 'komatsu', label: 'Komatsu' },
                                { value: 'ford', label: 'Ford' },
                                { value: 'chevrolet', label: 'Chevrolet' },
                            ]}
                        />
                        <SelectField
                            label="Model:"
                            value={formData.model}
                            onChange={(v) => handleInputChange('model', v)}
                            options={[]}
                        />
                        <InputField
                            label="Year:"
                            value={formData.year}
                            onChange={(v) => handleInputChange('year', v)}
                        />
                        <InputField
                            label="Serial #:"
                            value={formData.serialNumber}
                            onChange={(v) => handleInputChange('serialNumber', v)}
                        />
                        <InputField
                            label="Tag #:"
                            value={formData.tagNumber}
                            onChange={(v) => handleInputChange('tagNumber', v)}
                        />
                        <SelectField
                            label="Type:"
                            value={formData.type}
                            onChange={(v) => handleInputChange('type', v)}
                            options={[
                                { value: 'vehicle', label: 'Vehicle' },
                                { value: 'equipment', label: 'Equipment' },
                                { value: 'generator', label: 'Generator' },
                                { value: 'trailer', label: 'Trailer' },
                            ]}
                        />
                        <InputField
                            label="Desc:"
                            value={formData.description}
                            onChange={(v) => handleInputChange('description', v)}
                        />
                    </div>
                </div>

                {/* Assignment Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Assignment</h3>
                    <div className="space-y-3">
                        <SelectField
                            label="Location:"
                            value={formData.location}
                            onChange={(v) => handleInputChange('location', v)}
                            options={[
                                { value: 'Emergency (Generators)', label: 'Emergency (Generators)' },
                                { value: 'Main Facility', label: 'Main Facility' },
                                { value: 'Warehouse', label: 'Warehouse' },
                                { value: 'Field Operations', label: 'Field Operations' },
                            ]}
                        />
                        <SelectField
                            label="Status:"
                            value={formData.status}
                            onChange={(v) => handleInputChange('status', v)}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                                { value: 'In Shop', label: 'In Shop' },
                                { value: 'Out of Service', label: 'Out of Service' },
                            ]}
                        />
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right flex-shrink-0">Operator:</label>
                            <div className="flex-1 flex gap-2">
                                <div className="relative flex-1">
                                    <select
                                        value={formData.operator}
                                        onChange={(e) => handleInputChange('operator', e.target.value)}
                                        className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                    >
                                        <option value="">Type Name or Employee #</option>
                                        <option value="john-doe">John Doe</option>
                                        <option value="jane-smith">Jane Smith</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <SelectField
                            label="Cost Center:"
                            value={formData.costCenter}
                            onChange={(v) => handleInputChange('costCenter', v)}
                            options={[]}
                        />
                        <SelectField
                            label="Parent:"
                            value={formData.parent}
                            onChange={(v) => handleInputChange('parent', v)}
                            options={[]}
                        />
                        <div className="flex items-center gap-3 pl-24">
                            <input
                                type="checkbox"
                                id="syncMeters"
                                checked={formData.syncWithParentMeters}
                                onChange={(e) => handleInputChange('syncWithParentMeters', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <label htmlFor="syncMeters" className="text-sm text-gray-500">
                                Sync with parent meters
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                {/* PM Schedule Template Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">PM Schedule Template</h3>
                    <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm font-medium text-gray-800">{formData.pmScheduleTemplate}</span>
                        <button className="px-4 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
                            Select...
                        </button>
                    </div>
                    <div className="flex gap-2 p-3 bg-blue-50 rounded text-sm text-blue-700">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p>Selecting an existing PM schedule template can save data entry time. Or you may add individual PM services after the equipment is saved.</p>
                    </div>
                </div>

                {/* Meter Configuration Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Meter Configuration</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Primary:</label>
                            <div className="flex gap-2 flex-1">
                                <div className="relative flex-1">
                                    <select
                                        value={formData.primaryMeter}
                                        onChange={(e) => handleInputChange('primaryMeter', e.target.value)}
                                        className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                    >
                                        <option value="no meter">(no meter)</option>
                                        <option value="odometer">Odometer (miles)</option>
                                        <option value="hours">Hours</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.primaryMeterValue}
                                    onChange={(e) => handleInputChange('primaryMeterValue', e.target.value)}
                                    className="w-20 h-8 px-3 text-sm border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Secondary:</label>
                            <div className="flex gap-2 flex-1">
                                <div className="relative flex-1">
                                    <select
                                        value={formData.secondaryMeter}
                                        onChange={(e) => handleInputChange('secondaryMeter', e.target.value)}
                                        className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                    >
                                        <option value="no meter">(no meter)</option>
                                        <option value="odometer">Odometer (miles)</option>
                                        <option value="hours">Hours</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.secondaryMeterValue}
                                    onChange={(e) => handleInputChange('secondaryMeterValue', e.target.value)}
                                    className="w-20 h-8 px-3 text-sm border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Fields Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Custom Fields</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-blue-500 text-right">BTU:</label>
                            <input
                                type="text"
                                value={formData.btu}
                                onChange={(e) => handleInputChange('btu', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-blue-500 text-right">Input Volts:</label>
                            <input
                                type="text"
                                value={formData.inputVolts}
                                onChange={(e) => handleInputChange('inputVolts', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-blue-500 text-right">Date Installed:</label>
                            <input
                                type="text"
                                value={formData.dateInstalled}
                                onChange={(e) => handleInputChange('dateInstalled', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.customField1}
                                onChange={(e) => handleInputChange('customField1', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.customField2}
                                onChange={(e) => handleInputChange('customField2', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Specifications Tab Content
    const SpecificationsContent = () => (
        <div className="p-4 space-y-6">
            {/* Physical Attributes Section */}
            <div className="border border-gray-200 rounded p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                    Physical Attributes
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <label className="w-24 text-sm text-gray-600 text-right">Color:</label>
                        <div className="relative w-48">
                            <select
                                value={formData.color}
                                onChange={(e) => handleInputChange('color', e.target.value)}
                                className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                            >
                                <option value=""></option>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="yellow">Yellow</option>
                                <option value="silver">Silver</option>
                                <option value="gray">Gray</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-24 text-sm text-gray-600 text-right">Length:</label>
                        <input
                            type="text"
                            value={formData.length}
                            onChange={(e) => handleInputChange('length', e.target.value)}
                            className="w-48 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-24 text-sm text-gray-600 text-right">Width:</label>
                        <input
                            type="text"
                            value={formData.width}
                            onChange={(e) => handleInputChange('width', e.target.value)}
                            className="w-48 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-24 text-sm text-gray-600 text-right">Height:</label>
                        <input
                            type="text"
                            value={formData.height}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                            className="w-48 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label className="w-24 text-sm text-gray-600 text-right">Gross Weight:</label>
                        <input
                            type="number"
                            value={formData.grossWeight}
                            onChange={(e) => handleInputChange('grossWeight', e.target.value)}
                            className="w-48 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Custom Fields Section */}
            <div className="border border-gray-200 rounded p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                    Custom Fields
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField1}
                                onChange={(e) => handleInputChange('specCustomField1', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField2}
                                onChange={(e) => handleInputChange('specCustomField2', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField3}
                                onChange={(e) => handleInputChange('specCustomField3', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField4}
                                onChange={(e) => handleInputChange('specCustomField4', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField5}
                                onChange={(e) => handleInputChange('specCustomField5', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField6}
                                onChange={(e) => handleInputChange('specCustomField6', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField7}
                                onChange={(e) => handleInputChange('specCustomField7', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField8}
                                onChange={(e) => handleInputChange('specCustomField8', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField9}
                                onChange={(e) => handleInputChange('specCustomField9', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField10}
                                onChange={(e) => handleInputChange('specCustomField10', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField11}
                                onChange={(e) => handleInputChange('specCustomField11', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.specCustomField12}
                                onChange={(e) => handleInputChange('specCustomField12', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Warranty/Misc Tab Content
    const WarrantyContent = () => (
        <div className="p-4 space-y-6">
            {/* Two-column layout for Primary and Secondary Warranty */}
            <div className="grid grid-cols-2 gap-6">
                {/* Primary Warranty Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                        Primary Warranty
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-gray-600 text-right">Name:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.primaryWarrantyName}
                                    onChange={(e) => handleInputChange('primaryWarrantyName', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                    <option value="manufacturer">Manufacturer Warranty</option>
                                    <option value="extended">Extended Warranty</option>
                                    <option value="dealer">Dealer Warranty</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-gray-600 text-right">Date:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.primaryWarrantyDate}
                                    onChange={(e) => handleInputChange('primaryWarrantyDate', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                    <option value="1year">1 Year</option>
                                    <option value="2year">2 Years</option>
                                    <option value="3year">3 Years</option>
                                    <option value="5year">5 Years</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-gray-600 text-right">Meter:</label>
                            <input
                                type="number"
                                value={formData.primaryWarrantyMeter}
                                onChange={(e) => handleInputChange('primaryWarrantyMeter', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Secondary Warranty Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                        Secondary Warranty
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-gray-600 text-right">Name:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.secondaryWarrantyName}
                                    onChange={(e) => handleInputChange('secondaryWarrantyName', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                    <option value="manufacturer">Manufacturer Warranty</option>
                                    <option value="extended">Extended Warranty</option>
                                    <option value="dealer">Dealer Warranty</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-gray-600 text-right">Date:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.secondaryWarrantyDate}
                                    onChange={(e) => handleInputChange('secondaryWarrantyDate', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                    <option value="1year">1 Year</option>
                                    <option value="2year">2 Years</option>
                                    <option value="3year">3 Years</option>
                                    <option value="5year">5 Years</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-16 text-sm text-gray-600 text-right">Meter:</label>
                            <input
                                type="number"
                                value={formData.secondaryWarrantyMeter}
                                onChange={(e) => handleInputChange('secondaryWarrantyMeter', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Fields Section */}
            <div className="border border-gray-200 rounded p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                    Custom Fields
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField1}
                                onChange={(e) => handleInputChange('warrantyCustomField1', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-blue-500 text-right">UDF #19:</label>
                            <input
                                type="text"
                                value={formData.warrantyUdf19}
                                onChange={(e) => handleInputChange('warrantyUdf19', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField2}
                                onChange={(e) => handleInputChange('warrantyCustomField2', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField3}
                                onChange={(e) => handleInputChange('warrantyCustomField3', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField4}
                                onChange={(e) => handleInputChange('warrantyCustomField4', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField5}
                                onChange={(e) => handleInputChange('warrantyCustomField5', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField6}
                                onChange={(e) => handleInputChange('warrantyCustomField6', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField7}
                                onChange={(e) => handleInputChange('warrantyCustomField7', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField8}
                                onChange={(e) => handleInputChange('warrantyCustomField8', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.warrantyCustomField9}
                                onChange={(e) => handleInputChange('warrantyCustomField9', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Purchase Tab Content
    const PurchaseContent = () => (
        <div className="p-4 space-y-6">
            {/* Two-column layout for Purchase Details and Depreciation */}
            <div className="grid grid-cols-2 gap-6">
                {/* Purchase Details Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                        Purchase Details
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Dealer:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.purchaseDealer}
                                    onChange={(e) => handleInputChange('purchaseDealer', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                    <option value="dealer1">Dealer 1</option>
                                    <option value="dealer2">Dealer 2</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <textarea
                            value={formData.purchaseDescription}
                            onChange={(e) => handleInputChange('purchaseDescription', e.target.value)}
                            className="w-full h-24 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                            placeholder=""
                        />
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Date:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.purchaseDate}
                                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-500 text-right">(no meter):</label>
                            <input
                                type="text"
                                value={formData.purchaseMeter}
                                onChange={(e) => handleInputChange('purchaseMeter', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Price:</label>
                            <input
                                type="text"
                                value={`$${formData.purchasePrice}`}
                                onChange={(e) => handleInputChange('purchasePrice', e.target.value.replace('$', ''))}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.purchaseCustomField1}
                                onChange={(e) => handleInputChange('purchaseCustomField1', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-500 text-right">(custom field):</label>
                            <input
                                type="text"
                                value={formData.purchaseCustomField2}
                                onChange={(e) => handleInputChange('purchaseCustomField2', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Notes:</label>
                            <input
                                type="text"
                                value={formData.purchaseNotes}
                                onChange={(e) => handleInputChange('purchaseNotes', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Depreciation Section */}
                <div className="border border-gray-200 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                        Depreciation
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-gray-600 text-right">Starting Value:</label>
                            <input
                                type="text"
                                value={`$${formData.startingValue}`}
                                onChange={(e) => handleInputChange('startingValue', e.target.value.replace('$', ''))}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-gray-600 text-right">Salvage Value:</label>
                            <input
                                type="text"
                                value={`$${formData.salvageValue}`}
                                onChange={(e) => handleInputChange('salvageValue', e.target.value.replace('$', ''))}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-28 text-sm text-gray-600 text-right">Term (Months):</label>
                            <input
                                type="number"
                                value={formData.termMonths}
                                onChange={(e) => handleInputChange('termMonths', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                            />
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <label className="w-36 text-sm text-gray-600 text-right">Depreciation (Monthly):</label>
                            </div>
                            <div className="bg-blue-100 border border-blue-200 rounded p-3 text-center">
                                <span className="text-lg font-medium text-gray-700">${formData.depreciationMonthly}</span>
                            </div>
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <label className="w-28 text-sm text-gray-600 text-right">Current Value:</label>
                            </div>
                            <div className="bg-blue-100 border border-blue-200 rounded p-3 text-center">
                                <span className="text-lg font-medium text-gray-700">${formData.currentValue}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ownership / Status Section */}
            <div className="border border-gray-200 rounded p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 -mt-6 -ml-1 bg-white px-1 inline-block">
                    Ownership / Status
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-600 text-right">Ownership:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.ownership}
                                    onChange={(e) => handleInputChange('ownership', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                    <option value="owned">Owned</option>
                                    <option value="leased">Leased</option>
                                    <option value="rented">Rented</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-600 text-right"></label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.ownershipExtra}
                                    onChange={(e) => handleInputChange('ownershipExtra', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-300 rounded">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-600 text-right">In Service:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.inService}
                                    onChange={(e) => handleInputChange('inService', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-24 text-sm text-gray-600 text-right">Out of Service:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.outOfService}
                                    onChange={(e) => handleInputChange('outOfService', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Transferred:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.transferred}
                                    onChange={(e) => handleInputChange('transferred', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Date Sold:</label>
                            <div className="relative flex-1">
                                <select
                                    value={formData.dateSold}
                                    onChange={(e) => handleInputChange('dateSold', e.target.value)}
                                    className="w-full h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                >
                                    <option value=""></option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Sold To:</label>
                            <input
                                type="text"
                                value={formData.soldTo}
                                onChange={(e) => handleInputChange('soldTo', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-gray-600 text-right">Notes:</label>
                            <input
                                type="text"
                                value={formData.ownershipNotes}
                                onChange={(e) => handleInputChange('ownershipNotes', e.target.value)}
                                className="flex-1 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Images Tab Content
    const ImagesContent = () => (
        <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Images</h3>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors">
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        View
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>

            {/* Image Upload Area */}
            <div className="flex-1 border border-gray-300 rounded-lg bg-white flex items-center justify-center min-h-[350px]">
                <div className="text-center">
                    <p className="text-gray-400 text-sm">
                        &lt;Add a photo or drag & drop your photo into this area&gt;
                    </p>
                </div>
            </div>
        </div>
    );

    // Attachments Tab Content
    const AttachmentsContent = () => (
        <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Attachments</h3>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors">
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        Scan
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        Scan to PDF
                    </button>
                </div>
            </div>

            {/* Attachment List Area */}
            <div className="flex-1 border border-gray-300 rounded-lg bg-white flex flex-col min-h-[300px]">
                {/* Column Header */}
                <div className="border-b border-gray-200 px-4 py-2 bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">Attachment</span>
                </div>

                {/* Drop Zone */}
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">
                        &lt;Add an attachment or drag & drop your attachment into this area&gt;
                    </p>
                </div>
            </div>

            {/* Info Message */}
            <div className="flex items-center gap-2 mt-4 text-gray-500">
                <Info className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Attach equipment documents for quick access such as manuals, spreadsheets, or other types of documents.</span>
            </div>
        </div>
    );

    // Notifications Tab Content
    const NotificationsContent = () => (
        <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Email Notifications</h3>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors">
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>

            {/* Notifications Table */}
            <div className="flex-1 border border-gray-300 rounded-lg bg-white flex flex-col min-h-[280px]">
                {/* Table Header */}
                <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 border-r border-gray-200">Name</div>
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 border-r border-gray-200">Email</div>
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 border-r border-gray-200 text-center">Maintenance</div>
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 border-r border-gray-200 text-center">Renewals</div>
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 text-center">Work Orders</div>
                </div>

                {/* Empty State */}
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">&lt;No data to display&gt;</p>
                </div>
            </div>

            {/* Info Message */}
            <div className="flex items-start gap-2 mt-4 text-gray-500">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Specify employees, vendors, or customers who should receive email notifications for maintenance due, annual renewals, or work orders for this equipment.</span>
            </div>
        </div>
    );

    // Expenses Tab Content
    const ExpensesContent = () => (
        <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Automatic Expense Logging</h3>
                <div className="flex items-center gap-2">
                    <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors">
                        Add
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded border border-gray-300 transition-colors">
                        Delete
                    </button>
                </div>
            </div>

            {/* Expenses Table */}
            <div className="flex-1 border border-gray-300 rounded-lg bg-white flex flex-col min-h-[280px]">
                {/* Table Header */}
                <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-200">Expense</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-200">Last Date</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-200">Next Date</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-200 text-center">Interval</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-200 text-center">Period</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-200 text-center">Quantity</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 border-r border-gray-200 text-center">Cost</div>
                    <div className="px-3 py-2 text-sm font-medium text-gray-700 text-center">Notes</div>
                </div>

                {/* Empty State */}
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">&lt; Right click to add items &gt;</p>
                </div>
            </div>

            {/* Info Message */}
            <div className="flex items-start gap-2 mt-4 text-gray-500">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">You may specify routine expenses such as insurance premiums, loan/lease payments, etc. to be automatically logged to the general expense history for this equipment.</span>
            </div>
        </div>
    );

    // Notes Tab Content
    const NotesContent = () => (
        <div className="p-4 h-full flex flex-col">
            <textarea
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="flex-1 w-full p-4 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[400px]"
                placeholder=""
            />
        </div>
    );

    // Settings Tab Content
    const SettingsContent = () => {
        const [trackSettings, setTrackSettings] = React.useState({
            specifications: true,
            insurance: false,
            expenses: true,
            warrantyMisc: true,
            notes: true,
            purchase: true,
            images: true,
            notifications: true,
            loanLease: false,
            attachments: true,
        });
        const [budget, setBudget] = React.useState('0.00');
        const [enableMeter1, setEnableMeter1] = React.useState(false);
        const [enableMeter2, setEnableMeter2] = React.useState(false);
        const [avgDaily1, setAvgDaily1] = React.useState('0');
        const [avgDaily2, setAvgDaily2] = React.useState('0');
        const [lastMaintenanceCheck, setLastMaintenanceCheck] = React.useState('12/7/2025');

        const handleTrackChange = (key) => {
            setTrackSettings(prev => ({ ...prev, [key]: !prev[key] }));
        };

        return (
            <div className="p-4 space-y-4 overflow-auto">
                {/* Track Details Section */}
                <div className="border border-gray-200 rounded p-4 relative">
                    <h3 className="text-sm font-semibold text-gray-700 absolute -top-3 left-3 bg-white px-1">
                        Track the following details for this equipment:
                    </h3>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-2 mt-2">
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.specifications} onChange={() => handleTrackChange('specifications')} className="w-4 h-4" />
                            Specifications
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.insurance} onChange={() => handleTrackChange('insurance')} className="w-4 h-4" />
                            Insurance
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.expenses} onChange={() => handleTrackChange('expenses')} className="w-4 h-4" />
                            Expenses
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.warrantyMisc} onChange={() => handleTrackChange('warrantyMisc')} className="w-4 h-4" />
                            Warranty / Misc
                        </label>
                        <div></div>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.notes} onChange={() => handleTrackChange('notes')} className="w-4 h-4" />
                            Notes
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.purchase} onChange={() => handleTrackChange('purchase')} className="w-4 h-4" />
                            Purchase
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.images} onChange={() => handleTrackChange('images')} className="w-4 h-4" />
                            Images
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.notifications} onChange={() => handleTrackChange('notifications')} className="w-4 h-4" />
                            Notifications
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.loanLease} onChange={() => handleTrackChange('loanLease')} className="w-4 h-4" />
                            Loan / Lease
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={trackSettings.attachments} onChange={() => handleTrackChange('attachments')} className="w-4 h-4" />
                            Attachments
                        </label>
                    </div>
                </div>

                {/* Budget Section */}
                <div className="border border-gray-200 rounded p-4 relative">
                    <h3 className="text-sm font-semibold text-gray-700 absolute -top-3 left-3 bg-white px-1">Budget</h3>
                    <div className="flex items-center gap-3 mt-2">
                        <label className="text-sm text-gray-600">Budget:</label>
                        <input
                            type="text"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-32 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">${budget}</span>
                    </div>
                </div>

                {/* Virtual Mileage Configuration */}
                <div className="border border-gray-200 rounded p-4 relative">
                    <h3 className="text-sm font-semibold text-gray-700 absolute -top-3 left-3 bg-white px-1">
                        Virtual Mileage/Km/Hours Configuration for Meter
                    </h3>
                    <div className="grid grid-cols-2 gap-6 mt-2">
                        {/* Meter 1 */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" checked={enableMeter1} onChange={(e) => setEnableMeter1(e.target.checked)} className="w-4 h-4" />
                                Enable Virtual Mi/Km/Hr Calcs for Meter 1
                            </label>
                            <div className="flex items-center gap-3">
                                <label className="text-sm text-gray-600">Average Daily Mi/Km/Hrs:</label>
                                <input
                                    type="text"
                                    value={avgDaily1}
                                    onChange={(e) => setAvgDaily1(e.target.value)}
                                    className="w-20 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm text-gray-600">Last maintenance check:</label>
                                <div className="relative">
                                    <select
                                        value={lastMaintenanceCheck}
                                        onChange={(e) => setLastMaintenanceCheck(e.target.value)}
                                        className="w-32 h-8 px-3 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                                    >
                                        <option value="12/7/2025">12/7/2025</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        {/* Meter 2 */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" checked={enableMeter2} onChange={(e) => setEnableMeter2(e.target.checked)} className="w-4 h-4" />
                                Enable Virtual Mi/Km/Hr Calcs for Meter 2
                            </label>
                            <div className="flex items-center gap-3">
                                <label className="text-sm text-gray-600">Average Daily Mi/Km/Hrs:</label>
                                <input
                                    type="text"
                                    value={avgDaily2}
                                    onChange={(e) => setAvgDaily2(e.target.value)}
                                    className="w-20 h-8 px-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Info Message */}
                    <div className="flex items-start gap-2 mt-4 text-gray-500">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">If this asset averages the same daily usage, enabling this feature will auto increment the meter value on a daily basis according to the average values specified.</span>
                    </div>
                </div>
            </div>
        );
    };

    // Placeholder content for other tabs
    const PlaceholderContent = ({ title }) => (
        <div className="flex items-center justify-center h-96 text-gray-400">
            <p>{title} content will be displayed here</p>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-2xl w-[950px] max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs">🔧</span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">New Equipment</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded">
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 rounded transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Main Content */}
                    <div className="flex-1 overflow-auto">
                        {activeTab === 'main' && <MainContent />}
                        {activeTab === 'specifications' && <SpecificationsContent />}
                        {activeTab === 'warranty' && <WarrantyContent />}
                        {activeTab === 'purchase' && <PurchaseContent />}
                        {activeTab === 'images' && <ImagesContent />}
                        {activeTab === 'attachments' && <AttachmentsContent />}
                        {activeTab === 'notifications' && <NotificationsContent />}
                        {activeTab === 'expenses' && <ExpensesContent />}
                        {activeTab === 'notes' && <NotesContent />}
                        {activeTab === 'settings' && <SettingsContent />}
                    </div>

                    {/* Right Sidebar Tabs */}
                    <div className="w-32 border-l border-gray-200 bg-gray-50">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full px-3 py-2 text-sm text-left transition-colors ${activeTab === tab.id
                                    ? 'bg-white text-blue-600 border-l-2 border-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="saveDefaults"
                            checked={saveAsDefaults}
                            onChange={(e) => setSaveAsDefaults(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <label htmlFor="saveDefaults" className="text-sm text-gray-600">
                            Save all custom fields as defaults
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleSave(false)}
                            className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors"
                        >
                            <Check className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={() => handleSave(true)}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
                        >
                            <Check className="w-4 h-4" />
                            Save +
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewEquipmentModal;
