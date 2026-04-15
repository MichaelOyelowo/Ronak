/* ═══════════════════════════════════════
   DESIGNS FILTER
═══════════════════════════════════════ */
const designsFilterBtns = document.querySelectorAll('.designs-filter-btn');
const designCards       = document.querySelectorAll('.design-card');
const designsCount      = document.getElementById('designsCount');
const designsEmpty      = document.getElementById('designsEmpty');

if (designsFilterBtns.length) {
  designsFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Update active button
      designsFilterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      let visible  = 0;

      designCards.forEach(card => {
        const status = card.dataset.status;  // available | coming-soon
        const fabric = card.dataset.fabric;  // silk-batik | batik-cotton | etc

        const show =
          filter === 'all' ||
          filter === status ||
          filter === fabric;

        if (show) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Update count
      designsCount.textContent = `${visible} design${visible !== 1 ? 's' : ''}`;

      // Show empty state if nothing matches
      designsEmpty.style.display = visible === 0 ? 'block' : 'none';
    });
  });
}