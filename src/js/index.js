const langs = Object.keys(translations);
let currentLang = langs[0];

function nextLang(lang) {
  return langs[(langs.indexOf(lang) + 1) % langs.length];
}

const langMeta = Object.fromEntries(portfolioData.langs.map(l => [l.code, l]));

function renderAbout(lang) {
  const t = translations[lang];
  const container = document.getElementById("about-container");

  const bioHtml = t.accordion__about_bio
    .map(p => `<p class="about-bio">${p}</p>`)
    .join("");

  container.innerHTML = bioHtml;
}

function renderExpEdu(lang) {
  const t = translations[lang];
  const container = document.getElementById("exp-container");

  const expHtml = portfolioData.experience.map(exp => {
    const company   = typeof exp.company === "object" ? exp.company[lang] : exp.company;
    const periodRaw = typeof exp.period  === "object" ? exp.period[lang]  : exp.period;
    const period    = periodRaw && exp.duration ? `${periodRaw} (${exp.duration})` : periodRaw;
    const meta = [exp.type[lang], period, exp.location[lang]].filter(Boolean).join(" · ");
    const bullets  = exp.bullets.map(b => `<li>${b[lang]}</li>`).join("");
    const linkHtml = exp.link
      ? `<a href="${exp.link.url}" target="_blank" class="exp-entry__link">${exp.link.label[lang]}</a>`
      : "";
    return `
      <div class="exp-entry">
        <div class="exp-entry__header">${exp.role[lang]} — ${company}</div>
        <div class="exp-entry__meta">${meta}</div>
        <ul class="exp-entry__bullets">${bullets}</ul>
        ${linkHtml}
      </div>`;
  }).join("");

  const eduHtml = portfolioData.education.map(edu => `
    <div class="exp-entry">
      <div class="exp-entry__header">${edu.institution}</div>
      <div class="exp-entry__meta">${edu.degree[lang]}</div>
    </div>`
  ).join("");

  container.innerHTML = `
    ${expHtml}
    <div class="section-title">${t.accordion__edu_section}</div>
    ${eduHtml}
  `;
}

function renderCert(lang) {
  const t = translations[lang];
  const container = document.getElementById("cert-container");

  const certsHtml = portfolioData.certifications
    .map(c => {
      const linkHtml = c.link
        ? `<br><a href="${c.link.url}" target="_blank" class="exp-entry__link">${c.link.label[lang]}</a>`
        : "";
      return `<div class="cert-entry">${c[lang]}${linkHtml}</div>`;
    })
    .join("");

  const skillsHtml = portfolioData.technicalSkills
    .map(s => `
      <div class="about-skill-row">
        <span class="cert-skill-category">${s.category[lang]}</span>
        <span class="about-skill-items">${s.items}</span>
      </div>`)
    .join("");

  container.innerHTML = `
    <div class="section-title">${t.accordion__cert_section_title}</div>
    <div class="cert-list mb-3">${certsHtml}</div>
    <div class="section-title">${t.accordion__skills_section_title}</div>
    <div class="about-skills">${skillsHtml}</div>
  `;
}

function applyLang(lang) {
  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });
  renderAbout(lang);
  renderExpEdu(lang);
  renderCert(lang);

  const profile = portfolioData.profile;
  document.getElementById("profile-role").textContent = profile.role[lang];
  document.getElementById("profile-location").textContent = profile.location[lang];

  document.title = `${profile.firstName} ${profile.lastName}`;
  document.querySelector('meta[name="description"]').setAttribute("content", t.meta__description);

  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta && t.meta__keywords) {
    keywordsMeta.setAttribute("content", t.meta__keywords);
  }

  document.documentElement.lang = lang;
  const next = langMeta[nextLang(lang)];
  document.getElementById("lang-toggle").textContent = `${next.flag} ${next.label}`;
  currentLang = lang;
  localStorage.setItem("lang", lang);
}

function detectLang() {
  const saved = localStorage.getItem("lang");
  if (saved && translations[saved]) return saved;
  const browser = (navigator.language || "").slice(0, 2);
  return translations[browser] ? browser : langs[0];
}

function createLinkElement(item, className) {
  const a = document.createElement("a");
  a.href = item.url;
  a.target = "_blank";
  a.className = className;

  a.setAttribute("data-name", item.name);
  a.setAttribute("data-bs-toggle", "tooltip");
  a.setAttribute("data-bs-placement", "top");
  a.setAttribute("title", item.tooltip);

  const iconSpan = document.createElement("span");
  iconSpan.className = "icon";
  iconSpan.style.backgroundImage = `url('${item.icon}')`;

  a.appendChild(iconSpan);
  return a;
}

function renderProfileLinks() {
  const socialContainer = document.getElementById("social-container");
  const toolsContainer = document.getElementById("tools-container");

  portfolioData.socials.forEach(item => {
    const linkElement = createLinkElement(item, "social-link");
    socialContainer.appendChild(linkElement);
    new bootstrap.Tooltip(linkElement);
  });

  portfolioData.tools.forEach(item => {
    const linkElement = createLinkElement(item, "tool-link");
    toolsContainer.appendChild(linkElement);
    new bootstrap.Tooltip(linkElement);
  });
}

$(document).ready(function () {
  const { firstName, lastName, photo, favicon } = portfolioData.profile;

  document.getElementById("favicon").href = favicon;
  const profilePhoto = document.getElementById("profile-photo");
  profilePhoto.src = photo;
  profilePhoto.alt = `${firstName} ${lastName}`;
  document.getElementById("profile-name").innerHTML =
    `${firstName} <span class="last-name">${lastName}</span>`;

  renderProfileLinks();
  applyLang(detectLang());

  $("#lang-toggle").on("click", function () {
    applyLang(nextLang(currentLang));
  });
});

