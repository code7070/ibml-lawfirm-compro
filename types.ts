import { LucideIcon } from "lucide-react";
import React from "react";

export interface LogoItem {
  id: string | number;
  name: string;
  icon?: React.ReactNode;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl: string;
  specialty: string;
  email?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Client {
  id: string;
  name: string;
  logo: string; // URL placeholder
}

export type ArticleCategory = string;

export interface Article {
  id: string;
  title: string;
  date: string;
  category: ArticleCategory;
  image: string;
  summary: string;
  author: string;
  authorImage?: string | null; // Optional: photo_url from lawyers table (via author_id FK)
  authorPosition?: string | null; // Optional: position_en/id from lawyers table
  content: string; // HTML content string
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  year: string; // Grouping key
  image: string;
  description: string; // HTML content string
  location?: string;
  contactEmail?: string;
  externalLink?: string;
}
