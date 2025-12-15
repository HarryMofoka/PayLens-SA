import './style.css'
import { SALARY_DATA } from './src/data/salaries.js'
import { MARKET_DATA, getMarketData } from './src/data/marketValues.js'
import { COMPANY_DATA } from './src/data/companyData.js'
import { COL_DATA, COL_INSIGHTS } from './src/data/colData.js'
import { POLL_DATA } from './src/data/pollData.js'
import { FORUM_DATA } from './src/data/forumData.js'

// State
const state = {
    industry: '',
    role: '',
    region: 'national', // Default
    level: 'entry', // Default
    qualification: 'any',
    searchQuery: '',
    isLoggedIn: false, // Auth state
    isPremium: false, // Premium state
    user: null,
    careerProjectionYear: 0 // 0 to 10
};

// DOM Elements - Main
const searchInput = document.getElementById('search-input');
const industrySelect = document.getElementById('industry-select');
const qualificationSelect = document.getElementById('qualification-select');
const roleSelect = document.getElementById('role-select');
const regionSelect = document.getElementById('region-select');
const levelContainer = document.getElementById('level-toggle');
const salaryAmountEl = document.getElementById('salary-amount');
const monthlyAmountEl = document.getElementById('salary-monthly-amount');
const chartContainer = document.getElementById('salary-chart');

// Modal Elements
const contributeBtn = document.getElementById('contribute-btn');
const submissionModal = document.getElementById('submission-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const salaryForm = document.getElementById('salary-form');
const submitIndustrySelect = document.getElementById('submit-industry');

// Auth & Dashboard Elements
const authBtn = document.getElementById('auth-btn');
const profileBtn = document.getElementById('profile-btn');
const premiumBtn = document.getElementById('premium-btn');
const dashboardModal = document.getElementById('dashboard-modal');
const savedRolesList = document.getElementById('saved-roles-list');
const contributionsList = document.getElementById('contributions-list');
const logoutBtn = document.getElementById('logout-btn');
const saveRoleBtn = document.getElementById('save-role-btn');

// Premium Elements
const premiumModal = document.getElementById('premium-modal');
const premiumLocked = document.getElementById('premium-locked');
const premiumUnlocked = document.getElementById('premium-unlocked');
const unlockBtn = document.getElementById('unlock-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const regionalChart = document.getElementById('regional-chart');
const forecastTableBody = document.querySelector('#forecast-table tbody');
const premiumRoleName = document.getElementById('premium-role-name');

// CV Analyzer Elements
const analyzeSkillsBtn = document.getElementById('analyze-skills-btn');
const cvModal = document.getElementById('cv-modal');
const cvText = document.getElementById('cv-text');
const analyzeCvBtn = document.getElementById('analyze-cv-btn');
const cvResults = document.getElementById('cv-results');
const cvMatchScore = document.getElementById('cv-match-score');
const cvFoundList = document.getElementById('cv-found-list');
const cvMissingList = document.getElementById('cv-missing-list');

// Recruiter Elements
const employerLink = document.getElementById('employer-link');
const recruiterModal = document.getElementById('recruiter-modal');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const benchForm = document.getElementById('benchmark-form');
const benchRoleSelect = document.getElementById('bench-role');
const benchRegionSelect = document.getElementById('bench-region');
const benchResult = document.getElementById('bench-result');
const jobForm = document.getElementById('job-form');
const generateApiBtn = document.getElementById('generate-api-btn');
const apiKeyDisplay = document.getElementById('api-key-display');
const jobsList = document.getElementById('jobs-list');

// Calculator Elements
const personalizeBtn = document.getElementById('personalize-btn');
const calcModal = document.getElementById('calc-modal');
const calcForm = document.getElementById('calc-form');
const calcResult = document.getElementById('calc-result');
const calcAmountDisplay = document.getElementById('calc-amount-display');
const compMarker = document.getElementById('comp-marker');
const compMin = document.getElementById('comp-min');
const compMax = document.getElementById('comp-max');
const compText = document.getElementById('comp-text');

// Career Elements
const careerCard = document.getElementById('career-card');
const careerSlider = document.getElementById('career-slider');
const timelineSteps = document.getElementById('timeline-steps');
const timelineProgress = document.getElementById('timeline-progress');
const projRole = document.getElementById('proj-role');
const projSalary = document.getElementById('proj-salary');
const projDesc = document.getElementById('proj-desc');

// Market Pulse Elements
const demandIndicator = document.getElementById('demand-indicator');
const demandText = document.getElementById('demand-text');
const demandTrend = document.getElementById('demand-trend');
const topDemandList = document.getElementById('top-demand-list');
const trendingSkillsList = document.getElementById('trending-skills-list');

// Company Elements
const topEmployersPanel = document.getElementById('top-employers');
const employersList = document.getElementById('employers-list');

// COL Elements
const colCard = document.getElementById('col-card');
const colRealValue = document.getElementById('col-real-value');
const colIndexVal = document.getElementById('col-index-val');
const colInsight = document.getElementById('col-insight');

// Poll Elements
const pollQuestion = document.getElementById('poll-question');
const pollOptions = document.getElementById('poll-options');
const pollResults = document.getElementById('poll-results');

// Forum Elements
const forumFeed = document.getElementById('forum-feed');
const askBtn = document.getElementById('ask-btn');
const askModal = document.getElementById('ask-modal');
const askForm = document.getElementById('ask-form');

// Mock Jobs Data
let activeJobs = [
    { title: "Senior React Developer", company: "TechCorp", min: 750000, max: 950000, region: "gt" },
    { title: "Financial Analyst", company: "InvestBank", min: 550000, max: 700000, region: "wc" }
];

// Format Currency (ZAR)
const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'decimal',
        maximumFractionDigits: 0
    }).format(val);
};

const formatSymbol = (val) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(0) + 'k';
    return val;
}

