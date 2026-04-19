export interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  maxStars?: number;
  disabled?: boolean;
}

export const ratingInputMock = { value: 3, maxStars: 5 };
