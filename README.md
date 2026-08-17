# Ronaks Adire

A static storefront and brand website for Ronaks Adire, showcasing handcrafted Nigerian Adire fabrics and custom design services from Ile-Ife, Osun State.

## Project overview

This project is a front-end-only website built with plain HTML, CSS, and JavaScript. It includes:

- Home page
- About page
- Shop page with category filtering
- Wishlist flow
- Training / quiz page
- Designs gallery page
- Policy pages (privacy, returns, terms)
- WhatsApp ordering integration

## Local run

Because this is a static site, you can preview it with any local web server.

### Option 1: Python

```bash
cd "c:\Users\micha\OneDrive\Documents\Ronak Adire"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2: VS Code Live Server / similar

- Open the project folder in VS Code
- Right-click on `index.html`
- Choose "Open with Live Server"

## Deployment

This site is ready for static hosting on Vercel.

### Recommended Vercel setup

1. Push the repo to GitHub.
2. Import the repository into Vercel.
3. Set the framework preset to "Other" or "Static Site".
4. Use the project root as the root directory.
5. No build command is required for this static project.
6. Set the output directory to the project root if Vercel asks for one.

### Domain setup

After deployment:

- Add your custom domain in Vercel
- Configure DNS according to Vercel instructions
- Verify apex and www domain if needed
- Update canonical URLs if the production domain changes

## Important production notes

Before pushing live, confirm these items:

- Domain is configured in Vercel
- Social and SEO metadata match your final domain
- All links and images are valid on the live site
- `robots.txt` and sitemap are present after deployment
- WhatsApp number and contact info are correct
- All pages are using relative asset paths correctly

## File structure

```text
Ronak Adire/
├── index.html
├── about-us.html
├── shop.html
├── training.html
├── designs.html
├── wishlist.html
├── privacy.html
├── returns.html
├── terms.html
├── robots.txt
├── .gitignore
├── README.md
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
└── site.webmanifest
```

## Notes for future improvements

This project is solid for a static business site, but if you want to make it production-grade later, consider:

- adding a real `sitemap.xml`
- generating a proper favicon set for multiple sizes
- compressing large image assets
- adding analytics (Google Analytics or Plausible)
- converting repeated data into a structured JSON file for easier maintenance
- setting up a CMS or product management workflow if inventory grows

## Contact

Business: Ronaks Adire
Location: Ile-Ife, Osun State, Nigeria
Email: info@ronaksadire.com
Phone: +2347068394191

## License

This project is for the Ronaks Adire website and is not currently configured with a public open-source license.
