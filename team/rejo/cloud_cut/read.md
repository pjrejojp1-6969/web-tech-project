# CloudCut

A cloud video editor with a media pool, timeline and color and motion inspector. A dark-mode SaaS template built as a **Single Page Application** with vanilla HTML, CSS and JavaScript. No frameworks and no build step.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All 11 views as `<section class="view">` blocks |
| `style.css` | Theme variables, layouts (Grid and Flexbox) and the workspace panels |
| `script.js` | Router, pricing toggle, checkout flow and workspace interactions |
| `README.md` | This guide |

## Run it

1. Download or clone the folder.
2. Open `index.html` in any modern browser. Double-clicking works.
3. Optional: serve it locally with `python -m http.server 8000` and open `http://localhost:8000`.

An internet connection is needed for FontAwesome, Google Fonts and the Unsplash images.

## How the SPA routing works

Every screen is a `<section id="..." class="view">` inside `index.html`. Only the section with the `active` class is displayed (`.view{display:none}` and `.view.active{display:block}`).

Any element with a `data-go="viewId"` attribute is a link. One delegated click listener in `script.js` reads that attribute and calls `go(viewId)`. That function removes `active` from every view, adds it to the target, updates the URL hash (so Back and Forward work) and scrolls to the top. Forms use `data-next="viewId"` and are routed on submit.

```html
<button data-go="checkout">Continue</button>
<form data-next="success">...</form>
```

**Views:** landing, login, signup, workspace, explore, pricing, checkout, success, profile, settings, export.

## Upgrade flow

1. **Pricing:** the Monthly/Yearly switch updates all prices. A plan button stores the plan and price in `state`, then routes to `checkout`.
2. **Checkout:** the summary reads from `state`. The card number and expiry are auto-formatted and validated by the browser.
3. **Submit:** the form routes to `success`, which shows the chosen plan.

Login and Signup forms route to the workspace. No data is sent anywhere, so this is a front-end template only.

## Customize

- Change `--accent` and `--accent2` at the top of `style.css`, or use the color picker in Settings to preview.
- Add a view: add a `<section id="newview" class="view">` and link to it with `data-go="newview"`.
