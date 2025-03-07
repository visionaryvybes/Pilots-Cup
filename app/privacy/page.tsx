'use client';

import Link from 'next/link';
import { BackToTop } from '@/components/back-to-top';

const sections = [
  {
    title: 'Introduction',
    content: `
      At Pilots Cup, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services at Al Forsan International Circuit.

      Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our services.

      We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy.
    `
  },
  {
    title: 'Information We Collect',
    content: `
      We collect information that you provide directly to us, including:

      Personal Information:
      • Name and contact details
      • Date of birth
      • Emergency contact information
      • Payment information
      • Health information relevant to karting

      Usage Information:
      • Booking history
      • Race times and performance data
      • Membership status and preferences
      • Communication preferences
    `
  },
  {
    title: 'How We Use Your Information',
    content: `
      We use the information we collect to:
      • Process your bookings and payments
      • Provide customer support
      • Send promotional communications (with consent)
      • Improve our services
      • Ensure safety and compliance
      • Analyze track usage and performance
      • Maintain membership records
      • Comply with legal obligations

      We will never sell your personal information to third parties.
    `
  },
  {
    title: 'Information Sharing',
    content: `
      We may share your information with:
      • Service providers (e.g., payment processors)
      • Insurance providers (when required)
      • Legal authorities (when required by law)
      • Emergency services (in case of accidents)

      All third parties are contractually obligated to protect your information and use it only for specified purposes.
    `
  },
  {
    title: 'Data Security',
    content: `
      We implement appropriate technical and organizational measures to protect your personal information, including:
      • Encryption of sensitive data
      • Secure server infrastructure
      • Regular security audits
      • Staff training on data protection
      • Access controls and authentication
      
      However, no method of transmission over the internet or electronic storage is 100% secure.
    `
  },
  {
    title: 'CCTV and Photography',
    content: `
      We use CCTV cameras throughout our facility for:
      • Safety monitoring
      • Security purposes
      • Race analysis
      • Incident investigation

      Photography/Videography:
      • We may take photos/videos during events
      • You may opt-out of promotional photography
      • CCTV footage is retained for 30 days
    `
  },
  {
    title: 'Your Rights',
    content: `
      Under applicable law, you have the right to:
      • Access your personal information
      • Correct inaccurate information
      • Request deletion of your information
      • Withdraw consent for marketing
      • Object to certain processing
      • Request data portability
      
      Contact our privacy team to exercise these rights.
    `
  },
  {
    title: 'Marketing Communications',
    content: `
      With your consent, we may send you:
      • Newsletters
      • Promotional offers
      • Event invitations
      • Service updates
      
      You can opt-out of marketing communications at any time through:
      • Unsubscribe links in emails
      • Contacting our customer service
      • Updating your account preferences
    `
  },
  {
    title: 'Children\'s Privacy',
    content: `
      We take special precautions to protect children's privacy:
      • Parental consent required for under-18s
      • Limited data collection for minors
      • Special handling of children's information
      • Parental access to children's records
      
      Contact us immediately if you believe we have collected information from a child without appropriate consent.
    `
  },
  {
    title: 'Contact Us',
    content: `
      For any privacy-related questions or concerns:
      • Email: privacy@pilotscup.ae
      • Phone: +971 555 5555
      • Address: Al Forsan International Circuit, Khalifa City A, Abu Dhabi, UAE
      
      Our Data Protection Officer can be reached at dpo@pilotscup.ae
    `
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-gray-400 text-sm">
            Last Updated: March 10, 2024
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <section key={index} className="bg-neutral-900 rounded-lg p-8 border border-neutral-800">
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <div className="prose prose-invert max-w-none">
                {section.content.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-300 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-neutral-900 rounded-lg p-8 text-center border border-neutral-800">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-gray-300 mb-8">
              If you have any questions about our privacy practices, please contact our Data Protection Officer.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block rounded-md bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700"
              >
                Contact Us
              </Link>
              <Link
                href="/terms"
                className="inline-block rounded-md border border-white px-8 py-3 text-base font-medium text-white hover:bg-white/10"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
} 