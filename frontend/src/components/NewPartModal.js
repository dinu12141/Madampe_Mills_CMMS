import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';

const NewPartModal = ({ isOpen, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('identification');
    const [formData, setFormData] = useState({
        partNumber: '',
        name: '',
        description: '',
        manufacturer: '',
        category: '',
        unitCost: '0.00',
        unitOfMeasure: '',
        upc: '',
        custom1: '',
        custom2: '',
        enableInventoryTracking: true,
        // Warehouse fields
        aisle: '',
        row: '',
        bin: '',
        vendor: '',
        costCenter: '',
        quantity: '0',
        reorderPoint: '0',
        reorderQty: '0',
        maxQty: '0',
        leadTime: '0',
        type: 'FIFO',
    });

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving part:', formData);
        onSave?.(formData);
        onClose();
    };

    const tabs = [
        { id: 'identification', label: 'Identification' },
        { id: 'advanced', label: 'Advanced' },
        { id: 'photos', label: 'Photos' },
        { id: 'attachments', label: 'Attachments' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-xl h-[600px] bg-white rounded-lg shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 text-red-500">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-medium text-gray-700">New Part</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 bg-red-500 rounded"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
                                ${activeTab === tab.id
                                    ? 'text-blue-600 border-blue-600'
                                    : 'text-gray-500 border-transparent hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4">
                    {activeTab === 'identification' && (
                        <div className="space-y-3">
                            {/* Part Number */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-gray-600 text-right">Part Number:</label>
                                <input
                                    type="text"
                                    value={formData.partNumber}
                                    onChange={(e) => handleInputChange('partNumber', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Name */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-gray-600 text-right">Name:</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Description */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-gray-600 text-right">Description:</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Manufacturer */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-gray-600 text-right">Manufacturer:</label>
                                <select
                                    value={formData.manufacturer}
                                    onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value=""></option>
                                    <option value="manufacturer1">Manufacturer 1</option>
                                    <option value="manufacturer2">Manufacturer 2</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-gray-600 text-right">Category:</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value=""></option>
                                    <option value="filters">Filters</option>
                                    <option value="belts">Belts</option>
                                    <option value="pump-equipment">Pump Equipment</option>
                                    <option value="safety">Safety Equipment</option>
                                </select>
                            </div>

                            {/* Unit Cost & Unit of Measure */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-gray-600 text-right">Unit Cost (base):</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500 mr-1">$</span>
                                        <input
                                            type="text"
                                            value={formData.unitCost}
                                            onChange={(e) => handleInputChange('unitCost', e.target.value)}
                                            className="w-20 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                    <label className="text-sm text-gray-600">Unit of measure:</label>
                                    <select
                                        value={formData.unitOfMeasure}
                                        onChange={(e) => handleInputChange('unitOfMeasure', e.target.value)}
                                        className="w-20 h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value=""></option>
                                        <option value="each">Each</option>
                                        <option value="box">Box</option>
                                        <option value="case">Case</option>
                                    </select>
                                </div>
                            </div>

                            {/* UPC */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-gray-600 text-right">UPC:</label>
                                <input
                                    type="text"
                                    value={formData.upc}
                                    onChange={(e) => handleInputChange('upc', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Custom 1 */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-red-500 text-right">(Custom)</label>
                                <input
                                    type="text"
                                    value={formData.custom1}
                                    onChange={(e) => handleInputChange('custom1', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Custom 2 */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                <label className="text-sm text-red-500 text-right">(Custom)</label>
                                <input
                                    type="text"
                                    value={formData.custom2}
                                    onChange={(e) => handleInputChange('custom2', e.target.value)}
                                    className="h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Enable Inventory Tracking */}
                            <div className="mt-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.enableInventoryTracking}
                                        onChange={(e) => handleInputChange('enableInventoryTracking', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <span className="text-sm text-gray-700">Enable inventory tracking</span>
                                </label>
                            </div>

                            {/* Warehouse Section */}
                            {formData.enableInventoryTracking && (
                                <div className="mt-4 border border-gray-200 rounded">
                                    {/* Warehouse Tabs */}
                                    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2">
                                        <span className="text-sm font-medium text-blue-600">Warehouse #1</span>
                                        <button className="text-sm text-blue-500 hover:text-blue-600">
                                            + Assign Warehouse
                                        </button>
                                    </div>

                                    <div className="p-3 space-y-3">
                                        {/* Aisle / Row / Bin */}
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Aisle / Row / Bin:</label>
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="text"
                                                    value={formData.aisle}
                                                    onChange={(e) => handleInputChange('aisle', e.target.value)}
                                                    className="w-16 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-400">/</span>
                                                <input
                                                    type="text"
                                                    value={formData.row}
                                                    onChange={(e) => handleInputChange('row', e.target.value)}
                                                    className="w-16 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <span className="text-gray-400">/</span>
                                                <input
                                                    type="text"
                                                    value={formData.bin}
                                                    onChange={(e) => handleInputChange('bin', e.target.value)}
                                                    className="w-16 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
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
                                                    <option value="davis-plumbing">Davis Plumbing</option>
                                                    <option value="instrument-group">The Instrument Group</option>
                                                </select>
                                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Cost Center */}
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Cost Center:</label>
                                            <select
                                                value={formData.costCenter}
                                                onChange={(e) => handleInputChange('costCenter', e.target.value)}
                                                className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            >
                                                <option value=""></option>
                                                <option value="center1">Cost Center 1</option>
                                                <option value="center2">Cost Center 2</option>
                                            </select>
                                        </div>

                                        {/* Quantity */}
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Quantity:</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={formData.quantity}
                                                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                                                    className="w-16 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                                    Adjust
                                                </button>
                                            </div>
                                        </div>

                                        {/* Reorder Point, Reorder Qty, Max Qty */}
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Reorder Point:</label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="text"
                                                    value={formData.reorderPoint}
                                                    onChange={(e) => handleInputChange('reorderPoint', e.target.value)}
                                                    className="w-12 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <label className="text-sm text-gray-600">Reorder Qty:</label>
                                                <input
                                                    type="text"
                                                    value={formData.reorderQty}
                                                    onChange={(e) => handleInputChange('reorderQty', e.target.value)}
                                                    className="w-12 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <label className="text-sm text-gray-600">Max Qty:</label>
                                                <input
                                                    type="text"
                                                    value={formData.maxQty}
                                                    onChange={(e) => handleInputChange('maxQty', e.target.value)}
                                                    className="w-12 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Lead Time, Type */}
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Lead Time:</label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="text"
                                                    value={formData.leadTime}
                                                    onChange={(e) => handleInputChange('leadTime', e.target.value)}
                                                    className="w-12 h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <label className="text-sm text-gray-600">Type:</label>
                                                <select
                                                    value={formData.type}
                                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                                    className="w-20 h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="FIFO">FIFO</option>
                                                    <option value="LIFO">LIFO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'advanced' && (
                        <div className="space-y-4">
                            {/* Top Row - Markup and Warranty */}
                            <div className="flex gap-8">
                                {/* Markup (invoices) Section */}
                                <div className="border border-gray-300 rounded p-3 flex-1">
                                    <h3 className="text-sm font-medium text-red-600 mb-3">Markup (invoices)</h3>
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">Markup Type:</label>
                                        <select
                                            value={formData.markupType || 'None'}
                                            onChange={(e) => handleInputChange('markupType', e.target.value)}
                                            className="h-8 px-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        >
                                            <option value="None">None</option>
                                            <option value="Percentage">Percentage</option>
                                            <option value="Fixed">Fixed</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Warranty Section */}
                                <div className="border border-gray-300 rounded p-3 flex-1">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Warranty</h3>
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-[70px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Days:</label>
                                            <input
                                                type="number"
                                                value={formData.warrantyDays || 0}
                                                onChange={(e) => handleInputChange('warrantyDays', e.target.value)}
                                                className="w-full h-8 px-2 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-[70px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Primary:</label>
                                            <input
                                                type="number"
                                                value={formData.warrantyPrimary || 0}
                                                onChange={(e) => handleInputChange('warrantyPrimary', e.target.value)}
                                                className="w-full h-8 px-2 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-[70px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Secondary:</label>
                                            <input
                                                type="number"
                                                value={formData.warrantySecondary || 0}
                                                onChange={(e) => handleInputChange('warrantySecondary', e.target.value)}
                                                className="w-full h-8 px-2 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="grid grid-cols-[70px_1fr] items-center gap-2">
                                            <label className="text-sm text-gray-600 text-right">Notes:</label>
                                            <input
                                                type="text"
                                                value={formData.warrantyNotes || ''}
                                                onChange={(e) => handleInputChange('warrantyNotes', e.target.value)}
                                                className="w-full h-8 px-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Part Substitutions / Alternate UPC Codes Section */}
                            <div className="border border-gray-300 rounded">
                                {/* Tabs */}
                                <div className="flex border-b border-gray-200">
                                    <button
                                        onClick={() => handleInputChange('advancedSubTab', 'substitutions')}
                                        className={`px-4 py-2 text-sm font-medium border-b-2 ${(formData.advancedSubTab || 'substitutions') === 'substitutions'
                                            ? 'text-blue-600 border-blue-600 bg-white'
                                            : 'text-gray-500 border-transparent bg-gray-50'
                                            }`}
                                    >
                                        Part Substitutions
                                    </button>
                                    <button
                                        onClick={() => handleInputChange('advancedSubTab', 'upcCodes')}
                                        className={`px-4 py-2 text-sm font-medium border-b-2 ${formData.advancedSubTab === 'upcCodes'
                                            ? 'text-blue-600 border-blue-600 bg-white'
                                            : 'text-gray-500 border-transparent bg-gray-50'
                                            }`}
                                    >
                                        Alternate UPC Codes
                                    </button>
                                </div>

                                {/* Table */}
                                <div className="bg-white">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50">
                                        <div className="px-3 py-2 text-xs font-medium text-gray-600">Part #</div>
                                        <div className="px-3 py-2 text-xs font-medium text-gray-600">Name</div>
                                        <div className="px-3 py-2 text-xs font-medium text-gray-600">Manufacturer</div>
                                        <div className="px-3 py-2 text-xs font-medium text-gray-600">Description</div>
                                    </div>

                                    {/* Empty State */}
                                    <div className="h-40 flex items-center justify-center">
                                        <span className="text-sm text-blue-500">&lt; Right click to add items &gt;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'photos' && (
                        <div className="space-y-4">
                            {/* Photo Drop Area */}
                            <div className="border border-gray-300 rounded min-h-[300px] flex items-center justify-center bg-white">
                                <span className="text-sm text-blue-500">
                                    &lt;Add a photo or drag & drop your photo into this area&gt;
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                        Add Image
                                    </button>
                                    <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                        Delete Image
                                    </button>
                                </div>
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    View Image
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'attachments' && (
                        <div className="space-y-4">
                            {/* Attachment Area */}
                            <div className="border border-gray-300 rounded">
                                {/* Header */}
                                <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                                    <span className="text-sm text-red-600">Attachment Description</span>
                                </div>

                                {/* Drop Area */}
                                <div className="min-h-[300px] flex items-center justify-center bg-white">
                                    <span className="text-sm text-blue-500">
                                        &lt;Add an attachment or drag & drop your attachment into this area&gt;
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    Add
                                </button>
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    Edit
                                </button>
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    Delete
                                </button>
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    Scan
                                </button>
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    Scan to PDF
                                </button>
                            </div>
                        </div>
                    )}
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

export default NewPartModal;
