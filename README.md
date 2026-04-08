# Albanian Trailblazers — Website

Official website for **Albanian Trailblazers**, a free, youth-led mentorship NGO connecting Albanian students with professionals globally. Hosted on GitHub Pages.

---

## Tech Stack

Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies.

---

## Pages

| File | Description |
|---|---|
| `index.html` | Landing page |
| `about.html` | Team page |
| `mentors.html` | Mentor directory |
| `apply-mentee.html` | Apply to be a mentee |
| `apply-mentor.html` | Apply to be a mentor |
| `jobs.html` | Open volunteer positions |
| `workshops.html` | Past workshops & events |
| `magazine.html` | The Albanian Trailblazer magazine |
| `podcast.html` | The AT Podcast episodes |
| `support.html` | Support / donate page |
| `qemal.html` | Qemal project (coming soon) |
| `porta.html` | PORTA project (coming soon) |
| `opportunities.html` | Opportunities database (coming soon) |

---

## File Structure

```
albaniantrailblazers.com/
│
├── pages
│   ├── index.html                          Landing page
│   ├── about.html                          Team
│   ├── mentors.html                        Mentor directory
│   ├── workshops.html                      Workshops & events
│   ├── magazine.html                       The Albanian Trailblazer magazine
│   ├── podcast.html                        The AT Podcast
│   ├── apply-mentee.html                   Apply to be a mentee
│   ├── apply-mentor.html                   Apply to be a mentor
│   ├── jobs.html                           Open volunteer positions
│   ├── support.html                        Support & donate
│   ├── qemal.html                          Qemal AI project (coming soon)
│   ├── porta.html                          PORTA project (coming soon)
│   └── opportunities.html                  Opportunities database (coming soon)
│
├── css/
│   ├── styles.css                          Global design system & shared components
│   ├── apply.css                           Shared styles for both apply pages
│   ├── coming-soon.css                     Shared styles for in-development pages
│   └── [page].css                          Page-specific stylesheets
│
├── js/
│   └── main.js                             Scroll, mobile nav, IntersectionObserver
│
└── assets/
    ├── images/
    │   ├── team/                           Team member photos
    │   ├── mentors/                        Mentor profile photos
    │   └── events/                         Event & section photography
    ├── workshops/                          Workshop event photos
    ├── icons/                              SVG social icons
    └── the-albanian-trailblazer/
        ├── cover/                          Magazine cover images
        └── *.pdf                           Magazine issue PDFs
```

---

## Design System

| Token | Value |
|---|---|
| Background (dark) | `#15130E` |
| Background (light) | `#F7F3EC` |
| Accent red | `#E05535` |
| Heading font | Space Grotesk |
| Body font | Inter |

Breakpoints: `768px` (tablet), `1200px` (desktop).

---

## Running Locally

No build step needed. Open any `.html` file directly in a browser, or serve the folder with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

---

## Deployment

Deployed via **GitHub Pages** from the `main` branch root.
