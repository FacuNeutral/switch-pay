import type { ComponentType } from "react";

// Card family
import { EventCard } from "@components/event-card/EventCard";
import { PricingCard } from "@components/pricing-card/PricingCard";
import { TestimonialCard } from "@components/testimonial-card/TestimonialCard";

// List family
import { NotificationList } from "@components/notification-list/NotificationList";
import { TeamMemberList } from "@components/team-member-list/TeamMemberList";
import { TransactionList } from "@components/transaction-list/TransactionList";

// Input family
import { TagInput } from "@components/tag-input/TagInput";
import { DateRangeSelector } from "@components/date-range-selector/DateRangeSelector";
import { RatingInput } from "@components/rating-input/RatingInput";

// Mocks
import { eventCardMock } from "@components/event-card/mocks/event-card.mock";
import { pricingCardMock } from "@components/pricing-card/mocks/pricing-card.mock";
import { testimonialCardMock } from "@components/testimonial-card/mocks/testimonial-card.mock";
import { notificationListMock } from "@components/notification-list/mocks/notification-list.mock";
import { teamMemberListMock } from "@components/team-member-list/mocks/team-member-list.mock";
import { transactionListMock } from "@components/transaction-list/mocks/transaction-list.mock";
import { tagInputMock } from "@components/tag-input/mocks/tag-input.mock";
import { dateRangeSelectorMock } from "@components/date-range-selector/mocks/date-range-selector.mock";
import { ratingInputMock } from "@components/rating-input/mocks/rating-input.mock";

export interface RegistryEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps: Record<string, any>;
  family: "card" | "list" | "input";
}

export const componentRegistry: Record<string, RegistryEntry> = {
  EventCard: {
    component: EventCard,
    defaultProps: eventCardMock[0],
    family: "card",
  },
  PricingCard: {
    component: PricingCard,
    defaultProps: pricingCardMock[1], // highlighted variant
    family: "card",
  },
  TestimonialCard: {
    component: TestimonialCard,
    defaultProps: testimonialCardMock[0],
    family: "card",
  },
  NotificationList: {
    component: NotificationList,
    defaultProps: { items: notificationListMock },
    family: "list",
  },
  TeamMemberList: {
    component: TeamMemberList,
    defaultProps: { members: teamMemberListMock },
    family: "list",
  },
  TransactionList: {
    component: TransactionList,
    defaultProps: { transactions: transactionListMock },
    family: "list",
  },
  TagInput: {
    component: TagInput,
    defaultProps: { value: tagInputMock, onChange: () => {} },
    family: "input",
  },
  DateRangeSelector: {
    component: DateRangeSelector,
    defaultProps: { ...dateRangeSelectorMock, onChange: () => {} },
    family: "input",
  },
  RatingInput: {
    component: RatingInput,
    defaultProps: { ...ratingInputMock, onChange: () => {} },
    family: "input",
  },
};
