export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  image: string;
  technologies: string[];
  year: string;
  link?: string;
  highlight?: boolean;
}
