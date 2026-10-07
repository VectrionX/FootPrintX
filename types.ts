
export enum Engine {
  GOOGLE = 'Google',
  BING = 'Bing',
  YANDEX = 'Yandex',
  ALL = 'Multi-Engine'
}

export interface Dork {
  id: string;
  query: string;
  title: string;
  description: string;
  engine: Engine;
}

export interface DorkCategory {
  id: string;
  title: string;
  explanation: string;
  dorks: Dork[];
}

export type ViewState = 'HOME' | 'INSTA' | 'PERSON' | 'X' | 'LINKEDIN' | 'EMAIL' | 'ABOUT' | 'COPYRIGHT';
