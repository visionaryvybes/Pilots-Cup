import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';

export default function Navbar() {
  // Placeholder menu data
  const menu = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'All Products',
      path: '/search'
    },
    {
      title: 'Clothing',
      path: '/search/clothing'
    },
    {
      title: 'Accessories',
      path: '/search/accessories'
    },
    {
      title: 'About',
      path: '/about'
    }
  ];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-full">
              <span className="text-sm font-bold">C</span>
            </div>
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              Commerce
            </div>
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menu.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <div className="h-6 w-6 text-black dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
