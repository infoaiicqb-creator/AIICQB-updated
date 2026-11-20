import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, ShieldCheck } from 'lucide-react';

export const PricingPlans: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: 2999,
      period: 'per certification',
      popular: false,
      features: [
        '1 Online Proctored Exam Attempt',
        'Official Digital Certificate',
        'Global QR Registry Verification',
        'Basic Email Support',
      ],
      ctaText: 'Enroll Now',
      ctaLink: '/certifications',
    },
    {
      name: 'Professional',
      price: 4500,
      period: 'per certification',
      popular: true,
      tag: 'Most Popular',
      features: [
        'Exam + Complete Learning Hub',
        'Official Digital Certificate',
        'Curated Practice Mock Tests',
        'Priority Advisory Support',
        'Direct LinkedIn Credential Badge',
      ],
      ctaText: 'Enroll Now',
      ctaLink: '/certifications',
    },
    {
      name: 'Advance',
      price: 5999,
      period: 'per certification',
      popular: false,
      features: [
        'Everything in Professional',
        '1 Free Retake Attempt Included',
        '1-on-1 Expert Advisory Session',
        'Interview Preparation Guide',
        'Career Resource Toolkit',
      ],
      ctaText: 'Enroll Now',
      ctaLink: '/certifications',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#F47716] uppercase tracking-wider">Transparent Investment</span>
        <h1 className="text-3xl font-extrabold text-[#10264B]">Certification Plans & Pricing</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Choose the right plan and kickstart your professional certification journey today.
        </p>
      </div>

      {/* Pricing Cards matching Image 3 #8 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-8 flex flex-col justify-between transition-all relative bg-white ${
              plan.popular
                ? 'border-2 border-[#F47716] shadow-xl ring-4 ring-orange-50'
                : 'border-gray-200 shadow-sm hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F47716] text-white text-[11px] font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow">
                {plan.tag}
              </span>
            )}

            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-[#10264B]">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-black text-[#10264B]">₹{plan.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-gray-400 ml-1.5">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-gray-600">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center space-x-2.5">
                    <Check className="w-4 h-4 text-[#F47716] flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to={plan.ctaLink}
                className={`w-full py-3 rounded-lg text-xs font-bold text-center block transition-all ${
                  plan.popular
                    ? 'bg-[#F47716] hover:bg-[#DC660E] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#10264B]'
                }`}
              >
                {plan.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

