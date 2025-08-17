'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const { resetPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage({ type: 'error', text: 'Invalid or missing reset token.' });
    }
  }, [token]);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Very Weak', color: 'text-red-600' };
      case 2:
        return { text: 'Weak', color: 'text-orange-600' };
      case 3:
        return { text: 'Fair', color: 'text-yellow-600' };
      case 4:
        return { text: 'Good', color: 'text-blue-600' };
      case 5:
        return { text: 'Strong', color: 'text-green-600' };
      default:
        return { text: '', color: '' };
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};'":\\|,.<>\/?])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!token) {
      setMessage({ type: 'error', text: 'Invalid or missing reset token.' });
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await resetPassword(token, formData.password);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setSuccess(true);
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Update password strength for password field
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const strengthInfo = getPasswordStrengthText(passwordStrength);

  if (!token) {
    return (
      <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Reset Link
          </h2>
          <Alert variant="destructive" className="mb-4">
            This password reset link is invalid or has expired. Please request a new one.
          </Alert>
          <Link
            href="/auth/forgot-password"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {success 
            ? 'Your password has been reset successfully' 
            : 'Enter your new password below'
          }
        </p>
      </div>

      {message && (
        <Alert
          variant={message.type === 'error' ? 'destructive' : 'success'}
          className="mb-4"
        >
          {message.text}
          {success && (
            <div className="mt-2 text-sm">
              You will be redirected to the sign-in page in a few seconds...
            </div>
          )}
        </Alert>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="New password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder="Enter your new password"
              required
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Password strength:</span>
                  <span className={`text-xs font-medium ${strengthInfo.color}`}>
                    {strengthInfo.text}
                  </span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength === 1 ? 'bg-red-500 w-1/5' :
                      passwordStrength === 2 ? 'bg-orange-500 w-2/5' :
                      passwordStrength === 3 ? 'bg-yellow-500 w-3/5' :
                      passwordStrength === 4 ? 'bg-blue-500 w-4/5' :
                      passwordStrength === 5 ? 'bg-green-500 w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Password must contain uppercase, lowercase, number, and special character
                </div>
              </div>
            )}
          </div>

          <Input
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            placeholder="Confirm your new password"
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            {loading ? 'Resetting password...' : 'Reset password'}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{' '}
          <Link
            href="/auth/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}