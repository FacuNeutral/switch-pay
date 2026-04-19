import type { BusinessDomain, ComponentFamily, Complexity } from "./match.schema";

export interface ComponentMetadata {
  identity: {
    name: string;
    description: string;
    family: ComponentFamily;
    version: string;
  };

  usage: {
    purpose: string;
    useCases: string[];
    notUseCases: string[];
  };

  business: {
    domains: BusinessDomain[];
    scenarios: string[];
    priority: "core" | "secondary" | "edge";
  };

  businessData: BusinessProp[];

  composition: {
    isListable: boolean;
    compatibleWith: string[];
    requires: string[];
  };

  props: PropDefinition[];

  state: StateDefinition[];

  modifiers: Modifier[];

  interactions: InteractionEvent[];

  stateToUI: StateToUIMapping[];

  variants: Variant[];

  rules: string[];

  conditions: Condition[];

  tokens: Record<string, string>;

  package: {
    name: string;
    version: string;
    path: string;
  };

  externalDependencies: string[];

  organism: {
    type: "small-organism";
    restrictions: {
      noGlobalState: true;
      noNestedOrganisms: true;
      localStateOnly: true;
    };
  };

  complexity: Complexity;
}

export interface BusinessProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
  domain: BusinessDomain;
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface StateDefinition {
  name: string;
  type: string;
  initial: string;
  description: string;
}

export interface Modifier {
  dataId: string;
  description: string;
  appliesWhen: string;
}

export interface InteractionEvent {
  event: string;
  handler: string;
  description: string;
}

export interface StateToUIMapping {
  state: string;
  modifier: string;
  description: string;
}

export interface Variant {
  name: string;
  description: string;
  props: Record<string, string>;
}

export interface Condition {
  if: string;
  then: string;
}