const capitalizeFirstLetter = (string) => {
    const map = {
        'intern': 'Intern',
        'entry': 'Entry',
        'mid': 'Mid',
        'senior': 'Senior',
        'lead': 'Lead',
        'exec': 'Executive'
    };
    return map[string] || string.charAt(0).toUpperCase() + string.slice(1);
};

// Initialize
const init = () => {
    // Check Auth
    checkAuth();
    checkPremium();

    populateIndustries();
    populateRegions();
    populateQualifications();
    populateMarketPulse();
    initPoll();
    renderForum();
    renderJobs(); // New Phase 5.3
    setupEventListeners();
    setupModalListeners();
    setupAuthListeners();
    setupCalculatorListeners();
    setupCareerListeners();
    setupForumListeners();
    setupPremiumListeners();
    setupCVAnalyzerListeners();
    setupRecruiterListeners(); // New Phase 5.3

    // Set defaults
    regionSelect.value = 'national';
    qualificationSelect.value = 'any';
};

// --- AUTH LOGIC ---
const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('user_profile'));
    if (user) {
        state.isLoggedIn = true;
        state.user = user;
        authBtn.classList.add('hidden');
        profileBtn.classList.remove('hidden');
    } else {
        state.isLoggedIn = false;
        state.user = null;
        authBtn.classList.remove('hidden');
        profileBtn.classList.add('hidden');
    }
    updateSaveButtonState();
};

const checkPremium = () => {
    const isPro = localStorage.getItem('is_premium') === 'true';
    state.isPremium = isPro;
};

const login = () => {
    const mockUser = {
        name: "User",
        email: "user@example.com"
    };
    localStorage.setItem('user_profile', JSON.stringify(mockUser));
    checkAuth();
    alert("Signed in successfully!");
};

const logout = () => {
    localStorage.removeItem('user_profile');
    dashboardModal.classList.add('hidden');
    checkAuth();
};

