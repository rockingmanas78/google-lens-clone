export interface WidgetListProps {
    data: { id: string; icon?: string; label?: string; title?: string; value?: string; color?: string }[];
    isIconOnly?: boolean;
  }