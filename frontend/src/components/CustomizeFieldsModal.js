import React, { useState } from 'react';
import { X, Eye, EyeOff, GripVertical, RotateCcw } from 'lucide-react';

const CustomizeFieldsModal = ({ isOpen, onClose, onSave }) => {
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [showThumbnail, setShowThumbnail] = useState(true);

    // Visible columns (currently shown in table)
    const [visibleColumns, setVisibleColumns] = useState([
        { id: 'tasks', name: 'Tasks', visible: true },
        { id: 'inspections', name: 'Inspections', visible: true },
    ]);

    // Available columns (can be added to visible)
    const [availableColumns, setAvailableColumns] = useState([
        { id: 'unitNumber', name: 'Unit #', visible: false },
        { id: 'type', name: 'Type', visible: false },
        { id: 'taskDetails', name: 'Task Details', visible: false },
        { id: 'identification', name: 'Identification', visible: false },
        { id: 'assigneeNames', name: 'Assignee Names', visible: false },
        { id: 'parent', name: 'Parent', visible: false },
        { id: 'lastMeterUpdate', name: 'Last Meter Update', visible: false },
        { id: 'lastInspection', name: 'Last Inspection', visible: false },
        { id: 'ownership', name: 'Ownership', visible: false },
        { id: 'status', name: 'Status', visible: false },
        { id: 'year', name: 'Year', visible: false },
        { id: 'fuelType', name: 'Fuel Type', visible: false },
        { id: 'lifetimeMeters', name: 'Lifetime Meters', visible: false },
        { id: 'makeModel', name: 'Make Model', visible: false },
        { id: 'serial', name: 'Serial', visible: false },
        { id: 'datePurchased', name: 'Date Purchased', visible: false },
        { id: 'dateSold', name: 'Date Sold', visible: false },
    ]);

    // Toggle column visibility (move between visible and available)
    const toggleColumnVisibility = (column, fromVisible) => {
        if (fromVisible) {
            // Move from visible to available
            setVisibleColumns(prev => prev.filter(c => c.id !== column.id));
            setAvailableColumns(prev => [...prev, { ...column, visible: false }]);
        } else {
            // Move from available to visible
            setAvailableColumns(prev => prev.filter(c => c.id !== column.id));
            setVisibleColumns(prev => [...prev, { ...column, visible: true }]);
        }
    };

    // Reset to default settings
    const resetToDefault = () => {
        setRowsPerPage(25);
        setShowThumbnail(true);
        setVisibleColumns([
            { id: 'tasks', name: 'Tasks', visible: true },
            { id: 'inspections', name: 'Inspections', visible: true },
        ]);
        setAvailableColumns([
            { id: 'unitNumber', name: 'Unit #', visible: false },
            { id: 'type', name: 'Type', visible: false },
            { id: 'taskDetails', name: 'Task Details', visible: false },
            { id: 'identification', name: 'Identification', visible: false },
            { id: 'assigneeNames', name: 'Assignee Names', visible: false },
            { id: 'parent', name: 'Parent', visible: false },
            { id: 'lastMeterUpdate', name: 'Last Meter Update', visible: false },
            { id: 'lastInspection', name: 'Last Inspection', visible: false },
            { id: 'ownership', name: 'Ownership', visible: false },
            { id: 'status', name: 'Status', visible: false },
            { id: 'year', name: 'Year', visible: false },
            { id: 'fuelType', name: 'Fuel Type', visible: false },
            { id: 'lifetimeMeters', name: 'Lifetime Meters', visible: false },
            { id: 'makeModel', name: 'Make Model', visible: false },
            { id: 'serial', name: 'Serial', visible: false },
            { id: 'datePurchased', name: 'Date Purchased', visible: false },
            { id: 'dateSold', name: 'Date Sold', visible: false },
        ]);
    };

    // Handle save
    const handleSave = () => {
        onSave?.({
            rowsPerPage,
            showThumbnail,
            visibleColumns,
            availableColumns
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-medium text-gray-800">Customize Fields</h2>
                        <button
                            onClick={resetToDefault}
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 text-sm"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset to default settings
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-6">
                        {/* Settings Row */}
                        <div className="flex items-center gap-8 mb-8">
                            {/* Rows per page */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Rows per page</span>
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                    className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>

                            {/* Thumbnail toggle */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Thumbnail image</span>
                                <button
                                    onClick={() => setShowThumbnail(!showThumbnail)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${showThumbnail ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${showThumbnail ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Columns Section */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Visible Columns */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Visible columns:</h3>
                                <div className="border border-gray-200 rounded-lg min-h-[200px] max-h-[400px] overflow-auto">
                                    {visibleColumns.map((column) => (
                                        <div
                                            key={column.id}
                                            className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                                                <span className="text-sm text-gray-700">{column.name}</span>
                                            </div>
                                            <button
                                                onClick={() => toggleColumnVisibility(column, true)}
                                                className="p-1 text-gray-500 hover:text-gray-700"
                                                title="Hide column"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {visibleColumns.length === 0 && (
                                        <div className="p-4 text-sm text-gray-400 text-center">
                                            No visible columns
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Available Columns */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Available columns:</h3>
                                <div className="border border-gray-200 rounded-lg min-h-[200px] max-h-[400px] overflow-auto">
                                    {availableColumns.map((column) => (
                                        <div
                                            key={column.id}
                                            className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                                                <span className="text-sm text-gray-500">{column.name}</span>
                                            </div>
                                            <button
                                                onClick={() => toggleColumnVisibility(column, false)}
                                                className="p-1 text-gray-400 hover:text-gray-600"
                                                title="Show column"
                                            >
                                                <EyeOff className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {availableColumns.length === 0 && (
                                        <div className="p-4 text-sm text-gray-400 text-center">
                                            All columns are visible
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomizeFieldsModal;
