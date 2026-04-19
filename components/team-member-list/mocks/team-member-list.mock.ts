export interface TeamMember {
  memberId: string;
  name: string;
  role: string;
  avatarUrl?: string;
  online?: boolean;
}

export interface TeamMemberListProps {
  members: TeamMember[];
  onSelect?: (memberId: string) => void;
}

export const teamMemberListMock: TeamMember[] = [
  { memberId: "m-001", name: "Laura Sánchez", role: "Frontend Lead", avatarUrl: "https://picsum.photos/seed/tm1/80/80", online: true },
  { memberId: "m-002", name: "David Kim", role: "Backend Engineer", avatarUrl: "https://picsum.photos/seed/tm2/80/80", online: true },
  { memberId: "m-003", name: "Priya Patel", role: "UX Designer", avatarUrl: "https://picsum.photos/seed/tm3/80/80", online: false },
  { memberId: "m-004", name: "Marco Rossi", role: "DevOps", online: false },
];
