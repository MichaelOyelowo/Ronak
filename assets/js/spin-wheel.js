(function () {

    const WA_NUMBER     = '2349029702549';
    const STORAGE_KEY   = 'ronaks_spin';
    const TRIGGER_DELAY = 3000;

    const SEGMENTS = [
        { label: 'Free\nDelivery',  color: '#182655', text: '#fff',    win: true,  reward: 'free-delivery' },
        { label: 'Try\nAgain',      color: '#e8e6e1', text: '#182655', win: false, reward: null            },
        { label: '₦2,000\nOff',     color: '#253A82', text: '#fff',    win: true,  reward: 'n2000-off'     },
        { label: 'Try\nAgain',      color: '#e8e6e1', text: '#182655', win: false, reward: null            },
        { label: '5%\nDiscount',    color: '#182655', text: '#fff',    win: true,  reward: '5-percent'     },
        { label: 'Try\nAgain',      color: '#e8e6e1', text: '#182655', win: false, reward: null            },
        { label: 'Free\nDelivery',  color: '#253A82', text: '#fff',    win: true,  reward: 'free-delivery' },
        { label: 'Try\nAgain',      color: '#e8e6e1', text: '#182655', win: false, reward: null            },
    ];

    const REWARDS = {
        'free-delivery': {
            icon:  '🚚',
            title: 'Free Delivery Won!',
            sub:   'Your next Ronaks order ships <strong>completely free</strong> — no minimum spend.',
            wa:    `Hello Ronaks! I just won *Free Delivery* on your spin wheel 🎉. Please apply my free delivery reward to my next order. Thank you!`
        },
        'n2000-off': {
            icon:  '🎁',
            title: '₦2,000 Off Won!',
            sub:   'Get <strong>₦2,000 off</strong> any order above ₦30,000. Claim on WhatsApp now!',
            wa:    `Hello Ronaks! I just won *₦2,000 Off* on your spin wheel 🎉. Please apply my discount to my next order above ₦30,000. Thank you!`
        },
        '5-percent': {
            icon:  '✨',
            title: '5% Discount Won!',
            sub:   'Enjoy <strong>5% off</strong> your entire next Ronaks order!',
            wa:    `Hello Ronaks! I just won a *5% Discount* on your spin wheel 🎉. Please apply my discount to my next order. Thank you!`
        }
    };

    // ─────────────────────────────────────
    // STORAGE
    // Tracks: date, spinsToday, dayStreak
    // ─────────────────────────────────────
    function getSpinData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : { date: null, spins: 0, streak: 0 };
        } catch (e) {
            return { date: null, spins: 0, streak: 0 };
        }
    }

    function saveSpinData(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    }

    function getTodayData() {
        const data  = getSpinData();
        const today = new Date().toDateString();
        if (data.date !== today) {
            // New day — check if they are returning (streak)
            return {
                spins  : 0,
                streak : data.date ? data.streak + 1 : 0,
                isNewDay: true
            };
        }
        return { spins: data.spins, streak: data.streak, isNewDay: false };
    }

    function recordSpin(spins, streak) {
        saveSpinData({
            date  : new Date().toDateString(),
            spins,
            streak
        });
    }

    function canShowToday() {
        const data  = getSpinData();
        const today = new Date().toDateString();
        if (data.date !== today) return true; // new day — always show
        return data.spins < 3; // max 3 spins per day
    }

    // ─────────────────────────────────────
    // BUILD HTML
    // ─────────────────────────────────────
    function buildHTML() {
        const savedName = (() => {
            try { return localStorage.getItem('ronaks_user_name') || ''; } catch(e) { return ''; }
        })();

        const greeting = savedName ? `, <strong>${savedName}</strong>` : '';

        const backdrop = document.createElement('div');
        backdrop.className = 'spin-backdrop';
        backdrop.id        = 'spinBackdrop';
        backdrop.setAttribute('aria-hidden', 'true');

        const modal = document.createElement('div');
        modal.className = 'spin-modal';
        modal.id        = 'spinModal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Spin and win a reward');
        modal.setAttribute('tabindex', '-1');

        modal.innerHTML = `
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
                <button class="spin-action-btn" id="spinActionBtn">Spin the Wheel</button>
                <p class="spin-attempts-text" id="spinAttemptsText">
                    You have <strong>3 spins</strong> today
                </p>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
    }

    // ─────────────────────────────────────
    // DRAW WHEEL
    // Fixed text rendering — all labels
    // are now always right-side up
    // ─────────────────────────────────────
    function drawWheel(canvas, angle) {
        const ctx = canvas.getContext('2d');
        const NUM = SEGMENTS.length;
        const ARC = (2 * Math.PI) / NUM;
        const cx  = canvas.width  / 2;
        const cy  = canvas.height / 2;
        const r   = cx - 4;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        SEGMENTS.forEach((seg, i) => {
            const start = angle + i * ARC;
            const end   = start + ARC;

            // Slice
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, start, end);
            ctx.closePath();
            ctx.fillStyle = seg.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // ── Text fix ──
            // Calculate the angle of the segment's midpoint
            const midAngle = start + ARC / 2;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(midAngle);

            // Check if text would be upside down (left half of wheel)
            // If so, flip it so it always reads correctly
            const isLeftSide = midAngle % (2 * Math.PI) > Math.PI / 2 &&
                               midAngle % (2 * Math.PI) < (3 * Math.PI) / 2;

            if (isLeftSide) {
                // Flip and write from the other direction
                ctx.rotate(Math.PI);
                ctx.textAlign = 'left';
                const lines = seg.label.split('\n');
                ctx.fillStyle = seg.text;
                ctx.font = 'bold 10.5px Manrope, sans-serif';
                lines.forEach((line, li) => {
                    ctx.fillText(line, -(r - 12), (li - (lines.length - 1) / 2) * 14);
                });
            } else {
                ctx.textAlign = 'right';
                const lines = seg.label.split('\n');
                ctx.fillStyle = seg.text;
                ctx.font = 'bold 10.5px Manrope, sans-serif';
                lines.forEach((line, li) => {
                    ctx.fillText(line, r - 12, (li - (lines.length - 1) / 2) * 14);
                });
            }

            ctx.restore();
        });

        // Outer ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = '#182655';
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    // ─────────────────────────────────────
    // INIT WHEEL + LOGIC
    // ─────────────────────────────────────
    function initWheel() {
        const canvas       = document.getElementById('wheelCanvas');
        const spinSub      = document.getElementById('spinSub');
        const spinResult   = document.getElementById('spinResult');
        const resultIcon   = document.getElementById('spinResultIcon');
        const resultTitle  = document.getElementById('spinResultTitle');
        const resultSub    = document.getElementById('spinResultSub');
        const claimBtn     = document.getElementById('spinClaimBtn');
        const actionBtn    = document.getElementById('spinActionBtn');
        const attemptsText = document.getElementById('spinAttemptsText');

        const NUM     = SEGMENTS.length;
        const ARC     = (2 * Math.PI) / NUM;
        let   angle   = 0;
        let   spinning = false;

        const { spins: spinsToday, streak, isNewDay } = getTodayData();
        let   currentSpins = spinsToday;

        // Update attempt display
        function updateAttempts() {
            const remaining = 3 - currentSpins;
            if (remaining > 0) {
                attemptsText.innerHTML = `You have <strong>${remaining} spin${remaining !== 1 ? 's' : ''}</strong> left today`;
            } else {
                attemptsText.textContent = 'Come back tomorrow — your reward is waiting! 🎯';
                actionBtn.disabled = true;
            }
        }

        updateAttempts();
        drawWheel(canvas, angle);

        // ── Smooth spin animation ──
        function spinTo(targetAngle, duration, onDone) {
            const start      = performance.now();
            const startAngle = angle;
            const delta      = targetAngle - startAngle;

            function frame(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Quartic ease-out — fast start, dramatic slow finish
                const eased    = 1 - Math.pow(1 - progress, 4);
                angle = startAngle + delta * eased;
                drawWheel(canvas, angle);

                if (progress < 1) {
                    requestAnimationFrame(frame);
                } else {
                    angle = targetAngle;
                    drawWheel(canvas, angle);
                    onDone();
                }
            }
            requestAnimationFrame(frame);
        }

        // ── Land on a specific segment index ──
        function getTargetAngle(segIndex, offsetFromCenter = 0) {
            const fullRotations = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;
            const segCenter     = (Math.PI / 2) + segIndex * ARC + ARC / 2;
            return angle + fullRotations + segCenter - (angle % (2 * Math.PI)) + offsetFromCenter;
        }

        // ── Show result ──
        function showResult(icon, title, sub, showClaim, rewardKey) {
            resultIcon.textContent  = icon;
            resultTitle.textContent = title;
            resultSub.innerHTML     = sub;
            spinResult.style.display = 'flex';

            claimBtn.hidden = !showClaim;
            if (showClaim && rewardKey) {
                const reward = REWARDS[rewardKey];
                claimBtn.onclick = () => {
                    const msg = encodeURIComponent(reward.wa);
                    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
                };
            }
        }

        // ── Spin click ──
        actionBtn.addEventListener('click', () => {
            if (spinning || actionBtn.disabled) return;
            spinning = true;
            actionBtn.disabled = true;
            spinResult.style.display = 'none';
            claimBtn.hidden = true;

            currentSpins++;
            recordSpin(currentSpins, streak);

            // ── IS THIS A RETURNING USER? (streak > 0 = came back) ──
            const isReturningUser = streak > 0;

            if (isReturningUser) {
                // ── RETURNING USER WINS ON FIRST SPIN OF THE DAY ──
                const winOptions = [0, 2, 4]; // Free Delivery, ₦2000, 5%
                const winIdx     = winOptions[Math.floor(Math.random() * winOptions.length)];
                const target     = getTargetAngle(winIdx);

                spinTo(target, 5000, () => {
                    spinning = false;
                    actionBtn.disabled = true;
                    attemptsText.textContent = 'You won! Come back tomorrow for more! 🎯';

                    const reward = REWARDS[SEGMENTS[winIdx].reward];
                    spinSub.innerHTML = '🎊 You came back and you WON!';
                    showResult(reward.icon, reward.title, reward.sub, true, SEGMENTS[winIdx].reward);
                    launchConfetti();
                });

            } else {
                // ── FIRST TIME USER — 3 TRY AGAIN SPINS ──
                // Each spin lands on a "Try Again" segment (odd indices: 1,3,5,7)
                // but gets progressively closer to a real reward
                // to keep them hooked 😄

                const tryAgainSegments = [1, 3, 5, 7]; // all "Try Again" segments

                if (currentSpins === 1) {
                    // Spin 1 — land comfortably on Try Again, far from rewards
                    // Segment index 7 (bottom Try Again — clearly away from top rewards)
                    const target = getTargetAngle(7, 0);

                    spinTo(target, 4000, () => {
                        spinning = false;
                        updateAttempts();
                        spinSub.innerHTML = `<strong>Try again</strong> — your reward is close! 🔥`;
                        showResult(
                            '😮',
                            'Not quite!',
                            `Keep going — you have <strong>${3 - currentSpins} more spin${3 - currentSpins !== 1 ? 's' : ''}</strong> left today!`,
                            false, null
                        );
                        actionBtn.textContent = 'Spin Again!';
                        actionBtn.disabled = false;
                    });

                } else if (currentSpins === 2) {
                    // Spin 2 — land on Try Again but JUST past a reward segment
                    // Stops at segment 3 which is just after ₦2,000 Off (segment 2)
                    // User sees the needle sweep past the prize — so close! 😂
                    const target = getTargetAngle(3, -0.15); // just past ₦2,000 Off

                    spinTo(target, 4500, () => {
                        spinning = false;
                        updateAttempts();
                        spinSub.innerHTML = `You were <strong>SO close!</strong> One more spin! 🔥🔥`;
                        showResult(
                            '😱',
                            'So close!!',
                            `The needle just slipped past your reward! You have <strong>1 final spin</strong> today — this could be it! 🎯`,
                            false, null
                        );
                        actionBtn.textContent = 'Final Spin!';
                        actionBtn.disabled = false;
                    });

                } else {
                    // Spin 3 — land on Try Again but stop RIGHT at the edge of a reward
                    // Needle stops about 0.05 radians before Free Delivery (segment 0)
                    // Looks like it ALMOST landed on it — pure heartbreak 😂
                    const target = getTargetAngle(1, 0.08); // just before Free Delivery

                    spinTo(target, 5000, () => {
                        spinning = false;
                        actionBtn.disabled = true;
                        attemptsText.textContent = 'Come back tomorrow — your reward is waiting! 🎯';
                        spinSub.innerHTML = `<strong>Come back tomorrow</strong> — it's almost yours! 😤`;
                        showResult(
                            '😤',
                            'Ugh, so close!',
                            `You almost had it! <strong>Come back tomorrow</strong> and spin again — your reward will be waiting for you! 🎁`,
                            false, null
                        );
                    });
                }
            }
        });

        // Close events
        document.getElementById('spinBackdrop').addEventListener('click', closeModal);
        document.getElementById('spinCloseBtn').addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // ─────────────────────────────────────
    // OPEN / CLOSE
    // ─────────────────────────────────────
    function openModal() {
        const backdrop = document.getElementById('spinBackdrop');
        const modal    = document.getElementById('spinModal');
        if (!backdrop || !modal) return;
        backdrop.classList.add('spin-backdrop--visible');
        modal.classList.add('spin-modal--visible');
        document.body.style.overflow = 'hidden';
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

    // ─────────────────────────────────────
    // CONFETTI
    // ─────────────────────────────────────
    function launchConfetti() {
        const canvas = document.getElementById('spinConfetti');
        if (!canvas) return;
        const ctx   = canvas.getContext('2d');
        const modal = document.getElementById('spinModal');
        canvas.width  = modal.offsetWidth;
        canvas.height = modal.offsetHeight;

        const colors = ['#182655','#253A82','#e9c176','#fff','#4caf50','#e53935','#ff9800'];
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
                p.x   += p.vx;
                p.y   += p.vy;
                p.rot += p.vrot;
                p.vy  += 0.15;
                if (p.y > canvas.height * 0.75) p.alpha -= 0.025;
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

    // ─────────────────────────────────────
    // INIT
    // ─────────────────────────────────────
    function init() {
        if (!canShowToday()) return;
        buildHTML();
        initWheel();
        setTimeout(openModal, TRIGGER_DELAY);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();