import { Creator } from '../types/creator';

export const creators: Creator[] = [
  {
    id: '1',
    name: 'Sarah Anderson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    type: 'photographer',
    tags: ['landscape', 'nature', 'wildlife'],
    bio: 'Award-winning nature photographer with a passion for capturing Earth\'s wild beauty.',
    philosophy: 'Every frame tells a story of our planet\'s incredible diversity and fragile beauty.',
    social: {
      portfolio: 'https://example.com/sarah',
      instagram: 'https://instagram.com/sarah',
      twitter: 'https://twitter.com/sarah'
    },
    featuredWorks: [
      {
        id: 'f1',
        title: 'Mountain Dawn',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        description: 'First light breaking over the Dolomites.'
      },
      {
        id: 'f2',
        title: 'Arctic Dreams',
        image: 'https://images.unsplash.com/photo-1517683551738-bc2d7384bc26',
        description: 'Northern lights dancing over frozen landscapes.'
      }
    ],
    recentWorks: [
      {
        id: 'r1',
        title: 'Desert Storm',
        image: 'https://images.unsplash.com/photo-1682686581498-5e85c7228119',
        date: '2024-02-15'
      }
    ],
    collections: [
      {
        id: 'c1',
        title: 'Mountain Series',
        coverImage: 'https://images.unsplash.com/photo-1682686581498-5e85c7228119',
        workCount: 12
      }
    ],
    stats: {
      followers: 15200,
      likes: 45600,
      views: 128000
    }
  },
  {
    id: '2',
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    type: 'illustrator',
    tags: ['digital art', 'fantasy', 'character design'],
    bio: 'Digital artist specializing in fantastical character designs and dreamlike landscapes.',
    philosophy: 'Art is a bridge between reality and imagination, connecting dreams with visual storytelling.',
    social: {
      portfolio: 'https://example.com/yuki',
      instagram: 'https://instagram.com/yuki',
      behance: 'https://behance.net/yuki'
    },
    featuredWorks: [
      {
        id: 'f3',
        title: 'Dreamweaver',
        image: 'https://images.unsplash.com/photo-1684469238063-755ca8c5d823',
        description: 'Digital painting exploring the boundaries of dreams.'
      }
    ],
    recentWorks: [
      {
        id: 'r2',
        title: 'Spirit Guide',
        image: 'https://images.unsplash.com/photo-1684469238063-755ca8c5d823',
        date: '2024-03-01'
      }
    ],
    collections: [
      {
        id: 'c2',
        title: 'Mythical Beings',
        coverImage: 'https://images.unsplash.com/photo-1684469238063-755ca8c5d823',
        workCount: 8
      }
    ],
    stats: {
      followers: 28400,
      likes: 89300,
      views: 245000
    }
  }
];