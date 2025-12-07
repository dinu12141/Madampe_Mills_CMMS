import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Settings,
    Truck,
    Search,
    Wrench,
    Calendar,
    Clock,
    FileText,
    ClipboardList,
    FolderOpen,
    Package,
    Paperclip,
    Plus,
    Info,
} from 'lucide-react';
import { Button } from './ui/button';

const EquipmentDetails = ({ equipment, onBack }) => {
    const [activeTab, setActiveTab] = useState('profile');

    // Search states for each tab
    const [taskSearchTerm, setTaskSearchTerm] = useState('');
    const [partsSearchTerm, setPartsSearchTerm] = useState('');
    const [historySearchTerm, setHistorySearchTerm] = useState('');
    const [attachmentsSearchTerm, setAttachmentsSearchTerm] = useState('');

    // Filter states
    const [taskFilter, setTaskFilter] = useState('All Tasks');
    const [taskFilterOpen, setTaskFilterOpen] = useState(false);

    // Extended equipment data with all fields from reference
    const equipmentDetails = {
        unitNumber: equipment.id,
        description: equipment.name,
        yearMakeModel: `2023 ${equipment.description}`,
        keywords: equipment.keywords || ['sample', 'fleet'],
        serialNumber: 'FLC234723662435234',
        status: 'Active',
        location: 'Location #1',
        locationGroup: 'Fleet Equipment',
        pmTemplate: equipment.name,
        inspection: 'DVIR Vehicle',
        purchaseDate: 'Mar 7, 2025',
        ownership: 'Owned',
        miles: equipment.meters?.value?.replace(' mi', '') || '650',
        hours: '0',
        fuelVolumeUnits: 'Gallons',
        maintCost: 0,
        fuelCost: 0,
    };

    // Sample tasks data matching reference image
    const tasksData = [
        {
            id: 1,
            icon: 'wrench',
            name: 'Oil Leaking',
            hasInfo: true,
            status: {
                text: 'due 0 days ago',
                type: 'overdue',
            },
            frequency: 'Due On 12/07/2025',
            advancedNotice: '14 days',
            lastPerformed: 'N/A',
            details: 'Requested by Brad Cooke',
        },
        {
            id: 2,
            icon: 'calendar',
            name: 'Oil Change',
            hasInfo: false,
            status: {
                text: 'due in 90 days / in 14,870 mi / in 1,000 hr',
                type: 'upcoming',
            },
            frequency: ['Every 90 days', 'Every 15,000 mi', 'Every 1,000 hr'],
            advancedNotice: ['7 days', '500 mi', '50 hr'],
            lastPerformed: ['Dec 7, 2025', '520 mi', '0 hr'],
            details: null,
        },
    ];

    // Parts data (empty for now to show empty state)
    const partsData = [];

    // History data (empty for now)
    const historyData = [];

    // Attachments data (empty for now)
    const attachmentsData = [];

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'tasks', label: 'Tasks' },
        { id: 'parts', label: 'Parts' },
        { id: 'history', label: 'History' },
        { id: 'attachments', label: 'Attachments' },
    ];

    const taskFilterOptions = [
        'All Tasks',
        'Overdue',
        'Due Soon',
        'Upcoming',
        'Completed',
    ];

    // Reusable Search and New Button Header Component
    const TabHeader = ({ searchValue, onSearchChange, placeholder, onNewClick, buttonLabel = 'New' }) => (
        <div className="flex items-center justify-end gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder={placeholder || 'Search'}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-72 h-10 pl-11 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
            </div>

            {/* New Button */}
            <Button
                onClick={onNewClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 h-10 rounded-lg flex items-center gap-2"
            >
                <Plus className="w-4 h-4" />
                {buttonLabel}
            </Button>
        </div>
    );

    // Empty State Component
    const EmptyState = ({ icon: Icon, title, description }) => (
        <div className="flex flex-col items-center justify-center py-20 px-8">
            <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-6">
                <Icon className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
            <p className="text-sm text-gray-400 text-center max-w-md">{description}</p>
        </div>
    );

    // Profile Tab Content
    const ProfileContent = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
                {/* Identification Section */}
                <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Identification</h3>
                    <div className="space-y-3">
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Unit #</span>
                            <span className="text-sm text-blue-500 font-medium">{equipmentDetails.unitNumber}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Description</span>
                            <span className="text-sm text-blue-500">{equipment.name}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Year/Make/Model</span>
                            <span className="text-sm text-blue-500">{equipmentDetails.yearMakeModel}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Keywords</span>
                            <div className="flex gap-1">
                                {equipmentDetails.keywords.map((keyword, idx) => (
                                    <span key={idx} className="text-sm text-blue-500">
                                        {keyword}{idx < equipmentDetails.keywords.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Serial #</span>
                            <span className="text-sm text-blue-500">{equipmentDetails.serialNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Assignment Section */}
                <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Assignment</h3>
                    <div className="space-y-3">
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Status</span>
                            <span className="text-sm text-blue-500">{equipmentDetails.status}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Location</span>
                            <span className="text-sm text-blue-500">
                                {equipmentDetails.location} | {equipmentDetails.locationGroup}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">PM Template</span>
                            <span className="text-sm text-blue-500">{equipmentDetails.pmTemplate}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Inspection</span>
                            <span className="text-sm text-blue-500">{equipmentDetails.inspection}</span>
                        </div>
                    </div>
                </div>

                {/* Purchase Section */}
                <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Purchase</h3>
                    <div className="space-y-3">
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Purchase Date</span>
                            <span className="text-sm font-medium text-gray-800">{equipmentDetails.purchaseDate}</span>
                        </div>
                    </div>
                </div>

                {/* Additional Details Section */}
                <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Additional Details</h3>
                    <div className="space-y-3">
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Ownership</span>
                            <span className="text-sm font-medium text-gray-800">{equipmentDetails.ownership}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Miles</span>
                            <span className="text-sm font-medium text-gray-800">{equipmentDetails.miles}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Hours</span>
                            <span className="text-sm font-medium text-gray-800">{equipmentDetails.hours}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 text-xs text-gray-500">Fuel Volume Units</span>
                            <span className="text-sm font-medium text-gray-800">{equipmentDetails.fuelVolumeUnits}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                {/* Costs Section */}
                <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-semibold text-gray-800">Costs - Last 12 Months</h3>
                        <button className="text-gray-400 hover:text-gray-600">
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-center">
                            <p className="text-3xl font-light text-blue-500">${equipmentDetails.maintCost}</p>
                            <p className="text-xs text-gray-500 mt-1">Maint Cost</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-light text-blue-500">${equipmentDetails.fuelCost}</p>
                            <p className="text-xs text-gray-500 mt-1">Fuel</p>
                        </div>
                    </div>
                </div>

                {/* Maintenance Cost by Month Chart */}
                <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-6 text-center">
                        Maintenance Cost by Month
                    </h3>
                    <div className="h-48 flex items-end justify-center gap-2 px-4">
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <div className="w-full bg-blue-100 rounded-t h-4"></div>
                            <span className="text-xs text-gray-400 -rotate-90 origin-center whitespace-nowrap">Maintenance Cost</span>
                        </div>
                    </div>
                    <div className="h-px bg-gray-200 mt-4"></div>
                    <div className="flex justify-between px-4 mt-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                            <span key={month} className="text-xs text-gray-400">{month}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Tasks Tab Content
    const TasksContent = () => {
        const filteredTasks = tasksData.filter(task =>
            task.name.toLowerCase().includes(taskSearchTerm.toLowerCase())
        );

        return (
            <div className="space-y-4">
                {/* Tasks Header */}
                <div className="flex items-center justify-between">
                    {/* Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setTaskFilterOpen(!taskFilterOpen)}
                            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                        >
                            {taskFilter}
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        {taskFilterOpen && (
                            <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                                {taskFilterOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setTaskFilter(option);
                                            setTaskFilterOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={taskSearchTerm}
                                onChange={(e) => setTaskSearchTerm(e.target.value)}
                                className="w-72 h-10 pl-11 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* New Button */}
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-5 h-10 rounded-lg flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            New
                        </Button>
                    </div>
                </div>

                {/* Tasks Table */}
                {filteredTasks.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-[200px_1fr_200px_150px_150px_200px] items-center px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
                            <div>Task</div>
                            <div>Status</div>
                            <div>Frequency</div>
                            <div>Advanced Notice</div>
                            <div>Last Performed</div>
                            <div>Details</div>
                        </div>

                        {/* Table Rows */}
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="grid grid-cols-[200px_1fr_200px_150px_150px_200px] items-center px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                {/* Task */}
                                <div className="flex items-center gap-3">
                                    <div className="text-gray-400">
                                        {task.icon === 'wrench' ? <Wrench className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-blue-500 hover:underline cursor-pointer">{task.name}</span>
                                        {task.hasInfo && (
                                            <Info className="w-4 h-4 text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <span className={`text-sm ${task.status.type === 'overdue' ? 'text-red-500' : 'text-blue-500'}`}>
                                        {task.status.text}
                                    </span>
                                </div>

                                {/* Frequency */}
                                <div className="text-sm text-gray-600">
                                    {Array.isArray(task.frequency) ? (
                                        <div className="space-y-0.5">
                                            {task.frequency.map((f, idx) => (
                                                <div key={idx}>{f}</div>
                                            ))}
                                        </div>
                                    ) : (
                                        task.frequency
                                    )}
                                </div>

                                {/* Advanced Notice */}
                                <div className="text-sm text-blue-500">
                                    {Array.isArray(task.advancedNotice) ? (
                                        <div className="space-y-0.5">
                                            {task.advancedNotice.map((n, idx) => (
                                                <div key={idx}>{n}</div>
                                            ))}
                                        </div>
                                    ) : (
                                        task.advancedNotice
                                    )}
                                </div>

                                {/* Last Performed */}
                                <div className="text-sm text-gray-600">
                                    {Array.isArray(task.lastPerformed) ? (
                                        <div className="space-y-0.5">
                                            {task.lastPerformed.map((p, idx) => (
                                                <div key={idx}>{p}</div>
                                            ))}
                                        </div>
                                    ) : (
                                        task.lastPerformed
                                    )}
                                </div>

                                {/* Details */}
                                <div className="text-sm">
                                    {task.details ? (
                                        <span>
                                            Requested by <span className="text-blue-500">{task.details.replace('Requested by ', '')}</span>
                                        </span>
                                    ) : (
                                        <span className="text-gray-300">-</span>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                            <span className="text-sm text-gray-500">
                                Showing 1 to {filteredTasks.length} of {filteredTasks.length} entries
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-600">Previous</button>
                                <span className="px-3 py-1 text-sm text-blue-500 bg-blue-50 rounded">1</span>
                                <button className="px-3 py-1 text-sm text-gray-400 hover:text-gray-600">Next</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-lg">
                        <EmptyState
                            icon={ClipboardList}
                            title="No Tasks Found"
                            description="There are no tasks matching your search criteria. Try adjusting your filters or create a new task."
                        />
                    </div>
                )}
            </div>
        );
    };

    // Parts Tab Content
    const PartsContent = () => {
        const filteredParts = partsData.filter(part =>
            part?.name?.toLowerCase().includes(partsSearchTerm.toLowerCase())
        );

        return (
            <div className="space-y-4">
                {/* Header with Search and New */}
                <TabHeader
                    searchValue={partsSearchTerm}
                    onSearchChange={setPartsSearchTerm}
                    placeholder="Search parts..."
                    onNewClick={() => console.log('New Part clicked')}
                    buttonLabel="New"
                />

                {/* Parts Content */}
                {filteredParts.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg">
                        {/* Parts table would go here */}
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-lg">
                        <EmptyState
                            icon={Package}
                            title="No Parts"
                            description="There are no parts associated with this equipment yet. Add parts to track inventory and usage."
                        />
                    </div>
                )}
            </div>
        );
    };

    // History Tab Content
    const HistoryContent = () => {
        const filteredHistory = historyData.filter(item =>
            item?.description?.toLowerCase().includes(historySearchTerm.toLowerCase())
        );

        return (
            <div className="space-y-4">
                {/* Header with Search and New */}
                <TabHeader
                    searchValue={historySearchTerm}
                    onSearchChange={setHistorySearchTerm}
                    placeholder="Search history..."
                    onNewClick={() => console.log('New History Entry clicked')}
                    buttonLabel="New"
                />

                {/* History Content */}
                {filteredHistory.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg">
                        {/* History table would go here */}
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-lg">
                        <EmptyState
                            icon={Clock}
                            title="No History"
                            description="There is no maintenance history recorded for this equipment yet. History will appear here after tasks are completed."
                        />
                    </div>
                )}
            </div>
        );
    };

    // Attachments Tab Content
    const AttachmentsContent = () => {
        const filteredAttachments = attachmentsData.filter(item =>
            item?.name?.toLowerCase().includes(attachmentsSearchTerm.toLowerCase())
        );

        return (
            <div className="space-y-4">
                {/* Header with Search and New */}
                <TabHeader
                    searchValue={attachmentsSearchTerm}
                    onSearchChange={setAttachmentsSearchTerm}
                    placeholder="Search attachments..."
                    onNewClick={() => console.log('New Attachment clicked')}
                    buttonLabel="New"
                />

                {/* Attachments Content */}
                {filteredAttachments.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg">
                        {/* Attachments grid would go here */}
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-lg">
                        <EmptyState
                            icon={Paperclip}
                            title="No Attachments"
                            description="There are no documents attached to this equipment yet. Upload documents like manuals, warranties, or inspection reports."
                        />
                    </div>
                )}
            </div>
        );
    };

    // Render active tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileContent />;
            case 'tasks':
                return <TasksContent />;
            case 'parts':
                return <PartsContent />;
            case 'history':
                return <HistoryContent />;
            case 'attachments':
                return <AttachmentsContent />;
            default:
                return <ProfileContent />;
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">{equipment.id}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-lg">
                        Edit
                    </Button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Equipment Photo and Info */}
            <div className="px-6 py-6 border-b border-gray-200">
                <div className="flex items-start gap-6">
                    {/* Equipment Image */}
                    <div className="w-40 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                        <div className="w-full h-full flex items-center justify-center">
                            <Truck className="w-16 h-16 text-gray-400" />
                        </div>
                    </div>
                    {/* Equipment Info */}
                    <div className="flex flex-col gap-1">
                        <span className="text-blue-500 text-sm font-medium">{equipment.name}</span>
                        <span className="text-gray-600 text-sm">
                            {equipmentDetails.yearMakeModel} | {equipmentDetails.miles} Miles
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-gray-200">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default EquipmentDetails;
