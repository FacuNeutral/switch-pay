export interface TestimonialCardProps {
  authorName: string;
  authorRole?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
}

export const testimonialCardMock: TestimonialCardProps[] = [
  {
    authorName: "María López",
    authorRole: "CTO",
    company: "TechFlow",
    quote: "This component system reduced our development time by 40%. The retrieval approach is a game changer.",
    avatarUrl: "https://picsum.photos/seed/avatar1/80/80",
    rating: 5,
  },
  {
    authorName: "James Chen",
    authorRole: "Lead Designer",
    company: "PixelCraft",
    quote: "Finally a system that doesn't try to generate — it finds the right component every time.",
    avatarUrl: "https://picsum.photos/seed/avatar2/80/80",
    rating: 4,
  },
  {
    authorName: "Ana Torres",
    quote: "Simple, fast, and exactly what we needed for our design system migration.",
    rating: 5,
  },
];
