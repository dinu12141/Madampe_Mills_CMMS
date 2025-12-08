import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Calendars = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // December 2025
    const [selectedView, setSelectedView] = useState('Month');
    const [locationFilter, setLocationFilter] = useState('All Locations');

    // Categories
    const categories = [
        { name: 'Maintenance', color: '#f0f0f0', checked: true },
        { name: 'Work Order', color: '#4a90d9', checked: true },
        { name: 'Employee Renewal', color: '#4a90d9', checked: true },
    ];

    // Get calendar data
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const shortDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Important dates (for highlighting)
    const importantDates = [10, 17, 21]; // Red dates
    const todayDate = 8; // Highlighted date

    // Generate calendar grid
    const generateCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth);

        const grid = [];
        let day = 1;
        let nextMonthDay = 1;

        for (let week = 0; week < 6; week++) {
            const weekRow = [];
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const cellIndex = week * 7 + dayOfWeek;

                if (cellIndex < firstDay) {
                    // Previous month days
                    weekRow.push({
                        day: daysInPrevMonth - firstDay + cellIndex + 1,
                        isCurrentMonth: false,
                        isPrevMonth: true,
                    });
                } else if (day > daysInMonth) {
                    // Next month days
                    weekRow.push({
                        day: nextMonthDay++,
                        isCurrentMonth: false,
                        isNextMonth: true,
                    });
                } else {
                    // Current month days
                    weekRow.push({
                        day: day,
                        isCurrentMonth: true,
                        isImportant: importantDates.includes(day),
                        isToday: day === todayDate,
                    });
                    day++;
                }
            }
            grid.push(weekRow);
        }
        return grid;
    };

    // Mini calendar for sidebar
    const generateMiniCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth);

        const grid = [];
        let day = 1;
        let nextMonthDay = 1;

        for (let week = 0; week < 6; week++) {
            const weekRow = [];
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                const cellIndex = week * 7 + dayOfWeek;

                if (cellIndex < firstDay) {
                    weekRow.push({
                        day: daysInPrevMonth - firstDay + cellIndex + 1,
                        isCurrentMonth: false,
                    });
                } else if (day > daysInMonth) {
                    weekRow.push({
                        day: nextMonthDay++,
                        isCurrentMonth: false,
                    });
                } else {
                    weekRow.push({
                        day: day,
                        isCurrentMonth: true,
                        isToday: day === todayDate,
                    });
                    day++;
                }
            }
            grid.push(weekRow);
            if (day > daysInMonth && week >= 4) break;
        }
        return grid;
    };

    const navigateMonth = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    };

    const navigateYear = (direction) => {
        setCurrentDate(new Date(currentDate.getFullYear() + direction, currentDate.getMonth(), 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date(2025, 11, 1)); // Set to December 2025
    };

    const calendarGrid = generateCalendarGrid();
    const miniCalendarGrid = generateMiniCalendarGrid();

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-medium text-gray-800 mb-3">Calendars</h1>

                {/* Location Filter */}
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                    {locationFilter}
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex gap-4">
                {/* Left Sidebar */}
                <div className="w-48 flex-shrink-0">
                    {/* Mini Calendar */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-600">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </span>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => navigateMonth(-1)}
                                    className="p-0.5 text-gray-500 hover:text-gray-700"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => navigateMonth(1)}
                                    className="p-0.5 text-gray-500 hover:text-gray-700"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Mini calendar grid */}
                        <div className="text-xs">
                            <div className="grid grid-cols-7 mb-1">
                                {shortDayNames.map(day => (
                                    <div key={day} className="text-center text-gray-500 py-0.5">{day}</div>
                                ))}
                            </div>
                            {miniCalendarGrid.map((week, weekIndex) => (
                                <div key={weekIndex} className="grid grid-cols-7">
                                    {week.map((cell, dayIndex) => (
                                        <div
                                            key={dayIndex}
                                            className={`text-center py-0.5 cursor-pointer hover:bg-gray-100 rounded
                                                ${!cell.isCurrentMonth ? 'text-gray-300' : ''}
                                                ${cell.isToday ? 'bg-blue-500 text-white rounded' : ''}
                                                ${cell.isCurrentMonth && importantDates.includes(cell.day) ? 'text-red-500' : ''}
                                            `}
                                        >
                                            {cell.day}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* View Toggles */}
                    <div className="flex gap-1 mb-4">
                        {['Week', 'List', 'Month'].map(view => (
                            <button
                                key={view}
                                onClick={() => setSelectedView(view)}
                                className={`px-3 py-1 text-xs rounded border ${selectedView === view
                                        ? 'bg-gray-200 border-gray-300 text-gray-700'
                                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {view}
                            </button>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                        {categories.map((category, index) => (
                            <label key={index} className="flex items-center gap-2 text-sm cursor-pointer">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                                    ${index === 0 ? 'border-gray-300' : 'border-blue-500'}`}
                                >
                                    {category.checked && (
                                        <div className={`w-2 h-2 rounded-full
                                            ${index === 0 ? 'bg-gray-300' : 'bg-blue-500'}`}
                                        />
                                    )}
                                </div>
                                <span className="text-blue-600">{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Main Calendar */}
                <div className="flex-1 bg-gradient-to-b from-blue-100 to-white rounded-lg overflow-hidden">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white/80">
                        <h2 className="text-lg font-medium text-gray-700">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToToday}
                                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50"
                            >
                                Today
                            </button>
                            <div className="flex">
                                <button
                                    onClick={() => navigateMonth(-1)}
                                    className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => navigateMonth(1)}
                                    className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex">
                                <button
                                    onClick={() => navigateYear(-1)}
                                    className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                                >
                                    <ChevronsLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => navigateYear(1)}
                                    className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                                >
                                    <ChevronsRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-2">
                        {/* Day Headers */}
                        <div className="grid grid-cols-7 border-b border-gray-200">
                            {dayNames.map(day => (
                                <div key={day} className="text-center text-sm text-gray-500 py-2 font-medium">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="border-l border-gray-200">
                            {calendarGrid.map((week, weekIndex) => (
                                <div key={weekIndex} className="grid grid-cols-7">
                                    {week.map((cell, dayIndex) => (
                                        <div
                                            key={dayIndex}
                                            className={`min-h-[80px] border-r border-b border-gray-200 p-1
                                                ${cell.isToday ? 'bg-yellow-50' : 'bg-white'}
                                                ${!cell.isCurrentMonth ? 'bg-gray-50' : ''}
                                            `}
                                        >
                                            <span className={`text-sm
                                                ${!cell.isCurrentMonth ? 'text-gray-300' : ''}
                                                ${cell.isImportant ? 'text-red-500 font-medium' : 'text-gray-600'}
                                            `}>
                                                {cell.day}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendars;
