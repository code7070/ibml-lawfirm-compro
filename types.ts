import { LucideIcon } from "lucide-react";
import React from "react";

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

export type ArticleCategory =
  | "Intellectual Property"
  | "Esports"
  | "Social Media"
  | "Corporate";

export interface Article {
  id: string;
  title: string;
  date: string;
  category: ArticleCategory;
  image: string;
  summary: string;
  author: string;
  content: React.ReactNode; // HTML/JSX content
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  year: string; // Grouping key
  image: string;
  description: React.ReactNode;
  location?: string;
  contactEmail?: string;
  externalLink?: string;
}
