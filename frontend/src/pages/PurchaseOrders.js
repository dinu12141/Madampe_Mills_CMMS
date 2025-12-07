import React, { useState } from 'react';
import { purchaseOrders as initialPOs } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Plus, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';

const PurchaseOrders = () => {
  const [purchaseOrders] = useState(initialPOs);
  const [selectedPO, setSelectedPO] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500',
      approved: 'bg-blue-500',
      ordered: 'bg-purple-500',
      received: 'bg-green-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Purchase Orders</h2>
          <p className="text-gray-600 mt-1">Manage purchase orders and procurement</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Create PO
        </Button>
      </div>

      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders ({purchaseOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">PO Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Vendor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Order Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Expected Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{po.id}</td>
                    <td className="py-3 px-4 text-gray-700">{po.vendor}</td>
                    <td className="py-3 px-4 text-gray-700">{po.orderDate}</td>
                    <td className="py-3 px-4 text-gray-700">{po.expectedDate}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(po.status)} text-white capitalize`}>
                        {po.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">${po.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPO(po);
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

      {/* View PO Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedPO && (
            <>
              <DialogHeader>
                <DialogTitle>Purchase Order - {selectedPO.id}</DialogTitle>
                <DialogDescription>Purchase order details and line items</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Vendor</Label>
                    <p className="font-medium">{selectedPO.vendor}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Status</Label>
                    <Badge className={`${getStatusColor(selectedPO.status)} text-white capitalize`}>
                      {selectedPO.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-600">Order Date</Label>
                    <p className="font-medium">{selectedPO.orderDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Expected Date</Label>
                    <p className="font-medium">{selectedPO.expectedDate}</p>
                  </div>
                  {selectedPO.receivedDate && (
                    <div>
                      <Label className="text-gray-600">Received Date</Label>
                      <p className="font-medium">{selectedPO.receivedDate}</p>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-gray-600 mb-2 block">Line Items</Label>
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-2 px-3 text-sm font-medium">Part Name</th>
                        <th className="text-right py-2 px-3 text-sm font-medium">Quantity</th>
                        <th className="text-right py-2 px-3 text-sm font-medium">Unit Cost</th>
                        <th className="text-right py-2 px-3 text-sm font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPO.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-3 text-sm">{item.partName}</td>
                          <td className="py-2 px-3 text-sm text-right">{item.quantity}</td>
                          <td className="py-2 px-3 text-sm text-right">${item.unitCost.toFixed(2)}</td>
                          <td className="py-2 px-3 text-sm text-right font-medium">
                            ${(item.quantity * item.unitCost).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-bold">
                        <td colSpan="3" className="py-2 px-3 text-sm text-right">Total:</td>
                        <td className="py-2 px-3 text-sm text-right">${selectedPO.total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrders;
