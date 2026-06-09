export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  category: string;
  duration: number; // in minutes
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  category: "all" | "national" | "sport" | "movies" | "news" | "kids";
  logoLetters: string;
  logoBg: string;
  streamUrl: string;
  viewsCount: number;
  likesCount: number;
  nowPlaying: string;
  nextProgram: string;
  schedule: ProgramItem[];
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  avatarColor: string;
  isFounder?: boolean;
  isSystem?: boolean;
}

export interface FeedbackItem {
  id: string;
  name: string;
  comment: string;
  rating: number;
  date: string;
}
