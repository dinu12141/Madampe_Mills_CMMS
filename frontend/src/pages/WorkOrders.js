import React, { useState } from 'react';
import { workOrders as initialWorkOrders } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState(initialWorkOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedWO, setSelectedWO] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newWO, setNewWO] = useState({
    title: '',
    equipment: '',
    priority: 'medium',
    description: '',
    assignedTo: '',
    dueDate: '',
  });

  const filteredWorkOrders = workOrders.filter((wo) => {
    const matchesSearch =
      wo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.equipment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || wo.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateWO = () => {
    const newWorkOrder = {
      id: `WO-${1000 + workOrders.length + 1}`,
      ...newWO,
      equipmentId: 'EQ-001',
      status: 'open',
      createdDate: new Date().toISOString().split('T')[0],
      type: 'corrective',
      estimatedHours: 0,
      actualHours: 0,
    };
    setWorkOrders([newWorkOrder, ...workOrders]);
    setIsCreateDialogOpen(false);
    setNewWO({
      title: '',
      equipment: '',
      priority: 'medium',
      description: '',
      assignedTo: '',
      dueDate: '',
    });
    toast({
      title: 'Work Order Created',
      description: `Work order ${newWorkOrder.id} has been created successfully.`,
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-500',
      'in-progress': 'bg-yellow-500',
      completed: 'bg-green-500',
      scheduled: 'bg-purple-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500',
    };
    return colors[priority] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Work Orders</h2>
          <p className="text-gray-600 mt-1">Manage and track maintenance work orders</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Work Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Work Order</DialogTitle>
              <DialogDescription>Fill in the details to create a new work order</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newWO.title}
                    onChange={(e) => setNewWO({ ...newWO, title: e.target.value })}
                    placeholder="Enter work order title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment *</Label>
                  <Input
                    id="equipment"
                    value={newWO.equipment}
                    onChange={(e) => setNewWO({ ...newWO, equipment: e.target.value })}
                    placeholder="Select equipment"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newWO.priority} onValueChange={(value) => setNewWO({ ...newWO, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newWO.dueDate}
                    onChange={(e) => setNewWO({ ...newWO, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Input
                  id="assignedTo"
                  value={newWO.assignedTo}
                  onChange={(e) => setNewWO({ ...newWO, assignedTo: e.target.value })}
                  placeholder="Enter technician name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newWO.description}
                  onChange={(e) => setNewWO({ ...newWO, description: e.target.value })}
                  placeholder="Enter work order description"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWO} className="bg-blue-500 hover:bg-blue-600">
                  Create Work Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by ID, title, or equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Work Orders ({filteredWorkOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Equipment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkOrders.map((wo) => (
                  <tr key={wo.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{wo.id}</td>
                    <td className="py-3 px-4 text-gray-700">{wo.title}</td>
                    <td className="py-3 px-4 text-gray-700">{wo.equipment}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getPriorityColor(wo.priority)} text-white capitalize`}>
                        {wo.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(wo.status)} text-white capitalize`}>
                        {wo.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{wo.assignedTo}</td>
                    <td className="py-3 px-4 text-gray-700">{wo.dueDate}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedWO(wo);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Work Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedWO && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedWO.id} - {selectedWO.title}</DialogTitle>
                <DialogDescription>Work order details and information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Equipment</Label>
                    <p className="font-medium">{selectedWO.equipment}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Type</Label>
                    <p className="font-medium capitalize">{selectedWO.type}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Priority</Label>
                    <Badge className={`${getPriorityColor(selectedWO.priority)} text-white capitalize`}>
                      {selectedWO.priority}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={`${getStatusColor(selectedWO.status)} text-white capitalize`}>
                      {selectedWO.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Created Date</Label>
                    <p className="font-medium">{selectedWO.createdDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Due Date</Label>
                    <p className="font-medium">{selectedWO.dueDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Assigned To</Label>
                    <p className="font-medium">{selectedWO.assignedTo}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Estimated Hours</Label>
                    <p className="font-medium">{selectedWO.estimatedHours}h</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">Description</Label>
                  <p className="mt-1">{selectedWO.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkOrders;
