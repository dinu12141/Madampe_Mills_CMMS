import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Settings,
    Clock,
    Plus,
    X,
    Check,
    ChevronDown,
    Wrench
} from 'lucide-react';

const WorkOrderDetails = ({ workOrder, onBack }) => {
    const [status, setStatus] = useState(workOrder?.status || 'Open');
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: 'Oil and Filter Change',
            parts: 0.00,
            labor: 0.00,
            total: 0.00,
        }
    ]);

    // Cost summary
    const parts = tasks.reduce((sum, t) => sum + t.parts, 0);
    const labor = tasks.reduce((sum, t) => sum + t.labor, 0);
    const subtotal = parts + labor;
    const tax1 = 0;
    const tax2 = 0;
    const credit = 0;
    const total = subtotal + tax1 + tax2 - credit;

    const getStatusButtonClass = (buttonStatus) => {
        const isActive = status === buttonStatus;
        const baseClass = "px-4 py-2 text-sm font-medium rounded border transition-colors";

        if (buttonStatus === 'Open') {
            return isActive
                ? `${baseClass} bg-green-500 text-white border-green-500`
                : `${baseClass} bg-white text-gray-600 border-gray-300 hover:bg-gray-50`;
        }
        if (buttonStatus === 'Complete') {
            return isActive
                ? `${baseClass} bg-green-500 text-white border-green-500`
                : `${baseClass} bg-white text-gray-600 border-gray-300 hover:bg-gray-50`;
        }
        return isActive
            ? `${baseClass} bg-blue-500 text-white border-blue-500`
            : `${baseClass} bg-white text-gray-600 border-gray-300 hover:bg-gray-50`;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 min-h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-1 text-gray-500 hover:text-gray-700"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">
                        Work Order {workOrder?.number || 1002}
                    </h1>
                </div>

                {/* Status Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setStatus('Open')}
                        className={getStatusButtonClass('Open')}
                    >
                        OPEN
                    </button>
                    <button
                        onClick={() => setStatus('In Progress')}
                        className={getStatusButtonClass('In Progress')}
                    >
                        IN PROGRESS
                    </button>
                    <button
                        onClick={() => setStatus('On Hold')}
                        className={getStatusButtonClass('On Hold')}
                    >
                        ON HOLD
                    </button>
                    <button
                        onClick={() => setStatus('Complete')}
                        className={getStatusButtonClass('Complete')}
                    >
                        <Check className="w-4 h-4 inline mr-1" />
                        COMPLETE
                    </button>

                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded ml-2">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Equipment Info */}
            <div className="flex items-start gap-6 px-6 py-4 border-b border-gray-200">
                {/* Equipment Image */}
                <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    <Wrench className="w-full h-full p-2 text-gray-400" />
                </div>

                {/* Equipment Details */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">
                            {workOrder?.equipmentId || 'T-350-4'}
                        </span>
                        <span className="text-gray-400">|</span>
                        <button className="flex items-center gap-1 text-green-600 text-sm">
                            Active
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>
                    <p className="text-gray-600">{workOrder?.equipmentName || 'Pickup'}</p>
                    <p className="text-gray-400 text-sm">Location #1 | Fleet Equipment</p>
                    <p className="text-blue-500 text-sm">{workOrder?.mileage || '35,050'} miles</p>
                </div>

                {/* Assignee */}
                <div className="text-center">
                    <p className="text-gray-400 text-xs mb-1">Assignee:</p>
                    <p className="text-blue-500 text-sm">Unassigned</p>
                </div>

                {/* Started */}
                <div className="text-center">
                    <p className="text-gray-400 text-xs mb-1">Started:</p>
                    <p className="text-gray-700 text-sm">Dec 10, 2025 6:00 PM</p>
                </div>

                {/* Progress */}
                <div className="text-center min-w-[150px]">
                    <p className="text-gray-400 text-xs mb-1">Progress</p>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }} />
                        </div>
                        <span className="text-gray-600 text-sm">0%</span>
                    </div>
                </div>
            </div>

            {/* Tasks Section */}
            <div className="px-6 py-4">
                {/* Tasks Table Header */}
                <div className="grid grid-cols-[1fr_100px_100px_100px_60px] items-center py-2 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
                    <div>Task</div>
                    <div className="text-right">Parts</div>
                    <div className="text-right">Labor</div>
                    <div className="text-right">Total</div>
                    <div></div>
                </div>

                {/* Tasks */}
                {tasks.map((task) => (
                    <div key={task.id} className="py-4 border-b border-gray-100">
                        <div className="grid grid-cols-[1fr_100px_100px_100px_60px] items-center">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-blue-500">{task.name}</span>
                            </div>
                            <div className="text-right text-gray-600">${task.parts.toFixed(2)}</div>
                            <div className="text-right text-gray-600">${task.labor.toFixed(2)}</div>
                            <div className="text-right text-gray-700 font-medium">${task.total.toFixed(2)}</div>
                            <div className="flex items-center gap-1 justify-end">
                                <button className="p-1 text-red-400 hover:text-red-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Task Actions */}
                        <div className="flex items-center gap-2 mt-2 ml-6 text-sm">
                            <button className="text-blue-500 hover:underline">Add Part</button>
                            <span className="text-gray-300">|</span>
                            <button className="text-blue-500 hover:underline">Add Labor</button>
                            <span className="text-gray-300">|</span>
                            <button className="text-blue-500 hover:underline">Add Note</button>
                            <span className="text-gray-300">|</span>
                            <button className="text-blue-500 hover:underline">Mark Complete</button>
                        </div>
                    </div>
                ))}

                {/* Add Task Button */}
                <button className="flex items-center gap-2 py-3 text-blue-500 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                    ADD TASK
                </button>
            </div>

            {/* Cost Summary */}
            <div className="px-6 py-4 border-t border-gray-200">
                <div className="max-w-xs ml-auto space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Parts:</span>
                        <span className="text-gray-700">${parts.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Labor:</span>
                        <span className="text-gray-700">${labor.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax 1:</span>
                        <span className="text-blue-500">0.0%</span>
                        <span className="text-gray-700">${tax1.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax 2:</span>
                        <span className="text-blue-500">0.0%</span>
                        <span className="text-gray-700">${tax2.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Credit:</span>
                        <span className="text-red-500">(${credit.toFixed(2)})</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-200">
                        <span className="text-gray-700">Total:</span>
                        <span className="text-gray-900">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Add Note Section */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                    ADD NOTE
                </button>
            </div>

            {/* Add Attachments Section */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                    <Plus className="w-4 h-4" />
                    ADD ATTACHMENTS
                </button>
            </div>
        </div>
    );
};

export default WorkOrderDetails;
