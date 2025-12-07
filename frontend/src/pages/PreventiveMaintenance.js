import React, { useState } from 'react';
import { preventiveMaintenance as initialPM } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Plus, Calendar, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';

const PreventiveMaintenance = () => {
  const [pmSchedules, setPmSchedules] = useState(initialPM);
  const [selectedPM, setSelectedPM] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-500',
      overdue: 'bg-red-500',
      completed: 'bg-green-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getFrequencyColor = (frequency) => {
    const colors = {
      daily: 'bg-purple-100 text-purple-800',
      weekly: 'bg-blue-100 text-blue-800',
      monthly: 'bg-green-100 text-green-800',
      quarterly: 'bg-orange-100 text-orange-800',
      annual: 'bg-red-100 text-red-800',
    };
    return colors[frequency] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Preventive Maintenance</h2>
          <p className="text-gray-600 mt-1">Schedule and manage preventive maintenance tasks</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Create PM Schedule
        </Button>
      </div>

      {/* PM Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pmSchedules.map((pm) => (
          <Card key={pm.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{pm.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{pm.equipment}</p>
                </div>
                <Badge className={`${getStatusColor(pm.status)} text-white`}>
                  {pm.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Frequency:</span>
                </div>
                <Badge className={getFrequencyColor(pm.frequency)}>
                  {pm.frequency}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Last Completed</p>
                  <p className="font-medium text-sm">{pm.lastCompleted}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Next Due</p>
                  <p className="font-medium text-sm">{pm.nextDue}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Tasks:</p>
                <ul className="space-y-1">
                  {pm.tasks.slice(0, 3).map((task, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                  {pm.tasks.length > 3 && (
                    <li className="text-sm text-gray-500 ml-6">+{pm.tasks.length - 3} more tasks</li>
                  )}
                </ul>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedPM(pm);
                  setIsViewDialogOpen(true);
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View PM Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedPM && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPM.name}</DialogTitle>
                <DialogDescription>Preventive maintenance schedule details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">PM ID</Label>
                    <p className="font-medium">{selectedPM.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Equipment</Label>
                    <p className="font-medium">{selectedPM.equipment}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Frequency</Label>
                    <Badge className={getFrequencyColor(selectedPM.frequency)}>
                      {selectedPM.frequency}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={`${getStatusColor(selectedPM.status)} text-white`}>
                      {selectedPM.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Last Completed</Label>
                    <p className="font-medium">{selectedPM.lastCompleted}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Next Due</Label>
                    <p className="font-medium">{selectedPM.nextDue}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600 mb-2 block">Maintenance Tasks</Label>
                  <ul className="space-y-2">
                    {selectedPM.tasks.map((task, index) => (
                      <li key={index} className="flex items-start p-2 bg-gray-50 rounded">
                        <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreventiveMaintenance;
