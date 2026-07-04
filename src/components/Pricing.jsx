import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    { name: "Starter", price: "$0", features: ["3 AI Reports / mo", "Basic Market Data", "Community Support"] },
    { name: "Pro", price: "$49", features: ["Unlimited Reports", "Detailed Tech Stack", "Pitch Deck Generator", "Priority Support"], popular: true },
    { name: "Enterprise", price: "Custom", features: ["White-labeling", "API Access", "Venture Capital Network"] }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div key={i} className={`p-8 rounded-3xl bg-white border ${tier.popular ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-gray-200'}`}>
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-6">{tier.price}<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-600">
                    <Check size={18} className="text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition ${tier.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;