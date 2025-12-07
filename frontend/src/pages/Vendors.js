import React, { useState } from 'react';
import { vendors as initialVendors } from '../mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Plus, Mail, Phone, MapPin, Star } from 'lucide-react';

const Vendors = () => {
  const [vendors] = useState(initialVendors);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vendor Management</h2>
          <p className="text-gray-600 mt-1">Manage supplier and vendor contacts</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{vendor.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{vendor.category}</p>
                </div>
                <Badge className={vendor.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                  {vendor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{vendor.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{vendor.phone}</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <span>{vendor.address}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{vendor.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600">Contact: {vendor.contact}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Vendors;
