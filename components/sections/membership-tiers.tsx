'use client';

import { ButtonLink } from '../ui/button';

type MembershipPlan = {
  name: string;
  description: string;
  price: string;
  features: string[];
  color: string;
};

const membershipPlans: MembershipPlan[] = [
  {
    name: "Silver",
    description: "MEMBERSHIP 1 (Single)",
    price: "15,000",
    color: "silver",
    features: [
      "25 hours single driver no downpayment",
      "Bambino - 10,000 AED",
      "Micro - 12,500 AED",
      "Mini - 13,500 AED",
      "Junior - 14,500 AED",
      "Senior - 15,000 AED",
      "DD2 - 16,000 AED",
      "Includes everything minus wristband",
      "Top 3 winners of 25 Hours get prizes"
    ]
  },
  {
    name: "Gold",
    description: "MEMBERSHIP 2 (Single)",
    price: "27,000",
    color: "gold",
    features: [
      "50 hours - Pays the 25 then upgrade",
      "Bambino - 18,000 AED",
      "Micro - 22,500 AED",
      "Mini - 24,300 AED",
      "Junior - 26,100 AED",
      "Senior - 27,000 AED",
      "DD2 - 27,800 AED",
      "Includes everything minus wristband",
      "Top 3 winners of 50 Hours get prizes"
    ]
  },
  {
    name: "Pair",
    description: "MEMBERSHIP 2",
    price: "10% off",
    color: "blue",
    features: [
      "10% discount across all packages",
      "Example: Bambino + Junior - 22,050 AED",
      "Example: Mini + DD2 - 26,500 AED",
      "Includes everything minus wristband",
      "Memberships are not transferrable",
      "Customer to pay any damages",
      "Top 3 winners get prizes"
    ]
  },
  {
    name: "Family",
    description: "MEMBERSHIP 3",
    price: "65,000+",
    color: "green",
    features: [
      "4-6 Members",
      "Free upgrade to categories if they outgrow",
      "6 Member DD2 Silver - 65,000 AED",
      "6 Member DD2 Gold - 120,000 AED",
      "25 day package inclusive of fuel etc",
      "Includes everything minus wristband",
      "Memberships are not transferrable"
    ]
  }
];

export function MembershipTiers() {
  return (
    <section id="membership" className="bg-neutral-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Membership Plans</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose your racing experience
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Join our racing community with flexible membership options designed for every skill level.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {membershipPlans.map((plan, index) => {
            // Define color schemes based on membership type
            let headerBg, borderColor, badgeBg, badgeText, buttonBg, buttonText, buttonHover;
            
            switch(plan.color) {
              case 'silver':
                headerBg = 'bg-gradient-to-b from-neutral-700 to-neutral-800';
                borderColor = 'ring-neutral-600';
                badgeBg = 'bg-neutral-700';
                badgeText = 'text-white';
                buttonBg = 'bg-neutral-700';
                buttonText = 'text-white';
                buttonHover = 'hover:bg-neutral-600';
                break;
              case 'gold':
                headerBg = 'bg-gradient-to-b from-red-600 to-red-700';
                borderColor = 'ring-red-500 ring-2';
                badgeBg = 'bg-red-600';
                badgeText = 'text-white';
                buttonBg = 'bg-red-600';
                buttonText = 'text-white';
                buttonHover = 'hover:bg-red-700';
                break;
              case 'blue':
                headerBg = 'bg-gradient-to-b from-neutral-700 to-neutral-800';
                borderColor = 'ring-neutral-600';
                badgeBg = 'bg-neutral-700';
                badgeText = 'text-white';
                buttonBg = 'bg-neutral-700';
                buttonText = 'text-white';
                buttonHover = 'hover:bg-neutral-600';
                break;
              case 'green':
                headerBg = 'bg-gradient-to-b from-neutral-700 to-neutral-800';
                borderColor = 'ring-neutral-600';
                badgeBg = 'bg-neutral-700';
                badgeText = 'text-white';
                buttonBg = 'bg-neutral-700';
                buttonText = 'text-white';
                buttonHover = 'hover:bg-neutral-600';
                break;
              default:
                headerBg = 'bg-neutral-800';
                borderColor = 'ring-neutral-700';
                badgeBg = 'bg-red-600';
                badgeText = 'text-white';
                buttonBg = 'bg-neutral-700';
                buttonText = 'text-white';
                buttonHover = 'hover:bg-neutral-600';
            }
            
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl overflow-hidden shadow-lg ${borderColor} ring-1 bg-neutral-800`}
              >
                {index === 1 && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <span className={`${badgeBg} ${badgeText} px-4 py-1 rounded-full text-sm font-medium shadow-md`}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`${headerBg} p-6 text-center relative`}>
                  <h3 className="text-xl font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-300">
                    {plan.description}
                  </p>
                  <p className="mt-4 flex items-baseline justify-center gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-white">
                      {plan.price}
                    </span>
                    <span className="text-sm font-semibold text-gray-300">AED</span>
                  </p>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <ButtonLink
                    href="/membership"
                    className={`mt-8 block w-full ${buttonBg} ${buttonText} ${buttonHover} border border-transparent shadow-sm py-3 px-4 rounded-md text-sm font-medium transition-colors`}
                  >
                    Join Now
                  </ButtonLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20">
        <div className="mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Prize Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-neutral-800 p-8 rounded-xl shadow-md border border-red-700">
              <div className="flex items-center mb-4">
                <div className="bg-red-600 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white">Winners of 50 Hours</h4>
              </div>
              <ul className="space-y-4 pl-4">
                <li className="flex items-center">
                  <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <span className="text-gray-300">Complete Kart</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-neutral-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <span className="text-gray-300">Complete Karts with no Engine</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <span className="text-gray-300">Brand New Customized Helmet</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-neutral-800 p-8 rounded-xl shadow-md border border-neutral-600">
              <div className="flex items-center mb-4">
                <div className="bg-neutral-600 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-white">Winners of 25 Hours</h4>
              </div>
              <ul className="space-y-4 pl-4">
                <li className="flex items-center">
                  <div className="bg-neutral-700 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <span className="text-gray-300">Brand New Customized Helmet</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-neutral-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <span className="text-gray-300">Used MyChron</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-neutral-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <span className="text-gray-300">Used GoPro</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-neutral-800 p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-red-600 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white">Additional Hours (Beyond 25 hours)</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-neutral-700 p-4 rounded-lg shadow-sm">
                <p className="font-bold text-white mb-1">Bambino</p>
                <p className="text-red-500 font-medium text-lg">200 AED</p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg shadow-sm">
                <p className="font-bold text-white mb-1">Micro</p>
                <p className="text-red-500 font-medium text-lg">300 AED</p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg shadow-sm">
                <p className="font-bold text-white mb-1">Mini</p>
                <p className="text-red-500 font-medium text-lg">350 AED</p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg shadow-sm">
                <p className="font-bold text-white mb-1">Junior</p>
                <p className="text-red-500 font-medium text-lg">400 AED</p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg shadow-sm">
                <p className="font-bold text-white mb-1">Senior</p>
                <p className="text-red-500 font-medium text-lg">450 AED</p>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg shadow-sm">
                <p className="font-bold text-white mb-1">DD2</p>
                <p className="text-red-500 font-medium text-lg">500 AED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}