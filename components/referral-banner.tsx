'use client';

import { useState, useEffect } from 'react';

export function ReferralBanner() {
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    friendName: '',
    friendEmail: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set isClient to true once component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Show the banner after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, [isClient]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleFormToggle = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Referral submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormVisible(false);
      setIsVisible(false);
      setFormData({
        yourName: '',
        yourEmail: '',
        friendName: '',
        friendEmail: '',
      });
    }, 3000);
  };

  if (!isClient || !isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black rounded-t-xl shadow-2xl overflow-hidden">
          {/* Banner Header */}
          <div className="bg-red-600 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <h3 className="text-xl font-bold text-white">Share the Racing Spirit!</h3>
            </div>
            <button 
              onClick={handleClose}
              className="text-white hover:text-black transition-colors"
              aria-label="Close referral banner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Banner Content */}
          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center py-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h4 className="text-xl font-bold text-white mb-2">Thanks for Spreading the Racing Spirit!</h4>
                <p className="text-gray-300">We've sent an invitation to your friend. You'll both receive:</p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li>• Free practice session (15 minutes)</li>
                  <li>• AED 50 off your next race</li>
                  <li>• Priority booking for special events</li>
                </ul>
              </div>
            ) : (
              <>
                <p className="text-gray-300 mb-4">
                  Invite your friends to join the racing community at Pilots Cup. You'll both get exclusive rewards when they complete their first race!
                </p>

                {isFormVisible ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="yourName" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="yourName"
                          name="yourName"
                          value={formData.yourName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="yourEmail"
                          name="yourEmail"
                          value={formData.yourEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="friendName" className="block text-sm font-medium text-gray-300 mb-1">
                          Friend's Name
                        </label>
                        <input
                          type="text"
                          id="friendName"
                          name="friendName"
                          value={formData.friendName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="friendEmail" className="block text-sm font-medium text-gray-300 mb-1">
                          Friend's Email
                        </label>
                        <input
                          type="email"
                          id="friendEmail"
                          name="friendEmail"
                          value={formData.friendEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={handleFormToggle}
                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                      >
                        Send Race Invitation
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-center">
                    <button
                      onClick={handleFormToggle}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors flex items-center"
                    >
                      Invite a Racing Buddy
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 