# NachT — Roblox Game Developer Portfolio

A polished, responsive, framework-free portfolio for a Roblox game developer. The site is built with plain HTML, CSS, and JavaScript, so it can be hosted directly on GitHub Pages without Node.js, a database, or a backend.

## Project structure

```text
.
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── projects.js
└── assets/
    ├── avatar/
    │   └── avatar.png          (add your image)
    ├── icons/                  (optional custom icons)
    ├── projects/               (add screenshots and GIFs)
    └── preview.png             (add your social preview image)
```

The site deliberately shows clean, styled placeholders when an avatar or project file has not been added. Missing media will not break the layout or produce JavaScript errors.

## Preview locally

You can double-click `index.html` and open it directly in a browser. The page does not need a build step.

For the most accurate test of JavaScript, relative paths, and media, use the **Live Server** extension in Visual Studio Code:

1. Open this folder in Visual Studio Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

## Edit your personal information

The main editable content lives in these files:

- `index.html` — name, role, hero introduction, About Me, skills, statistics, development process, capabilities, current focus, and SEO metadata.
- `js/main.js` — email, Discord username, GitHub URL, and Roblox URL in the `SITE_CONFIG` object near the top of the file.
- `js/projects.js` — all project names, descriptions, roles, media, systems, technologies, status values, categories, and project links.
- `css/style.css` — colors, spacing, typography, animation, and responsive design.

Search for `EDIT:` in the files to jump directly to the most common customization points.

### Contact details and social links

Open `js/main.js` and edit this object:

```javascript
const SITE_CONFIG = {
    email: "hello@example.com",
    discord: "your_discord",
    githubUrl: "https://github.com/YOUR-USERNAME",
    robloxUrl: "https://www.roblox.com/users/profile?username=ObbyGuy_NcT"
};
```

The values automatically update the hero, contact section, footer, copy buttons, and generated `mailto:` message. Discord uses a copy button rather than a private profile link.

Also update the canonical URL and Open Graph URL placeholders in `index.html` after GitHub Pages gives you the final website address.

## Add your avatar

Export your Roblox avatar as a PNG and place it here:

```text
assets/avatar/avatar.png
```

The recommended format is a transparent or dark-background portrait. A roughly square or portrait image at 600–1000 pixels wide works well. Keep the exact file name or update the avatar path in `index.html`.

## Add project screenshots

1. Copy `.png`, `.jpg`, `.jpeg`, or `.webp` files into `assets/projects/`.
2. Open `js/projects.js`.
3. Update the project `cover.src` or add an entry to its `media` array.
4. Write a useful `alt` description that explains what the image shows.

Example:

```javascript
{
    src: "assets/projects/voting-interface.webp",
    type: "image",
    label: "UI",
    alt: "Map and game mode voting interface"
}
```

Project cards use `object-fit: cover`; the enlarged gallery uses `object-fit: contain`, so images keep their correct proportions.

## Add project GIFs

GIFs are added exactly like normal images. Browsers automatically animate a GIF used in an `<img>` element, including inside the enlarged project gallery.

```javascript
{
    src: "assets/projects/combat-demo.gif",
    type: "gif",
    label: "Combat",
    alt: "Combat system demonstration"
}
```

You can replace an image path with a GIF path without changing the gallery code.

### GIF performance recommendations

- Compress GIF files before uploading.
- Keep demonstrations short and focused.
- Reduce resolution when possible.
- Avoid unnecessarily high frame rates.
- Do not upload huge GIF files; they can make mobile loading slow.
- Use a static cover image for a large project GIF when practical.
- Animated WebP is often much smaller than GIF and also works in this gallery.
- MP4 is usually a better choice for long gameplay footage, though adding video would require a `<video>` enhancement because this version intentionally uses images.
- GitHub Pages has no special issue displaying GIF files.
- Media outside the initial viewport is lazy-loaded automatically.

## Add a new project

Open `js/projects.js`, copy one complete object inside `window.PORTFOLIO_PROJECTS`, paste it after an existing object, and change its values.

Important fields:

- `id` — a unique, lowercase identifier such as `arena-system`.
- `categories` — one or more of `Games`, `Systems`, `UI`, or `Tools` so filtering works.
- `title`, `status`, `role`, `description`, and `longDescription` — visible project information.
- `technologies` and `systems` — editable lists shown on cards and in the modal.
- `cover` — the project card image and first modal image.
- `media` — any mixture of screenshots and animated GIFs.
- `githubUrl` and `robloxUrl` — optional public links.

Leave `githubUrl` or `robloxUrl` as an empty string when no public link is available. The related button will not be rendered.

## Change the accent color

Open `css/style.css` and edit these variables near the top:

```css
:root {
    --accent: #42c8ff;
    --accent-rgb: 66, 200, 255;
    --accent-soft: rgba(66, 200, 255, 0.15);
}
```

Keep `--accent-rgb` synchronized with the red, green, and blue values from `--accent`. This lets the translucent glows and borders match the main color.

## Contact form behavior

GitHub Pages is static, so the contact form validates the required fields and opens the visitor's default email application with a prepared subject and message. It does not submit or store information on a server.

If you later want a hosted form, you can connect the fields to a service such as Formspree. Review that service's privacy, pricing, and spam-protection settings before publishing.

## Accessibility and performance

The site includes:

- semantic landmarks and heading structure;
- a keyboard-accessible mobile menu;
- visible focus indicators and a skip link;
- an accessible project dialog with focus trapping and focus return;
- Escape and outside-click closing for the dialog;
- left and right arrow-key gallery navigation;
- descriptive alt text and missing-media fallbacks;
- form labels, validation messages, and invalid-field focus;
- lazy-loaded project media with fixed aspect ratios;
- reduced motion support via `prefers-reduced-motion`;
- disabled mouse-specific effects on touch devices;
- relative asset paths that work inside a GitHub repository subpath.

## Publish with GitHub Pages

1. Create a GitHub repository and push these files to it.
2. Open the repository on GitHub.
3. Open **Settings**.
4. Select **Pages** in the settings sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch.
7. Select the `/root` folder.
8. Save the settings.
9. Wait for GitHub to generate the website URL.

The entry file must stay named `index.html`. All asset URLs in the site are relative, so the portfolio works at addresses such as:

```text
https://username.github.io/repository-name/
```

After deployment, replace `YOUR-USERNAME` and `YOUR-REPOSITORY` in the canonical and Open Graph URL tags inside `index.html`.

## Use a custom domain

Open the repository's **Settings → Pages** area and enter the domain in **Custom domain**. GitHub will show the DNS records you need to add with your domain provider. Enable **Enforce HTTPS** after the DNS configuration is active.

## Before publishing

- Replace the placeholder email and Discord username.
- Replace the placeholder GitHub URL.
- Add `assets/avatar/avatar.png`.
- Add your real project screenshots and GIFs under `assets/projects/`.
- Add `assets/preview.png` for social link previews.
- Add GitHub and Roblox links to project objects when public URLs are available.
- Update the canonical and Open Graph URLs in `index.html`.
- Test the site on a phone and desktop browser.