const saveCurrentRole = () => {
    if (!state.isLoggedIn) {
        if (confirm("Sign in to save roles?")) login();
        return;
    }
    if (!state.role) return;

    const roleId = state.role;
    const industryId = state.industry;

    const saved = JSON.parse(localStorage.getItem('saved_roles') || '[]');

    const exists = saved.find(r => r.roleId === roleId && r.industryId === industryId);
    if (exists) {
        const newSaved = saved.filter(r => !(r.roleId === roleId && r.industryId === industryId));
        localStorage.setItem('saved_roles', JSON.stringify(newSaved));
        saveRoleBtn.classList.remove('active');
    } else {
        const roleData = getSelectedRoleData();
        saved.push({
            roleId,
            industryId,
            title: roleData.title,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('saved_roles', JSON.stringify(saved));
        saveRoleBtn.classList.add('active');
    }
};

const updateSaveButtonState = () => {
    if (!state.role) {
        saveRoleBtn.style.opacity = 0.5;
        saveRoleBtn.disabled = true;
        saveRoleBtn.classList.remove('active');
        return;
    }
    saveRoleBtn.style.opacity = 1;
    saveRoleBtn.disabled = false;

    const saved = JSON.parse(localStorage.getItem('saved_roles') || '[]');
    const exists = saved.find(r => r.roleId === state.role && r.industryId === state.industry);

    if (exists) saveRoleBtn.classList.add('active');
    else saveRoleBtn.classList.remove('active');
};

const loadDashboard = () => {
    // Saved Roles
    const saved = JSON.parse(localStorage.getItem('saved_roles') || '[]');
    savedRolesList.innerHTML = '';

    if (saved.length === 0) {
        savedRolesList.innerHTML = '<p class="empty-state">No saved roles yet.</p>';
    } else {
        saved.forEach(item => {
            const el = document.createElement('div');
            el.className = 'saved-item';
            const indName = SALARY_DATA.industries.find(i => i.id === item.industryId)?.name || item.industryId;
            el.innerHTML = `
        <div class="saved-item-info">${item.title} <span style="color:var(--text-secondary);font-size:0.8em">(${indName})</span></div>
        <div class="saved-item-meta">Saved</div>
      `;
            el.addEventListener('click', () => {
                state.searchQuery = '';
                searchInput.value = '';
                state.industry = item.industryId;
                industrySelect.disabled = false;
                industrySelect.value = item.industryId;
                state.role = item.roleId;
                populateRoles();
                roleSelect.value = `${item.industryId}|${item.roleId}`;

                const roleData = getSelectedRoleData();
                populateLevels(roleData);
                updateDisplay();
                dashboardModal.classList.add('hidden');
            });
            savedRolesList.appendChild(el);
        });
    }

    // Contributions
    const contributions = JSON.parse(localStorage.getItem('user_contributions') || '[]');
    contributionsList.innerHTML = '';

    if (contributions.length === 0) {
        contributionsList.innerHTML = '<p class="empty-state">No contributions yet.</p>';
    } else {
        contributions.forEach(item => {
            const el = document.createElement('div');
            el.className = 'saved-item';
            el.style.cursor = 'default';
            el.innerHTML = `
        <div class="saved-item-info">${item.role}</div>
        <div class="saved-item-meta">R ${formatCurrency(item.salary)}</div>
      `;
            contributionsList.appendChild(el);
        });
    }
};
// --- END AUTH LOGIC ---

// --- PREMIUM DASHBOARD LOGIC ---
const setupPremiumListeners = () => {
    premiumBtn.addEventListener('click', () => {
        premiumModal.classList.remove('hidden');
        renderPremiumContent();
    });

    unlockBtn.addEventListener('click', () => {
        if (confirm("Confirm subscription for R49/month?")) {
            localStorage.setItem('is_premium', 'true');
            state.isPremium = true;
            renderPremiumContent();
        }
    });

    exportCsvBtn.addEventListener('click', exportToCSV);
};

const renderPremiumContent = () => {
    if (!state.isPremium) {
        premiumLocked.classList.remove('hidden');
        premiumUnlocked.classList.add('hidden');
    } else {
        premiumLocked.classList.add('hidden');
        premiumUnlocked.classList.remove('hidden');

        const roleData = getSelectedRoleData();
        if (roleData) {
            premiumRoleName.textContent = roleData.title;
            renderRegionalHeatmap(roleData);
            renderForecastTable(roleData);
        } else {
            premiumRoleName.textContent = "Select a role first";
            regionalChart.innerHTML = '<p style="margin:auto;color:gray">Please select a role on the main screen to view analytics.</p>';
            forecastTableBody.innerHTML = '';
        }
    }
};

const renderRegionalHeatmap = (roleData) => {
    regionalChart.innerHTML = '';

    // Calculate salary for this role in ALL regions
    const levelRange = roleData.levels[state.level];
    if (!levelRange) return;

    let maxVal = 0;
    const regionSalaries = SALARY_DATA.regions.map(reg => {
        const val = (levelRange.min + levelRange.max) / 2 * reg.factor;
        if (val > maxVal) maxVal = val;
        return { name: reg.name, id: reg.id, val };
    });

    regionSalaries.forEach(data => {
        const heightPct = (data.val / maxVal) * 100;

        const group = document.createElement('div');
        group.className = 'reg-bar-group';

        const bar = document.createElement('div');
        bar.className = 'reg-bar';
        bar.style.height = `${heightPct}%`;
        bar.title = `${data.name}: R ${formatCurrency(Math.round(data.val))}`;

        const label = document.createElement('div');
        label.className = 'reg-label';
        label.textContent = data.id.toUpperCase();

        group.appendChild(bar);
        group.appendChild(label);
        regionalChart.appendChild(group);
    });
};

const renderForecastTable = (roleData) => {
    forecastTableBody.innerHTML = '';
    const levelRange = roleData.levels[state.level];
    if (!levelRange) return;

    // Assume National Average for projection base
    const base = (levelRange.min + levelRange.max) / 2;

    // Simple projection logic: 5% annual increase
    for (let year = 0; year <= 10; year++) {
        const projected = base * Math.pow(1.05, year);
        const growth = year === 0 ? 0 : ((projected - base) / base * 100);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>+${year} Years</td>
            <td>${capitalizeFirstLetter(state.level)}</td>
            <td>R ${formatCurrency(Math.round(projected))}</td>
            <td style="color:${growth > 0 ? '#10b981' : ''}">${growth.toFixed(1)}%</td>
        `;
        forecastTableBody.appendChild(row);
    }
};

const exportToCSV = () => {
    const roleData = getSelectedRoleData();
    if (!roleData) {
        alert("Select a role first.");
        return;
    }

    const rows = [
        ["Industry", "Role", "Region", "Level", "Min Salary", "Max Salary", "Median Salary"]
    ];

    SALARY_DATA.regions.forEach(reg => {
        Object.keys(roleData.levels).forEach(lvl => {
            const range = roleData.levels[lvl];
            const min = Math.round(range.min * reg.factor);
            const max = Math.round(range.max * reg.factor);
            const med = Math.round((min + max) / 2);

            rows.push([
                SALARY_DATA.industries.find(i => i.id === state.industry)?.name,
                roleData.title,
                reg.name,
                lvl,
                min,
                max,
                med
            ]);
        });
    });

    let csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${roleData.title}_salary_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
// --- END PREMIUM LOGIC ---

// --- CV ANALYZER LOGIC ---
const setupCVAnalyzerListeners = () => {
    if (analyzeSkillsBtn) {
        analyzeSkillsBtn.addEventListener('click', () => {
            if (!state.role) {
                alert("Please select a role first!");
                return;
            }
            cvModal.classList.remove('hidden');
            cvResults.classList.add('hidden');
            cvText.value = '';
        });

        analyzeCvBtn.addEventListener('click', analyzeCV);
    }
};

const analyzeCV = () => {
    const text = cvText.value.toLowerCase();
    if (!text) {
        alert("Please paste your CV content.");
        return;
    }

    // 1. Get Skills for Current Role
    const market = getMarketData(state.role);
    const requiredSkills = market.topSkills; // Array of {name, count}

    if (!requiredSkills || requiredSkills.length === 0) {
        alert("No skills data available for this role.");
        return;
    }

    // 2. Scan Text for Matches
    const found = [];
    const missing = [];

    requiredSkills.forEach(skill => {
        if (text.includes(skill.name.toLowerCase())) {
            found.push(skill.name);
        } else {
            missing.push(skill.name);
        }
    });

    // 3. Score
    const score = Math.round((found.length / requiredSkills.length) * 100);

    // 4. Render
    cvMatchScore.textContent = `${score}%`;

    if (score >= 80) cvMatchScore.style.color = '#10b981';
    else if (score >= 50) cvMatchScore.style.color = '#fbbf24';
    else cvMatchScore.style.color = '#ef4444';

    cvFoundList.innerHTML = '';
    if (found.length === 0) cvFoundList.innerHTML = '<li>None found</li>';
    found.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `✓ ${s}`;
        cvFoundList.appendChild(li);
    });

    cvMissingList.innerHTML = '';
    if (missing.length === 0) cvMissingList.innerHTML = '<li style="color:#10b981">All Clear!</li>';
    missing.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `✗ ${s}`;
        cvMissingList.appendChild(li);
    });

    cvResults.classList.remove('hidden');
};
// --- END CV ANALYZER LOGIC ---

// --- RECRUITER TOOLS LOGIC ---
const setupRecruiterListeners = () => {
    if (employerLink) {
        employerLink.addEventListener('click', (e) => {
            e.preventDefault();
            recruiterModal.classList.remove('hidden');
            // Populate benchmark selects
            populateBenchmarkSelects();
        });
    }

    // Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active');
            const target = btn.dataset.tab;
            document.getElementById(`tab-${target}`).classList.remove('hidden');
        });
    });

    // Benchmark Form
    if (benchForm) {
        benchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const roleId = benchRoleSelect.value;
            const regionId = benchRegionSelect.value;
            const offer = parseFloat(document.getElementById('bench-offer').value);

            runBenchmark(roleId, regionId, offer);
        });
    }

    // Job Form
    if (jobForm) {
        jobForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('job-title').value;
            const company = document.getElementById('job-company').value;
            const min = parseFloat(document.getElementById('job-min').value);
            const max = parseFloat(document.getElementById('job-max').value);

            activeJobs.unshift({ title, company, min, max, region: 'national' });
            renderJobs();

            alert('Job Posted Successfully!');
            jobForm.reset();
            // Switch to jobs view via tab? Or just stay
        });
    }

    // API
    if (generateApiBtn) {
        generateApiBtn.addEventListener('click', () => {
            apiKeyDisplay.textContent = "pl_" + Math.random().toString(36).substr(2, 16);
            apiKeyDisplay.style.color = "#10b981";
        });
    }
};

const populateBenchmarkSelects = () => {
    // Populate Role
    benchRoleSelect.innerHTML = '<option value="">Select Role...</option>';
    SALARY_DATA.industries.forEach(ind => {
        ind.roles.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.textContent = r.title;
            benchRoleSelect.appendChild(opt);
        });
    });

    // Populate Region
    benchRegionSelect.innerHTML = '<option value="">Select Region...</option>';
    SALARY_DATA.regions.forEach(reg => {
        const opt = document.createElement('option');
        opt.value = reg.id;
        opt.textContent = reg.name;
        benchRegionSelect.appendChild(opt);
    });
};

const runBenchmark = (roleId, regionId, offer) => {
    // Determine bracket
    // Simplified: Find the role, get average of all levels for that region
    // Or compare against Senior level as default benchmark

    // Find role object
    let roleObj = null;
    SALARY_DATA.industries.forEach(ind => {
        const found = ind.roles.find(r => r.id === roleId);
        if (found) roleObj = found;
    });

    if (!roleObj) return;

    const reg = SALARY_DATA.regions.find(r => r.id === regionId);
    const factor = reg ? reg.factor : 1.0;

    // Compare against "Senior" level max
    const seniorRange = roleObj.levels['senior'] || Object.values(roleObj.levels)[0];
    const marketMax = seniorRange.max * factor;
    const marketMin = seniorRange.min * factor;

    const scoreEl = document.getElementById('bench-score-text');
    const descEl = document.getElementById('bench-desc');

    let percentile = 0;

    if (offer >= marketMax) {
        percentile = 5; // Top 5%
        scoreEl.textContent = "Top 5% 🚀";
        scoreEl.style.color = "#10b981";
        descEl.textContent = "This offer beats almost all market rates.";
    } else if (offer >= (marketMax + marketMin) / 2) {
        percentile = 40;
        scoreEl.textContent = "Top 40%";
        scoreEl.style.color = "#10b981";
        descEl.textContent = "Competitive offer, above market median.";
    } else if (offer >= marketMin) {
        percentile = 70;
        scoreEl.textContent = "Market Related";
        scoreEl.style.color = "#fbbf24";
        descEl.textContent = "Standard market rate.";
    } else {
        percentile = 90;
        scoreEl.textContent = "Below Market";
        scoreEl.style.color = "#ef4444";
        descEl.textContent = "This offer might struggle to attract talent.";
    }

    benchResult.classList.remove('hidden');
};

const renderJobs = () => {
    if (!jobsList) return;
    jobsList.innerHTML = '';

    if (activeJobs.length === 0) {
        jobsList.innerHTML = '<p class="empty-state">No active listings.</p>';
        return;
    }

    activeJobs.forEach(job => {
        const el = document.createElement('div');
        el.className = 'job-card';
        el.innerHTML = `
            <div class="job-title">${job.title}</div>
            <div class="job-company">${job.company}</div>
            <div class="job-salary">R ${formatSymbol(job.min)} - R ${formatSymbol(job.max)}</div>
        `;
        jobsList.appendChild(el);
    });
};
// --- END RECRUITER TOOLS LOGIC ---

// --- CALCULATOR LOGIC ---
const updatePersonalizeButton = () => {
    if (state.role) {
        personalizeBtn.style.display = 'block';
    } else {
        personalizeBtn.style.display = 'none';
    }
};

const startCalculation = () => {
    if (!state.role) return;
    calcModal.classList.remove('hidden');
    calcResult.classList.add('hidden');
    calcForm.reset();

    // Set defaults based on active level could be cool, but keep simple
};

const calculateEstimate = (exp, certs, hasSkills) => {
    const roleData = getSelectedRoleData();
    const rawRange = roleData.levels[state.level];
    const regionData = SALARY_DATA.regions.find(r => r.id === state.region);
    const regionFactor = regionData ? regionData.factor : 1.0;

    // Apply region first to get the "Local Bracket"
    const min = rawRange.min * regionFactor;
    const max = rawRange.max * regionFactor;

    // Base Estimate = Midpoint
    let estimate = (min + max) / 2;

    // 1. Experience Factor: +2.5% per year (capped)
    let expFactor = exp * 0.025;
    if (expFactor > 0.40) expFactor = 0.40; // max 40% boost for exp

    // 2. Cert Factor: +3% per cert (capped 15%)
    let certFactor = certs * 0.03;
    if (certFactor > 0.15) certFactor = 0.15;

    // 3. Skill Premium
    let skillFactor = hasSkills ? 0.10 : 0;

    // Total Multiplier
    const totalMultiplier = 1 + expFactor + certFactor + skillFactor;

    estimate = estimate * totalMultiplier;

    if (estimate < min) estimate = min;
    const hardCap = max * 1.2;
    if (estimate > hardCap) estimate = hardCap;

    return { estimate, min, max };
};

const setupCalculatorListeners = () => {
    personalizeBtn.addEventListener('click', startCalculation);

    calcForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const exp = parseFloat(document.getElementById('calc-exp').value);
        const certs = parseFloat(document.getElementById('calc-certs').value);
        const hasSkills = document.getElementById('calc-skills').checked;

        const { estimate, min, max } = calculateEstimate(exp, certs, hasSkills);

        // UI Update
        calcAmountDisplay.textContent = `R ${formatCurrency(Math.round(estimate))}`;

        // Bar
        compMin.textContent = `R ${formatSymbol(min)}`;
        compMax.textContent = `R ${formatSymbol(max)}`;

        // Marker Position
        const range = max - min;
        let percent = ((estimate - min) / range) * 100;

        // Clamp marker for visual sanity
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;

        compMarker.style.left = `${percent}%`;

        // Text
        if (estimate > max) compText.textContent = "You're exceeding the standard market range!";
        else if (estimate > (min + max) / 2) compText.textContent = "You're likely in the upper half of this bracket.";
        else compText.textContent = "You're likely in the growth phase of this bracket.";

        calcResult.classList.remove('hidden');
    });
};
// --- END CALCULATOR LOGIC ---

// --- CAREER PATH LOGIC ---
const PROGRESSION_MAP = {
    'intern': 0,
    'entry': 1,
    'mid': 3,
    'senior': 7,
    'lead': 12,
    'exec': 17
};

const LEVEL_ORDER = ['intern', 'entry', 'mid', 'senior', 'lead', 'exec'];

const setupCareerListeners = () => {
    careerSlider.addEventListener('input', (e) => {
        state.careerProjectionYear = parseInt(e.target.value);
        updateCareerProjection();
    });
};

const updateCareerProjection = () => {
    if (!state.role) {
        careerCard.style.display = 'none';
        return;
    }

    // Show Card
    careerCard.style.display = 'block';

    const roleData = getSelectedRoleData();
    const currentBaseYears = PROGRESSION_MAP[state.level] || 0;
    const projectedYears = currentBaseYears + state.careerProjectionYear;

    // Find projected level
    let projectedLevel = state.level;
    let nextLevel = null;

    for (let i = 0; i < LEVEL_ORDER.length; i++) {
        const lvl = LEVEL_ORDER[i];
        const years = PROGRESSION_MAP[lvl];
        if (projectedYears >= years) {
            projectedLevel = lvl;
            nextLevel = LEVEL_ORDER[i + 1]; // For progress calculation
        }
    }

    // Calculate Salary for Projected Level
    // Use Midpoint of that level
    const range = roleData.levels[projectedLevel];
    let salary = "---";

    if (range) {
        const regionData = SALARY_DATA.regions.find(r => r.id === state.region);
        const factor = regionData ? regionData.factor : 1.0;
        const min = range.min * factor;
        const max = range.max * factor;
        const mid = (min + max) / 2;
        salary = `~ R ${formatCurrency(Math.round(mid))}`;
    } else {
        salary = "Data Unavailable";
    }

    // UI Updates
    projRole.textContent = `Likely Role: ${capitalizeFirstLetter(projectedLevel)}`;
    projSalary.textContent = salary;

    if (state.careerProjectionYear === 0) {
        projDesc.textContent = "Your current starting point.";
    } else if (projectedLevel === state.level) {
        projDesc.textContent = `Building potential in your current ${capitalizeFirstLetter(state.level)} role.`;
    } else {
        projDesc.textContent = `In ${state.careerProjectionYear} years, you could progress to ${capitalizeFirstLetter(projectedLevel)}.`;
    }

    updateTimelineViz(currentBaseYears, projectedLevel, nextLevel, roleData);
};

const updateTimelineViz = (startYears, currentProjLevel, nextLevelKey, roleData) => {
    // 1. Draw Steps
    timelineSteps.innerHTML = '';

    const startIndex = LEVEL_ORDER.indexOf(state.level);
    const visibleLevels = LEVEL_ORDER.slice(startIndex, startIndex + 4); // Show up to 4 nodes

    if (visibleLevels.length === 0) return;

    visibleLevels.forEach((lvl, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `timeline-step ${lvl === currentProjLevel ? 'active' : ''}`;
        stepDiv.innerHTML = `
          <div class="step-marker"></div>
          <span class="step-label">${capitalizeFirstLetter(lvl)}</span>
       `;
        timelineSteps.appendChild(stepDiv);
    });

    const projIndex = visibleLevels.indexOf(currentProjLevel);
    let progressPercent = 0;

    if (projIndex >= 0) {
        const stepWidth = 100 / (visibleLevels.length - 1 || 1);
        progressPercent = projIndex * stepWidth;
    } else {
        progressPercent = 100;
    }

    timelineProgress.style.width = `${progressPercent}%`;
};
// --- END CAREER PATH LOGIC ---

// --- MARKET PULSE LOGIC ---
const populateMarketPulse = () => {
    // 1. Get stats from Market Data for all available roles
    // We need to map our IDs to Market Data IDs
    const allRoles = [];

    SALARY_DATA.industries.forEach(ind => {
        ind.roles.forEach(r => {
            const md = getMarketData(r.id);
            allRoles.push({
                id: r.id,
                title: r.title,
                score: md.demandScore,
                trend: md.trend
            });
        });
    });

    // Sort by Demand Score
    allRoles.sort((a, b) => b.score - a.score);
    const top5 = allRoles.slice(0, 5);

    // Render Top Demand
    topDemandList.innerHTML = '';
    top5.forEach((role, i) => {
        const el = document.createElement('div');
        el.className = 'market-item';
        el.innerHTML = `
            <div class="market-rank">#${i + 1}</div>
            <div class="market-info">${role.title}</div>
            <div class="market-score">${role.score}/100</div>
        `;
        topDemandList.appendChild(el);
    });

    // Render Skills (Default view)
    trendingSkillsList.innerHTML = '<p class="empty-state">Select a role to see skills.</p>';
};

const updateMarketPulseForRole = (roleId) => {
    const data = getMarketData(roleId);

    // Update Demand Indicator in Card
    demandIndicator.classList.remove('hidden');
    demandText.textContent = getDemandLabel(data.demandScore);
    demandTrend.textContent = data.trend === 'up' ? 'Trending Up ↗' : (data.trend === 'down' ? 'Trending Down ↘' : 'Stable →');

    // Color code
    if (data.demandScore >= 80) demandIndicator.style.color = '#10b981';
    else if (data.demandScore >= 60) demandIndicator.style.color = '#fbbf24';
    else demandIndicator.style.color = '#ef4444';

    // Update Skills Cloud in Pulse Section
    if (data.topSkills && data.topSkills.length > 0) {
        trendingSkillsList.innerHTML = '';
        data.topSkills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = `${skill.name} (${skill.count}%)`; // Mock percentage
            trendingSkillsList.appendChild(tag);
        });

        // Phase 5.2: Show Analyze Button
        if (analyzeSkillsBtn) analyzeSkillsBtn.classList.remove('hidden');
    } else {
        trendingSkillsList.innerHTML = '<p class="empty-state">No skills data available.</p>';
        if (analyzeSkillsBtn) analyzeSkillsBtn.classList.add('hidden');
    }
};

const getDemandLabel = (score) => {
    if (score >= 90) return 'Very High Demand';
    if (score >= 75) return 'High Demand';
    if (score >= 50) return 'Moderate Demand';
    return 'Low Demand';
};
// --- END MARKET PULSE LOGIC ---

// --- COMPANY COMPARISON LOGIC ---
const updateTopEmployers = (roleId) => {
    employersList.innerHTML = '';

    // 1. Filter Companies that have this role
    let validCompanies = COMPANY_DATA.filter(comp => comp.roles[roleId]);

    // 2. Sort by Median Salary (Descending) -> "Best Payers"
    validCompanies.sort((a, b) => b.roles[roleId].median - a.roles[roleId].median);

    // 3. Take Top 3
    if (validCompanies.length === 0) {
        topEmployersPanel.classList.add('hidden');
        return;
    }

    topEmployersPanel.classList.remove('hidden');
    const top3 = validCompanies.slice(0, 3);

    top3.forEach((comp, index) => {
        const data = comp.roles[roleId];
        const el = document.createElement('div');
        el.className = 'employer-item';
        el.innerHTML = `
      <div class="employer-rank">${index + 1}</div>
      <div class="employer-name">${comp.name}</div>
      <div class="employer-salary">~ R ${formatSymbol(data.median)}</div>
    `;
        employersList.appendChild(el);
    });
};
// --- END COMPANY COMPARISON LOGIC ---

// --- COL LOGIC ---
const updateCOLInfo = (nominalSalary) => {
    if (state.region === 'national') {
        colCard.classList.add('hidden');
        return;
    }

    const colIndex = COL_DATA[state.region];
    if (!colIndex) {
        colCard.classList.add('hidden');
        return;
    }

    colCard.classList.remove('hidden');

    const purchasingPowerFactor = 100 / colIndex;
    const realValue = nominalSalary * purchasingPowerFactor;

    colIndexVal.textContent = colIndex;
    colRealValue.textContent = `~ R ${formatCurrency(Math.round(realValue))}`;

    const insight = COL_INSIGHTS[state.region] || "";
    if (colIndex > 100) {
        colInsight.textContent = `${insight} Living costs are ${colIndex - 100}% above national average.`;
        colRealValue.style.color = '#ef4444'; // Red warning
    } else if (colIndex < 100) {
        colInsight.textContent = `${insight} Your money goes ${100 - colIndex}% further here!`;
        colRealValue.style.color = '#10b981'; // Green positive
    } else {
        colInsight.textContent = "Standard national cost of living.";
        colRealValue.style.color = 'var(--text-primary)';
    }
};
// --- END COL LOGIC ---

// --- POLL LOGIC ---
const initPoll = () => {
    pollQuestion.textContent = POLL_DATA.question;

    // Check if voted
    const votedId = localStorage.getItem(`poll_voted_${POLL_DATA.id}`);

    if (votedId) {
        renderPollResults(POLL_DATA);
    } else {
        renderPollVoting(POLL_DATA);
    }
};

const renderPollVoting = (data) => {
    pollOptions.innerHTML = '';
    pollOptions.classList.remove('hidden');
    pollResults.classList.add('hidden');

    // 1. Render Options
    data.options.forEach((opt, index) => {
        const label = document.createElement('label');
        label.className = 'poll-option';
        label.innerHTML = `
            <input type="radio" name="poll-opt" value="${opt.id}">
            <span>${opt.label}</span>
        `;
        pollOptions.appendChild(label);
    });

    // 2. Render Submit Button
    const btn = document.createElement('button');
    btn.className = 'poll-submit-btn';
    btn.textContent = 'Vote';
    btn.onclick = handleVote;
    pollOptions.appendChild(btn);
};

const handleVote = () => {
    const selected = document.querySelector('input[name="poll-opt"]:checked');
    if (!selected) {
        alert("Please select an option!");
        return;
    }

    const voteId = parseInt(selected.value);

    // 1. Update Mock Data (In memory)
    const opt = POLL_DATA.options.find(o => o.id === voteId);
    if (opt) {
        opt.votes++;
        POLL_DATA.totalVotes++;
    }

    // 2. Persist
    localStorage.setItem(`poll_voted_${POLL_DATA.id}`, voteId);

    // 3. Show Results
    renderPollResults(POLL_DATA);
};

const renderPollResults = (data) => {
    pollOptions.classList.add('hidden');
    pollResults.classList.remove('hidden');
    pollResults.innerHTML = '';

    data.options.forEach(opt => {
        const percent = Math.round((opt.votes / data.totalVotes) * 100);

        const el = document.createElement('div');
        el.className = 'poll-result-item';
        el.innerHTML = `
            <div class="poll-result-label">
                <span>${opt.label}</span>
                <span>${percent}%</span>
            </div>
            <div class="poll-result-bar-bg">
                <div class="poll-result-bar-fill" style="width: ${percent}%"></div>
            </div>
        `;
        pollResults.appendChild(el);
    });

    const totalEl = document.createElement('div');
    totalEl.className = 'poll-total';
    totalEl.textContent = `${data.totalVotes} votes total`;
    pollResults.appendChild(totalEl);
};
// --- END POLL LOGIC ---

// --- FORUM LOGIC ---
let feedData = [...FORUM_DATA]; // Local snapshot

const renderForum = () => {
    forumFeed.innerHTML = '';

    feedData.forEach(post => {
        const el = document.createElement('div');
        el.className = 'forum-card';

        const badge = post.badge ? `<span class="badge">${post.badge}</span>` : '';

        // Render Answers
        let answersHtml = '';
        if (post.answers.length > 0) {
            answersHtml = '<div class="answer-list">';
            post.answers.forEach(ans => {
                const verifiedTick = ans.isVerified ? '<span class="verified-badge" title="Verified">✓</span>' : '';
                answersHtml += `
                    <div class="answer-item">
                        <div class="answer-meta">${ans.author} ${verifiedTick}</div>
                        <div>${ans.text}</div>
                    </div>
                `;
            });
            answersHtml += '</div>';
        } else {
            answersHtml = '<div style="font-size:0.8rem;color:var(--text-secondary);margin-top:0.5rem">No answers yet. Be the first!</div>';
        }

        el.innerHTML = `
            <div class="forum-meta">Asked by ${post.author} • ${post.timestamp} ${badge}</div>
            <div class="forum-title">${post.title}</div>
            <div class="forum-stats">
                <span class="vote-control">▲ ${post.votes}</span>
                <span>${post.answers.length} Answers</span>
            </div>
            ${answersHtml}
            <button class="reply-btn" onclick="alert('Login to reply')">Reply</button>
        `;
        forumFeed.appendChild(el);
    });
};

const setupForumListeners = () => {
    askBtn.addEventListener('click', () => {
        askModal.classList.remove('hidden');
    });

    askForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = document.getElementById('ask-input').value;
        const newQ = {
            id: Date.now(),
            author: "Anon",
            badge: "💎 Contributor", // Reward for asking
            timestamp: "Just now",
            title: text,
            votes: 0,
            answers: []
        };

        feedData.unshift(newQ); // Add to top
        renderForum();

        askModal.classList.add('hidden');
        askForm.reset();
    });
};
// --- END FORUM LOGIC ---

const populateIndustries = () => {
    const options = SALARY_DATA.industries.map(ind => `<option value="${ind.id}">${ind.name}</option>`).join('');

    industrySelect.innerHTML = '<option value="" disabled selected>Select Industry...</option>' + options;
    submitIndustrySelect.innerHTML = '<option value="" disabled selected>Select Industry...</option>' + options;
};

const populateRegions = () => {
    regionSelect.innerHTML = '';
    SALARY_DATA.regions.forEach(reg => {
        const option = document.createElement('option');
        option.value = reg.id;
        option.textContent = reg.name;
        regionSelect.appendChild(option);
    });
};

const populateQualifications = () => {
    qualificationSelect.innerHTML = '<option value="any">All Qualifications</option>';
    SALARY_DATA.qualifications.forEach(q => {
        const option = document.createElement('option');
        option.value = q.id;
        option.textContent = q.name;
        qualificationSelect.appendChild(option);
    });
};

const getFilteredRoles = () => {
    let allRoles = [];

    // 1. Flatten all roles if searching, or get industry roles
    if (state.searchQuery.length > 0) {
        SALARY_DATA.industries.forEach(ind => {
            ind.roles.forEach(r => {
                allRoles.push({ ...r, industryName: ind.name, industryId: ind.id });
            });
        });

        // Filter by Search Query
        const query = state.searchQuery.toLowerCase();
        allRoles = allRoles.filter(r => r.title.toLowerCase().includes(query));
    } else if (state.industry) {
        const ind = SALARY_DATA.industries.find(i => i.id === state.industry);
        if (ind) {
            allRoles = ind.roles.map(r => ({ ...r, industryName: ind.name, industryId: ind.id }));
        }
    }

    // 2. Filter by Qualification (if not 'any')
    if (state.qualification !== 'any') {
        allRoles = allRoles.filter(r => r.qualification === state.qualification);
    }

    return allRoles;
};

const populateRoles = () => {
    const roles = getFilteredRoles();
    roleSelect.innerHTML = '<option value="" disabled selected>Choose a job role...</option>';

    if (roles.length > 0) {
        roleSelect.disabled = false;
        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = `${role.industryId}|${role.id}`;
            if (state.searchQuery.length > 0) {
                option.textContent = `${role.title} (${role.industryName})`;
            } else {
                option.textContent = role.title;
            }
            roleSelect.appendChild(option);
        });
    } else {
        roleSelect.disabled = true;
        roleSelect.innerHTML = '<option value="" disabled selected>No roles found</option>';
    }
};

const populateLevels = (roleObj) => {
    levelContainer.innerHTML = '';
    if (!roleObj) return;

    // Create buttons for each level available in the role
    Object.keys(roleObj.levels).forEach(levelKey => {
        const btn = document.createElement('button');
        btn.textContent = capitalizeFirstLetter(levelKey);
        btn.dataset.level = levelKey;
        if (levelKey === state.level) btn.classList.add('active');

        btn.addEventListener('click', () => {
            document.querySelectorAll('#level-toggle button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.level = levelKey;
            state.careerProjectionYear = 0; // Reset projection on level change
            careerSlider.value = 0;
            updateDisplay();
        });

        levelContainer.appendChild(btn);
    });

    // Ensure current state level exists
    if (!roleObj.levels[state.level]) {
        const firstLevel = Object.keys(roleObj.levels)[0];
        state.level = firstLevel;
        const firstBtn = levelContainer.querySelector(`button[data-level="${firstLevel}"]`);
        if (firstBtn) firstBtn.classList.add('active');
    }
};

const getSelectedRoleData = () => {
    if (!state.role) return null;
    const ind = SALARY_DATA.industries.find(i => i.id === state.industry);
    if (!ind) return null;
    return ind.roles.find(r => r.id === state.role);
};

const setupEventListeners = () => {
    // Search
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim();
        if (state.searchQuery.length > 0) {
            industrySelect.disabled = true;
            industrySelect.value = "";
        } else {
            industrySelect.disabled = false;
            industrySelect.value = state.industry || "";
        }
        populateRoles();
    });

    // Qualification
    qualificationSelect.addEventListener('change', (e) => {
        state.qualification = e.target.value;
        populateRoles();
    });

    // Industry
    industrySelect.addEventListener('change', (e) => {
        state.industry = e.target.value;
        state.role = '';
        populateRoles();
        updateDisplay();
    });

    // Role
    roleSelect.addEventListener('change', (e) => {
        const [indId, roleId] = e.target.value.split('|');
        state.industry = indId;
        state.role = roleId;
        const roleData = getSelectedRoleData();
        populateLevels(roleData);
        updateDisplay();
    });

    // Region
    regionSelect.addEventListener('change', (e) => {
        state.region = e.target.value;
        updateDisplay();
    });
};

const setupModalListeners = () => {
    // Contribution Modal
    contributeBtn.addEventListener('click', () => {
        submissionModal.classList.remove('hidden');
    });

    // Close Modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById(btn.dataset.target || 'submission-modal').classList.add('hidden');
        });
    });

    // Generic Modal Background Click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });

    salaryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.getElementById('submit-role').value;
        const salary = document.getElementById('submit-salary').value;

        // Save to LocalStorage
        const contributions = JSON.parse(localStorage.getItem('user_contributions') || '[]');
        contributions.push({
            role,
            salary,
            date: new Date().toISOString()
        });
        localStorage.setItem('user_contributions', JSON.stringify(contributions));

        alert('Thank you! Your anonymous contribution helps accuracy.');
        submissionModal.classList.add('hidden');
        salaryForm.reset();
    });
};

const setupAuthListeners = () => {
    authBtn.addEventListener('click', () => {
        login();
    });

    profileBtn.addEventListener('click', () => {
        loadDashboard();
        dashboardModal.classList.remove('hidden');
    });

    logoutBtn.addEventListener('click', () => {
        logout();
    });

    saveRoleBtn.addEventListener('click', () => {
        saveCurrentRole();
    });
};

const updateDisplay = () => {
    updatePersonalizeButton();
    updateSaveButtonState();
    updateCareerProjection();

    const roleData = getSelectedRoleData();

    if (!roleData) {
        salaryAmountEl.textContent = '---';
        monthlyAmountEl.textContent = '---';
        chartContainer.innerHTML = '';
        demandIndicator.classList.add('hidden');
        topEmployersPanel.classList.add('hidden');
        colCard.classList.add('hidden');
        // Hide analyze button if no role
        if (analyzeSkillsBtn) analyzeSkillsBtn.classList.add('hidden'); // Check existence
        return;
    }

    updateMarketPulseForRole(roleData.id);
    updateTopEmployers(roleData.id);

    const rawRange = roleData.levels[state.level];
    if (!rawRange) return;

    const regionData = SALARY_DATA.regions.find(r => r.id === state.region);
    const factor = regionData ? regionData.factor : 1.0;

    const min = Math.round(rawRange.min * factor);
    const max = Math.round(rawRange.max * factor);
    const medianSalary = (min + max) / 2;

    animateValue(salaryAmountEl, min, max);

    const avgYearly = (min + max) / 2;
    const monthly = Math.round(avgYearly / 12);
    monthlyAmountEl.textContent = `R ${formatCurrency(monthly)}`;

    renderChart(roleData, factor);
    updateCOLInfo(medianSalary);
};

const renderChart = (roleData, factor) => {
    chartContainer.innerHTML = '';

    // Need to find max value across all levels to scale bars
    let maxSalary = 0;
    Object.values(roleData.levels).forEach(l => {
        if (l.max > maxSalary) maxSalary = l.max;
    });
    maxSalary = maxSalary * factor;

    Object.entries(roleData.levels).forEach(([key, range]) => {
        const levelMax = range.max * factor;
        const heightPercent = (levelMax / maxSalary) * 100;

        const wrapper = document.createElement('div');
        wrapper.className = 'chart-bar-wrapper';

        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${heightPercent}%`;
        if (key === state.level) bar.classList.add('active');

        const label = document.createElement('div');
        label.className = 'chart-label';
        label.textContent = capitalizeFirstLetter(key);

        wrapper.appendChild(bar);
        wrapper.appendChild(label);
        chartContainer.appendChild(wrapper);
    });
};

const animateValue = (element, min, max) => {
    const formattedRange = `${formatCurrency(min)} - ${formatCurrency(max)}`;

    element.style.opacity = 0;
    setTimeout(() => {
        element.textContent = formattedRange;
        element.style.opacity = 1;
    }, 150);
};

init();
