export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export const tagInputMock: string[] = ["react", "typescript", "design-system"];
