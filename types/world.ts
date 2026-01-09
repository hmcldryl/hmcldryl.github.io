export type ContentType = 'education' | 'experience' | 'project' | 'skill';

export interface PortfolioContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  [key: string]: any;
}

export interface ContentZoneData {
  id: string;
  type: ContentType;
  worldX: number;
  width: number;
  data: PortfolioContent;
  triggered: boolean;
}

export interface WorldSection {
  type: ContentType;
  startX: number;
  width: number;
  zones: ContentZoneData[];
}

export interface WorldConfig {
  totalWidth: number;
  sections: WorldSection[];
}
