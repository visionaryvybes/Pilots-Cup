import { BackToTop } from 'components/back-to-top';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/track/PHOTO-2025-03-04-08-58-05.jpg"
            alt="Contact Pilots Cup"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mb-8 text-xl font-medium md:text-2xl max-w-3xl">
            Get in touch with the Pilots Cup team
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
            <p className="text-neutral-300 mb-8">
              Have a question or want to book a special event? Fill out the form below and our team will get back to you as soon as possible.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    className="mt-1 block w-full rounded-md border-neutral-800 bg-neutral-900 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    className="mt-1 block w-full rounded-md border-neutral-800 bg-neutral-900 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-neutral-800 bg-neutral-900 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full rounded-md border-neutral-800 bg-neutral-900 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-md border-neutral-800 bg-neutral-900 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option>General Inquiry</option>
                  <option>Booking Information</option>
                  <option>Corporate Events</option>
                  <option>Membership</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-neutral-800 bg-neutral-900 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-neutral-300">
                  Pilots Cup Karting Center<br />
                  Dubai Autodrome, Motor City<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Opening Hours</h3>
                <div className="space-y-2 text-neutral-300">
                  <div className="flex justify-between">
                    <span>Monday - Thursday:</span>
                    <span>10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday:</span>
                    <span>10:00 AM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span>9:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
                <div className="space-y-2 text-neutral-300">
                  <p>
                    <strong className="text-white">Phone:</strong>{' '}
                    <a href="tel:+97150123456" className="hover:text-red-500">
                      +971 50 123 4567
                    </a>
                  </p>
                  <p>
                    <strong className="text-white">Email:</strong>{' '}
                    <a href="mailto:info@pilotscup.ae" className="hover:text-red-500">
                      info@pilotscup.ae
                    </a>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-neutral-400 hover:text-red-500">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-red-500">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-red-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Find Us</h3>
              <div className="relative h-80 w-full rounded-lg overflow-hidden border border-neutral-800">
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-neutral-500">
                  <p className="text-center text-neutral-400">
                    Interactive map will be implemented soon.<br />
                    <span className="text-sm">Located at Dubai Autodrome, Motor City, Dubai, UAE</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
} 