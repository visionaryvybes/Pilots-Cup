'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonLink } from '../ui/button';

interface NavItem {
  label: string;
  href: string;
  isScroll?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Karts', href: '/rentals' },
  { label: 'Membership', href: '/membership' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const itemVariants = {
  closed: { x: -20, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Handle scroll event to change navbar appearance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Show/hide navbar based on scroll direction
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    // Change navbar background based on scroll position
    if (currentScrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle smooth scrolling for anchor links
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHomePage || !href.startsWith('#')) return;

    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      setIsMenuOpen(false);
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <motion.nav 
      initial={false}
      animate={{
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-white font-bold text-2xl"
            aria-label="Pilots Cup - Home"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Pilots Cup
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => item.isScroll && handleScrollTo(e, item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isScrolled 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-200 hover:text-white hover:bg-black/30'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <ButtonLink
                href="/book"
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all hover:scale-105"
              >
                Book Now
              </ButtonLink>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            initial={false}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-200 hover:text-white focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <motion.path
                initial={false}
                animate={isMenuOpen ? { d: "M6 18L18 6M6 6l12 12" } : { d: "M4 6h16M4 12h16M4 18h16" }}
                transition={{ duration: 0.2 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden mt-2 overflow-hidden bg-black/95 rounded-lg"
            >
              <motion.div className="flex flex-col space-y-1 px-2 pt-2 pb-3">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={itemVariants}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => item.isScroll && handleScrollTo(e, item.href)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={itemVariants}
                  custom={navItems.length}
                >
                  <ButtonLink
                    href="/book"
                    className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-base font-medium text-center transition-colors"
                  >
                    Book Now
                  </ButtonLink>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 