(function () {
    "use strict";

    /* ==============================================================
       EDIT YOUR CONTACT DETAILS AND SOCIAL LINKS HERE.
       Keep this as the single source of truth for the whole page.
       ============================================================== */
    const SITE_CONFIG = {
        email: "nacht.contactnow@gmail.com",
        discord: "nachtoo",
        robloxUrl: "https://www.roblox.com/users/profile?username=ObbyGuy_NcT"
    };

    const state = {
        activeProject: null,
        activeMediaIndex: 0,
        lastFocusedElement: null,
        toastTimer: null
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];

    const selectors = {
        header: document.getElementById("site-header"),
        navToggle: document.getElementById("nav-toggle"),
        navMenu: document.getElementById("nav-menu"),
        projectGrid: document.getElementById("projects-grid"),
        projectModal: document.getElementById("project-modal"),
        modalContent: document.getElementById("modal-content"),
        toast: document.getElementById("toast")
    };

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function safeExternalUrl(value) {
        if (!value) return "";
        try {
            const parsed = new URL(value, window.location.href);
            return ["http:", "https:"].includes(parsed.protocol) ? value : "";
        } catch (_error) {
            return "";
        }
    }

    function showToast(message) {
        if (!selectors.toast) return;
        window.clearTimeout(state.toastTimer);
        selectors.toast.textContent = message;
        selectors.toast.classList.add("show");
        state.toastTimer = window.setTimeout(() => selectors.toast.classList.remove("show"), 2400);
    }

    function hideLoader() {
        const loader = document.getElementById("page-loader");
        if (!loader) return;
        const delay = reducedMotion ? 0 : 220;
        window.setTimeout(() => loader.classList.add("is-hidden"), delay);
        window.setTimeout(() => loader.remove(), delay + 500);
    }

    function configureContactLinks() {
        const emailHref = `mailto:${SITE_CONFIG.email}`;
        document.querySelectorAll("[data-email-link]").forEach((link) => link.setAttribute("href", emailHref));
        document.querySelectorAll("[data-email-text]").forEach((element) => { element.textContent = SITE_CONFIG.email; });
        document.querySelectorAll("[data-discord-text]").forEach((element) => { element.textContent = SITE_CONFIG.discord; });

        const externalLinks = [
            ["[data-roblox-link]", SITE_CONFIG.robloxUrl]
        ];

        externalLinks.forEach(([selector, url]) => {
            document.querySelectorAll(selector).forEach((link) => {
                const validUrl = safeExternalUrl(url);
                if (validUrl) link.setAttribute("href", validUrl);
                else {
                    link.removeAttribute("href");
                    link.setAttribute("aria-disabled", "true");
                    link.classList.add("is-disabled");
                }
            });
        });
    }

    async function copyText(value, successMessage) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(value);
            } else {
                const temporaryInput = document.createElement("textarea");
                temporaryInput.value = value;
                temporaryInput.setAttribute("readonly", "");
                temporaryInput.style.position = "fixed";
                temporaryInput.style.opacity = "0";
                document.body.appendChild(temporaryInput);
                temporaryInput.select();
                const copied = document.execCommand("copy");
                temporaryInput.remove();
                if (!copied) throw new Error("Copy was not supported");
            }
            showToast(successMessage);
        } catch (_error) {
            showToast(`Copy failed — use: ${value}`);
        }
    }

    function initializeCopyButtons() {
        document.querySelectorAll("[data-copy]").forEach((button) => {
            button.addEventListener("click", () => {
                const type = button.dataset.copy;
                if (type === "email") copyText(SITE_CONFIG.email, "Email copied");
                if (type === "discord") copyText(SITE_CONFIG.discord, "Discord username copied");
            });
        });
    }

    function openMobileMenu() {
        if (!selectors.navToggle || !selectors.navMenu) return;
        selectors.navToggle.classList.add("is-open");
        selectors.navMenu.classList.add("is-open");
        selectors.navToggle.setAttribute("aria-expanded", "true");
        selectors.navToggle.setAttribute("aria-label", "Close navigation menu");
        document.body.classList.add("menu-open");
    }

    function closeMobileMenu() {
        if (!selectors.navToggle || !selectors.navMenu) return;
        selectors.navToggle.classList.remove("is-open");
        selectors.navMenu.classList.remove("is-open");
        selectors.navToggle.setAttribute("aria-expanded", "false");
        selectors.navToggle.setAttribute("aria-label", "Open navigation menu");
        document.body.classList.remove("menu-open");
    }

    function initializeNavigation() {
        if (selectors.navToggle && selectors.navMenu) {
            selectors.navToggle.addEventListener("click", () => {
                selectors.navMenu.classList.contains("is-open") ? closeMobileMenu() : openMobileMenu();
            });

            selectors.navMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));

            document.addEventListener("click", (event) => {
                if (!selectors.navMenu.classList.contains("is-open")) return;
                if (!selectors.navMenu.contains(event.target) && !selectors.navToggle.contains(event.target)) closeMobileMenu();
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 820) closeMobileMenu();
            });
        }

        const links = [...document.querySelectorAll(".nav__link")];
        const sections = links
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    links.forEach((link) => {
                        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                        link.classList.toggle("active", isActive);
                        if (isActive) link.setAttribute("aria-current", "page");
                        else link.removeAttribute("aria-current");
                    });
                });
            }, { rootMargin: "-36% 0px -58%", threshold: 0 });
            sections.forEach((section) => observer.observe(section));
        }

        const updateHeader = () => selectors.header?.classList.toggle("scrolled", window.scrollY > 24);
        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    function initializePointerGlow() {
        const glow = document.getElementById("pointer-glow");
        if (!glow || reducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
        let frameRequested = false;
        let pointerX = window.innerWidth / 2;
        let pointerY = window.innerHeight / 3;

        window.addEventListener("pointermove", (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (frameRequested) return;
            frameRequested = true;
            window.requestAnimationFrame(() => {
                glow.style.left = `${pointerX}px`;
                glow.style.top = `${pointerY}px`;
                frameRequested = false;
            });
        }, { passive: true });
    }

    function initializeRevealAnimations() {
        const revealItems = document.querySelectorAll(".reveal");
        if (reducedMotion || !("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries, revealObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

        revealItems.forEach((item) => observer.observe(item));
    }

    function mediaFallbackMarkup(label, path) {
        return `<div><strong>${escapeHtml(label || "Media coming soon")}</strong><span>${escapeHtml(path || "Add a file in assets/projects/")}</span></div>`;
    }

    function applyImageFallback(image) {
        if (!image || image.dataset.fallbackReady === "true") return;
        image.dataset.fallbackReady = "true";

        const showFallback = () => {
            image.classList.add("broken-media");
            const container = image.parentElement;
            if (!container || container.querySelector(".media-placeholder")) return;

            if (container.classList.contains("profile-frame__media")) return;

            const fallback = document.createElement("div");
            fallback.className = "media-placeholder";
            fallback.setAttribute("aria-hidden", "true");
            fallback.innerHTML = mediaFallbackMarkup(image.dataset.label, image.getAttribute("src"));
            container.appendChild(fallback);
        };

        image.addEventListener("error", showFallback, { once: true });
        if (image.complete && image.naturalWidth === 0) showFallback();
    }

    function initializeMediaFallbacks(scope = document) {
        scope.querySelectorAll("img").forEach(applyImageFallback);
    }

    function projectLinkMarkup(project) {
        const links = [];
        const githubUrl = safeExternalUrl(project.githubUrl);
        const robloxUrl = safeExternalUrl(project.robloxUrl);
        if (githubUrl) links.push(`<a href="${escapeHtml(githubUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(project.title)} on GitHub">GitHub ↗</a>`);
        if (robloxUrl) links.push(`<a href="${escapeHtml(robloxUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Play ${escapeHtml(project.title)} on Roblox">Roblox ↗</a>`);
        return links.join("");
    }

    function createProjectCard(project, index) {
        const article = document.createElement("article");
        article.className = "project-card reveal is-visible";
        article.dataset.categories = project.categories.join(",");
        const cover = project.cover || {};
        const technologies = (project.technologies || []).slice(0, 4);

        article.innerHTML = `
            <button class="project-card__media" type="button" data-project-id="${escapeHtml(project.id)}" aria-label="View details for ${escapeHtml(project.title)}">
                <img src="${escapeHtml(cover.src)}" alt="${escapeHtml(cover.alt || `${project.title} cover`)}" width="800" height="450" loading="lazy" data-label="${escapeHtml(cover.label || "Project media")}">
                <span class="project-card__overlay" aria-hidden="true">
                    <span class="project-card__index">${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}</span>
                    <span class="project-card__view">↗</span>
                </span>
            </button>
            <div class="project-card__body">
                <div class="project-card__meta"><span>${escapeHtml(project.categories[0])}</span><span class="project-card__status">${escapeHtml(project.status)}</span></div>
                <h3>${escapeHtml(project.title)}</h3>
                <p class="project-card__description">${escapeHtml(project.description)}</p>
                <div class="project-card__tags">${technologies.map((tech) => `<span>${escapeHtml(tech)}</span>`).join("")}</div>
                <div class="project-card__footer">
                    <button class="project-card__detail" type="button" data-project-id="${escapeHtml(project.id)}">View Details <span aria-hidden="true">→</span></button>
                    <div class="project-card__links">${projectLinkMarkup(project)}</div>
                </div>
            </div>`;

        article.querySelectorAll("[data-project-id]").forEach((button) => {
            button.addEventListener("click", () => openProjectModal(project, button));
        });
        initializeMediaFallbacks(article);
        return article;
    }

    function renderProjects(filter = "All") {
        if (!selectors.projectGrid) return;
        selectors.projectGrid.replaceChildren();
        const visibleProjects = filter === "All"
            ? projects
            : projects.filter((project) => project.categories.includes(filter));

        if (!visibleProjects.length) {
            const emptyState = document.createElement("p");
            emptyState.className = "empty-state";
            emptyState.textContent = `No ${filter.toLowerCase()} projects have been added yet.`;
            selectors.projectGrid.appendChild(emptyState);
            return;
        }

        const fragment = document.createDocumentFragment();
        visibleProjects.forEach((project) => fragment.appendChild(createProjectCard(project, projects.indexOf(project))));
        selectors.projectGrid.appendChild(fragment);
    }

    function initializeProjectFilters() {
        document.querySelectorAll("[data-filter]").forEach((button) => {
            button.addEventListener("click", () => {
                document.querySelectorAll("[data-filter]").forEach((filterButton) => {
                    const isActive = filterButton === button;
                    filterButton.classList.toggle("active", isActive);
                    filterButton.setAttribute("aria-pressed", String(isActive));
                });
                renderProjects(button.dataset.filter);
            });
        });
    }

    function getActiveProjectMedia() {
        if (!state.activeProject) return [];
        return [state.activeProject.cover, ...(state.activeProject.media || [])].filter((item) => item?.src);
    }

    function updateModalMedia(nextIndex) {
        const media = getActiveProjectMedia();
        if (!media.length || !selectors.modalContent) return;
        state.activeMediaIndex = (nextIndex + media.length) % media.length;
        const activeMedia = media[state.activeMediaIndex];
        const image = selectors.modalContent.querySelector(".modal-gallery__media");
        const label = selectors.modalContent.querySelector(".modal-gallery__label");
        const count = selectors.modalContent.querySelector(".modal-gallery__count");

        if (image) {
            image.classList.remove("broken-media");
            image.parentElement?.querySelector(".media-placeholder")?.remove();
            image.dataset.fallbackReady = "false";
            image.dataset.label = activeMedia.label || "Project media";
            image.src = activeMedia.src;
            image.alt = activeMedia.alt || `${state.activeProject.title} project media`;
            applyImageFallback(image);
        }
        if (label) label.textContent = activeMedia.label || "Project media";
        if (count) count.textContent = `${state.activeMediaIndex + 1} / ${media.length}`;
        selectors.modalContent.querySelectorAll(".modal-thumb").forEach((thumb, index) => {
            const isActive = index === state.activeMediaIndex;
            thumb.classList.toggle("active", isActive);
            thumb.setAttribute("aria-current", String(isActive));
        });
    }

    function modalLinksMarkup(project) {
        const githubUrl = safeExternalUrl(project.githubUrl);
        const robloxUrl = safeExternalUrl(project.robloxUrl);
        if (!githubUrl && !robloxUrl) return "";
        return `<div class="modal-details__links">
            ${githubUrl ? `<a href="${escapeHtml(githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ""}
            ${robloxUrl ? `<a href="${escapeHtml(robloxUrl)}" target="_blank" rel="noopener noreferrer">Play on Roblox ↗</a>` : ""}
        </div>`;
    }

    function buildModalContent(project) {
        const media = [project.cover, ...(project.media || [])].filter((item) => item?.src);
        const firstMedia = media[0] || { src: "", alt: `${project.title} media`, label: "Media coming soon" };

        return `
            <div class="modal-gallery">
                <img class="modal-gallery__media" src="${escapeHtml(firstMedia.src)}" alt="${escapeHtml(firstMedia.alt)}" width="1200" height="650" data-label="${escapeHtml(firstMedia.label)}">
                <span class="modal-gallery__label">${escapeHtml(firstMedia.label)}</span>
                ${media.length > 1 ? `<div class="modal-gallery__controls">
                    <button type="button" data-gallery-prev aria-label="Previous project image">←</button>
                    <span class="modal-gallery__count" aria-live="polite">1 / ${media.length}</span>
                    <button type="button" data-gallery-next aria-label="Next project image">→</button>
                </div>` : `<span class="modal-gallery__count" hidden>1 / 1</span>`}
            </div>
            ${media.length > 1 ? `<div class="modal-thumbs" aria-label="Project media thumbnails">
                ${media.map((item, index) => `<button class="modal-thumb${index === 0 ? " active" : ""}" type="button" data-media-index="${index}" aria-label="Show ${escapeHtml(item.label || `media ${index + 1}`)}" aria-current="${index === 0}"><img src="${escapeHtml(item.src)}" alt="" width="160" height="100" loading="lazy" data-label="${escapeHtml(item.label)}"></button>`).join("")}
            </div>` : ""}
            <div class="modal-details">
                <div class="modal-details__head">
                    <div><p class="modal-details__kicker">${escapeHtml(project.categories.join(" / "))} · ${escapeHtml(project.status)}</p><h2 id="modal-title">${escapeHtml(project.title)}</h2></div>
                    ${modalLinksMarkup(project)}
                </div>
                <p class="modal-details__description">${escapeHtml(project.longDescription || project.description)}</p>
                <div class="modal-details__grid">
                    <div class="modal-info"><h3>My Role</h3><p>${escapeHtml(project.role)}</p><h3>Status</h3><p>${escapeHtml(project.status)}</p></div>
                    <div class="modal-info"><h3>Technologies</h3><ul class="modal-list">${project.technologies.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3 style="margin-top:20px">Systems Created</h3><ul class="modal-list">${project.systems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
                </div>
            </div>`;
    }

    function openProjectModal(project, trigger) {
        if (!selectors.projectModal || !selectors.modalContent) return;
        state.activeProject = project;
        state.activeMediaIndex = 0;
        state.lastFocusedElement = trigger;
        selectors.modalContent.innerHTML = buildModalContent(project);
        selectors.projectModal.hidden = false;
        document.body.classList.add("modal-open");
        initializeMediaFallbacks(selectors.modalContent);

        selectors.modalContent.querySelector("[data-gallery-prev]")?.addEventListener("click", () => updateModalMedia(state.activeMediaIndex - 1));
        selectors.modalContent.querySelector("[data-gallery-next]")?.addEventListener("click", () => updateModalMedia(state.activeMediaIndex + 1));
        selectors.modalContent.querySelectorAll("[data-media-index]").forEach((button) => button.addEventListener("click", () => updateModalMedia(Number(button.dataset.mediaIndex))));

        window.requestAnimationFrame(() => selectors.projectModal.querySelector(".project-modal__close")?.focus());
    }

    function closeProjectModal() {
        if (!selectors.projectModal || selectors.projectModal.hidden) return;
        selectors.projectModal.hidden = true;
        document.body.classList.remove("modal-open");
        selectors.modalContent?.replaceChildren();
        if (state.lastFocusedElement instanceof HTMLElement) state.lastFocusedElement.focus();
        state.activeProject = null;
    }

    function trapModalFocus(event) {
        if (!selectors.projectModal || selectors.projectModal.hidden || event.key !== "Tab") return;
        const focusable = [...selectors.projectModal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
            .filter((element) => element.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function initializeModal() {
        if (!selectors.projectModal) return;
        selectors.projectModal.querySelectorAll("[data-modal-close]").forEach((element) => element.addEventListener("click", closeProjectModal));
        document.addEventListener("keydown", (event) => {
            if (selectors.projectModal.hidden) return;
            if (event.key === "Escape") closeProjectModal();
            if (event.key === "ArrowLeft") updateModalMedia(state.activeMediaIndex - 1);
            if (event.key === "ArrowRight") updateModalMedia(state.activeMediaIndex + 1);
            trapModalFocus(event);
        });
    }

    function validateField(field) {
        const wrapper = field.closest(".field");
        const error = wrapper?.querySelector(".field__error");
        let message = "";
        if (!field.value.trim()) message = "This field is required.";
        else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) message = "Enter a valid email address.";

        wrapper?.classList.toggle("has-error", Boolean(message));
        field.setAttribute("aria-invalid", String(Boolean(message)));
        if (error) {
            error.textContent = message;
            if (message) field.setAttribute("aria-describedby", error.id);
            else field.removeAttribute("aria-describedby");
        }
        return !message;
    }

    function initializeContactForm() {
        const form = document.getElementById("contact-form");
        if (!form) return;
        const fields = [...form.querySelectorAll("input[required], textarea[required]")];
        fields.forEach((field) => {
            field.addEventListener("blur", () => validateField(field));
            field.addEventListener("input", () => {
                if (field.getAttribute("aria-invalid") === "true") validateField(field);
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const results = fields.map(validateField);
            if (results.includes(false)) {
                fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
                showToast("Please complete the required fields");
                return;
            }

            const data = new FormData(form);
            const subject = data.get("subject");
            const body = `Hello NachT,\n\n${data.get("message")}\n\nFrom: ${data.get("name")}\nReply to: ${data.get("email")}`;
            window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            showToast("Opening your email app");
        });
    }

    function initializePage() {
        hideLoader();
        configureContactLinks();
        initializeCopyButtons();
        initializeNavigation();
        initializePointerGlow();
        renderProjects();
        initializeProjectFilters();
        initializeModal();
        initializeContactForm();
        initializeMediaFallbacks();
        initializeRevealAnimations();

        const year = document.getElementById("current-year");
        if (year) year.textContent = new Date().getFullYear();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializePage, { once: true });
    else initializePage();
})();
