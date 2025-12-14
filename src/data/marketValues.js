export const MARKET_DATA = {
    // Map by Role ID
    "software-engineer": {
        demandScore: 92,
        trend: "up", // up, down, flat
        postingsCount: 1450,
        topSkills: [
            { name: "Java", count: 85 },
            { name: "Python", count: 72 },
            { name: "AWS", count: 60 },
            { name: "React", count: 55 }
        ]
    },
    "frontend-dev": {
        demandScore: 88,
        trend: "up",
        postingsCount: 980,
        topSkills: [
            { name: "React", count: 90 },
            { name: "TypeScript", count: 82 },
            { name: "Tailwind", count: 65 },
            { name: "Figma", count: 40 }
        ]
    },
    "backend-dev": {
        demandScore: 85,
        trend: "flat",
        postingsCount: 850,
        topSkills: [
            { name: "Node.js", count: 75 },
            { name: "PostgreSQL", count: 70 },
            { name: "Docker", count: 60 },
            { name: "Go", count: 45 }
        ]
    },
    "data-scientist": {
        demandScore: 95,
        trend: "up",
        postingsCount: 600,
        topSkills: [
            { name: "Python", count: 95 },
            { name: "Machine Learning", count: 80 },
            { name: "SQL", count: 75 },
            { name: "Pandas", count: 70 }
        ]
    },
    "product-manager": {
        demandScore: 78,
        trend: "flat",
        postingsCount: 400,
        topSkills: [
            { name: "Agile", count: 85 },
            { name: "JIRA", count: 80 },
            { name: "Strategy", count: 60 },
            { name: "User Research", count: 55 }
        ]
    },
    "ux-designer": {
        demandScore: 75,
        trend: "down",
        postingsCount: 350,
        topSkills: [
            { name: "Figma", count: 95 },
            { name: "Prototyping", count: 80 },
            { name: "User Testing", count: 70 },
            { name: "HTML/CSS", count: 40 }
        ]
    },
    "financial-analyst": {
        demandScore: 70,
        trend: "flat",
        postingsCount: 500,
        topSkills: [
            { name: "Excel", count: 98 },
            { name: "Modeling", count: 85 },
            { name: "SQL", count: 50 },
            { name: "PowerBI", count: 45 }
        ]
    },
    "accountant": {
        demandScore: 82,
        trend: "up",
        postingsCount: 1200,
        topSkills: [
            { name: "Xero", count: 80 },
            { name: "Tax Law", count: 75 },
            { name: "Excel", count: 90 },
            { name: "Reporting", count: 60 }
        ]
    },
    "nurse": {
        demandScore: 98,
        trend: "up",
        postingsCount: 2500,
        topSkills: [
            { name: "Patient Care", count: 100 },
            { name: "Trauma", count: 60 },
            { name: "ICU", count: 50 },
            { name: "Pediatrics", count: 45 }
        ]
    },
    "doctor": {
        demandScore: 90,
        trend: "flat",
        postingsCount: 400,
        topSkills: [
            { name: "Surgery", count: 60 },
            { name: "Diagnosis", count: 90 },
            { name: "Internal Med", count: 50 }
        ]
    }
};

export const getMarketData = (roleId) => {
    // Fallback for roles not in mock data
    return MARKET_DATA[roleId] || {
        demandScore: Math.floor(Math.random() * 40) + 40, // Random 40-80
        trend: "flat",
        postingsCount: Math.floor(Math.random() * 200) + 50,
        topSkills: [
            { name: "Skill A", count: 60 },
            { name: "Skill B", count: 40 },
            { name: "Skill C", count: 30 }
        ]
    };
};
