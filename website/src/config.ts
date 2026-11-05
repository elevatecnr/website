// All client-specific details live here. Items marked TODO are still awaited from the client.

// The building name alone matches several places on Google Maps, so the search uses the road and area.
const mapQuery = encodeURIComponent('Nivedita Road, Pradhan Nagar, Siliguri, West Bengal 734003');

export const site = {
  name: 'ELEVATE Consulting & Recruitment',
  shortName: 'ELEVATE',
  tagline: 'Where potential meets possibility.',
  founded: 2026,
  url: 'https://elevatecnr.com',

  phone: '+91 74777 22707',
  whatsapp: '917477722707', // digits only, with country code. TODO: confirm WhatsApp is on this number
  email: 'consult@elevatecnr.com',
  city: 'Siliguri, West Bengal',
  address: [
    'C/O House of Kaari',
    'Shree Rudra Bhawan, Nivedita Road',
    'Pradhan Nagar, Near Happy Bapi More',
    'Siliguri, West Bengal 734003, India',
  ],
  hours: '10:00 AM – 7:00 PM', // TODO: which days?
  // Pinned by address search. TODO: replace with the exact pin from Santosh (Maps → Share → Embed a map → src)
  mapEmbedUrl: `https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`,
  mapLink: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,

  social: {
    instagram: 'https://www.instagram.com/elevatecnr_official.in',
    facebook: 'https://www.facebook.com/share/1J3C7FrQu1/',
    linkedin: '', // TODO: company LinkedIn page, if one is created
  },

  // Google Apps Script web app URL (see apps-script/README). Forms and job listings are disabled until set.
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbwFqinAiRJC_6iTM_fFS6UrEsr0K-3J6BHkLz04ujLD6iNqubDkM6BND9K3XI3PfgXm0A/exec',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/founders', label: 'Founders' },
  { href: '/careers', label: 'Careers' },
  { href: '/employers', label: 'For Employers' },
];
