/* ═══════════════════════════════════════
   DESIGNS DATA
═══════════════════════════════════════ */
const DESIGNS = [
  {
    name: 'Aso-Oke Inspired Drape',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/products/cotton-batik/cotton-batik4.webp',
    story: 'Customized cotton drape inspired by traditional Aso-Oke weaving.'
  },
  {
    name: 'Midnight Sky',
    fabric: 'Batik Cotton',
    fabricKey: 'batik-cotton',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/homepage/midnight_sky_adire.webp',
    story: 'Deep blue-black with scattered resist points that catch the light like stars on a cloudless night in Ile-Ife. The pattern is deliberately sparse — because sometimes what is left undyed says more than what is covered.'
  },
  {
    name: "Oshun's Veil",
    fabric: 'Tissue Chiffon',
    fabricKey: 'tissue-chiffon',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/heritage.webp',
    story: 'A tribute to Oshun — Yoruba goddess of rivers, fertility, and love. This tissue chiffon piece is dyed in warm amber and gold tones that shift as the fabric moves. Still being finished in the studio.'
  },
  {
    name: 'Ile Earth',
    fabric: 'Customized Cotton',
    fabricKey: 'customized-cotton',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/homepage/earth_brown.webp',
    story: 'Ile means "home" in Yoruba. The warm terracotta and brown tones of this cotton piece echo the red earth of Ile-Ife. Wearing it is wearing your roots.'
  },
  {
    name: 'Royal Ocean Silk',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/products/tie-dye/tie-dye3.png',
    story: 'Classic blue & white indigo batik. Elegant and beautifully fluid. The silk takes the dye in a way that creates subtle variations in tone across the fabric, making each piece unique.'
  },
  {
    name: "",
    fabric: 'Batik Cotton',
    fabricKey: 'batik-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156161/adire83_xuwrjv.png',
    story: ''
  },
  {
    name: 'Heritage Weave',
    fabric: 'Tissue Chiffon',
    fabricKey: 'tissue-chiffon',
    collection: 'Collection I',
    status: 'available',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156159/adire85_f6bq6p.png',
    story: 'Our most requested pattern. A dense, interlocking grid of resist lines that references the weave structure of traditional Aso-Oke — reimagined in hand-dyed chiffon.'
  },
  {
    name: 'Labalaba',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection II',
    status: 'coming-soon',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156159/adire84_pc2lhs.png',
    story: 'Labalaba means butterfly in Yoruba. A resist pattern that opens outward from the shoulders toward the hem — a design about transformation. Almost ready.'
  },
  {
    name: 'Grove',
    fabric: 'Customized Cotton',
    fabricKey: 'customized-cotton',
    collection: 'Collection I',
    status: 'available',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776144947/adire23_ohgbqd.webp',
    story: 'The Sacred Grove of Osun in Osogbo is a UNESCO World Heritage Site. This cotton piece captures its green-gold light filtering through ancient trees.'
  },
  {
    name: '',
    fabric: 'Customized Cotton',
    fabricKey: 'customized-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156157/adire72_bgy1ni.png',
    story: 'A passionate throw for elegant evening wear.'
  },
  {
    name: '',
    fabric: 'Batik Cotton',
    fabricKey: 'batik-cotton',
    collection: 'Collection I',
    status: 'available',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156111/adire38_w2q87l.png',
    story: 'One of the oldest named Adire patterns. Dense repeat pattern in navy and white that gets richer with every wash.'
  },
  {
    name: '',
    fabric: 'Tissue Chiffon',
    fabricKey: 'tissue-chiffon',
    collection: 'Collection II',
    status: 'coming-soon',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156137/adire67_i5zmzp.png',
    story: 'Rich, powerful red tones on the finest imported silk.'
  },
  {
    name: 'Agbado Lines',
    fabric: 'Batik Cotton',
    fabricKey: 'batik-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156138/adire69_afrifz.png',
    story: 'High-contrast black and white for maximum visual impact.``'
  },
  {
    name: '',
    fabric: 'Customized Cotton',
    fabricKey: 'customized-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156141/adire71_e4qiwv.png',
    story: 'A warm, glowing fabric inspired by the sands.'
  },
  {
    name: '',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection II',
    status: 'coming-soon',
    image: 'https://res.cloudinary.com/dweacouwm/image/upload/v1776156143/adire74_upjoqr.png',
    story: 'Subtle, dark elegance with beautiful flowing movement'
  }
];

/* ═══════════════════════════════════════
   RENDER
═══════════════════════════════════════ */
const designsMasonry = document.getElementById('designsMasonry');
const designsCountEl = document.getElementById('designsCount');
const designsEmptyEl = document.getElementById('designsEmpty');

function renderDesigns(filter = 'all') {
  if (!designsMasonry) return;

  // Clear existing cards
  designsMasonry.innerHTML = '';

  const filtered = DESIGNS.filter(d => {
    if (filter === 'all')       return true;
    if (filter === d.status)    return true;
    if (filter === d.fabricKey) return true;
    return false;
  });

  designsCountEl.textContent = `${filtered.length} design${filtered.length !== 1 ? 's' : ''}`;
  designsEmptyEl.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach(design => {
    const isComingSoon = design.status === 'coming-soon';

    const card = document.createElement('article');
    card.className = 'design-card'; // NO reveal-up — that's the fix
    card.dataset.status = design.status;
    card.dataset.fabric = design.fabricKey;

    card.innerHTML = `
      <div class="design-img-wrap${isComingSoon ? ' design-img-wrap--blur' : ''}">
        <img src="${design.image}"
             alt="${design.name} — ${design.fabric} Adire by Ronaks"
             loading="lazy">
        <div class="design-img-overlay">
          <span class="design-status ${isComingSoon ? 'design-status--soon' : 'design-status--available'}">
            ${isComingSoon ? 'Coming Soon' : 'Available Now'}
          </span>
        </div>
      </div>
      <div class="design-body">
        <div class="design-meta">
          <span class="design-fabric">${design.fabric}</span>
          <span class="design-season">${design.collection}</span>
        </div>
        <h2 class="design-name">${design.name}</h2>
        <p class="design-story">${design.story}</p>
      </div>
    `;

    designsMasonry.appendChild(card);
  });
}

// Initial render
renderDesigns();

/* ═══════════════════════════════════════
   FILTER
═══════════════════════════════════════ */
const designsFilterBtns = document.querySelectorAll('.designs-filter-btn');

if (designsFilterBtns.length) {
  designsFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      designsFilterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderDesigns(btn.dataset.filter);
    });
  });
}