import { siteIdentity } from './site';

interface HeroAction {
  id: 'projects' | 'cv';
  label: string;
  href: string | null;
  download: boolean;
}

export const heroProfile = {
  greeting: "Hello, I'm",
  name: siteIdentity.owner,
  positioning: 'Finance Graduate & Aspiring Financial Analyst',
  roles: ['Finance Graduate', 'Aspiring Financial Analyst'],
  introduction:
    "I'm a Management graduate with a finance focus, interested in making financial information clear and useful. My background combines financial studies with experience in property valuation.",
  description:
    `${siteIdentity.owner} — Finance Graduate & Aspiring Financial Analyst, with a background in financial studies and property valuation.`,
};

// Activate only when the real destination and approved downloadable file exist.
export const heroActions: readonly HeroAction[] = [
  {
    id: 'projects',
    label: 'View Projects',
    href: null,
    download: false,
  },
  {
    id: 'cv',
    label: 'Download CV',
    href: null,
    download: true,
  },
];
