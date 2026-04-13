// ============================================
// Portfolio Application - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// ============================================
// Initialize Application
// ============================================
async function initializeApp() {
    try {
        initializeParticles();

        await Promise.all([
            loadSiteConfig(),
            loadNavigation(),
            loadHero(),
            loadAbout(),
            loadExperience(),
            loadSkills(),
            loadProjects(),
            loadEducation(),
            loadContact(),
            loadFooter()
        ]);

        initializeNavigation();
        initializeScrollEffects();
        initializeScrollReveal();
        initializeBackToTop();
        initializeTiltCards();
        initializeScrollProgress();
        initializeCursorGlow();
        initializeSectionNumbers();
        initializeTypingEffect();
        initializeHeroOrbit();
        initializeSkillsMarquee();
        initializeCounters();
        initializeCardSpotlight();

        console.log('Portfolio loaded successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// ============================================
// Tech logo registry (Simple Icons CDN)
// ============================================
// Brand slugs + hex pulled from simpleicons.org. Rendered as
// https://cdn.simpleicons.org/<slug>/<hex>
const TECH_LOGOS = {
    'java':            ['openjdk', 'F7A72B'],
    'javascript':      ['javascript', 'F7DF1E'],
    'typescript':      ['typescript', '3178C6'],
    'python':          ['python', '3776AB'],
    'sql':             ['mysql', '4479A1'],
    'spring':          ['spring', '6DB33F'],
    'spring boot':     ['springboot', '6DB33F'],
    'spring mvc':      ['spring', '6DB33F'],
    'spring cloud':    ['spring', '6DB33F'],
    'spring security': ['springsecurity', '6DB33F'],
    'spring framework':['spring', '6DB33F'],
    'hibernate':       ['hibernate', '59666C'],
    'thymeleaf':       ['thymeleaf', '005F0F'],
    'bootstrap':       ['bootstrap', '7952B3'],
    'react':           ['react', '61DAFB'],
    'react.js':        ['react', '61DAFB'],
    'junit':           ['junit5', '25A162'],
    'mockito':         ['mockito', 'C5D9C8'],
    'testcontainers':  ['testcontainers', '1A1A1A'],
    'aws':             ['amazonwebservices', 'FF9900'],
    'aws bedrock':     ['amazonaws', 'FF9900'],
    'aws lambda':      ['awslambda', 'FF9900'],
    'docker':          ['docker', '2496ED'],
    'kubernetes':      ['kubernetes', '326CE5'],
    'apache kafka':    ['apachekafka', '231F20'],
    'jenkins':         ['jenkins', 'D24939'],
    'github actions':  ['githubactions', '2088FF'],
    'github':          ['github', 'ffffff'],
    'maven':           ['apachemaven', 'C71A36'],
    'git':             ['git', 'F05032'],
    'linux':           ['linux', 'FCC624'],
    'swagger/openapi': ['swagger', '85EA2D'],
    'swagger (openapi)':['swagger', '85EA2D'],
    'jmeter':          ['apachejmeter', 'D22128'],
    'gatling':         ['gatling', 'FF9900'],
    'oauth 2.0':       ['auth0', 'EB5424'],
    'oauth2':          ['auth0', 'EB5424'],
    'jwt authentication':['jsonwebtokens', '000000'],
    'postgresql':      ['postgresql', '4169E1'],
    'mysql':           ['mysql', '4479A1'],
    'oracle':          ['oracle', 'F80000'],
    'html':            ['html5', 'E34F26'],
    'css':             ['css3', '1572B6'],
    'dockerfile':      ['docker', '2496ED'],
    'procfile':        ['heroku', '430098'],
    'cnn':             ['tensorflow', 'FF6F00'],
    'streamlit':       ['streamlit', 'FF4B4B'],
    'openai':          ['openai', '412991'],
    'claude':          ['anthropic', 'D97757']
};

function getTechLogo(name) {
    if (!name) return null;
    const key = name.trim().toLowerCase();
    if (TECH_LOGOS[key]) {
        const [slug, hex] = TECH_LOGOS[key];
        return `https://cdn.simpleicons.org/${slug}/${hex}`;
    }
    // Partial matching for multi-word entries like "AWS (EC2, EKS, ...)"
    for (const techKey of Object.keys(TECH_LOGOS)) {
        if (key.includes(techKey) && techKey.length >= 3) {
            const [slug, hex] = TECH_LOGOS[techKey];
            return `https://cdn.simpleicons.org/${slug}/${hex}`;
        }
    }
    return null;
}

function techTag(tech) {
    const logo = getTechLogo(tech);
    const logoHtml = logo
        ? `<img src="${logo}" alt="" class="tech-logo" loading="lazy" onerror="this.remove()" />`
        : '';
    return `<span class="tech-tag">${logoHtml}<span>${tech}</span></span>`;
}

function skillTag(skill) {
    return techTag(skill).replace('tech-tag', 'skill-tag');
}

// ============================================
// Load Site Configuration
// ============================================
async function loadSiteConfig() {
    try {
        const response = await fetch('data/site-config.json');
        const data = await response.json();

        document.title = data.title;
        document.querySelector('meta[name="description"]').setAttribute('content', data.description);
        document.querySelector('meta[name="keywords"]').setAttribute('content', data.keywords);
        document.querySelector('meta[name="author"]').setAttribute('content', data.author);
    } catch (error) {
        console.error('Error loading site config:', error);
    }
}

// ============================================
// Load Navigation
// ============================================
async function loadNavigation() {
    try {
        const response = await fetch('data/navigation.json');
        const data = await response.json();

        const brandElement = document.getElementById('nav-brand');
        if (brandElement) {
            brandElement.innerHTML = `<span class="nav-brand-mark">AP</span><span class="nav-brand-text">${data.brand.name}</span>`;
            brandElement.href = data.brand.href;
        }

        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.innerHTML = data.menuItems.map(item => `
                <li>
                    <a href="${item.href}" class="nav-link">
                        <i class="${item.icon}"></i>
                        <span>${item.text}</span>
                    </a>
                </li>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// ============================================
// Load Hero Section
// ============================================
async function loadHero() {
    try {
        const response = await fetch('data/hero.json');
        const data = await response.json();

        document.getElementById('hero-greeting').textContent = data.greeting;

        const nameParts = data.name.split(' ');
        const first = nameParts.shift();
        const rest = nameParts.join(' ');
        document.getElementById('hero-name').innerHTML = rest
            ? `${first} <span>${rest}</span>`
            : `<span>${first}</span>`;

        document.getElementById('hero-tagline').textContent = data.tagline;
        document.getElementById('hero-summary').textContent = data.summary;

        // Avatar
        const avatarEl = document.getElementById('hero-avatar');
        if (avatarEl && data.avatarUrl) {
            avatarEl.innerHTML = `
                <div class="hero-avatar-ring">
                    <img src="${data.avatarUrl}" alt="${data.name}" onerror="this.parentElement.classList.add('no-image')" />
                </div>
            `;
        }

        // Highlights
        const highlightsContainer = document.getElementById('hero-highlights');
        if (highlightsContainer && data.highlights) {
            highlightsContainer.innerHTML = data.highlights.map(h => `
                <div class="highlight-item" style="--accent:${h.color}">
                    <div class="highlight-icon"><i class="${h.icon}"></i></div>
                    <span>${h.text}</span>
                </div>
            `).join('');
        }

        // CTA buttons
        const ctaContainer = document.getElementById('hero-cta');
        if (ctaContainer && data.cta && data.cta.buttons) {
            ctaContainer.innerHTML = data.cta.buttons.map(button => `
                <a href="${button.href}" class="btn btn-${button.type}">
                    ${button.icon ? `<i class="${button.icon}"></i>` : ''}
                    <span>${button.text}</span>
                </a>
            `).join('');
        }

        // Social links
        const socialContainer = document.getElementById('hero-social');
        if (socialContainer && data.socialLinks) {
            socialContainer.innerHTML = data.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${link.platform}">
                    <i class="${link.icon}"></i>
                </a>
            `).join('');
        }

        const scrollIndicator = document.getElementById('scroll-indicator');
        if (scrollIndicator && data.scrollIndicator) {
            scrollIndicator.innerHTML = `
                <span>${data.scrollIndicator.text}</span>
                <i class="${data.scrollIndicator.icon}"></i>
            `;
        }
    } catch (error) {
        console.error('Error loading hero section:', error);
    }
}

// ============================================
// Load About Section
// ============================================
async function loadAbout() {
    try {
        const response = await fetch('data/about.json');
        const data = await response.json();

        document.getElementById('about-title').textContent = data.sectionTitle;

        const textContainer = document.getElementById('about-text');
        if (textContainer && data.paragraphs) {
            textContainer.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');
        }

        const statsContainer = document.getElementById('about-stats');
        if (statsContainer && data.statistics) {
            statsContainer.innerHTML = data.statistics.map(stat => `
                <div class="stat-card" style="--accent:${stat.color}">
                    <div class="stat-icon"><i class="${stat.icon}"></i></div>
                    <span class="stat-value">${stat.value}</span>
                    <span class="stat-label">${stat.label}</span>
                </div>
            `).join('');
        }

        const actionsContainer = document.getElementById('about-actions');
        if (actionsContainer && data.downloadCV) {
            actionsContainer.innerHTML = `
                <a href="${data.downloadCV.href}" download class="btn btn-primary">
                    <i class="${data.downloadCV.icon}"></i>
                    <span>${data.downloadCV.text}</span>
                </a>
            `;
        }
    } catch (error) {
        console.error('Error loading about section:', error);
    }
}

// ============================================
// Load Experience Section
// ============================================
async function loadExperience() {
    try {
        const response = await fetch('data/experience.json');
        const data = await response.json();

        document.getElementById('experience-title').textContent = data.sectionTitle;

        const timelineContainer = document.getElementById('experience-timeline');
        if (timelineContainer && data.experiences) {
            timelineContainer.innerHTML = data.experiences.map(exp => {
                const logoUrl = exp.companyDomain
                    ? `https://logo.clearbit.com/${exp.companyDomain}`
                    : null;
                const logoHtml = logoUrl
                    ? `<div class="company-logo"><img src="${logoUrl}" alt="${exp.company}" onerror="this.parentElement.innerHTML='<i class=&quot;${exp.icon || 'fas fa-briefcase'}&quot;></i>'" /></div>`
                    : `<div class="company-logo"><i class="${exp.icon || 'fas fa-briefcase'}"></i></div>`;

                return `
                <div class="timeline-item">
                    <div class="timeline-empty"></div>
                    <div class="timeline-icon" style="background:${exp.color || 'var(--gradient-primary)'}">
                        <i class="${exp.icon || 'fas fa-briefcase'}"></i>
                    </div>
                    <div class="timeline-content" data-tilt>
                        <div class="experience-header">
                            ${logoHtml}
                            <div class="experience-heading">
                                <h3 class="experience-title">${exp.title}</h3>
                                <p class="experience-company">
                                    <strong>${exp.company}</strong>${exp.location ? ` · ${exp.location}` : ''}
                                </p>
                                <p class="experience-period">
                                    <i class="fas fa-calendar-alt"></i>
                                    ${exp.period}
                                    ${exp.type ? `<span class="experience-type">· ${exp.type}</span>` : ''}
                                </p>
                            </div>
                        </div>
                        <p class="experience-description">${exp.description}</p>
                        ${exp.responsibilities ? `
                            <ul class="experience-responsibilities">
                                ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        ` : ''}
                        ${exp.technologies ? `
                            <div class="experience-tech">
                                ${exp.technologies.map(t => techTag(t)).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading experience section:', error);
    }
}

// ============================================
// Load Skills Section
// ============================================
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const data = await response.json();

        document.getElementById('skills-title').textContent = data.sectionTitle;

        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid && data.categories) {
            skillsGrid.innerHTML = data.categories.map(category => `
                <div class="skill-category" data-tilt style="--accent:${category.color}">
                    <div class="skill-category-header">
                        <div class="skill-category-icon">
                            <i class="${category.icon}"></i>
                        </div>
                        <h3 class="skill-category-title">${category.category}</h3>
                    </div>
                    <div class="skill-list">
                        ${category.skills.map(s => skillTag(s)).join('')}
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading skills section:', error);
    }
}

// ============================================
// Load Projects Section
// ============================================
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();

        document.getElementById('projects-title').textContent = data.sectionTitle;

        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid && data.projects) {
            projectsGrid.innerHTML = data.projects.map(project => {
                const links = project.links || {};
                return `
                <div class="project-card" data-tilt style="--accent:${project.color}">
                    <div class="project-top">
                        <div class="project-icon" style="background:${project.color}">
                            <i class="${project.icon}"></i>
                        </div>
                        ${project.category ? `<span class="project-category">${project.category}</span>` : ''}
                    </div>
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    <p class="project-description">${project.description}</p>
                    ${project.technologies && project.technologies.length ? `
                        <div class="project-tech">
                            ${project.technologies.map(t => techTag(t)).join('')}
                        </div>
                    ` : ''}
                    ${(links.github || links.demo) ? `
                        <div class="project-links">
                            ${links.github ? `
                                <a href="${links.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    <i class="fab fa-github"></i>
                                    <span>Code</span>
                                </a>
                            ` : ''}
                            ${links.demo && links.demo !== links.github ? `
                                <a href="${links.demo}" target="_blank" rel="noopener noreferrer" class="project-link">
                                    <i class="fas fa-external-link-alt"></i>
                                    <span>Live</span>
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}
                    ${project.stats ? `
                        <div class="project-stats">
                            ${Object.entries(project.stats).map(([key, value]) => `
                                <div class="project-stat">
                                    <span class="project-stat-value">${value}</span>
                                    <span class="project-stat-label">${key}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading projects section:', error);
    }
}

// ============================================
// Load Education Section
// ============================================
async function loadEducation() {
    try {
        const response = await fetch('data/education.json');
        const data = await response.json();

        document.getElementById('education-title').textContent = data.sectionTitle;

        const educationGrid = document.getElementById('education-grid');
        if (educationGrid && data.education) {
            educationGrid.innerHTML = data.education.map(edu => {
                const logoUrl = edu.institutionDomain
                    ? `https://logo.clearbit.com/${edu.institutionDomain}`
                    : null;
                const iconHtml = logoUrl
                    ? `<div class="education-icon" style="--accent:${edu.color || '#667eea'}">
                           <img src="${logoUrl}" alt="${edu.institution}" onerror="this.parentElement.innerHTML='<i class=&quot;${edu.icon || 'fas fa-graduation-cap'}&quot;></i>'" />
                       </div>`
                    : `<div class="education-icon" style="--accent:${edu.color || '#667eea'}"><i class="${edu.icon || 'fas fa-graduation-cap'}"></i></div>`;

                return `
                <div class="education-card" data-tilt style="--accent:${edu.color || '#667eea'}">
                    ${iconHtml}
                    <h3 class="education-degree">${edu.degree}</h3>
                    <p class="education-institution">${edu.institution}${edu.location ? ` · ${edu.location}` : ''}</p>
                    <p class="education-period"><i class="fas fa-calendar-alt"></i> ${edu.period}</p>
                    ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
                    ${edu.achievements ? `
                        <ul class="education-achievements">
                            ${edu.achievements.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
            }).join('');
        }

        const certTitle = document.getElementById('certifications-title');
        if (certTitle) certTitle.textContent = data.certificationsTitle;

        const certificationsGrid = document.getElementById('certifications-grid');
        if (certificationsGrid && data.certifications) {
            certificationsGrid.innerHTML = data.certifications.map(cert => {
                const iconHtml = cert.logo
                    ? `<div class="certification-icon" style="--accent:${cert.color}"><img src="${cert.logo}" alt="${cert.title}" onerror="this.parentElement.innerHTML='<i class=&quot;${cert.icon}&quot;></i>'" /></div>`
                    : `<div class="certification-icon" style="--accent:${cert.color}"><i class="${cert.icon}"></i></div>`;
                return `
                <div class="certification-card" style="--accent:${cert.color}">
                    ${iconHtml}
                    <h4 class="certification-title">${cert.title}</h4>
                    <p class="certification-issuer">${cert.issuer}</p>
                    <p class="certification-date">${cert.date}</p>
                </div>
            `;
            }).join('');
        }
    } catch (error) {
        console.error('Error loading education section:', error);
    }
}

// ============================================
// Load Contact Section
// ============================================
async function loadContact() {
    try {
        const response = await fetch('data/contact.json');
        const data = await response.json();

        document.getElementById('contact-title').textContent = data.sectionTitle;
        document.getElementById('contact-subtitle').textContent = data.subtitle;

        const contactInfoContainer = document.getElementById('contact-info');
        if (contactInfoContainer && data.contactInfo) {
            contactInfoContainer.innerHTML = data.contactInfo.map(info => `
                <a href="${info.href}" class="contact-info-item" ${info.type !== 'location' ? 'target="_blank" rel="noopener noreferrer"' : ''} style="--accent:${info.color}">
                    <div class="contact-icon">
                        <i class="${info.icon}"></i>
                    </div>
                    <div class="contact-info-content">
                        <h4>${info.label}</h4>
                        <p>${info.value}</p>
                    </div>
                    <i class="fas fa-arrow-right contact-arrow"></i>
                </a>
            `).join('');
        }

        const contactForm = document.getElementById('contact-form');
        if (contactForm && data.form) {
            contactForm.action = data.form.action;
            contactForm.method = data.form.method;

            contactForm.innerHTML = data.form.fields.map(field => `
                <div class="form-group">
                    <label for="${field.name}">
                        <i class="${field.icon}"></i>
                        ${field.label}
                    </label>
                    ${field.type === 'textarea' ? `
                        <textarea
                            id="${field.name}"
                            name="${field.name}"
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}
                            rows="${field.rows || 5}"
                        ></textarea>
                    ` : `
                        <input
                            type="${field.type}"
                            id="${field.name}"
                            name="${field.name}"
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}
                        />
                    `}
                </div>
            `).join('') + `
                <button type="submit" class="form-submit">
                    <i class="${data.form.submitIcon}"></i>
                    <span>${data.form.submitText}</span>
                </button>
                <div class="form-message"></div>
            `;

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formMessage = contactForm.querySelector('.form-message');
                const submitButton = contactForm.querySelector('.form-submit');

                try {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                    const formData = new FormData(contactForm);
                    const response = await fetch(contactForm.action, {
                        method: contactForm.method,
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        formMessage.textContent = data.form.successMessage;
                        formMessage.className = 'form-message success';
                        formMessage.style.display = 'block';
                        contactForm.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    formMessage.textContent = data.form.errorMessage;
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                } finally {
                    submitButton.disabled = false;
                    submitButton.innerHTML = `<i class="${data.form.submitIcon}"></i> <span>${data.form.submitText}</span>`;
                }
            });
        }

        const contactSocial = document.getElementById('contact-social');
        if (contactSocial && data.socialMedia) {
            contactSocial.innerHTML = data.socialMedia.map(social => `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${social.platform}">
                    <i class="${social.icon}"></i>
                </a>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading contact section:', error);
    }
}

// ============================================
// Load Footer
// ============================================
async function loadFooter() {
    try {
        const response = await fetch('data/footer.json');
        const data = await response.json();

        const taglineElement = document.getElementById('footer-tagline');
        if (taglineElement) taglineElement.textContent = data.tagline;

        const footerSocial = document.getElementById('footer-social');
        if (footerSocial && data.socialLinks) {
            footerSocial.innerHTML = data.socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${link.platform}">
                    <i class="${link.icon}"></i>
                </a>
            `).join('');
        }

        const copyrightElement = document.getElementById('footer-copyright');
        if (copyrightElement) copyrightElement.textContent = data.copyright.text;

        const footerLinks = document.getElementById('footer-links');
        if (footerLinks && data.links) {
            footerLinks.innerHTML = data.links.map(link => `<a href="${link.href}">${link.text}</a>`).join('');
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// ============================================
// Interactive features
// ============================================
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.section, .timeline-item, .skill-category, .project-card, .education-card, .certification-card');
    revealElements.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(el => io.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }
}

function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initializeTiltCards() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y / rect.height) - 0.5) * -6;
            const rotateY = ((x / rect.width) - 0.5) * 6;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// Scroll progress bar
// ============================================
function initializeScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const update = () => {
        const h = document.documentElement;
        const scrolled = h.scrollTop / Math.max(1, (h.scrollHeight - h.clientHeight));
        bar.style.transform = `scaleX(${scrolled})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// ============================================
// Cursor glow follower
// ============================================
function initializeCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.matchMedia('(hover: none)').matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => {
        tx = e.clientX;
        ty = e.clientY;
    });
    const render = () => {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        glow.style.transform = `translate(${cx}px, ${cy}px)`;
        requestAnimationFrame(render);
    };
    render();
}

// ============================================
// Section numbering
// ============================================
function initializeSectionNumbers() {
    const sections = document.querySelectorAll('section.section');
    sections.forEach((sec, i) => {
        const title = sec.querySelector('.section-title');
        if (!title || title.dataset.numbered) return;
        title.dataset.numbered = '1';
        const num = String(i + 1).padStart(2, '0');
        const label = document.createElement('span');
        label.className = 'section-number';
        label.textContent = num + '.';
        title.parentNode.insertBefore(label, title);
    });
}

// ============================================
// Hero typing effect
// ============================================
const TYPING_ROLES = [
    'cloud-native microservices',
    'LLM-powered document pipelines',
    'event-driven Kafka systems',
    'React frontends at scale',
    'AWS infra on EKS & Lambda'
];

function initializeTypingEffect() {
    const target = document.getElementById('hero-typing');
    if (!target) return;
    let roleIdx = 0, charIdx = 0, deleting = false;
    const tick = () => {
        const role = TYPING_ROLES[roleIdx];
        if (!deleting) {
            charIdx++;
            target.textContent = role.slice(0, charIdx);
            if (charIdx === role.length) {
                deleting = true;
                return setTimeout(tick, 1800);
            }
            setTimeout(tick, 55 + Math.random() * 40);
        } else {
            charIdx--;
            target.textContent = role.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % TYPING_ROLES.length;
                return setTimeout(tick, 400);
            }
            setTimeout(tick, 28);
        }
    };
    tick();
}

// ============================================
// Hero orbit — floating tech logos
// ============================================
const ORBIT_TECH = [
    ['java', 'openjdk', 'F7A72B'],
    ['spring', 'spring', '6DB33F'],
    ['react', 'react', '61DAFB'],
    ['aws', 'amazonwebservices', 'FF9900'],
    ['docker', 'docker', '2496ED'],
    ['kubernetes', 'kubernetes', '326CE5'],
    ['kafka', 'apachekafka', 'ffffff'],
    ['postgres', 'postgresql', '4169E1'],
    ['openai', 'openai', 'ffffff'],
    ['typescript', 'typescript', '3178C6']
];

function initializeHeroOrbit() {
    const orbit = document.getElementById('hero-orbit');
    if (!orbit) return;

    // Inner ring: 5 logos, outer ring: 5 logos
    const inner = ORBIT_TECH.slice(0, 5);
    const outer = ORBIT_TECH.slice(5);

    const ringHtml = (items, ringClass) => {
        const step = 360 / items.length;
        return `<div class="orbit-ring ${ringClass}">
            ${items.map((t, i) => `
                <div class="orbit-item" style="--angle:${i * step}deg">
                    <div class="orbit-chip" title="${t[0]}">
                        <img src="https://cdn.simpleicons.org/${t[1]}/${t[2]}" alt="${t[0]}" onerror="this.remove()" />
                    </div>
                </div>
            `).join('')}
        </div>`;
    };

    orbit.innerHTML = ringHtml(inner, 'ring-inner') + ringHtml(outer, 'ring-outer');
}

// ============================================
// Skills marquee (infinite horizontal scroll)
// ============================================
async function initializeSkillsMarquee() {
    const marquee = document.getElementById('skills-marquee');
    if (!marquee) return;
    try {
        const res = await fetch('data/skills.json');
        const data = await res.json();
        const all = [];
        (data.categories || []).forEach(c => (c.skills || []).forEach(s => all.push(s)));

        // Only keep items with a recognized logo
        const withLogo = all.map(s => ({ name: s, logo: getTechLogo(s) })).filter(x => x.logo);
        if (!withLogo.length) return;

        const renderItem = (item) => `
            <div class="marquee-item">
                <img src="${item.logo}" alt="${item.name}" loading="lazy" onerror="this.parentElement.remove()" />
                <span>${item.name}</span>
            </div>
        `;

        // Duplicate the track for seamless loop
        const trackHtml = withLogo.map(renderItem).join('');
        marquee.innerHTML = `
            <div class="marquee-track">
                ${trackHtml}${trackHtml}
            </div>
        `;
    } catch (err) {
        console.error('Error building skills marquee:', err);
    }
}

// ============================================
// Count-up animation for stats
// ============================================
function initializeCounters() {
    const els = document.querySelectorAll('.stat-value');
    if (!els.length || !('IntersectionObserver' in window)) return;

    const animate = (el) => {
        const text = el.textContent.trim();
        const match = text.match(/(\d+)/);
        if (!match) return;
        const target = parseInt(match[1], 10);
        const suffix = text.replace(match[1], '');
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animate(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    els.forEach(el => io.observe(el));
}

// ============================================
// Card spotlight (mouse position CSS vars)
// ============================================
function initializeCardSpotlight() {
    const cards = document.querySelectorAll('.skill-category, .project-card, .education-card, .timeline-content, .certification-card, .contact-info-item, .highlight-item, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });
}

// ============================================
// Initialize Particles Background
// ============================================
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 70, density: { enable: true, value_area: 900 } },
                color: { value: ['#667eea', '#764ba2', '#f093fb', '#4facfe'] },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.45,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 160,
                    color: '#667eea',
                    opacity: 0.18,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.6,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 160, line_linked: { opacity: 0.45 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}
