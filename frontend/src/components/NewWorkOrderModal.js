import React, { useState } from 'react';
import {
    X,
    Calendar,
    Users,
    ChevronDown,
    Wrench,
    Plus,
    Info,
} from 'lucide-react';
import { Button } from './ui/button';
import NewVendorModal from './NewVendorModal';
import NewEmployeeModal from './NewEmployeeModal';

const NewWorkOrderModal = ({ isOpen, onClose, equipment }) => {
    const [formData, setFormData] = useState({
        equipment: equipment?.id ? `${equipment.id} ${equipment.name}` : '',
        assignee: '',
        scheduled: '12/07/2025',
        due: '',
        priority: 'NORMAL',
        type: '',
        initialNotes: '',
    });

    const [tasks, setTasks] = useState([
        { id: 1, task: 'Oil Leaking', type: 'Repair', status: 'due 0 Days ago', priority: '', checked: true },
    ]);

    const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

    if (!isOpen) return null;

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddTask = () => {
        setTasks(prev => [...prev, { id: prev.length + 1, task: '', type: '', status: '', priority: '', checked: false }]);
    };

    const handleSave = () => {
        console.log('Saving work order:', formData, tasks);
        onClose();
    };

    const handleSaveAndNew = () => {
        console.log('Saving and creating new:', formData, tasks);
        setFormData({
            equipment: '',
            assignee: '',
            scheduled: '12/07/2025',
            due: '',
            priority: 'NORMAL',
            type: '',
            initialNotes: '',
        });
        setTasks([]);
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
                        <h2 className="text-xl font-medium text-gray-800">New Work Order</h2>
                        <button
                            onClick={onClose}
                            className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {/* Form Grid */}
                        <div className="space-y-5">
                            {/* Equipment */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">
                                    <span className="text-red-500">*</span> Equipment
                                </label>
                                <input
                                    type="text"
                                    value={formData.equipment}
                                    onChange={(e) => handleInputChange('equipment', e.target.value)}
                                    className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="AC-001-07 Class 8"
                                />
                            </div>

                            {/* Assignee */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">Assignee</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={formData.assignee}
                                        onChange={(e) => handleInputChange('assignee', e.target.value)}
                                        className="flex-1 h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        className="flex items-center justify-center h-10 px-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                        onClick={() => setIsVendorModalOpen(true)}
                                    >
                                        <Plus className="w-3 h-3 text-gray-600 mr-1" />
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="flex items-center justify-center h-10 px-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                        onClick={() => setIsEmployeeModalOpen(true)}
                                    >
                                        <Plus className="w-3 h-3 text-gray-600 mr-1" />
                                        <Users className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Scheduled */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">Scheduled</label>
                                <input
                                    type="text"
                                    value={formData.scheduled}
                                    onChange={(e) => handleInputChange('scheduled', e.target.value)}
                                    className="w-36 h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Due */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">Due</label>
                                <input
                                    type="text"
                                    value={formData.due}
                                    onChange={(e) => handleInputChange('due', e.target.value)}
                                    className="w-36 h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Priority */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">
                                    <span className="text-red-500">*</span> Priority
                                </label>
                                <div className="relative w-36">
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => handleInputChange('priority', e.target.value)}
                                        className="w-full h-10 px-3 pr-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="NORMAL">NORMAL</option>
                                        <option value="LOW">LOW</option>
                                        <option value="HIGH">HIGH</option>
                                        <option value="CRITICAL">CRITICAL</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Type */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <label className="text-sm text-gray-600">Type</label>
                                <div className="relative w-56">
                                    <select
                                        value={formData.type}
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        className="w-full h-10 px-3 pr-8 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Select type...</option>
                                        <option value="Repair">Repair</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Inspection">Inspection</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Initial Notes */}
                            <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                                <label className="text-sm text-gray-600 pt-2">Initial Notes</label>
                                <textarea
                                    value={formData.initialNotes}
                                    onChange={(e) => handleInputChange('initialNotes', e.target.value)}
                                    className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                                />
                            </div>

                            {/* New Custom Field Link */}
                            <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                <div></div>
                                <button className="text-sm text-blue-500 hover:text-blue-600 text-left">
                                    New Custom Field
                                </button>
                            </div>
                        </div>

                        {/* Tasks Table */}
                        <div className="mt-6">
                            {/* Table Header */}
                            <div className="grid grid-cols-[32px_1fr_90px_110px_80px] items-center bg-gray-50 border-t border-b border-gray-200 py-2 px-2 text-xs font-medium text-gray-600 uppercase">
                                <div className="flex items-center justify-center">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500" defaultChecked />
                                </div>
                                <div>Task</div>
                                <div>Type</div>
                                <div>Status</div>
                                <div>Priority</div>
                            </div>

                            {/* Task Rows */}
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="grid grid-cols-[32px_1fr_90px_110px_80px] items-center border-b border-gray-100 py-2.5 px-2"
                                >
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={task.checked}
                                            onChange={() => { }}
                                            className="w-4 h-4 rounded border-gray-300 text-blue-500"
                                        />
                                    </div>
                                    <div className="text-sm text-gray-700">{task.task}</div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Wrench className="w-3 h-3 mr-1 text-gray-400" />
                                        {task.type}
                                    </div>
                                    <div className="text-xs text-gray-500">{task.status}</div>
                                    <div className="text-sm text-gray-600">{task.priority}</div>
                                </div>
                            ))}

                            {/* Add Task */}
                            <button
                                onClick={handleAddTask}
                                className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600 py-3 px-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Task</span>
                            </button>
                        </div>

                        {/* Info Banner */}
                        <div className="mt-4 bg-blue-50 rounded-md p-4 flex items-start space-x-3">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-blue-700">
                                You may enter parts, labor, and other details after creating the Work Order.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={handleSaveAndNew}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                        >
                            Save & New
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

            {/* New Vendor Modal */}
            <NewVendorModal
                isOpen={isVendorModalOpen}
                onClose={() => setIsVendorModalOpen(false)}
                onSave={(vendor) => {
                    handleInputChange('assignee', vendor.name);
                    setIsVendorModalOpen(false);
                }}
            />

            {/* New Employee Modal */}
            <NewEmployeeModal
                isOpen={isEmployeeModalOpen}
                onClose={() => setIsEmployeeModalOpen(false)}
                onSave={(employee) => {
                    handleInputChange('assignee', `${employee.firstName} ${employee.lastName}`);
                    setIsEmployeeModalOpen(false);
                }}
            />
        </>
    );
};

export default NewWorkOrderModal;
