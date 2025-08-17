'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';

interface EmailVerificationFormProps {
  token: string;
}

export default function EmailVerificationForm({ token }: EmailVerificationFormProps) {
  const router = useRouter();
  const { verifyEmail } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      handleVerification();
    } else {
      setMessage({ type: 'error', text: 'Invalid or missing verification token.' });
      setLoading(false);
    }
  }, [token]);

  const handleVerification = async () => {
    try {
      const result = await verifyEmail(token);
      
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
      setMessage({ type: 'error', text: 'An unexpected error occurred during verification.' });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Verification Link
          </h2>
          <Alert variant="destructive" className="mb-4">
            This email verification link is invalid or has expired. Please request a new verification email.
          </Alert>
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Email Verification
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {loading 
            ? 'Verifying your email address...'
            : success 
              ? 'Your email has been verified successfully!'
              : 'There was an issue verifying your email'
          }
        </p>
      </div>

      <div className="text-center">
        {loading && (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please wait while we verify your email address...
            </p>
          </div>
        )}

        {!loading && (
          <>
            {success ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                {message && (
                  <Alert variant="success" className="mb-4">
                    {message.text}
                    <div className="mt-2 text-sm">
                      You will be redirected to the sign-in page in a few seconds...
                    </div>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Button
                    onClick={() => router.push('/auth/login')}
                    className="w-full"
                  >
                    Continue to Sign In
                  </Button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    You can now sign in with your verified email address
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>

                {message && (
                  <Alert variant="destructive" className="mb-4">
                    {message.text}
                  </Alert>
                )}

                <div className="space-y-3">
                  <Button
                    onClick={() => router.push('/auth/register')}
                    variant="outline"
                    className="w-full"
                  >
                    Try Registration Again
                  </Button>
                  
                  <Button
                    onClick={() => router.push('/auth/login')}
                    variant="ghost"
                    className="w-full"
                  >
                    Go to Sign In
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Need help?{' '}
          <Link
            href="/contact"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}