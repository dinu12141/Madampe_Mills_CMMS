import React, { useState } from 'react';
import { equipment as initialEquipment } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Filter, Eye, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';

const Equipment = () => {
  const [equipment, setEquipment] = useState(initialEquipment);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredEquipment = equipment.filter((eq) => {
    const matchesSearch =
      eq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || eq.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      operational: 'bg-green-500',
      'maintenance-required': 'bg-red-500',
      'out-of-service': 'bg-gray-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getCriticalityColor = (criticality) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-blue-500',
    };
    return colors[criticality] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Equipment</h2>
          <p className="text-gray-600 mt-1">Manage and track equipment assets</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by ID, name, or category..."
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
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="maintenance-required">Maintenance Required</SelectItem>
                <SelectItem value="out-of-service">Out of Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((eq) => (
          <Card key={eq.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            setSelectedEquipment(eq);
            setIsViewDialogOpen(true);
          }}>
            <CardContent className="p-0">
              <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  src={eq.image}
                  alt={eq.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{eq.name}</h3>
                    <p className="text-sm text-gray-600">{eq.id}</p>
                  </div>
                  <Badge className={`${getStatusColor(eq.status)} text-white text-xs`}>
                    {eq.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Category:</span> {eq.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> {eq.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Next Service:</span> {eq.nextService}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge className={`${getCriticalityColor(eq.criticality)} text-white text-xs capitalize`}>
                    {eq.criticality}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Equipment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedEquipment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEquipment.name}</DialogTitle>
                <DialogDescription>Equipment details and maintenance information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={selectedEquipment.image}
                    alt={selectedEquipment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Equipment ID</Label>
                    <p className="font-medium">{selectedEquipment.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Category</Label>
                    <p className="font-medium">{selectedEquipment.category}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Manufacturer</Label>
                    <p className="font-medium">{selectedEquipment.manufacturer}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Model</Label>
                    <p className="font-medium">{selectedEquipment.model}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Serial Number</Label>
                    <p className="font-medium">{selectedEquipment.serialNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Location</Label>
                    <p className="font-medium">{selectedEquipment.location}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={`${getStatusColor(selectedEquipment.status)} text-white`}>
                      {selectedEquipment.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Criticality</Label>
                    <Badge className={`${getCriticalityColor(selectedEquipment.criticality)} text-white capitalize`}>
                      {selectedEquipment.criticality}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Install Date</Label>
                    <p className="font-medium">{selectedEquipment.installDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Last Service</Label>
                    <p className="font-medium">{selectedEquipment.lastService}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Next Service</Label>
                    <p className="font-medium">{selectedEquipment.nextService}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Equipment;
