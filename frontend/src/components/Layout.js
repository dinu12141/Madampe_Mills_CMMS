import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Calendar,
  Settings,
  Users,
  ShoppingCart,
  FileText,
  LogOut,
  Menu,
  X,
  Wrench,
  Plus,
  Search,
  Bell,
  HelpCircle,
  Truck,
  AlertTriangle,
  Fuel,
  Droplet,
  DollarSign,
  Car,
  Boxes,
  UserPlus,
  ClipboardCheck,
  Layers,
} from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const { openNewEquipmentModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const actionMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActionMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
    { icon: Wrench, label: 'Equipment', path: '/equipment' },
    { icon: ClipboardList, label: 'Work Orders', path: '/work-orders' },
    { icon: ClipboardCheck, label: 'Inspections', path: '/inspections' },
    { icon: Calendar, label: 'Calendars', path: '/calendars' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ShoppingCart, label: 'Purchase Orders', path: '/purchase-orders' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: Truck, label: 'Vendors', path: '/vendors' },
  ];

  // Action menu items matching the screenshot
  const actionMenuItems = [
    { icon: Wrench, label: 'Equipment', path: '/equipment/new', color: '#3b82f6' },
    { icon: AlertTriangle, label: 'Repair Request', path: '/repair-request/new', color: '#ef4444' },
    { icon: ClipboardList, label: 'Work Order', path: '/work-orders/new', color: '#8b5cf6' },
    { icon: ClipboardCheck, label: 'Inspection Record', path: '/inspections/new', color: '#10b981' },
    { icon: Fuel, label: 'Fuel Transaction', path: '/fuel/new', color: '#f59e0b' },
    { icon: Droplet, label: 'Fluid Consumption', path: '/fluid/new', color: '#06b6d4' },
    { icon: DollarSign, label: 'Expense', path: '/expense/new', color: '#84cc16' },
    { icon: Car, label: 'Accident', path: '/accident/new', color: '#ef4444' },
    { icon: Boxes, label: 'Inventory', path: '/inventory/new', color: '#a855f7' },
    { icon: ShoppingCart, label: 'Purchase Order', path: '/purchase-orders/new', color: '#ec4899' },
    { icon: Truck, label: 'Vendor', path: '/vendors/new', color: '#14b8a6' },
    { icon: UserPlus, label: 'Employee', path: '/employees/new', color: '#6366f1' },
    { icon: Layers, label: 'Bulk Work Orders', path: '/work-orders/bulk', color: '#f97316' },
  ];

  const handleActionItemClick = (path) => {
    setActionMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-56' : 'w-16'
          } bg-[#1e3a5f] transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-3 border-b border-[#2d4a6f]">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-blue-500 rounded flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-sm">
                Maintenance<span className="text-blue-400">Pro</span>
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-white hover:bg-[#2d4a6f] h-8 w-8"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <div
                key={item.path}
                className={`flex items-center justify-between mx-2 rounded-md transition-colors text-sm ${isActive
                  ? 'bg-[#15314f]'
                  : 'hover:bg-[#2d4a6f]'
                  }`}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 flex-1 ${isActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
                {/* Show + button for active item */}
                {isActive && sidebarOpen && item.path !== '/dashboard' && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // For Equipment, use the modal context
                      if (item.path === '/equipment') {
                        openNewEquipmentModal();
                      } else {
                        navigate(`${item.path}/new`);
                      }
                    }}
                    className="mr-2 w-6 h-6 bg-blue-500 hover:bg-blue-600 rounded flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        {/* Get Help Button */}
        <div className="p-3 border-t border-[#2d4a6f]">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm h-9"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            {sidebarOpen && 'Get Help'}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4">
          {/* Left section - Plus button */}
          <div className="relative" ref={actionMenuRef}>
            <button
              onClick={() => setActionMenuOpen(!actionMenuOpen)}
              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>

            {/* Action Menu Dropdown */}
            {actionMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-md shadow-lg border border-gray-100 z-50" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                {/* Header */}
                <div className="px-3 py-2 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">New</span>
                </div>

                {/* Menu Items */}
                <div className="py-0.5">
                  {actionMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleActionItemClick(item.path)}
                      className="w-full text-left px-3 py-1.5 text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center section - Search bar */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search everything"
                className="w-full h-9 pl-10 pr-4 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right section - Icons only */}
          <div className="flex items-center space-x-2 ml-auto">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* Help */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

