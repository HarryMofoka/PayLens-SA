
export const SALARY_DATA = {
  regions: [
    { id: 'national', name: 'National Average', factor: 1.0 },
    { id: 'gauteng', name: 'Gauteng (JHB/PTA)', factor: 1.15 },
    { id: 'wc', name: 'Western Cape (CPT)', factor: 1.12 },
    { id: 'kzn', name: 'KwaZulu-Natal (DBN)', factor: 0.95 },
    { id: 'ec', name: 'Eastern Cape', factor: 0.85 },
    { id: 'remote', name: 'Remote (Intl. rates)', factor: 1.25 }
  ],
  qualifications: [
    { id: 'any', name: 'Any / No Degree' },
    { id: 'matric', name: 'Matric / Grade 12' },
    { id: 'diploma', name: 'Diploma / Certificate' },
    { id: 'degree', name: 'Bachelor\'s Degree' },
    { id: 'postgrad', name: 'Honours / Master\'s' }
  ],
  industries: [
    {
      id: 'tech',
      name: 'Technology',
      roles: [
        {
          id: 'software-engineer',
          title: 'Software Engineer',
          qualification: 'degree',
          levels: {
            intern: { min: 120000, max: 180000 },
            entry: { min: 240000, max: 400000 },
            mid: { min: 450000, max: 700000 },
            senior: { min: 750000, max: 1100000 },
            lead: { min: 1000000, max: 1400000 },
            exec: { min: 1300000, max: 2000000 }
          }
        },
        {
          id: 'data-scientist',
          title: 'Data Scientist',
          qualification: 'degree',
          levels: {
            intern: { min: 150000, max: 220000 },
            entry: { min: 300000, max: 480000 },
            mid: { min: 550000, max: 850000 },
            senior: { min: 900000, max: 1400000 },
            lead: { min: 1300000, max: 1800000 },
            exec: { min: 1600000, max: 2500000 }
          }
        },
        {
          id: 'product-manager',
          title: 'Product Manager',
          qualification: 'diploma',
          levels: {
            intern: { min: 180000, max: 240000 },
            entry: { min: 350000, max: 550000 },
            mid: { min: 650000, max: 950000 },
            senior: { min: 950000, max: 1500000 },
            lead: { min: 1400000, max: 1900000 },
            exec: { min: 1800000, max: 2800000 }
          }
        }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      roles: [
        {
          id: 'financial-analyst',
          title: 'Financial Analyst',
          qualification: 'degree',
          levels: {
            intern: { min: 150000, max: 200000 },
            entry: { min: 300000, max: 450000 },
            mid: { min: 500000, max: 750000 },
            senior: { min: 800000, max: 1200000 },
            lead: { min: 1100000, max: 1600000 },
            exec: { min: 1500000, max: 2200000 }
          }
        },
        {
          id: 'accountant',
          title: 'Chartered Accountant (CA)',
          qualification: 'postgrad',
          levels: {
            intern: { min: 180000, max: 240000 },
            entry: { min: 550000, max: 700000 },
            mid: { min: 750000, max: 950000 },
            senior: { min: 1000000, max: 1400000 },
            lead: { min: 1300000, max: 1800000 },
            exec: { min: 1800000, max: 3000000 }
          }
        }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      roles: [
        {
          id: 'nurse',
          title: 'Registered Nurse',
          qualification: 'diploma',
          levels: {
            intern: { min: 180000, max: 220000 },
            entry: { min: 240000, max: 360000 },
            mid: { min: 380000, max: 520000 },
            senior: { min: 550000, max: 750000 },
            lead: { min: 700000, max: 900000 },
            exec: { min: 900000, max: 1200000 }
          }
        },
        {
          id: 'pharmacist',
          title: 'Pharmacist',
          qualification: 'degree',
          levels: {
            intern: { min: 300000, max: 360000 },
            entry: { min: 450000, max: 600000 },
            mid: { min: 650000, max: 850000 },
            senior: { min: 900000, max: 1200000 },
            lead: { min: 1100000, max: 1400000 },
            exec: { min: 1300000, max: 1800000 }
          }
        }
      ]
    }
  ]
};
