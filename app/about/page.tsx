import { BackToTop } from 'components/back-to-top';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Pilots Cup',
  description: 'Learn about Pilots Cup UAE, our professional karting facility, and our commitment to bringing world-class Rotax karting to the UAE.'
};

const stats = [
  { label: 'Years of Experience', value: '10+' },
  { label: 'Professional Karts', value: '30+' },
  { label: 'Track Length', value: '1.2 km' },
  { label: 'Happy Racers', value: '50k+' }
];

const teamMembers = [
  {
    id: 1,
    name: 'Ahmed Al-Mansouri',
    role: 'Founder & CEO',
    bio: 'Former professional kart racer with over 15 years of experience. Ahmed founded Pilots Cup with a vision to bring professional karting to enthusiasts of all levels.',
    image: '/images/team/team-1.jpg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    bio: 'With a background in sports management, Sarah ensures that every aspect of Pilots Cup runs smoothly, from track maintenance to event organization.',
    image: '/images/team/team-2.jpg'
  },
  {
    id: 3,
    name: 'Mohammed Al-Qasimi',
    role: 'Head Racing Coach',
    bio: 'A champion racer with multiple UAE karting titles, Mohammed leads our coaching program and helps drivers of all levels improve their skills.',
    image: '/images/team/team-3.jpg'
  },
  {
    id: 4,
    name: 'Emma Williams',
    role: 'Customer Experience Director',
    bio: 'Emma ensures that every visitor to Pilots Cup receives exceptional service, from first-time drivers to seasoned racers.',
    image: '/images/team/team-4.jpg'
  }
];

const values = [
  {
    title: 'Safety First',
    description: 'We prioritize the safety of our drivers above all else, with rigorous equipment maintenance, comprehensive safety briefings, and trained staff always on hand.'
  },
  {
    title: 'Inclusivity',
    description: 'We believe that karting should be accessible to everyone, regardless of experience level. Our programs cater to beginners and professionals alike.'
  },
  {
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from the quality of our karts to the design of our track and the service we provide to our customers.'
  },
  {
    title: 'Innovation',
    description: 'We continuously invest in the latest technology and racing equipment.'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/track/track-aerial.jpg"
            alt="Pilots Cup Track"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            About Pilots Cup
          </h1>
          <p className="mb-8 text-xl font-medium md:text-2xl max-w-3xl">
            The premier Rotax karting experience in the UAE
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-neutral-300 mb-4">
                Founded in 2020, Pilots Cup was born from a passion for professional karting and a desire to make the thrill of racing accessible to everyone. Our founder, Ahmed Al-Mansouri, a former professional kart racer, recognized the need for a premium karting facility that could serve both casual drivers and serious competitors.
              </p>
              <p className="text-neutral-300 mb-4">
                What started as a small track with just 10 karts has grown into the UAE's premier karting destination, featuring state-of-the-art Rotax karts, a professionally designed track, and a community of passionate racers.
              </p>
              <p className="text-neutral-300">
                Today, Pilots Cup hosts regular events, training programs, and corporate experiences, all while maintaining our commitment to safety, quality, and the pure joy of racing.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/images/track/PHOTO-2025-03-04-08-57-22.jpg"
                alt="Pilots Cup Track"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <div className="rounded-lg bg-neutral-900 p-8 border border-neutral-800">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
            <p className="text-neutral-300 text-center text-xl max-w-3xl mx-auto">
              "To provide the most authentic and professional karting experience in the UAE, fostering a community of passionate racers and making the thrill of motorsport accessible to everyone."
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div key={index} className="rounded-lg bg-neutral-900 p-6 border border-neutral-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-neutral-400">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-4">{member.role}</p>
                  <p className="text-neutral-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Facilities</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800">
              <div className="relative h-48">
                <Image
                  src="/images/track/track-overview.jpg"
                  alt="Racing Track"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Professional Track</h3>
                <p className="text-neutral-400">
                  Our 1.2km track features 12 challenging turns, elevation changes, and a 200m straight, designed to test drivers of all skill levels.
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800">
              <div className="relative h-48">
                <Image
                  src="/images/karts/rotax-senior.jpg"
                  alt="Rotax Karts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Premium Karts</h3>
                <p className="text-neutral-400">
                  Our fleet consists exclusively of Rotax karts, known for their performance, reliability, and authentic racing experience.
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-neutral-900 overflow-hidden border border-neutral-800">
              <div className="relative h-48">
                <Image
                  src="/images/facilities/PHOTO-2025-03-04-08-58-44.jpg"
                  alt="Clubhouse"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Modern Clubhouse</h3>
                <p className="text-neutral-400">
                  Our clubhouse features a café, viewing area, briefing rooms, and pro shop, providing everything you need for a complete racing experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-lg bg-neutral-900 p-8 text-center border border-neutral-800">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Pilots Cup?</h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Whether you're looking to try karting for the first time or you're a seasoned racer, we have something for everyone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/rentals"
                className="rounded-md bg-red-600 px-6 py-3 text-base font-medium text-white hover:bg-red-700"
              >
                Book a Session
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
      <BackToTop />
    </div>
  );
} 