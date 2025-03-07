'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { commonValidationRules, useForm } from '../../lib/hooks/use-form';

interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialData: ContactInput = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const validationRules = {
  name: [commonValidationRules.required('Please enter your name')],
  email: [
    commonValidationRules.required('Please enter your email'),
    commonValidationRules.email('Please enter a valid email address')
  ],
  subject: [commonValidationRules.required('Please enter a subject')],
  message: [
    commonValidationRules.required('Please enter your message'),
    commonValidationRules.minLength(10, 'Message must be at least 10 characters long')
  ]
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data,
    errors,
    setFieldValue,
    handleSubmit,
    reset
  } = useForm<ContactInput>({
    initialData,
    validationRules,
    onSubmit: async (formData: ContactInput) => {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to send message');
        }

        toast.success('Message sent successfully!');
        reset();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to send message');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={(e) => setFieldValue('name', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setFieldValue('email', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          value={data.subject}
          onChange={(e) => setFieldValue('subject', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={data.message}
          onChange={(e) => setFieldValue('message', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
} 