import { Story } from '../types/story';

export const stories: Story[] = [
  {
    id: '1',
    title: 'Behind the Lens: A Day in the Life of a Wildlife Photographer',
    excerpt: 'Join Sarah Anderson as she takes us through her journey capturing Earth\'s most elusive creatures in their natural habitat.',
    content: [
      {
        type: 'paragraph',
        content: 'The sun hasn\'t yet risen over the Serengeti when Sarah Anderson begins her day. Armed with her trusted camera and years of experience, she embarks on another adventure to capture the raw beauty of wildlife in their natural habitat.'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1682686581498-5e85c7228119',
        caption: 'Dawn breaks over the Serengeti plains'
      },
      {
        type: 'quote',
        content: 'Every morning brings a new opportunity to tell nature\'s story through my lens. It\'s not just about taking pictures; it\'s about preserving moments that remind us of our connection to the natural world.',
        author: 'Sarah Anderson'
      },
      {
        type: 'paragraph',
        content: 'With over a decade of experience in wildlife photography, Sarah has developed an intuitive understanding of animal behavior. This knowledge, combined with her technical expertise, allows her to capture intimate moments that most people never get to witness.'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1682686581498-5e85c7228119',
    category: 'interview',
    author: 'James Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    authorBio: 'Senior Editor at PhotoGallery, specializing in documentary photography',
    date: '2024-03-10',
    tags: ['wildlife', 'photography', 'nature', 'interview'],
    likes: 342
  },
  {
    id: '2',
    title: 'Mastering Light: Essential Tips for Natural Photography',
    excerpt: 'Learn how to harness natural light to create stunning photographs in any condition.',
    content: [
      {
        type: 'paragraph',
        content: 'Understanding natural light is perhaps the most crucial skill any photographer can develop. Whether you\'re shooting landscapes, portraits, or street photography, the quality of light can make or break your image.'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
        caption: 'Golden hour photography in action'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    category: 'tutorial',
    author: 'Emily Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    authorBio: 'Professional photographer and educator',
    date: '2024-03-08',
    tags: ['tutorial', 'lighting', 'photography-tips'],
    likes: 256
  },
  {
    id: '3',
    title: 'The Rise of Mobile Photography',
    excerpt: 'How smartphones are revolutionizing the way we capture and share moments.',
    content: [
      {
        type: 'paragraph',
        content: 'In recent years, mobile photography has evolved from a convenient alternative to a legitimate art form in its own right. With advanced camera systems and computational photography, smartphones are pushing the boundaries of what\'s possible.'
      }
    ],
    coverImage: 'https://images.unsplash.com/photo-1684469238063-755ca8c5d823',
    category: 'story',
    author: 'Alex Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    authorBio: 'Tech journalist and mobile photography enthusiast',
    date: '2024-03-05',
    tags: ['mobile', 'technology', 'trends'],
    likes: 189
  }
];