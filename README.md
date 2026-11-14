# Hussainburger Portfolio

A dark, halftone, graphic‑novel style portfolio for **Hussain Rizaan**. Plain HTML/CSS/JS, no build step, works on phones and desktops.

```
index.html   the page (text for hero, skills, about, contact)
style.css    all styling; colours live at the top under :root
script.js    animations, filters, clock, lightbox
works.js     YOUR WORK LIST: edit this to swap in real projects
images/      put your images here
```

## Swapping in your real works

1. Drop your images into the `images/` folder (JPG/PNG/WebP, about 1600px wide is plenty; keep each under ~500 KB so the site loads fast on mobile data).
2. Open `works.js`. Each project is one line:

```js
{ title: "Brand Identity", client: "for Island Café", category: "Graphic Design",
  image: "images/island-cafe.jpg", size: "wide", color: "#ff3b1f",
  desc: "Logo, colour system and packaging.", link: "https://behance.net/..." },
```

- `image`: the path to your file. Leave it `""` and a halftone placeholder shows instead.
- `category`: must be exactly `Graphic Design`, `3D` or `Marketing` so the filter buttons work.
- `size`: `"wide"` (2 columns), `"tall"` (2 rows) or `""` (normal). On desktop the grid has 3 columns: count normal = 1, wide/tall = 2 and try to make the total a multiple of 3 so there are no gaps.
- `link`: optional (Behance, Instagram post, YouTube...). Shows a "View project" link in the popup.
- Add or delete lines freely. The order in the file is the order on the page.

**Your photo:** in `index.html`, find the comment `Swap: replace this div...` in the About section and replace the `portrait-ph` div with
`<img src="images/me.jpg" alt="Hussain Rizaan">`. It's shown in black and white automatically.

**Text:** the About story and the Toolkit list in `index.html` are a first draft in your voice. Read them and change anything that isn't true to you (especially the tools list).

**Colours:** change `--accent` at the top of `style.css` to re‑theme the whole site.

## Putting it on GitHub Pages

1. Go to github.com → **New repository**. For a URL like `https://YOURNAME.github.io`, name the repo exactly `YOURNAME.github.io` (otherwise any name works and the URL becomes `https://YOURNAME.github.io/REPO-NAME`). Make it **Public**.
2. On the new repo page click **uploading an existing file**, then drag in everything from this folder (`index.html`, `style.css`, `script.js`, `works.js`, `images/`, `README.md`). Commit.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
4. Wait a minute or two, then refresh that page. Your live link appears at the top.

To update later: open the repo, click a file (e.g. `works.js`) → pencil icon → edit → Commit. Upload new images with **Add file → Upload files** into `images/`. The site updates by itself in about a minute.

Custom domain (optional, e.g. hussainburger.com): buy the domain, then in Settings → Pages enter it under *Custom domain* and follow GitHub's DNS instructions.
