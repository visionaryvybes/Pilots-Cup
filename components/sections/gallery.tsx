'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface GalleryImage {
  src: string;
  alt: string;
  category: 'racing' | 'facility' | 'events';
  width: number;
  height: number;
  blurDataURL: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: '/images/gallery/PHOTO-2025-03-04-08-59-26.jpg',
    alt: 'Kart racing action on the track',
    category: 'racing',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
  {
    src: '/images/gallery/PHOTO-2025-03-04-09-04-40.jpg',
    alt: 'Pilots Cup racing facility overview',
    category: 'facility',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
  {
    src: '/images/gallery/PHOTO-2025-03-04-08-59-57.jpg',
    alt: 'Kart racing competition',
    category: 'events',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
  {
    src: '/images/gallery/PHOTO-2025-03-04-09-00-34.jpg',
    alt: 'Kart racing in action',
    category: 'racing',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
  {
    src: '/images/gallery/PHOTO-2025-03-04-09-01-52.jpg',
    alt: 'Pilots Cup racing event',
    category: 'events',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
  {
    src: '/images/gallery/PHOTO-2025-03-04-08-44-31.jpg',
    alt: 'Kart racing facility',
    category: 'facility',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
  {
    src: '/images/gallery/PHOTO-2025-03-04-08-59-38.jpg',
    alt: 'Professional kart racing',
    category: 'racing',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
  {
    src: '/images/gallery/PHOTO-2025-03-04-09-01-22.jpg',
    alt: 'Pilots Cup racing event',
    category: 'events',
    width: 1920,
    height: 1080,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLj82Pj4+Nj4uQEA/QEBAQEBAQEBAQEBAQEBAQEj/2wBDAR',
  },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'racing' | 'facility' | 'events'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') {
      setSelectedImage(null);
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (selectedIndex + 1) % filteredImages.length;
      const nextImage = filteredImages[nextIndex];
      if (nextImage) {
        setSelectedIndex(nextIndex);
        setSelectedImage(nextImage);
      }
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
      const prevImage = filteredImages[prevIndex];
      if (prevImage) {
        setSelectedIndex(prevIndex);
        setSelectedImage(prevImage);
      }
    }
  }, [selectedImage, selectedIndex, filteredImages]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!selectedImage) return;
      const nextIndex = (selectedIndex + 1) % filteredImages.length;
      const nextImage = filteredImages[nextIndex];
      if (nextImage) {
        setSelectedIndex(nextIndex);
        setSelectedImage(nextImage);
      }
    },
    onSwipedRight: () => {
      if (!selectedImage) return;
      const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
      const prevImage = filteredImages[prevIndex];
      if (prevImage) {
        setSelectedIndex(prevIndex);
        setSelectedImage(prevImage);
      }
    },
  });

  return (
    <section className="py-20 bg-gray-900 text-white" id="gallery" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the thrill and excitement of Pilots Cup through our gallery of racing moments.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10" role="tablist">
          {['all', 'racing', 'facility', 'events'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as typeof activeFilter)}
              role="tab"
              aria-selected={activeFilter === filter}
              aria-controls={`gallery-${filter}`}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-red-600 text-white'
                  : 'bg-transparent border border-red-600 text-red-500 hover:bg-red-600/10'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            role="tabpanel"
            id={`gallery-${activeFilter}`}
          >
            {filteredImages.map((image, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                onClick={() => {
                  setSelectedIndex(index);
                  setSelectedImage(image);
                }}
                role="button"
                aria-label={`View ${image.alt}`}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedIndex(index);
                    setSelectedImage(image);
                  }
                }}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                      target.onerror = null;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <p className="text-white font-medium">{image.alt}</p>
                    <span className="text-sm text-red-400 capitalize">{image.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
              {...swipeHandlers}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
            >
              <div 
                className="relative max-w-5xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 z-10 bg-red-600 text-white p-2 rounded-full"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close lightbox"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
                    const prevImage = filteredImages[prevIndex];
                    if (prevImage) {
                      setSelectedIndex(prevIndex);
                      setSelectedImage(prevImage);
                    }
                  }}
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextIndex = (selectedIndex + 1) % filteredImages.length;
                    const nextImage = filteredImages[nextIndex];
                    if (nextImage) {
                      setSelectedIndex(nextIndex);
                      setSelectedImage(nextImage);
                    }
                  }}
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="relative w-full h-[80vh]">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
                <div className="bg-black p-4 rounded-b-xl">
                  <p id="lightbox-title" className="text-white text-lg font-medium">{selectedImage.alt}</p>
                  <p className="text-red-400 capitalize">{selectedImage.category}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 