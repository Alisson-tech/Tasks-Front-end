export interface Header {
    title: string;
    value: string;
    align?: 'start' | 'center' | 'end';
    sortable?: boolean;
    width?: number;
    headerProps?: Record<string, any>;
  }