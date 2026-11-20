// All client-specific details live here. Items marked TODO are still awaited from the client.

// Exact office pin, shared by the client (14 Nov 2026).
const mapQuery = '26.728017,88.418472';

// Primary number first: it is also the WhatsApp number.
const phones = ['+91 74777 22706', '+91 74777 22707'];

export const site = {
  name: 'ELEVATE Consulting & Recruitment',
  shortName: 'ELEVATE',
  tagline: 'Where potential meets possibility.',
  founded: 2026,
  url: 'https://elevatecnr.com',

  phones,
  phone: phones[0], // used where only one number fits (buttons, form error messages)
  whatsapp: '917477722706', // digits only, with country code
  email: 'consult@elevatecnr.com',
  city: 'Siliguri, West Bengal',
  address: [
    'C/O House of Kaari',
    'Shree Rudra Bhawan, Nivedita Road',
    'Pradhan Nagar, Near Happy Bapi More',
    'Siliguri, West Bengal 734003, India',
  ],
  hours: '10:00 AM – 7:00 PM', // TODO: which days?
  mapEmbedUrl: `https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`,
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
  { href: '/careers', label: 'Careers' },
  { href: '/employers', label: 'For Employers' },
];
