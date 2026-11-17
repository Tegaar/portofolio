export const siteIdentity = {
  brand: 'TEGAR',
  owner: 'Tegar Ardiyansyah',
  homePath: '/',
  tagline: 'Finance, analysis, and perspective.',
} as const;

// Add section anchors only when their destination content exists.
export const navigationItems = [
  { label: 'Home', href: siteIdentity.homePath },
] as const;
