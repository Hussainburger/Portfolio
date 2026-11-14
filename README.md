# Hussainburger Portfolio

A dark, clean portfolio with a light halftone touch for **Hussain Rizaan**. Plain HTML/CSS/JS, no build step, works on phones and desktops.

```
index.html   the page (text for hero, skills, about, contact)
style.css    all styling; colours live at the top under :root
script.js    animations, menu, clock, work viewer
works.js     YOUR WORK LIST: edit this to swap in real projects
images/      put your images here
```

## Swapping in your real works

1. Drop your images into the `images/` folder (JPG/PNG/WebP, about 1600px wide is plenty; keep each under ~500 KB so the site loads fast on mobile data).
2. Open `works.js`. Each project is one line:

```js
{ title: "Island Café", type: "Brand Identity", image: "images/island-cafe.jpg",
  size: "lg", color: "#ff6b3d", desc: "Logo, colours and packaging.", link: "https://behance.net/..." },
```

- `image`: the path to your file. Leave it `""` and a placeholder shows instead.
- `type`: the small label on the right of each card.
- `size`: `"lg"`, `"md"` or `"sm"`. On desktop the grid is 12 columns wide (lg = 8, md = 6, sm = 4), so build rows that add up to 12: `lg + sm`, `md + md` or `sm + sm + sm`. On phones every card is full width, so sizes only matter on desktop.
- `link`: optional (Behance, Instagram post, YouTube...). Shows a "View project" link when the card is clicked.
- Add or delete lines freely. The order in the file is the order on the page.

**Your photo:** in `index.html`, find the comment `SWAP:` in the About section and replace the `about__ph` line with
`<img src="images/me.jpg" alt="Hussain Rizaan">`.

**Text:** the bio, stats and tools are in the About section of `index.html`.

**Colours:** change `--accent` at the top of `style.css` to re‑theme the whole site.

## Putting it on GitHub Pages

**Already live?** If your site is already on GitHub (like hussainburger.github.io), just upload the new files over the old ones: in the repo click **Add file → Upload files**, drag everything in, and commit. Old files with the same names get replaced.

1. Go to github.com → **New repository**. For a URL like `https://YOURNAME.github.io`, name the repo exactly `YOURNAME.github.io` (otherwise any name works and the URL becomes `https://YOURNAME.github.io/REPO-NAME`). Make it **Public**.
2. On the new repo page click **uploading an existing file**, then drag in everything from this folder (`index.html`, `style.css`, `script.js`, `works.js`, `images/`, `README.md`). Commit.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait a minute or two, then refresh that page. Your live link appears at the top.

To update later: open the repo, click a file (e.g. `works.js`) → pencil icon → edit → Commit. Upload new images with **Add file → Upload files** into `images/`. The site updates by itself in about a minute.

Custom domain (optional, e.g. hussainburger.com): buy the domain, then in Settings → Pages enter it under *Custom domain* and follow GitHub's DNS instructions.
