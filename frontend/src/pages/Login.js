import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Wrench } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const result = login(email, 'admin123'); // Using default password for demo
      if (result.success) {
        toast({
          title: 'Login successful',
          description: 'Welcome to MaintenancePro CMMS',
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: result.error,
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
              <Wrench className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">
              Maintenance<span className="text-blue-500">Pro</span>
            </CardTitle>
            <CardDescription className="text-base mt-2">Sign In</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Continue'}
            </Button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <Button type="button" variant="link" className="text-blue-500">
                Single sign-on (SSO)
              </Button>
              <div>
                <Button type="button" variant="link" className="text-blue-500">
                  Create Account
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 text-center mb-2 font-medium">Demo Credentials:</p>
            <div className="text-xs text-gray-700 space-y-1">
              <p><strong>Admin:</strong> admin@company.com</p>
              <p><strong>Manager:</strong> manager@company.com</p>
              <p><strong>Technician:</strong> tech@company.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
