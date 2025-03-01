interface Plan {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    name: 'Basic',
    price: '29',
    description: 'Perfect for small institutions',
    features: [
      'Up to 200 students',
      'Basic course management',
      'Attendance tracking',
      'Grade management',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '99',
    description: 'Ideal for growing schools',
    features: [
      'Up to 1000 students',
      'Advanced course management',
      'Resource library',
      'Parent portal',
      'Live chat support',
      'Financial management',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '299',
    description: 'For large educational institutions',
    features: [
      'Unlimited students',
      'Custom integrations',
      'Advanced analytics',
      'API access',
      '24/7 phone support',
      'Dedicated account manager',
    ],
  },
]

export const PricingSection = () => {
  return (
    <div id="pricing" className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Choose the right plan for your institution
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            All plans include our core features. Upgrade anytime as your institution grows.
          </p>
        </div>

        <div className="mt-16 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 bg-white ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              <div className="p-6 relative">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                {plan.popular && (
                  <p className="absolute top-0 right-0 -translate-y-1/2 transform bg-primary text-white px-3 py-0.5 rounded-full text-sm font-semibold">
                    Popular
                  </p>
                )}
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <a
                  href="/register"
                  className="mt-8 block w-full bg-primary text-white rounded-md py-2 text-sm font-semibold text-center hover:bg-primary/90"
                >
                  Get Started
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">Features</h4>
                <ul className="mt-4 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}