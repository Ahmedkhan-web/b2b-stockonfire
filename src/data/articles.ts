import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    title: 'Selecting Industrial CCTV for Hazardous Locations: Class 1 Div 2 vs ATEX Zone 1',
    category: 'Security & Surveillance',
    readTime: '6 min read',
    date: 'Oct 14, 2026',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Key differences between North American NEC 500/505 divisions and European IECEx/ATEX zones when specifying explosion-proof camera enclosures in petrochemical installations.',
    author: 'Dr. Marcus Vance',
    authorRole: 'Lead Process Safety Engineer'
  },
  {
    id: 'art-02',
    title: 'PLC Architecture Migration: Moving Legacy S7-300 to SIMATIC S7-1500 with TIA Portal',
    category: 'Industrial Automation',
    readTime: '8 min read',
    date: 'Oct 08, 2026',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Step-by-step engineering guidelines for converting ladder logic, PROFINET network mapping, and safety I/O configurations while minimizing plant downtime.',
    author: 'Elena Rostova, PE',
    authorRole: 'Senior Controls Architect'
  },
  {
    id: 'art-03',
    title: 'Understanding Arc Flash Incident Energy & NFPA 70E Compliance in Low-Voltage Switchgear',
    category: 'Electrical Engineering',
    readTime: '5 min read',
    date: 'Sep 29, 2026',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    excerpt: 'Calculating arc-flash boundaries, trip curve selectivity, and selecting Level 4 PPE clothing for certified industrial maintenance crews.',
    author: 'David Chen',
    authorRole: 'Power Systems Principal'
  }
];
