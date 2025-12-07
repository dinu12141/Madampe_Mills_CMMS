import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

const Reports = () => {
  const reportTypes = [
    {
      title: 'Work Order Summary',
      description: 'Overview of all work orders with status breakdown',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Equipment Maintenance History',
      description: 'Detailed maintenance history for all equipment',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Cost Analysis',
      description: 'Maintenance costs breakdown by equipment and category',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Preventive Maintenance Compliance',
      description: 'PM schedule adherence and completion rates',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Inventory Status Report',
      description: 'Current inventory levels and reorder requirements',
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Vendor Performance',
      description: 'Vendor ratings, delivery times, and order history',
      icon: FileText,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-gray-600 mt-1">Generate and download customizable reports</p>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`${report.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${report.color}`} />
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{report.description}</p>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Create custom reports with your own filters, date ranges, and data fields.
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <FileText className="w-4 h-4 mr-2" />
            Build Custom Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
