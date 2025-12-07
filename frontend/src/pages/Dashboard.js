import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  ClipboardList,
  AlertCircle,
  Calendar,
  Wrench,
  Package,
  TrendingUp,
  Clock,
  Activity,
} from 'lucide-react';
import { dashboardStats, workOrders, equipment } from '../mockData';

const Dashboard = () => {
  const stats = [
    {
      title: 'Open Work Orders',
      value: dashboardStats.openWorkOrders,
      icon: ClipboardList,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/work-orders',
    },
    {
      title: 'Overdue Work Orders',
      value: dashboardStats.overdueWorkOrders,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/work-orders',
    },
    {
      title: 'Scheduled PM',
      value: dashboardStats.scheduledPM,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/preventive-maintenance',
    },
    {
      title: 'Critical Equipment',
      value: dashboardStats.criticalEquipment,
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/equipment',
    },
    {
      title: 'Low Stock Items',
      value: dashboardStats.lowStockItems,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/inventory',
    },
    {
      title: 'Equipment Uptime',
      value: `${dashboardStats.equipmentUptime}%`,
      icon: Activity,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  const recentWorkOrders = workOrders.filter(wo => wo.status !== 'completed').slice(0, 5);
  const criticalEquipment = equipment.filter(eq => eq.status === 'maintenance-required');

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      scheduled: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
                {stat.link && (
                  <Link to={stat.link}>
                    <Button variant="link" className="mt-2 p-0 h-auto text-blue-600">
                      View Details →
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Work Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Work Orders</CardTitle>
            <Link to="/work-orders">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentWorkOrders.map((wo) => (
                <div key={wo.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{wo.id}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(wo.status)}`}>
                        {wo.status}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(wo.priority)}`}>
                        {wo.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{wo.title}</p>
                    <p className="text-xs text-gray-500 mt-1">Due: {wo.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Equipment Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Equipment Requiring Attention</CardTitle>
            <Link to="/equipment">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalEquipment.map((eq) => (
                <div key={eq.id} className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{eq.name}</p>
                    <p className="text-sm text-gray-600">{eq.location}</p>
                    <p className="text-xs text-gray-500 mt-1">Next Service: {eq.nextService}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                    {eq.criticality}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
