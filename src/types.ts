export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'featured' | 'additional';
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  bullets: string[];
  technologies: string[];
  type: 'professional' | 'training';
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level?: 'expert' | 'advanced' | 'intermediate'; icon?: string }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
