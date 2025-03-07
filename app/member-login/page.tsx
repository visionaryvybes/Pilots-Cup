'use client';

import { LockClosedIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function MemberLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll use a simple check
      if (email === 'member@example.com' && password === 'member123') {
        // Set authentication flag
        localStorage.setItem('memberAuthenticated', 'true');
        // Redirect to dashboard after successful login
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="relative h-20 w-20 mx-auto">
                <div className="absolute inset-0 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  PC
                </div>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-white mt-6">Member Login</h1>
            <p className="text-gray-400 mt-2">
              Access your racing dashboard and manage your membership
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 text-white sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 text-white sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-75"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LockClosedIcon className="h-5 w-5 mr-2" />
                      Sign in
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-neutral-900 px-2 text-gray-400">New to Pilots Cup?</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/membership"
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  View our membership plans and join today →
                </Link>
              </div>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Demo credentials: member@example.com / member123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 