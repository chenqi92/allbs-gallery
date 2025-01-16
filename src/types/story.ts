export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: Array<{
    type: 'paragraph' | 'image' | 'quote';
    content?: string;
    url?: string;
    caption?: string;
    author?: string;
  }>;
  coverImage: string;
  category: 'interview' | 'tutorial' | 'story' | 'news';
  author: string;
  authorAvatar: string;
  authorBio: string;
  date: string;
  tags: string[];
  likes: number;
}