// ─── Local data imports ────────────────────────────────────────────────────
import eventCardMatch from "@components/event-card/data/event-card.match.json";
import pricingCardMatch from "@components/pricing-card/data/pricing-card.match.json";
import testimonialCardMatch from "@components/testimonial-card/data/testimonial-card.match.json";
import notificationListMatch from "@components/notification-list/data/notification-list.match.json";
import teamMemberListMatch from "@components/team-member-list/data/team-member-list.match.json";
import transactionListMatch from "@components/transaction-list/data/transaction-list.match.json";
import tagInputMatch from "@components/tag-input/data/tag-input.match.json";
import dateRangeSelectorMatch from "@components/date-range-selector/data/date-range-selector.match.json";
import ratingInputMatch from "@components/rating-input/data/rating-input.match.json";

import eventCardMeta from "@components/event-card/data/event-card.metadata.json";
import pricingCardMeta from "@components/pricing-card/data/pricing-card.metadata.json";
import testimonialCardMeta from "@components/testimonial-card/data/testimonial-card.metadata.json";
import notificationListMeta from "@components/notification-list/data/notification-list.metadata.json";
import teamMemberListMeta from "@components/team-member-list/data/team-member-list.metadata.json";
import transactionListMeta from "@components/transaction-list/data/transaction-list.metadata.json";
import tagInputMeta from "@components/tag-input/data/tag-input.metadata.json";
import dateRangeSelectorMeta from "@components/date-range-selector/data/date-range-selector.metadata.json";
import ratingInputMeta from "@components/rating-input/data/rating-input.metadata.json";

// ─── Types ─────────────────────────────────────────────────────────────────
export interface ComponentMatchDTO {
  name: string;
  family: string;
  keywords: string[];
  useCases: string[];
  businessDomains: string[];
  structure: Record<string, boolean>;
  interaction: Record<string, boolean>;
  complexity: string;
}

export interface SmartSearchDTO {
  best: string | null;
  confidence: number;
  reason: string;
  alternatives: { name: string; score: number; breakdown: Record<string, number> }[];
  all: { name: string; score: number; breakdown: Record<string, number> }[];
}

// ─── Static registry ───────────────────────────────────────────────────────
const ALL_COMPONENTS: ComponentMatchDTO[] = [
  eventCardMatch,
  pricingCardMatch,
  testimonialCardMatch,
  notificationListMatch,
  teamMemberListMatch,
  transactionListMatch,
  tagInputMatch,
  dateRangeSelectorMatch,
  ratingInputMatch,
] as ComponentMatchDTO[];

const METADATA_MAP: Record<string, Record<string, unknown>> = {
  EventCard: eventCardMeta as Record<string, unknown>,
  PricingCard: pricingCardMeta as Record<string, unknown>,
  TestimonialCard: testimonialCardMeta as Record<string, unknown>,
  NotificationList: notificationListMeta as Record<string, unknown>,
  TeamMemberList: teamMemberListMeta as Record<string, unknown>,
  TransactionList: transactionListMeta as Record<string, unknown>,
  TagInput: tagInputMeta as Record<string, unknown>,
  DateRangeSelector: dateRangeSelectorMeta as Record<string, unknown>,
  RatingInput: ratingInputMeta as Record<string, unknown>,
};

// ─── API (offline) ─────────────────────────────────────────────────────────
export async function fetchComponents(filters?: {
  family?: string;
  domain?: string;
  complexity?: string;
}): Promise<ComponentMatchDTO[]> {
  let result = ALL_COMPONENTS;
  if (filters?.family) result = result.filter((c) => c.family === filters.family);
  if (filters?.domain) result = result.filter((c) => c.businessDomains.includes(filters.domain!));
  if (filters?.complexity) result = result.filter((c) => c.complexity === filters.complexity);
  return Promise.resolve(result);
}

export async function fetchComponentByName(name: string): Promise<Record<string, unknown> | null> {
  return Promise.resolve(METADATA_MAP[name] ?? null);
}

export async function smartSearch(query: string): Promise<SmartSearchDTO> {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scored = ALL_COMPONENTS.map((c) => {
    const haystack = [
      ...c.keywords,
      ...c.useCases,
      ...c.businessDomains,
      c.name.toLowerCase(),
      c.family,
      c.complexity,
    ].join(" ").toLowerCase();

    const keywordHits = terms.filter((t) => c.keywords.some((k) => k.includes(t))).length;
    const useCaseHits = terms.filter((t) => c.useCases.some((u) => u.includes(t))).length;
    const domainHits = terms.filter((t) => c.businessDomains.some((d) => d.includes(t))).length;
    const nameHit = terms.some((t) => c.name.toLowerCase().includes(t)) ? 1 : 0;
    const generalHits = terms.filter((t) => haystack.includes(t)).length;

    const breakdown: Record<string, number> = {
      keyword: keywordHits * 3,
      useCase: useCaseHits * 2,
      domain: domainHits * 2,
      name: nameHit * 4,
      general: generalHits,
    };
    const score = Object.values(breakdown).reduce((a, b) => a + b, 0);
    return { name: c.name, score, breakdown };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const maxPossible = terms.length * (3 + 4);
  const confidence = maxPossible > 0 ? Math.min(1, (top?.score ?? 0) / maxPossible) : 0;

  return Promise.resolve({
    best: top && top.score > 0 ? top.name : null,
    confidence,
    reason: top && top.score > 0
      ? `"${top.name}" coincide con ${terms.join(", ")}`
      : "Sin coincidencias para la búsqueda.",
    alternatives: sorted.slice(1, 4),
    all: sorted,
  });
}
