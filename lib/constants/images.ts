export const IMAGES = {
  hero: {
    main: '/images/hero/DR-37-scaled.jpg', // Main hero image showing track
    track: '/images/hero/DSC06353-scaled.jpg', // Track overview
    facilities: '/images/hero/DSC06354-Edit-2-scaled.jpg', // Facilities view
    racing: '/images/hero/DR-36-scaled.jpg', // Racing action
    karting: '/images/hero/DR-42-scaled.jpg' // Karting experience
  },
  karts: {
    bambino: {
      main: '/images/karts/PHOTO-2025-03-04-08-53-03.jpg',
      action: '/images/karts/PHOTO-2025-03-04-08-54-44.jpg'
    },
    junior: {
      main: '/images/karts/PHOTO-2025-03-04-08-54-44.jpg',
      action: '/images/karts/PHOTO-2025-03-04-08-55-18.jpg'
    },
    senior: {
      main: '/images/karts/PHOTO-2025-03-04-08-55-18.jpg',
      action: '/images/karts/PHOTO-2025-03-04-08-55-50.jpg'
    },
    dd2: {
      main: '/images/karts/PHOTO-2025-03-04-08-55-18.jpg',
      action: '/images/karts/PHOTO-2025-03-04-08-55-50.jpg'
    }
  },
  events: {
    racing: '/images/events/PHOTO-2025-03-04-08-56-23.jpg',
    competition: '/images/events/PHOTO-2025-03-04-08-56-42.jpg',
    awards: '/images/events/PHOTO-2025-03-04-08-57-02.jpg'
  },
  track: {
    overview: '/images/track/PHOTO-2025-03-04-08-57-22.jpg',
    night: '/images/track/PHOTO-2025-03-04-08-57-41.jpg',
    aerial: '/images/track/PHOTO-2025-03-04-08-58-05.jpg'
  },
  facilities: {
    garage: '/images/facilities/PHOTO-2025-03-04-08-58-25.jpg',
    workshop: '/images/facilities/PHOTO-2025-03-04-08-58-44.jpg',
    briefing: '/images/facilities/PHOTO-2025-03-04-08-59-06.jpg'
  },
  gallery: {
    image1: '/images/gallery/PHOTO-2025-03-04-08-44-31.jpg',
    image2: '/images/gallery/PHOTO-2025-03-04-08-59-26.jpg',
    image3: '/images/gallery/PHOTO-2025-03-04-08-59-38.jpg',
    image4: '/images/gallery/PHOTO-2025-03-04-08-59-57.jpg',
    image5: '/images/gallery/PHOTO-2025-03-04-09-00-34.jpg',
    image6: '/images/gallery/PHOTO-2025-03-04-09-01-22.jpg',
    image7: '/images/gallery/PHOTO-2025-03-04-09-01-52.jpg',
    image8: '/images/gallery/PHOTO-2025-03-04-09-04-40.jpg'
  },
  team: {
    member1: '/images/team/team-member-1.jpg',
    member2: '/images/team/team-member-2.jpg',
    member3: '/images/team/team-member-3.jpg',
    member4: '/images/team/team-member-4.jpg'
  },
  misc: {
    frame: '/images/misc/dr frame.jpg'
  }
} as const;

// Image dimensions for Next.js Image component
export const IMAGE_DIMENSIONS = {
  hero: {
    width: 1920,
    height: 1080
  },
  standard: {
    width: 800,
    height: 600
  },
  square: {
    width: 600,
    height: 600
  }
} as const; 