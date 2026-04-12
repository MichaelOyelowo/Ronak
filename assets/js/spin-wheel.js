(function () {

    // ═══════════════════════════════════════
    // CONFIG
    // ═══════════════════════════════════════
    const WA_NUMBER     = '2349029702549';
    const STORAGE_KEY   = 'ronaks_spin';
    const TRIGGER_DELAY = 3000; // 30 seconds

    // ── Wheel segments ──
    // Alternating dark/light for visual contrast
    // win: false = big prizes user can never land on (rigged away)
    // win: true  = real prizes user can actually win
    const SEGMENTS = [
        { label: 'Free\nDelivery',  color: '#182655', text: '#fff',    win: true,  reward: 'free-delivery' },
        { label: '50%\nOff',        color: '#e8e6e1', text: '#182655', win: false, reward: null            },
        { label: '₦2,000\nOff',     color: '#253A82', text: '#fff',    win: true,  reward: 'n2000-off'     },
        { label: 'Free\nItem',      color: '#e8e6e1', text: '#182655', win: false, reward: null            },
        { label: '5%\nDiscount',    color: '#182655', text: '#fff',    win: true,  reward: '5-percent'     },
        { label: 'VIP\nAccess',     color: '#e8e6e1', text: '#182655', win: false, reward: null            },
        { label: 'Free\nDelivery',  color: '#253A82', text: '#fff',    win: true,  reward: 'free-delivery' },
        { label: '₦2,000\nOff',     color: '#e8e6e1', text: '#182655', win: true,  reward: 'n2000-off'     },
    ];

    // ── Reward details ──
    const REWARDS = {
        'free-delivery': {
            icon:  '🚚',
            title: 'Free Delivery Won!',
            sub:   'Your next Ronaks order ships <strong>completely free</strong> — no minimum spend needed.',
            wa:    `Hello Ronaks! I just won *Free Delivery* on your spin wheel 🎉. Please apply my free delivery reward to my next order. Thank you!`
        },
        'n2000-off': {
            icon:  '🎁',
            title: '₦2,000 Off Won!',
            sub:   'Get <strong>₦2,000 off</strong> any order above ₦30,000. Claim it on WhatsApp now!',
            wa:    `Hello Ronaks! I just won *₦2,000 Off* on your spin wheel 🎉. Please apply my discount to my next order above ₦30,000. Thank you!`
        },
        '5-percent': {
            icon:  '✨',
            title: '5% Discount Won!',
            sub:   'Enjoy <strong>5% off</strong> your entire next Ronaks order — on any product!',
            wa:    `Hello Ronaks! I just won a *5% Discount* on your spin wheel 🎉. Please apply my discount to my next order. Thank you!`
        }
    };

    // ═══════════════════════════════════════
    // STORAGE — once per day
    // ═══════════════════════════════════════
    function getSpinData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : { date: null, spins: 0 };
        } catch (e) {
            return { date: null, spins: 0 };
        }
    }

    function saveSpinData(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {}
    }

    function canShowToday() {
        const data  = getSpinData();
        const today = new Date().toDateString();
        // Reset if it is a new day
        if (data.date !== today) return true;
        // Already used both spins today
        return data.spins < 2;
    }

    function recordSpin() {
        const data  = getSpinData();
        const today = new Date().toDateString();
        if (data.date !== today) {
            saveSpinData({ date: today, spins: 1 });
        } else {
            saveSpinData({ date: today, spins: data.spins + 1 });
        }
    }

    function getSpinsUsedToday() {
        const data  = getSpinData();
        const today = new Date().toDateString();
        return data.date === today ? data.spins : 0;
    }

    // ═══════════════════════════════════════
    // BUILD THE HTML
    // ═══════════════════════════════════════
    function buildHTML() {
        const savedName = (() => {
            try { return localStorage.getItem('ronaks_user_name') || ''; } catch(e) { return ''; }
        })();

        const greeting = savedName ? `, <strong>${savedName}</strong>` : '';

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="spin-backdrop" id="spinBackdrop" aria-hidden="true"></div>
            <div class="spin-modal" id="spinModal" role="dialog" aria-modal="true" aria-label="Spin and win a reward">
                <canvas class="spin-confetti" id="spinConfetti" aria-hidden="true"></canvas>

                <div class="spin-header">
                    <div>
                        <p class="spin-eyebrow">Exclusive for you</p>
                        <h2 class="spin-title">Spin &amp; Win!</h2>
                    </div>
                    <button class="spin-close-btn" id="spinCloseBtn" aria-label="Close spin wheel">✕</button>
                </div>

                <div class="spin-body">
                    <p class="spin-sub" id="spinSub">
                        Try your luck today${greeting} — <strong>real rewards</strong> up for grabs!
                    </p>

                    <div class="spin-wheel-wrap">
                        <div class="spin-pointer" aria-hidden="true"></div>
                        <canvas id="wheelCanvas" width="260" height="260"></canvas>
                        <div class="spin-center" aria-hidden="true">
                            <div class="spin-center-dot"></div>
                        </div>
                    </div>

                    <div class="spin-result" id="spinResult" aria-live="polite" aria-atomic="true">
                        <span class="spin-result-icon" id="spinResultIcon" aria-hidden="true"></span>
                        <p class="spin-result-title" id="spinResultTitle"></p>
                        <p class="spin-result-sub"   id="spinResultSub"></p>
                        <button class="spin-claim-btn" id="spinClaimBtn" hidden>
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.526 5.856L0 24l6.343-1.497A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.727.979.995-3.638-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                            </svg>
                            Claim on WhatsApp
                        </button>
                    </div>

                    <button class="spin-action-btn" id="spinActionBtn">
                        Spin the Wheel
                    </button>

                    <p class="spin-attempts-text" id="spinAttemptsText">
                        You have <strong>2 spins</strong> today
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(wrapper.children[0]); // backdrop
        document.body.appendChild(wrapper.children[0]); // modal
    }

    // ═══════════════════════════════════════
    // DRAW WHEEL
    // ═══════════════════════════════════════
    function initWheel() {
        const canvas  = document.getElementById('wheelCanvas');
        const ctx     = canvas.getContext('2d');
        const NUM     = SEGMENTS.length;
        const ARC     = (2 * Math.PI) / NUM;
        let   angle   = 0;
        let   spinning = false;
        let   spinsToday = getSpinsUsedToday();

        // Refs
        const spinSub       = document.getElementById('spinSub');
        const spinResult    = document.getElementById('spinResult');
        const resultIcon    = document.getElementById('spinResultIcon');
        const resultTitle   = document.getElementById('spinResultTitle');
        const resultSub     = document.getElementById('spinResultSub');
        const claimBtn      = document.getElementById('spinClaimBtn');
        const actionBtn     = document.getElementById('spinActionBtn');
        const attemptsText  = document.getElementById('spinAttemptsText');

        // Update attempts text
        const remaining = 2 - spinsToday;
        attemptsText.innerHTML = `You have <strong>${remaining} spin${remaining !== 1 ? 's' : ''}</strong> today`;
        if (remaining === 0) {
            actionBtn.disabled = true;
            attemptsText.textContent = 'Come back tomorrow for more spins!';
        }

        // ── Draw ──
        function draw(a) {
            const cx = canvas.width  / 2;
            const cy = canvas.height / 2;
            const r  = cx - 4;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            SEGMENTS.forEach((seg, i) => {
                const start = a + i * ARC;
                const end   = start + ARC;

                // Slice fill
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, r, start, end);
                ctx.closePath();
                ctx.fillStyle = seg.color;
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Label text
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(start + ARC / 2);
                ctx.textAlign = 'right';
                ctx.fillStyle = seg.text;
                ctx.font = 'bold 11px Manrope, sans-serif';
                const lines = seg.label.split('\n');
                lines.forEach((line, li) => {
                    ctx.fillText(line, r - 10, (li - (lines.length - 1) / 2) * 15);
                });
                ctx.restore();
            });

            // Outer ring
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            ctx.strokeStyle = '#182655';
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        draw(angle);

        // ── Animate spin to a target angle ──
        function spinTo(targetAngle, duration, onDone) {
            const start      = performance.now();
            const startAngle = angle;
            const delta      = targetAngle - startAngle;

            function frame(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Quartic ease-out — spins fast then slows dramatically
                const eased    = 1 - Math.pow(1 - progress, 4);
                angle          = startAngle + delta * eased;
                draw(angle);

                if (progress < 1) {
                    requestAnimationFrame(frame);
                } else {
                    angle = targetAngle;
                    draw(angle);
                    onDone();
                }
            }
            requestAnimationFrame(frame);
        }

        // ── Spin button click ──
        actionBtn.addEventListener('click', () => {
            if (spinning || actionBtn.disabled) return;
            spinning = true;
            actionBtn.disabled = true;

            // Hide previous result
            spinResult.style.display = 'none';
            claimBtn.hidden = true;

            // Record this spin
            recordSpin();
            spinsToday++;

            const fullRotations = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;

            if (spinsToday === 1) {
                // ── RIGGED FIRST SPIN ──
                // Target segment index 1 (50% Off — win: false)
                // Stop JUST before the Free Delivery segment
                // so it looks tantalisingly close to a big win
                const targetIdx   = 1;
                const segCenter   = (Math.PI / 2) + targetIdx * ARC + ARC / 2;
                const riggedStop  = angle + fullRotations + segCenter - (angle % (2 * Math.PI)) + 0.2;

                spinTo(riggedStop, 4500, () => {
                    spinning = false;

                    attemptsText.innerHTML = 'You have <strong>1 spin</strong> left — try again!';

                    resultIcon.textContent  = '😮';
                    resultTitle.textContent = 'So close!';
                    resultSub.innerHTML     = 'You just missed it! You have <strong>1 more spin</strong> — give it another go! 🔥';
                    spinResult.style.display = 'flex';

                    actionBtn.textContent   = 'Try Again!';
                    actionBtn.disabled      = false;
                    spinSub.innerHTML       = `One more spin — <strong>you almost had it!</strong> 🔥`;
                });

            } else {
                // ── GUARANTEED WIN ON SECOND SPIN ──
                // Pick randomly from real win segments (index 0, 2, 4)
                const winOptions  = [0, 2, 4];
                const winIdx      = winOptions[Math.floor(Math.random() * winOptions.length)];
                const segCenter   = (Math.PI / 2) + winIdx * ARC + ARC / 2;
                const winStop     = angle + fullRotations + segCenter - (angle % (2 * Math.PI));

                spinTo(winStop, 5000, () => {
                    spinning = false;
                    actionBtn.disabled  = true;
                    attemptsText.textContent = 'Come back tomorrow for more spins!';

                    const reward = REWARDS[SEGMENTS[winIdx].reward];
                    resultIcon.textContent   = reward.icon;
                    resultTitle.textContent  = reward.title;
                    resultSub.innerHTML      = reward.sub;
                    spinResult.style.display = 'flex';
                    spinSub.innerHTML        = '🎊 Congratulations — you won a reward!';

                    claimBtn.hidden = false;
                    claimBtn.onclick = () => {
                        const msg = encodeURIComponent(reward.wa);
                        window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
                    };

                    // Launch confetti
                    launchConfetti();
                });
            }
        });

        // Close on backdrop click
        document.getElementById('spinBackdrop').addEventListener('click', closeModal);
        document.getElementById('spinCloseBtn').addEventListener('click', closeModal);

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // ═══════════════════════════════════════
    // OPEN / CLOSE
    // ═══════════════════════════════════════
    function openModal() {
        const backdrop = document.getElementById('spinBackdrop');
        const modal    = document.getElementById('spinModal');
        if (!backdrop || !modal) return;

        backdrop.classList.add('spin-backdrop--visible');
        modal.classList.add('spin-modal--visible');
        document.body.style.overflow = 'hidden';

        // Focus the modal for accessibility
        modal.focus();
    }

    function closeModal() {
        const backdrop = document.getElementById('spinBackdrop');
        const modal    = document.getElementById('spinModal');
        if (!backdrop || !modal) return;

        backdrop.classList.remove('spin-backdrop--visible');
        modal.classList.remove('spin-modal--visible');
        document.body.style.overflow = '';
    }

    // ═══════════════════════════════════════
    // CONFETTI
    // ═══════════════════════════════════════
    function launchConfetti() {
        const canvas = document.getElementById('spinConfetti');
        const ctx    = canvas.getContext('2d');
        const modal  = document.getElementById('spinModal');

        canvas.width  = modal.offsetWidth;
        canvas.height = modal.offsetHeight;

        const colors = ['#182655', '#253A82', '#e9c176', '#fff', '#4caf50', '#e53935', '#ff9800'];
        let particles = [];

        for (let i = 0; i < 90; i++) {
            particles.push({
                x:     Math.random() * canvas.width,
                y:     -10 - Math.random() * 40,
                w:     5 + Math.random() * 7,
                h:     8 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx:    (Math.random() - 0.5) * 5,
                vy:    3 + Math.random() * 5,
                rot:   Math.random() * 360,
                vrot:  (Math.random() - 0.5) * 10,
                alpha: 1,
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles = particles.filter(p => p.alpha > 0.02);

            particles.forEach(p => {
                p.x    += p.vx;
                p.y    += p.vy;
                p.rot  += p.vrot;
                p.vy   += 0.15; // gravity
                if (p.y > canvas.height * 0.75) p.alpha -= 0.03;

                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            if (particles.length > 0) requestAnimationFrame(animate);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(animate);
    }

    // ═══════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════
    function init() {
        if (!canShowToday()) return;

        // Build HTML and wheel
        buildHTML();
        initWheel();

        // Show after 30 seconds
        setTimeout(openModal, TRIGGER_DELAY);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();