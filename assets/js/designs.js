/* ═══════════════════════════════════════
   DESIGNS DATA
   To add a design: add an object to this array
   To move to shop: remove it from here, add to shop
   Max recommended: 15
═══════════════════════════════════════ */
const DESIGNS = [
  {
    name: 'Olokun Rising',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/homepage/indigo.webp',
    story: 'Named after the Yoruba deity of the deep sea, this pattern mirrors the movement of water — unpredictable, fluid, and endlessly deep. The indigo wash deepens from the centre outward, as if the dye itself is breathing.'
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
    story: 'Ile means "home" in Yoruba. The warm terracotta and brown tones of this cotton piece echo the red earth of Ile-Ife — the city that Yoruba tradition holds as the origin of all human life. Wearing it is wearing your roots.'
  },
  {
    name: 'Ibadandun',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/homepage/new-arrival.jpg',
    story: 'The name translates as "Ibadan is sweet." Interlocking circles in deep indigo on ivory silk, each ring connected to the next without beginning or end. A pattern about belonging.'
  },
  {
    name: "Sango's Mark",
    fabric: 'Batik Cotton',
    fabricKey: 'batik-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/artcraft.jpg',
    story: 'Bold diagonal lightning patterns in deep crimson and black — inspired by Sango, the Yoruba deity of thunder and power. This is not a subtle piece. It is for the person who enters a room and changes it. Currently in the vat.'
  },
  {
    name: 'Heritage Weave',
    fabric: 'Tissue Chiffon',
    fabricKey: 'tissue-chiffon',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/homepage/heritage.webp',
    story: 'Our most requested pattern. A dense, interlocking grid of resist lines that references the weave structure of traditional Aso-Oke — reimagined in hand-dyed chiffon. Lightweight, breathable, and impossible to ignore.'
  },
  {
    name: 'Labalaba',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/indigo.webp',
    story: 'Labalaba means butterfly in Yoruba. This silk piece features a resist pattern that opens outward from the shoulders toward the hem — a design about transformation. Almost ready.'
  },
  {
    name: 'Osun Grove',
    fabric: 'Customized Cotton',
    fabricKey: 'customized-cotton',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/homepage/earth_brown.webp',
    story: 'The Sacred Grove of Osun in Osogbo is a UNESCO World Heritage Site. This cotton piece captures its green-gold light filtering through ancient trees — resist-dyed in layers that mimic the forest canopy.'
  },
  {
    name: 'Egungun',
    fabric: 'Customized Cotton',
    fabricKey: 'customized-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/new-arrival.jpg',
    story: 'Inspired by the Egungun masquerade — the Yoruba ancestral festival of colour, spirit, and memory. Fragmented resist blocks in contrasting tones that reference the layered costume of the masquerade. Still in development.'
  },
  {
    name: 'Igora',
    fabric: 'Batik Cotton',
    fabricKey: 'batik-cotton',
    collection: 'Collection I',
    status: 'available',
    image: './assets/images/homepage/midnight_sky_adire.webp',
    story: 'One of the oldest named Adire patterns. Igora references the traditional Yoruba market — a place of movement, exchange, and colour. Dense repeat pattern in navy and white that gets richer with every wash.'
  },
  {
    name: 'Ara Orun',
    fabric: 'Tissue Chiffon',
    fabricKey: 'tissue-chiffon',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/heritage.webp',
    story: 'Ara Orun means "citizen of heaven" in Yoruba. Soft white-on-white resist patterns that are almost invisible until the fabric moves in light. A deeply reverential piece still being carefully finished.'
  },
  {
    name: 'Agbado Lines',
    fabric: 'Batik Cotton',
    fabricKey: 'batik-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/artcraft.jpg',
    story: 'Inspired by rows of corn — agbado in Yoruba — this geometric pattern uses vertical resist lines of varying widths to create a rhythm across the cotton. Simple, structural, and deeply satisfying up close.'
  },
  {
    name: 'Ife Red',
    fabric: 'Customized Cotton',
    fabricKey: 'customized-cotton',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/earth_brown.webp',
    story: 'The red laterite soil of Ile-Ife has a colour unlike anywhere else in Nigeria. This cotton piece replicates that exact warmth using a combination of natural dyes layered over three days. Raw, earthy, unmistakably from the source.'
  },
  {
    name: 'Obatala White',
    fabric: 'Silk Batik',
    fabricKey: 'silk-batik',
    collection: 'Collection II',
    status: 'coming-soon',
    image: './assets/images/homepage/indigo.webp',
    story: 'Obatala is the Yoruba deity of creation, purity, and white cloth. This silk piece breaks from our indigo tradition entirely — undyed white silk with cassava resist patterns that create texture without colour. A statement of restraint.'
  }
];

/* ═══════════════════════════════════════
   RENDER FUNCTION
═══════════════════════════════════════ */
const designsMasonry = document.getElementById('designsMasonry');
const designsCountEl = document.getElementById('designsCount');
const designsEmptyEl = document.getElementById('designsEmpty');

function renderDesigns(filter = 'all') {
  if (!designsMasonry) return;

  designsMasonry.innerHTML = '';

  const filtered = DESIGNS.filter(d => {
    if (filter === 'all') return true;
    if (filter === d.status) return true;
    if (filter === d.fabricKey) return true;
    return false;
  });

  // Update count
  designsCountEl.textContent = `${filtered.length} design${filtered.length !== 1 ? 's' : ''}`;

  // Show/hide empty state
  designsEmptyEl.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach((design, i) => {
    const isComingSoon = design.status === 'coming-soon';

    // Stagger delay classes
    const delays = ['', 'delay-100', 'delay-200'];
    const delay  = delays[i % 3];

    const card = document.createElement('article');
    card.className = `design-card reveal-up ${delay}`;
    card.dataset.status = design.status;
    card.dataset.fabric = design.fabricKey;

    card.innerHTML = `
      <div class="design-img-wrap ${isComingSoon ? 'design-img-wrap--blur' : ''}">
        <img src="${design.image}"
             alt="${design.name} — ${design.fabric} Adire design by Ronaks${isComingSoon ? ' — Coming Soon' : ''}"
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