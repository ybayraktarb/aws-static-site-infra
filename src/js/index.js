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

let activeData = JSON.parse(JSON.stringify(portfolioData));

function renderProfileHeader() {
  const { firstName, lastName, photo, favicon } = activeData.profile;
  if (favicon) {
    document.getElementById("favicon").href = favicon;
  }
  const profilePhoto = document.getElementById("profile-photo");
  profilePhoto.src = photo || "image/cv.jpg";
  profilePhoto.alt = `${firstName} ${lastName}`;
  document.getElementById("profile-name").innerHTML =
    `${firstName} <span class="last-name">${lastName}</span>`;
}

function initStudioForm() {
  const p = activeData.profile;
  document.getElementById("edit-first-name").value = p.firstName || "";
  document.getElementById("edit-last-name").value = p.lastName || "";
  document.getElementById("edit-role-tr").value = p.role?.tr || "";
  document.getElementById("edit-role-en").value = p.role?.en || "";
  document.getElementById("edit-location-tr").value = p.location?.tr || "";
  document.getElementById("edit-location-en").value = p.location?.en || "";
  
  if (translations.tr.accordion__about_bio && translations.tr.accordion__about_bio.length > 0) {
    document.getElementById("edit-bio-tr").value = translations.tr.accordion__about_bio.join("\n\n");
  }
  if (translations.en.accordion__about_bio && translations.en.accordion__about_bio.length > 0) {
    document.getElementById("edit-bio-en").value = translations.en.accordion__about_bio.join("\n\n");
  }
}

function copyShareLink() {
  const hash = CardState.encode(activeData);
  const shareUrl = `${window.location.origin}${window.location.pathname}#data=${hash}`;
  
  navigator.clipboard.writeText(shareUrl).then(() => {
    const shareBtn = document.getElementById("share-card-btn");
    const originalText = shareBtn.innerHTML;
    shareBtn.innerHTML = `✓ Copied!`;
    shareBtn.classList.remove("btn-outline-dark");
    shareBtn.classList.add("btn-success");
    setTimeout(() => {
      shareBtn.innerHTML = originalText;
      shareBtn.classList.remove("btn-success");
      shareBtn.classList.add("btn-outline-dark");
    }, 2000);
  }).catch(err => {
    console.error("Could not copy share link", err);
  });
}

function setupStudioHandlers() {
  // Avatar live WebP optimization
  document.getElementById("edit-photo-file").addEventListener("change", async function (e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const optimizedWebp = await ImageProcessor.processImage(file, 400, 400, 0.85);
      activeData.profile.photo = optimizedWebp;
      document.getElementById("profile-photo").src = optimizedWebp;
    } catch (err) {
      alert("Error optimizing avatar: " + err.message);
    }
  });

  // Batch Image Optimizer
  document.getElementById("bulk-images-input").addEventListener("change", async function (e) {
    const files = e.target.files;
    if (!files.length) return;
    const statusEl = document.getElementById("bulk-images-status");
    statusEl.innerHTML = `<span class="text-primary">Optimizing ${files.length} images to WebP...</span>`;
    
    const results = await ImageProcessor.processBatch(files, 400, 400);
    const successCount = results.filter(r => r.success).length;
    statusEl.innerHTML = `<span class="text-success fw-semibold">✓ ${successCount}/${files.length} images converted to WebP in-browser.</span>`;
  });

  // Save / Apply Card
  document.getElementById("save-card-btn").addEventListener("click", function () {
    activeData.profile.firstName = document.getElementById("edit-first-name").value.trim();
    activeData.profile.lastName = document.getElementById("edit-last-name").value.trim();
    activeData.profile.role.tr = document.getElementById("edit-role-tr").value.trim();
    activeData.profile.role.en = document.getElementById("edit-role-en").value.trim();
    activeData.profile.location.tr = document.getElementById("edit-location-tr").value.trim();
    activeData.profile.location.en = document.getElementById("edit-location-en").value.trim();

    const bioTr = document.getElementById("edit-bio-tr").value.trim();
    const bioEn = document.getElementById("edit-bio-en").value.trim();
    if (bioTr) translations.tr.accordion__about_bio = bioTr.split("\n\n");
    if (bioEn) translations.en.accordion__about_bio = bioEn.split("\n\n");

    const encoded = CardState.encode(activeData);
    if (encoded) {
      window.location.hash = `data=${encoded}`;
    }

    renderProfileHeader();
    applyLang(currentLang);

    const modal = bootstrap.Modal.getInstance(document.getElementById("studioModal"));
    if (modal) modal.hide();

    copyShareLink();
  });

  // Share Button
  document.getElementById("share-card-btn").addEventListener("click", copyShareLink);

  // JSON Export / Import
  document.getElementById("export-json-btn").addEventListener("click", function () {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeData, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `${activeData.profile.firstName}_card_profile.json`);
    dlAnchor.click();
  });

  document.getElementById("import-json-btn").addEventListener("click", function () {
    document.getElementById("import-json-file").click();
  });

  document.getElementById("import-json-file").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.profile) {
          activeData = imported;
          document.getElementById("team-json-preview").value = JSON.stringify(imported, null, 2);
          renderProfileHeader();
          initStudioForm();
          applyLang(currentLang);
        }
      } catch (err) {
        alert("Invalid JSON profile format");
      }
    };
    reader.readAsText(file);
  });
}

$(document).ready(function () {
  // Decode URL hash state if available
  const decodedState = CardState.decode(window.location.hash);
  if (decodedState && decodedState.profile) {
    activeData = decodedState;
  }

  renderProfileHeader();
  renderProfileLinks();
  initStudioForm();
  setupStudioHandlers();
  applyLang(detectLang());

  $("#lang-toggle").on("click", function () {
    applyLang(nextLang(currentLang));
  });
});


