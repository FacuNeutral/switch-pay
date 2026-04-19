export type ComponentFamily = "card" | "list" | "input";

export type BusinessDomain =
  | "ecommerce"
  | "saas"
  | "marketing"
  | "dashboard"
  | "content"
  | "social";

export type Complexity = "low" | "medium" | "high";

export interface ComponentMatch {
  name: string;
  family: ComponentFamily;
  keywords: string[];
  useCases: string[];
  businessDomains: BusinessDomain[];
  structure: {
    hasImage?: boolean;
    hasPrice?: boolean;
    hasCTA?: boolean;
    isListable?: boolean;
  };
  interaction: {
    clickable?: boolean;
    hoverable?: boolean;
    draggable?: boolean;
    focusable?: boolean;
  };
  complexity: Complexity;
}
