export interface EventCardProps {
  eventId: string;
  eventName: string;
  date: string;
  venue: string;
  price?: number;
  imageUrl?: string;
  onBook?: (eventId: string) => void;
}

export const eventCardMock: EventCardProps[] = [
  {
    eventId: "evt-001",
    eventName: "React Summit 2026",
    date: "2026-06-15T09:00:00Z",
    venue: "Amsterdam RAI",
    price: 299,
    imageUrl: "https://picsum.photos/seed/evt1/400/200",
  },
  {
    eventId: "evt-002",
    eventName: "TypeScript Conf",
    date: "2026-09-20T10:00:00Z",
    venue: "Berlin Congress Center",
    price: 0,
    imageUrl: "https://picsum.photos/seed/evt2/400/200",
  },
  {
    eventId: "evt-003",
    eventName: "Design Systems Meetup",
    date: "2026-04-10T18:00:00Z",
    venue: "WeWork Madrid",
    price: 0,
  },
];
