import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        className: 'bg-black text-white',
        duration: 4000,
        style: {
          background: '#000',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}

// Usage example:
// import toast from 'react-hot-toast';
// toast.success('Successfully created!');
// toast.error('Failed to save.');
// toast('Default toast');
// toast.promise(
//   saveSettings(settings),
//   {
//     loading: 'Saving...',
//     success: 'Settings saved!',
//     error: 'Could not save.',
//   }
// ); 