import React, { useState } from 'react';
import {
    X,
    ChevronDown,
    Plus,
    Check,
    MoreVertical,
} from 'lucide-react';
import { Button } from './ui/button';

const NewWorkOrderModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        woNumber: '2020',
        priority: 'NORMAL',
        scheduled: '12/8/2025',
        due: '',
        started: '',
        completed: '',
        assigneeType: 'employee',
        assignee: '',
        type: '',
        costCenter: '',
        poNumber: '',
        invoiceNumber: '',
        custom1: '',
        custom2: '',
        unitNumber: '112 - Backup Generator',
        hours: '70',
    });

    const [status, setStatus] = useState('Open');
    const [activeTab, setActiveTab] = useState('maintenance');
    const [maintenanceTasks, setMaintenanceTasks] = useState([]);
    const [moreMenuOpen, setMoreMenuOpen] = useState(false);

    // Cost calculations
    const [costs, setCosts] = useState({
        subtotal: 0.00,
        custom: 0.00,
        discountEnabled: false,
        discountPercent: 0.00000,
        tax1Percent: 0.00000,
        tax1Amount: 0.00,
        tax2Percent: 0.00000,
        tax2Amount: 0.00,
        totalEnabled: true,
        total: 0.00,
    });

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Saving work order:', formData);
        onSave?.(formData);
        onClose();
    };

    const getStatusButtonClass = (buttonStatus) => {
        const isActive = status === buttonStatus;
        const baseClass = "px-4 py-2 text-sm font-medium rounded border transition-colors";

        if (buttonStatus === 'Open') {
            return isActive
                ? `${baseClass} bg-green-500 text-white border-green-500`
                : `${baseClass} bg-white text-gray-600 border-gray-300 hover:bg-gray-50`;
        }
        return isActive
            ? `${baseClass} bg-blue-500 text-white border-blue-500`
            : `${baseClass} bg-white text-gray-600 border-gray-300 hover:bg-gray-50`;
    };

    const tabs = [
        { id: 'maintenance', label: 'Maintenance' },
        { id: 'parts', label: 'Parts' },
        { id: 'labor', label: 'Labor' },
        { id: 'attachments', label: 'Attachments' },
        { id: 'notes', label: 'Notes' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">📋</span>
                        <h2 className="text-lg font-medium text-gray-800">New Work Order</h2>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                            <span className="text-lg">−</span>
                        </button>
                        <button className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                            <span className="text-lg">□</span>
                        </button>
                        <button onClick={onClose} className="p-1 text-white bg-red-500 hover:bg-red-600 rounded">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto flex">
                    {/* Left Sidebar */}
                    <div className="w-56 bg-gray-50 border-r border-gray-200 p-4 space-y-4 flex-shrink-0">
                        {/* WO # */}
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">WO #:</label>
                            <input
                                type="text"
                                value={formData.woNumber}
                                onChange={(e) => handleInputChange('woNumber', e.target.value)}
                                className="w-full h-8 px-2 border border-gray-300 rounded text-sm"
                            />
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Priority:</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
                                className="w-full h-8 px-2 border border-gray-300 rounded text-sm bg-white"
                            >
                                <option value="NORMAL">NORMAL</option>
                                <option value="LOW">LOW</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>

                        {/* Dates Section */}
                        <div className="border-t border-gray-300 pt-3">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Dates</h4>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-16">Scheduled:</label>
                                    <input
                                        type="text"
                                        value={formData.scheduled}
                                        onChange={(e) => handleInputChange('scheduled', e.target.value)}
                                        className="w-28 h-7 px-2 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-16">Due:</label>
                                    <input
                                        type="text"
                                        value={formData.due}
                                        onChange={(e) => handleInputChange('due', e.target.value)}
                                        className="w-28 h-7 px-2 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-16">Started:</label>
                                    <input
                                        type="text"
                                        value={formData.started}
                                        onChange={(e) => handleInputChange('started', e.target.value)}
                                        className="w-28 h-7 px-2 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-16">Completed:</label>
                                    <input
                                        type="text"
                                        value={formData.completed}
                                        onChange={(e) => handleInputChange('completed', e.target.value)}
                                        className="w-28 h-7 px-2 border border-gray-300 rounded text-xs bg-gray-50"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Assignee Section */}
                        <div className="border-t border-gray-300 pt-3">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Assignee</h4>

                            <div className="flex items-center gap-4 mb-2">
                                <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="assigneeType"
                                        value="employee"
                                        checked={formData.assigneeType === 'employee'}
                                        onChange={(e) => handleInputChange('assigneeType', e.target.value)}
                                        className="w-3 h-3"
                                    />
                                    Employee
                                </label>
                                <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="assigneeType"
                                        value="vendor"
                                        checked={formData.assigneeType === 'vendor'}
                                        onChange={(e) => handleInputChange('assigneeType', e.target.value)}
                                        className="w-3 h-3"
                                    />
                                    Vendor
                                </label>
                                <button className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>

                            <select
                                value={formData.assignee}
                                onChange={(e) => handleInputChange('assignee', e.target.value)}
                                className="w-full h-7 px-2 border border-gray-300 rounded text-xs bg-white"
                            >
                                <option value="">Select...</option>
                                <option value="John Doe">John Doe</option>
                                <option value="Jane Smith">Jane Smith</option>
                            </select>
                        </div>

                        {/* Misc. Details Section */}
                        <div className="border-t border-gray-300 pt-3">
                            <h4 className="text-xs font-semibold text-gray-700 mb-2">Misc. Details</h4>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-20">Type:</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        className="flex-1 h-7 px-1 border border-gray-300 rounded text-xs bg-white"
                                    >
                                        <option value="">Select...</option>
                                        <option value="Repair">Repair</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-20">Cost Center:</label>
                                    <select
                                        value={formData.costCenter}
                                        onChange={(e) => handleInputChange('costCenter', e.target.value)}
                                        className="flex-1 h-7 px-1 border border-gray-300 rounded text-xs bg-white"
                                    >
                                        <option value="">Select...</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-20">PO #:</label>
                                    <select
                                        value={formData.poNumber}
                                        onChange={(e) => handleInputChange('poNumber', e.target.value)}
                                        className="flex-1 h-7 px-1 border border-gray-300 rounded text-xs bg-white"
                                    >
                                        <option value="">Select...</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-20">Invoice #:</label>
                                    <input
                                        type="text"
                                        value={formData.invoiceNumber}
                                        onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                                        className="flex-1 h-7 px-2 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-20">(Custom)</label>
                                    <input
                                        type="text"
                                        value={formData.custom1}
                                        onChange={(e) => handleInputChange('custom1', e.target.value)}
                                        className="flex-1 h-7 px-2 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500 w-20">(Custom)</label>
                                    <input
                                        type="text"
                                        value={formData.custom2}
                                        onChange={(e) => handleInputChange('custom2', e.target.value)}
                                        className="flex-1 h-7 px-2 border border-gray-300 rounded text-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Status Bar */}
                        <div className="flex items-center justify-end gap-2 px-4 py-3 border-b border-gray-200">
                            <button
                                onClick={() => setStatus('Open')}
                                className={getStatusButtonClass('Open')}
                            >
                                Open
                            </button>
                            <button
                                onClick={() => setStatus('In Progress')}
                                className={getStatusButtonClass('In Progress')}
                            >
                                In Progress
                            </button>
                            <button
                                onClick={() => setStatus('On Hold')}
                                className={getStatusButtonClass('On Hold')}
                            >
                                On Hold
                            </button>
                            <button
                                onClick={() => setStatus('Complete')}
                                className={getStatusButtonClass('Complete')}
                            >
                                <Check className="w-4 h-4 inline mr-1" />
                                Complete
                            </button>

                            {/* More Options Button with Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>

                                {moreMenuOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setMoreMenuOpen(false)}
                                        />

                                        {/* Dropdown Menu */}
                                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded shadow-lg border border-gray-200 py-2 z-20">
                                            <button
                                                onClick={() => {
                                                    console.log('Email Work Order clicked');
                                                    setMoreMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                                            >
                                                Email Work Order
                                            </button>
                                            <button
                                                onClick={() => {
                                                    window.print();
                                                    setMoreMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                                            >
                                                Print Work Order
                                            </button>
                                            <button
                                                onClick={() => {
                                                    console.log('Create Purchase Order clicked');
                                                    setMoreMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                                            >
                                                Create Purchase Order
                                            </button>
                                            <button
                                                onClick={() => {
                                                    console.log('Convert to Invoice clicked');
                                                    setMoreMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                                            >
                                                Convert to Invoice
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Unit Selection */}
                        <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-200">
                            <label className="text-sm text-gray-600">Unit #:</label>
                            <select
                                value={formData.unitNumber}
                                onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                                className="w-64 h-8 px-2 border border-gray-300 rounded text-sm bg-white"
                            >
                                <option value="112 - Backup Generator">112 - Backup Generator</option>
                                <option value="113 - Main Generator">113 - Main Generator</option>
                            </select>
                            <button className="p-1 text-gray-500 hover:bg-gray-200 rounded">
                                <Plus className="w-4 h-4" />
                            </button>

                            <div className="ml-auto flex items-center gap-2">
                                <label className="text-sm text-gray-600">Hours</label>
                                <input
                                    type="number"
                                    value={formData.hours}
                                    onChange={(e) => handleInputChange('hours', e.target.value)}
                                    className="w-16 h-8 px-2 border border-gray-300 rounded text-sm text-right"
                                />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 px-4">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'text-blue-600 border-blue-600'
                                        : 'text-gray-500 border-transparent hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 p-4">
                            {activeTab === 'maintenance' && (
                                <div>
                                    {/* Maintenance Table */}
                                    <div className="border border-gray-200 rounded">
                                        <div className="grid grid-cols-[1fr_80px_80px_80px] items-center px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
                                            <div className="flex items-center gap-1">
                                                Maintenance
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                            <div className="text-right">Total</div>
                                            <div className="text-center">Complete</div>
                                            <div className="text-right">Actions</div>
                                        </div>

                                        {maintenanceTasks.length === 0 && (
                                            <div className="p-8 text-center text-gray-400 text-sm">
                                                No maintenance tasks added
                                            </div>
                                        )}
                                    </div>

                                    {/* Add Links */}
                                    <div className="flex items-center gap-4 mt-3">
                                        <button className="text-sm text-blue-500 hover:underline">Add...</button>
                                        <button className="text-sm text-blue-500 hover:underline">Select multiple...</button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'parts' && (
                                <div>
                                    {/* Parts Table */}
                                    <div className="border border-gray-200 rounded">
                                        <div className="grid grid-cols-[120px_1fr_80px_80px_80px_80px] items-center px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
                                            <div className="flex items-center gap-1">
                                                Part #
                                                <span className="text-gray-400">▲</span>
                                            </div>
                                            <div>Name</div>
                                            <div className="text-right">Used</div>
                                            <div className="text-right">Cost</div>
                                            <div className="text-right">Total</div>
                                            <div className="text-right">Actions</div>
                                        </div>

                                        <div className="p-12 text-center text-red-400 text-sm">
                                            &lt;Right click for menu&gt;
                                        </div>
                                    </div>

                                    {/* Bottom input */}
                                    <div className="flex justify-end mt-3">
                                        <input
                                            type="text"
                                            className="w-24 h-7 px-2 border border-gray-300 rounded text-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'labor' && (
                                <div>
                                    {/* Labor Table */}
                                    <div className="border border-gray-200 rounded">
                                        <div className="grid grid-cols-[1fr_100px_80px_80px_80px] items-center px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
                                            <div className="flex items-center gap-1">
                                                Description
                                                <ChevronDown className="w-3 h-3" />
                                            </div>
                                            <div className="text-right">Hours</div>
                                            <div className="text-right">Rate</div>
                                            <div className="text-right">Total</div>
                                            <div className="text-right">Actions</div>
                                        </div>

                                        <div className="p-8 text-center text-gray-400 text-sm">
                                            No labor entries added
                                        </div>
                                    </div>

                                    {/* Add Link */}
                                    <div className="flex items-center gap-4 mt-3">
                                        <button className="text-sm text-blue-500 hover:underline">Add Labor Entry...</button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'attachments' && (
                                <div>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                                        <p className="text-gray-400 text-sm">Drag and drop files here or click to upload</p>
                                        <button className="mt-4 px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-50">
                                            Browse Files
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notes' && (
                                <div>
                                    <textarea
                                        placeholder="Enter notes here..."
                                        className="w-full h-40 px-3 py-2 border border-gray-300 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Cost Summary */}
                        <div className="border-t border-gray-200 px-4 py-3">
                            <div className="max-w-xs ml-auto space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <input
                                        type="text"
                                        value={`$${costs.subtotal.toFixed(2)}`}
                                        readOnly
                                        className="w-20 h-6 px-1 border border-gray-300 rounded text-right text-xs"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">(Custom)</span>
                                    <input
                                        type="text"
                                        value={`$${costs.custom.toFixed(2)}`}
                                        readOnly
                                        className="w-20 h-6 px-1 border border-gray-300 rounded text-right text-xs"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <input type="checkbox" checked={costs.discountEnabled} onChange={() => { }} className="w-3 h-3" />
                                        <span className="text-gray-600">Discount %:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={`${costs.discountPercent.toFixed(5)}%`}
                                        readOnly
                                        className="w-20 h-6 px-1 border border-gray-300 rounded text-right text-xs"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Tax 1</span>
                                    <div className="flex gap-1">
                                        <input
                                            type="text"
                                            value={`${costs.tax1Percent.toFixed(5)}%`}
                                            readOnly
                                            className="w-20 h-6 px-1 border border-gray-300 rounded text-right text-xs"
                                        />
                                        <input
                                            type="text"
                                            value={`$${costs.tax1Amount.toFixed(2)}`}
                                            readOnly
                                            className="w-16 h-6 px-1 border border-gray-300 rounded text-right text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Tax 2</span>
                                    <div className="flex gap-1">
                                        <input
                                            type="text"
                                            value={`${costs.tax2Percent.toFixed(5)}%`}
                                            readOnly
                                            className="w-20 h-6 px-1 border border-gray-300 rounded text-right text-xs"
                                        />
                                        <input
                                            type="text"
                                            value={`$${costs.tax2Amount.toFixed(2)}`}
                                            readOnly
                                            className="w-16 h-6 px-1 border border-gray-300 rounded text-right text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                    <div className="flex items-center gap-1">
                                        <input type="checkbox" checked={costs.totalEnabled} onChange={() => { }} className="w-3 h-3" />
                                        <span className="text-gray-700 font-medium">TOTAL:</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={`$${costs.total.toFixed(2)}`}
                                        readOnly
                                        className="w-20 h-6 px-1 border border-gray-300 rounded text-right text-xs font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-4 py-3 bg-gray-100 border-t border-gray-200">
                    <Button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Save
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 border border-gray-300"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewWorkOrderModal;
