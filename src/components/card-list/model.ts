export type Data = {
  id: string;
  title: string;
  description: string;
  time: string;
  from: string;
  status?: React.ReactNode;
  action?: React.ReactNode;

};
export interface CardItemProps {
  value?: string | string[] | null;
  onChange?(value: any): void;
  className?: string;
  selectable?: boolean;
  isSelected?: boolean;
  data: Data;
}

export interface CardListProps {
  items: Data[];
  onChange?: (value: any) => void;
  value?: string | string[] | null;
  isSelected?: (value: any) => boolean;
  selectable?: boolean;
}
