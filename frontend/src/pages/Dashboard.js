import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  ChevronRight,
  ChevronDown,
  Clock,
  Wrench,
  Check,
} from 'lucide-react';
import NewWorkOrderModal from '../components/NewWorkOrderModal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleNewWO = (equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };
  // Stats data
  const stats = [
    {
      title: 'Equipment Due',
      value: 3,
      overdue: 2,
      soon: 1,
      borderColor: 'border-l-blue-500',
    },
    {
      title: 'Inventory Low',
      value: 2,
      outOfStock: 0,
      low: 2,
      borderColor: 'border-l-gray-300',
    },
    {
      title: 'Employees Due',
      value: 2,
      overdue: 0,
      soon: 2,
      borderColor: 'border-l-gray-300',
    },
  ];

  // Equipment data
  const equipmentList = [
    {
      id: 'AC-001-07',
      name: 'Class 8',
      description: 'International HV607',
      image: '/equipment-truck1.jpg',
      status: 'Overdue',
      statusColor: 'bg-red-500',
      tasks: '1 task',
      hasLink: true,
    },
    {
      id: 'PD-000-01',
      name: 'Police Cruiser',
      description: 'Ford Explorer',
      image: '/equipment-police.jpg',
      status: 'Overdue',
      statusColor: 'bg-red-500',
      tasks: '2 tasks',
      hasClock: true,
    },
    {
      id: 'L-007-02',
      name: 'Loader',
      description: 'John Deere 544K',
      image: '/equipment-loader.jpg',
      status: 'Soon',
      statusColor: 'bg-yellow-500',
      tasks: '2 tasks',
      hasClock: true,
    },
  ];

  // Work Orders data
  const workOrdersData = {
    open: 1,
    total: 3,
  };

  // Purchase Orders data
  const purchaseOrdersData = {
    requisition: 2,
    total: 3,
  };

  return (
    <div className="space-y-6">
      {/* Home Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Home</h1>
        <Link to="/locations" className="text-sm text-blue-500 hover:text-blue-600">
          All Locations
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="flex gap-6">
        {/* Left Column - Stats and Equipment List */}
        <div className="flex-1 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className={`border-l-4 ${stat.borderColor}`}>
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="mt-2 text-xs">
                    {stat.overdue !== undefined && (
                      <span>
                        <span className="text-red-500 font-medium">{stat.overdue} Overdue</span>
                        <span className="text-gray-400 mx-1">|</span>
                        <span className="text-yellow-600">{stat.soon} Soon</span>
                      </span>
                    )}
                    {stat.outOfStock !== undefined && (
                      <span className="text-gray-500">
                        {stat.outOfStock} Out of stock | {stat.low} Low
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dropdown Arrow */}
          <div className="flex justify-center">
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>

          {/* Equipment List */}
          <Card>
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm font-medium text-blue-500">All Due Equipment</span>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="text-red-500 font-medium">2 Due</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-yellow-600">1 Soon</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">0 Inspections</span>
                </div>
              </div>

              {/* Equipment Items */}
              {equipmentList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 mr-3" />
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-3" />

                  {/* Equipment Image */}
                  <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 flex items-center justify-center overflow-hidden">
                    <Wrench className="w-6 h-6 text-gray-400" />
                  </div>

                  {/* Equipment Info */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.id} {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2 py-1 text-xs text-white rounded ${item.statusColor} mr-4`}>
                    {item.status}
                  </span>

                  {/* Tasks */}
                  <div className="flex items-center space-x-2 text-xs text-blue-500 mr-4">
                    <span>{item.tasks}</span>
                    {item.hasClock && <Clock className="w-3 h-3" />}
                    {item.hasLink && <Wrench className="w-3 h-3" />}
                  </div>

                  {/* New WO Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => handleNewWO(item)}
                  >
                    New WO
                  </Button>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500">
                <span>Showing 1 to 3 of 3 entries</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Previous</span>
                  <span className="px-2 py-1 bg-blue-500 text-white rounded">1</span>
                  <span className="text-gray-400">Next</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Work Orders and Purchase Orders */}
        <div className="w-72 space-y-6">
          {/* Work Orders Card */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Work Orders</h3>

              {/* Donut Chart Placeholder */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray={`${(workOrdersData.open / workOrdersData.total) * 251.2} 251.2`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{workOrdersData.open}</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end space-x-2 text-xs">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-600">Open</span>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Orders Card */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Purchase Orders</h3>

              {/* Donut Chart Placeholder */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray={`${(purchaseOrdersData.requisition / purchaseOrdersData.total) * 251.2} 251.2`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{purchaseOrdersData.requisition}</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end space-x-2 text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-600">Requisition</span>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Cost by Month Card */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-1">Maintenance Cost by Month</h3>
              <p className="text-xs text-gray-500 mb-4">Jun 1, 2025 – Dec 7, 2025</p>

              {/* Simple Bar Chart Placeholder */}
              <div className="h-24 flex items-end justify-between space-x-1">
                <div className="w-full bg-gray-100 rounded-t" style={{ height: '20%' }}></div>
                <div className="w-full bg-gray-100 rounded-t" style={{ height: '40%' }}></div>
                <div className="w-full bg-gray-100 rounded-t" style={{ height: '60%' }}></div>
                <div className="w-full bg-gray-100 rounded-t" style={{ height: '30%' }}></div>
                <div className="w-full bg-gray-100 rounded-t" style={{ height: '80%' }}></div>
                <div className="w-full bg-gray-100 rounded-t" style={{ height: '50%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">250</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Work Order Modal */}
      <NewWorkOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        equipment={selectedEquipment}
      />
    </div>
  );
};

export default Dashboard;

