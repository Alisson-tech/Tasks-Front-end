export interface Header {
    title: string;
    key: string;
    align?: 'start' | 'center' | 'end';
    sortable?: boolean;
    width?: number;
    headerProps?: Record<string, any>;
  }