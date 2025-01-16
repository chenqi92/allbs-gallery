import { Event } from '../types/event';

export const events: Event[] = [
  {
    id: '1',
    title: 'Nature Photography Contest 2024',
    description: 'Capture the beauty of nature in its purest form. From landscapes to wildlife, show us your best nature shots.',
    coverImage: 'https://images.unsplash.com/photo-1682686581498-5e85c7228119',
    type: 'competition',
    status: 'ongoing',
    date: 'March 1 - April 15, 2024',
    deadline: 'April 15, 2024',
    participantCount: 234,
    rules: [
      {
        title: 'Eligibility',
        description: 'Open to all photographers, amateur and professional.'
      },
      {
        title: 'Submission Requirements',
        description: 'Photos must be taken within the last 12 months. Maximum 3 entries per participant.'
      },
      {
        title: 'Technical Specifications',
        description: 'Minimum resolution 4000x3000px, RAW format preferred.'
      }
    ],
    prizes: [
      {
        title: 'First Prize',
        description: '$2,000 + Professional Camera Kit'
      },
      {
        title: 'Second Prize',
        description: '$1,000 + Photography Accessories'
      },
      {
        title: 'Third Prize',
        description: '$500 + Photography Workshop Access'
      }
    ],
    resources: [
      {
        title: 'Competition Guidelines',
        url: '#',
        type: 'download'
      },
      {
        title: 'Submission Form',
        url: '#',
        type: 'link'
      }
    ]
  },
  {
    id: '2',
    title: 'Street Photography Exhibition',
    description: 'A celebration of urban life and culture through the lens of talented photographers.',
    coverImage: 'https://images.unsplash.com/photo-1684469238063-755ca8c5d823',
    type: 'exhibition',
    status: 'upcoming',
    date: 'May 1 - May 30, 2024',
    startDate: 'May 1, 2024',
    rules: [
      {
        title: 'Theme',
        description: 'Urban life, street culture, and city landscapes'
      },
      {
        title: 'Exhibition Space',
        description: 'Modern Art Gallery, Downtown'
      }
    ],
    prizes: [
      {
        title: 'Featured Display',
        description: 'Selected works will be displayed in the main gallery'
      },
      {
        title: 'Publication',
        description: 'Inclusion in the exhibition catalog'
      }
    ]
  },
  {
    id: '3',
    title: 'Portrait Masters Challenge',
    description: 'Showcase your portrait photography skills and win amazing prizes.',
    coverImage: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    type: 'competition',
    status: 'ended',
    date: 'January 1 - February 28, 2024',
    participantCount: 567,
    rules: [
      {
        title: 'Categories',
        description: 'Classic Portraits, Environmental Portraits, Creative Portraits'
      }
    ],
    prizes: [
      {
        title: 'Grand Prize',
        description: '$3,000 + Professional Studio Equipment'
      }
    ],
    winners: [
      {
        id: 'w1',
        title: 'The Gaze',
        author: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
        description: 'A powerful portrait capturing human emotion',
        prize: 'First Place',
        likes: 1234
      },
      {
        id: 'w2',
        title: 'Urban Soul',
        author: 'Michael Rodriguez',
        image: 'https://images.unsplash.com/photo-1684469238063-755ca8c5d823',
        description: 'Street portrait with natural lighting',
        prize: 'Second Place',
        likes: 982
      },
      {
        id: 'w3',
        title: 'Morning Light',
        author: 'Emma Wilson',
        image: 'https://images.unsplash.com/photo-1682686581498-5e85c7228119',
        description: 'Environmental portrait at sunrise',
        prize: 'Third Place',
        likes: 756
      }
    ]
  }
];