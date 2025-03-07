'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🏎️ Welcome to Pilots Cup Racing!', {
        id: 'welcome-toast',
        duration: 10000, // Show for 10 seconds instead of infinity
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            Experience the thrill of professional karting at UAE's premier racing facility.{' '}
            <a
              href="/book"
              className="text-red-600 hover:underline"
            >
              Book your session
            </a>
          </>
        )
      });
    }
  }, []);

  return null;
}
