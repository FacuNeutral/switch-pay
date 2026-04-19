export interface PricingCardProps {
  planId: string;
  planName: string;
  priceMonthly: number;
  features: string[];
  highlighted?: boolean;
  onSelect?: (planId: string) => void;
}

export const pricingCardMock: PricingCardProps[] = [
  {
    planId: "plan-free",
    planName: "Starter",
    priceMonthly: 0,
    features: ["1 project", "Basic analytics", "Community support"],
  },
  {
    planId: "plan-pro",
    planName: "Pro",
    priceMonthly: 29,
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"],
    highlighted: true,
  },
  {
    planId: "plan-enterprise",
    planName: "Enterprise",
    priceMonthly: 99,
    features: ["Everything in Pro", "SSO", "Dedicated account manager", "SLA 99.9%"],
  },
];
