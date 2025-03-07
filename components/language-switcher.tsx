'use client';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

// Types for our languages
interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

// Available languages
const languages: Language[] = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr'
  },
  {
    id: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
    direction: 'rtl'
  }
];

// Default language
const defaultLanguage: Language = {
  id: 'en',
  name: 'English',
  nativeName: 'English',
  flag: '🇬🇧',
  direction: 'ltr'
};

export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0] || defaultLanguage);

  // Handle language change
  const changeLanguage = (language: Language) => {
    setSelectedLanguage(language);
    
    // In a real app, this would update the app's locale and direction
    // For now, we'll just log the change
    console.log(`Language changed to ${language.name} (${language.id})`);
    
    // Example of how you might update the document direction
    // document.documentElement.dir = language.direction;
    // document.documentElement.lang = language.id;
  };

  return (
    <div className="relative">
      <Listbox value={selectedLanguage} onChange={changeLanguage}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm border border-gray-300">
            <span className="flex items-center">
              <span className="mr-2">{selectedLanguage.flag}</span>
              <span className="block truncate">{selectedLanguage.name}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {languages.map((language) => (
                <Listbox.Option
                  key={language.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-red-100 text-red-900' : 'text-gray-900'
                    }`
                  }
                  value={language}
                >
                  {({ selected }) => (
                    <>
                      <span className="flex items-center">
                        <span className="mr-2">{language.flag}</span>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {language.name}
                          <span className="ml-1 text-gray-500">({language.nativeName})</span>
                        </span>
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

// Compact version for mobile or navbar
export function CompactLanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0] || defaultLanguage);

  // Toggle between languages
  const toggleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.id === selectedLanguage.id);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];
    
    if (nextLanguage) {
      setSelectedLanguage(nextLanguage);
      
      // In a real app, this would update the app's locale and direction
      console.log(`Language changed to ${nextLanguage.name} (${nextLanguage.id})`);
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 rounded-md p-2 hover:bg-gray-100"
      aria-label={`Switch to ${selectedLanguage.id === 'en' ? 'Arabic' : 'English'}`}
    >
      <GlobeAltIcon className="h-5 w-5 text-gray-600" />
      <span>{selectedLanguage.flag}</span>
    </button>
  );
} 