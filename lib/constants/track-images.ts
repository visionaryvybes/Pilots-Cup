export const TRACK_IMAGES = {
  // Track images
  aerial: '/images/track/al-forsan-aerial.jpg',
  layout: '/images/track/al-forsan-layout.jpg',
  entrance: '/images/track/al-forsan-entrance.jpg',
  night: '/images/track/al-forsan-night.jpg',

  // Facilities images
  serviceCenter: '/images/facilities/service-center.jpg',
  briefingRoom: '/images/facilities/briefing-room.jpg',
  pitLane: '/images/facilities/pit-lane.jpg',
  cafe: '/images/facilities/cafe.jpg',
  proShop: '/images/facilities/pro-shop.jpg',
  overview: '/images/facilities/facility-overview.jpg',

  // Safety images
  helmet: '/images/safety/helmet.jpg',
  suit: '/images/safety/suit.jpg',
  barriers: '/images/safety/barriers.jpg',
  briefing: '/images/safety/safety-briefing.jpg',

  // Team member images (placeholders for now)
  teamMember1: '/images/team/team-member-1.jpg',
  teamMember2: '/images/team/team-member-2.jpg',
  teamMember3: '/images/team/team-member-3.jpg',
  teamMember4: '/images/team/team-member-4.jpg',
} as const;

// Image metadata for Next.js Image component
export const IMAGE_METADATA = {
  track: {
    width: 1920,
    height: 1080,
    alt: {
      aerial: 'Aerial view of Al Forsan International Circuit',
      layout: 'Track layout of Al Forsan International Circuit',
      entrance: 'Main entrance of Al Forsan International Circuit',
      night: 'Night view of Al Forsan International Circuit with track lighting'
    }
  },
  facilities: {
    width: 800,
    height: 600,
    alt: {
      serviceCenter: 'Professional kart service center at Al Forsan',
      briefingRoom: 'Safety briefing room for drivers',
      pitLane: 'Pit lane and garages area',
      cafe: 'Trackside café and lounge',
      proShop: 'Professional karting equipment shop',
      overview: 'Overview of Al Forsan karting facilities'
    }
  },
  safety: {
    width: 600,
    height: 400,
    alt: {
      helmet: 'Professional racing helmet',
      suit: 'Racing suit and safety equipment',
      barriers: 'Track safety barriers and protection',
      briefing: 'Safety briefing session in progress'
    }
  }
}; 