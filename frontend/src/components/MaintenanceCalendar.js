import React, { useState } from 'react';
import { X, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Menu } from 'lucide-react';

const MaintenanceCalendar = ({ isOpen, onClose, equipmentData = [] }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'week', 'list', 'month'
    const [locationFilter, setLocationFilter] = useState('All Locations');
    const [statusFilter, setStatusFilter] = useState('All');
    const [filterNone, setFilterNone] = useState('Filter: None');

    // Get calendar data
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and total days
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayWeekday = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    // Generate calendar days
    const calendarDays = [];

    // Add previous month's trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
        calendarDays.push({
            day: prevMonthLastDay - i,
            isCurrentMonth: false,
            date: new Date(year, month - 1, prevMonthLastDay - i)
        });
    }

    // Add current month's days
    for (let day = 1; day <= totalDays; day++) {
        calendarDays.push({
            day,
            isCurrentMonth: true,
            date: new Date(year, month, day)
        });
    }

    // Add next month's leading days to complete the grid
    const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
        calendarDays.push({
            day,
            isCurrentMonth: false,
            date: new Date(year, month + 1, day)
        });
    }

    // Sample maintenance events (can be replaced with actual data)
    const maintenanceEvents = [
        {
            id: 'AC-001-07',
            task: 'Oil Leaking',
            date: new Date(2025, 11, 7),
            status: 'overdue'
        },
        {
            id: 'PD-000-01',
            task: 'Oil and Filter Change',
            date: new Date(2025, 11, 25),
            status: 'overdue'
        },
        {
            id: 'M-336-GN',
            task: 'PM A',
            date: new Date(2026, 0, 6),
            status: 'upcoming'
        },
    ];

    // Get events for a specific date
    const getEventsForDate = (date) => {
        return maintenanceEvents.filter(event =>
            event.date.getDate() === date.getDate() &&
            event.date.getMonth() === date.getMonth() &&
            event.date.getFullYear() === date.getFullYear()
        );
    };

    // Navigation handlers
    const goToToday = () => setCurrentDate(new Date());
    const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToPrevYear = () => setCurrentDate(new Date(year - 1, month, 1));
    const goToNextYear = () => setCurrentDate(new Date(year + 1, month, 1));

    // Format month name
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Check if a day is today
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-40"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-[850px] max-w-full bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-gray-700">Maintenance Calendar</h2>
                    <button
                        onClick={onClose}
                        className="text-blue-500 hover:text-blue-600 p-1"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6">
                    {/* Hamburger menu icon */}
                    <div className="flex justify-end mb-4">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-3 mb-6">
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                            {locationFilter}
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                            {statusFilter}
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
                            {filterNone}
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    {/* View Toggle and Navigation */}
                    <div className="flex items-center justify-between mb-4">
                        {/* View Toggle */}
                        <div className="flex border border-gray-300 rounded overflow-hidden">
                            <button
                                onClick={() => setView('week')}
                                className={`px-3 py-1.5 text-sm ${view === 'week' ? 'bg-gray-100 font-medium' : 'bg-white hover:bg-gray-50'}`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`px-3 py-1.5 text-sm border-l border-gray-300 ${view === 'list' ? 'bg-gray-100 font-medium' : 'bg-white hover:bg-gray-50'}`}
                            >
                                List
                            </button>
                            <button
                                onClick={() => setView('month')}
                                className={`px-3 py-1.5 text-sm border-l border-gray-300 ${view === 'month' ? 'bg-gray-100 font-medium' : 'bg-white hover:bg-gray-50'}`}
                            >
                                Month
                            </button>
                        </div>

                        {/* Month/Year Display */}
                        <h3 className="text-lg text-gray-600">
                            {monthNames[month]} {year}
                        </h3>

                        {/* Navigation */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToToday}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50"
                            >
                                Today
                            </button>
                            <div className="flex border border-gray-300 rounded overflow-hidden">
                                <button
                                    onClick={goToPrevMonth}
                                    className="p-1.5 bg-white hover:bg-gray-50 border-r border-gray-300"
                                >
                                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                                </button>
                                <button
                                    onClick={goToNextMonth}
                                    className="p-1.5 bg-white hover:bg-gray-50"
                                >
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                            <div className="flex border border-gray-300 rounded overflow-hidden">
                                <button
                                    onClick={goToPrevYear}
                                    className="p-1.5 bg-white hover:bg-gray-50 border-r border-gray-300"
                                >
                                    <ChevronsLeft className="w-4 h-4 text-gray-500" />
                                </button>
                                <button
                                    onClick={goToNextYear}
                                    className="p-1.5 bg-white hover:bg-gray-50"
                                >
                                    <ChevronsRight className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="border border-gray-200 rounded">
                        {/* Day Headers */}
                        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-2 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7">
                            {calendarDays.map((dayInfo, index) => {
                                const events = getEventsForDate(dayInfo.date);
                                const isTodayDate = isToday(dayInfo.date);
                                const isMonday = dayInfo.date.getDay() === 1;

                                return (
                                    <div
                                        key={index}
                                        className={`
                      min-h-[90px] p-1 border-r border-b border-gray-200 last:border-r-0
                      ${!dayInfo.isCurrentMonth ? 'bg-gray-50' : 'bg-white'}
                      ${isTodayDate ? 'bg-yellow-50' : ''}
                      ${isMonday && dayInfo.isCurrentMonth ? 'bg-yellow-50' : ''}
                    `}
                                    >
                                        <div className={`
                      text-right text-sm p-1
                      ${!dayInfo.isCurrentMonth ? 'text-gray-400' : ''}
                      ${dayInfo.date.getDay() === 0 || dayInfo.date.getDay() === 4 || dayInfo.date.getDay() === 5 ? 'text-blue-500' : 'text-gray-700'}
                    `}>
                                            {dayInfo.day}
                                        </div>

                                        {/* Events */}
                                        <div className="space-y-1">
                                            {events.map((event, eventIndex) => (
                                                <div
                                                    key={eventIndex}
                                                    className={`
                            text-xs p-1 rounded truncate
                            ${event.status === 'overdue' ? 'bg-red-50 border-l-2 border-red-400' : ''}
                            ${event.status === 'upcoming' ? 'bg-purple-50 border-l-2 border-purple-400' : ''}
                          `}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium text-gray-700">{event.id}</span>
                                                        {event.status === 'overdue' && (
                                                            <span className="px-1 py-0.5 text-[10px] bg-red-500 text-white rounded">
                                                                OVERDUE
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-gray-600 truncate">- {event.task}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MaintenanceCalendar;
