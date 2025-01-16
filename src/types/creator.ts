export interface Creator {
  id: string;
  name: string;
  avatar: string;
  type: 'photographer' | 'illustrator' | 'artist';
  tags: string[];
  bio: string;
  philosophy: string;
  social: {
    portfolio?: string;
    instagram?: string;
    twitter?: string;
    behance?: string;
  };
  featuredWorks: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
  recentWorks: {
    id: string;
    title: string;
    image: string;
    date: string;
  }[];
  collections: {
    id: string;
    title: string;
    coverImage: string;
    workCount: number;
  }[];
  stats: {
    followers: number;
    likes: number;
    views: number;
  };
}