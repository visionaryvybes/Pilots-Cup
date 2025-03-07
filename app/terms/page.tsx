'use client';

import Link from 'next/link';
import { BackToTop } from '@/components/back-to-top';

const sections = [
  {
    title: 'Terms of Use',
    content: `
      These Terms of Use ("Terms") govern your use of the Pilots Cup website and services at Al Forsan International Circuit. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access our services.

      Our services are available only to users who can form legally binding contracts under applicable law. By using our services, you represent and warrant that you are at least 18 years old or have the legal consent of a parent or guardian.
    `
  },
  {
    title: 'Booking and Cancellation',
    content: `
      All bookings are subject to availability and confirmation. Prices are subject to change without notice.

      Cancellation Policy:
      • Free cancellation up to 24 hours before scheduled session
      • 50% charge for cancellations within 24 hours
      • No refund for no-shows
      • Force majeure events will be evaluated on a case-by-case basis

      Rescheduling is subject to availability and must be requested at least 24 hours before the original booking.
    `
  },
  {
    title: 'Safety and Conduct',
    content: `
      All participants must:
      • Follow safety instructions and track rules at all times
      • Wear appropriate safety equipment provided
      • Not be under the influence of alcohol or drugs
      • Report any safety concerns immediately
      • Follow staff instructions without question
      
      We reserve the right to refuse service to anyone who:
      • Violates safety rules
      • Displays dangerous or disruptive behavior
      • Fails to follow staff instructions
      • Appears to be under the influence of alcohol or drugs
    `
  },
  {
    title: 'Liability and Waivers',
    content: `
      By participating in karting activities, you acknowledge:
      • Karting involves inherent risks
      • You participate at your own risk
      • You must sign a waiver before participation
      
      We are not liable for:
      • Personal injury during normal activity use
      • Loss or damage to personal property
      • Accidents caused by participant negligence
      • Force majeure events
    `
  },
  {
    title: 'Health and Fitness',
    content: `
      Participants must:
      • Be physically fit to participate
      • Not have medical conditions that prevent safe participation
      • Not be pregnant
      • Inform staff of any relevant medical conditions
      
      We reserve the right to refuse participation based on health and safety concerns.
    `
  },
  {
    title: 'Privacy and Data',
    content: `
      We collect and process personal data in accordance with our Privacy Policy and applicable laws. By using our services, you consent to:
      • Collection of personal information
      • Use of data for service improvement
      • Marketing communications (optional)
      • CCTV recording for safety and security
      
      See our Privacy Policy for full details on data handling practices.
    `
  },
  {
    title: 'Membership Terms',
    content: `
      Membership benefits and terms:
      • Benefits subject to membership level
      • Non-transferable unless specified
      • Subject to good standing status
      • May be revoked for Terms violations
      
      Membership renewal and cancellation:
      • Automatic renewal unless cancelled
      • 30-day notice for cancellation
      • No refund for unused portions
    `
  },
  {
    title: 'Intellectual Property',
    content: `
      All content on our website and premises is protected by copyright and other intellectual property rights. You may not:
      • Copy or reproduce any content
      • Use our trademarks without permission
      • Take commercial photos/videos without consent
      • Share or sell any content without authorization
    `
  },
  {
    title: 'Modifications',
    content: `
      We reserve the right to:
      • Modify these Terms at any time
      • Change pricing and services
      • Update safety requirements
      • Modify operating hours
      
      Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified Terms.
    `
  },
  {
    title: 'Governing Law',
    content: `
      These Terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Abu Dhabi.

      For any questions about these Terms, please contact our legal department at legal@pilotscup.ae
    `
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-300">
            Please read these terms and conditions carefully before using our services
          </p>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-gray-400 text-sm">
            Last Updated: March 10, 2024
          </p>
        </div>

        {/* Terms Sections */}
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
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Our Terms?</h2>
            <p className="text-gray-300 mb-8">
              If you have any questions about these terms and conditions, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block rounded-md bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="inline-block rounded-md border border-white px-8 py-3 text-base font-medium text-white hover:bg-white/10"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
} 