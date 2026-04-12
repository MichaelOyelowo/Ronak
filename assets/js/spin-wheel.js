(function () {

    const WA_NUMBER     = '2349029702549';
    const STORAGE_KEY   = 'ronaks_spin';
    const TRIGGER_DELAY = 3000;

    // ── 8 segments: 4 prizes alternating with 4 Try Again ──
    const SEGMENTS =[
        { label: '₦10,000\nOff',       color: '#182655', text: '#fff',    prize: true,  reward: 'n10000-off'    },
        { label: 'Try\nAgain',         color: '#e8e6e1', text: '#182655', prize: false, reward: null            },
        { label: '15%\nDiscount',      color: '#253A82', text: '#fff',    prize: true,  reward: '15-percent'    },
        { label: 'Try\nAgain',         color: '#e8e6e1', text: '#182655', prize: false, reward: null            },
        { label: 'Free\nDelivery',     color: '#182655', text: '#fff',    prize: true,  reward: 'free-delivery' },
        { label: 'Try\nAgain',         color: '#e8e6e1', text: '#182655', prize: false, reward: null            },
        { label: 'Priority\nProduction',color: '#253A82', text: '#fff',   prize: true,  reward: 'priority'      },
        { label: 'Try\nAgain',         color: '#e8e6e1', text: '#182655', prize: false, reward: null            },
    ];

    const REWARDS = {
        'n10000-off': {
            icon:  '🎁', title: '₦10,000 Off Won!',
            sub:   'Get <strong>₦10,000 off</strong> your next Ronaks order. Claim on WhatsApp now!',
            wa:    `Hello Ronaks! I just won *₦10,000 Off* on your spin wheel 🎉. Please apply my discount to my next order. Thank you!`
        },
        '15-percent': {
            icon:  '✨', title: '15% Discount Won!',
            sub:   'Enjoy <strong>15% off</strong> your entire next Ronaks order — on any product!',
            wa:    `Hello Ronaks! I just won a *15% Discount* on your spin wheel 🎉. Please apply my discount to my next order. Thank you!`
        },
        'free-delivery': {
            icon:  '🚚', title: 'Free Delivery Won!',
            sub:   '<strong>Free delivery</strong> on your next order above ₦50,000 — no delivery fee!',
            wa:    `Hello Ronaks! I just won *Free Delivery* on your spin wheel 🎉. Please apply free delivery to my next order above ₦50,000. Thank you!`
        },
        'priority': {
            icon:  '⚡', title: 'Priority Production Won!',
            sub:   'Your next order gets <strong>48-hour priority production</strong> — we make yours first!',
            wa:    `Hello Ronaks! I just won *Priority Production (48hrs)* on your spin wheel 🎉. Please apply priority production to my next order. Thank you!`
        }
    };

    // ─────────────────────────────────────
    // STORAGE & TRACKING
    // ─────────────────────────────────────
    function getData() {
        try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {}; } 
        catch (e) { return {}; }
    }

    function saveData(obj) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch (e) {}
    }

    function wonRecently() {
        const d = getData();
        if (!d.wonDate) return false;
        const daysSinceWin = (Date.now() - d.wonDate) / (1000 * 60 * 60 * 24);
        return daysSinceWin < 7;
    }

    function isReturningUser() {
        const d = getData();
        const today = new Date().toDateString();
        return d.firstVisit && d.firstVisit !== today;
    }

    function spinsToday() {
        const d = getData();
        const today = new Date().toDateString();
        return d.spinDate === today ? (d.spins || 0) : 0;
    }

    function recordSpin() {
        const d = getData();
        const today = new Date().toDateString();
        saveData({ ...d, spinDate: today, spins: (d.spinDate === today ? (d.spins || 0) : 0) + 1 });
    }

    function recordWin() {
        const d = getData();
        saveData({ ...d, wonDate: Date.now() });
    }

    function trackVisit() {
        const d = getData();
        const today = new Date().toDateString();
        if (!d.firstVisit) {
            saveData({ ...d, firstVisit: today, lastVisit: today });
        } else if (d.lastVisit !== today) {
            saveData({ ...d, lastVisit: today });
        }
    }

    function shouldShow() {
        if (wonRecently()) return false;
        if (spinsToday() >= 3) return false;
        return true;
    }

    // ─────────────────────────────────────
    // BUILD HTML
    // ─────────────────────────────────────
    function buildHTML() {
        const name = (() => { try { return localStorage.getItem('ronaks_user_name') || ''; } catch(e) { return ''; } })();
        const greeting = name ? `, <strong>${name}</strong>` : '';

        const backdrop = document.createElement('div');
        backdrop.className = 'spin-backdrop';
        backdrop.id = 'spinBackdrop';
        backdrop.setAttribute('aria-hidden', 'true');

        const modal = document.createElement('div');
        modal.className = 'spin-modal';
        modal.id = 'spinModal';
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
                <button class="spin-close-btn" id="spinCloseBtn" aria-label="Close">✕</button>
            </div>
            <div class="spin-body">
                <p class="spin-sub" id="spinSub">
                    Try your luck today${greeting} — <strong>real rewards</strong> up for grabs!
                </p>
                <div class="spin-wheel-wrap">
                    <div class="spin-pointer" aria-hidden="true"></div>
                    <canvas id="wheelCanvas" width="260" height="260"></canvas>
                    <div class="spin-center" aria-hidden="true"><div class="spin-center-dot"></div></div>
                </div>
                <div class="spin-result" id="spinResult" aria-live="polite" aria-atomic="true" style="display: none;">
                    <span class="spin-result-icon" id="spinResultIcon" aria-hidden="true"></span>
                    <p class="spin-result-title" id="spinResultTitle"></p>
                    <p class="spin-result-sub"   id="spinResultSub"></p>
                    
                    <!-- FIX: Using inline display logic via JS instead of 'hidden' attribute -->
                    <button class="spin-claim-btn" id="spinClaimBtn" style="display: none;">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.526 5.856L0 24l6.343-1.497A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.727.979.995-3.638-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                        </svg>
                        Claim on WhatsApp
                    </button>
                </div>
                <button class="spin-action-btn" id="spinActionBtn">Spin the Wheel</button>
                <p class="spin-attempts-text" id="spinAttemptsText"></p>
            </div>
        `;
        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
    }

    // ─────────────────────────────────────
    // DRAW WHEEL
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

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, start, end);
            ctx.closePath();
            ctx.fillStyle = seg.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            const midAngle = start + ARC / 2;
            const normMid  = ((midAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            const isLeft   = normMid > Math.PI / 2 && normMid < (3 * Math.PI) / 2;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(midAngle);
            ctx.font      = 'bold 10px Manrope, sans-serif';
            ctx.fillStyle = seg.text;

            const lines = seg.label.split('\n');
            if (isLeft) {
                ctx.rotate(Math.PI);
                ctx.textAlign = 'left';
                lines.forEach((line, li) => { ctx.fillText(line, -(r - 10), (li - (lines.length - 1) / 2) * 13); });
            } else {
                ctx.textAlign = 'right';
                lines.forEach((line, li) => { ctx.fillText(line, r - 10, (li - (lines.length - 1) / 2) * 13); });
            }
            ctx.restore();
        });

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.strokeStyle = '#182655';
        ctx.lineWidth = 4;
        ctx.stroke();
    }

    // ─────────────────────────────────────
    // WHEEL LOGIC
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

        const NUM  = SEGMENTS.length;
        const ARC  = (2 * Math.PI) / NUM;
        let angle   = 0;
        let spinning = false;

        const returning = isReturningUser();
        let   usedToday = spinsToday();
        const PRIZE_INDICES = [0, 2, 4, 6]; // Indigo segments
        
        function updateUI() {
            const remaining = 3 - usedToday;
            if (remaining > 0) {
                attemptsText.innerHTML = `You have <strong>${remaining} spin${remaining !== 1 ? 's' : ''}</strong> left today`;
            } else {
                attemptsText.textContent = 'Come back tomorrow — your reward is waiting! 🎯';
                actionBtn.disabled = true;
            }
        }

        updateUI();
        drawWheel(canvas, angle);

        function spinTo(targetAngle, duration, onDone) {
            const start      = performance.now();
            const startAngle = angle;
            const delta      = targetAngle - startAngle;

            function frame(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased    = 1 - Math.pow(1 - progress, 4);
                angle = startAngle + delta * eased;
                drawWheel(canvas, angle);
                if (progress < 1) requestAnimationFrame(frame);
                else { angle = targetAngle; drawWheel(canvas, angle); onDone(); }
            }
            requestAnimationFrame(frame);
        }

        // FIX 2: Bulletproof Circle Geometry. 
        // offsetFraction determines exactly where inside the slice the needle lands.
        // 0 = Dead Center | 0.4 = Touching right edge | -0.4 = Touching left edge
        function targetFor(segIndex, offsetFraction = 0) {
            const fullRots = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;
            const targetAngleInSeg = (ARC * 0.5) + (offsetFraction * ARC);
            
            // The needle is drawn at 12 o'clock (270 degrees or 3*PI/2)
            let R = (3 * Math.PI / 2) - (segIndex * ARC) - targetAngleInSeg;
            while (R < 0) R += 2 * Math.PI;

            let currentMod = angle % (2 * Math.PI);
            let delta = R - currentMod;
            if (delta < 0) delta += 2 * Math.PI;

            return angle + fullRots + delta;
        }

        function showResult(icon, title, sub, showClaim, rewardKey) {
            resultIcon.textContent   = icon;
            resultTitle.textContent  = title;
            resultSub.innerHTML      = sub;
            spinResult.style.display = 'flex';

            // FIX 1: Directly force display 'none' or 'flex'
            claimBtn.style.display = showClaim ? 'flex' : 'none';

            if (showClaim && rewardKey) {
                const r = REWARDS[rewardKey];
                claimBtn.onclick = () => {
                    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(r.wa)}`, '_blank');
                };
            }
        }

        actionBtn.addEventListener('click', () => {
            if (spinning || actionBtn.disabled) return;
            spinning = true;
            actionBtn.disabled = true;
            spinResult.style.display = 'none';
            claimBtn.style.display = 'none';

            recordSpin();
            usedToday++;

            if (returning) {
                // ═════ RETURNING USER — WINS ═════
                const winIdx = PRIZE_INDICES[Math.floor(Math.random() * PRIZE_INDICES.length)];
                const target = targetFor(winIdx, 0); // Lands dead center of the Prize

                spinTo(target, 5000, () => {
                    spinning = false;
                    actionBtn.disabled  = true;
                    attemptsText.textContent = 'You won! 🎉 Come back in 7 days for more!';
                    spinSub.innerHTML = '🎊 You came back and you WON!';
                    const reward = REWARDS[SEGMENTS[winIdx].reward];
                    showResult(reward.icon, reward.title, reward.sub, true, SEGMENTS[winIdx].reward);
                    recordWin();
                    launchConfetti();
                });

            } else {
                // ═════ NEW USER — GUARANTEED TO LAND ON WHITE "TRY AGAIN" ═════
                if (usedToday === 1) {
                    const target = targetFor(3, 0); // Middle of segment 3 (Try Again)
                    spinTo(target, 4000, () => {
                        spinning = false;
                        updateUI();
                        spinSub.innerHTML = `<strong>Try again</strong> — your reward is in there! 🔥`;
                        showResult('😮', 'Not quite!', `Keep going — you have <strong>${3 - usedToday} more spin${3 - usedToday !== 1 ? 's' : ''}</strong> left today!`, false, null);
                        actionBtn.textContent = 'Spin Again!';
                        actionBtn.disabled    = false;
                    });

                } else if (usedToday === 2) {
                    const target = targetFor(7, 0.4); // Barely inside Segment 7, almost slipped past Segment 0 (Prize)
                    spinTo(target, 4500, () => {
                        spinning = false;
                        updateUI();
                        spinSub.innerHTML = `You were <strong>SO close!</strong> One more chance! 🔥🔥`;
                        showResult('😱', 'SO close!!', `The needle just slipped past ₦10,000 Off! You have <strong>1 final spin</strong> today! 🎯`, false, null);
                        actionBtn.textContent = 'Final Spin!';
                        actionBtn.disabled    = false;
                    });

                } else {
                    const target = targetFor(7, -0.4); // Barely inside Segment 7, almost reached Segment 6 (Prize)
                    spinTo(target, 5000, () => {
                        spinning = false;
                        actionBtn.disabled  = true;
                        attemptsText.textContent = 'Come back tomorrow — your reward is waiting! 🎯';
                        spinSub.innerHTML = `<strong>Come back tomorrow</strong> — it's almost yours! 😤`;
                        showResult('😤', 'Ugh, so close!', `You almost landed on <strong>Priority Production</strong>! Come back tomorrow and spin again — your reward will be there! 🎁`, false, null);
                    });
                }
            }
        });

        document.getElementById('spinBackdrop').addEventListener('click', closeModal);
        document.getElementById('spinCloseBtn').addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    }

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

    function launchConfetti() {
        const canvas = document.getElementById('spinConfetti');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const modal = document.getElementById('spinModal');
        canvas.width = modal.offsetWidth;
        canvas.height = modal.offsetHeight;

        const colors =['#182655','#253A82','#e9c176','#fff','#4caf50','#e53935','#ff9800'];
        let particles =[];

        for (let i = 0; i < 90; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: -10 - Math.random() * 40,
                w: 5 + Math.random() * 7,
                h: 8 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 5,
                vy: 3 + Math.random() * 5,
                rot: Math.random() * 360,
                vrot: (Math.random() - 0.5) * 10,
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

    function init() {
        trackVisit(); 
        if (!shouldShow()) return;
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