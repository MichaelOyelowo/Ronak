document.addEventListener("DOMContentLoaded", () => {

    const WA_NUMBER = '2349029702549';

    // ═══════════════════════════════════════
    // 20 QUIZ QUESTIONS
    // ═══════════════════════════════════════
    const QUESTIONS = [
        {
            q: "What does 'Adire' mean in the Yoruba language?",
            options: ["Cloth that is tied and dyed", "Woven fabric of the Yoruba", "Blue indigo cloth", "Sacred ceremonial garment"],
            answer: 0
        },
        {
            q: "Which Nigerian city is historically considered the heartland of Adire production?",
            options: ["Lagos", "Ibadan", "Abeokuta", "Ile-Ife"],
            answer: 2
        },
        {
            q: "What is the primary resist agent used in Adire Eleko?",
            options: ["Beeswax", "Cassava starch paste", "Rice flour", "Clay mud"],
            answer: 1
        },
        {
            q: "Adire Alabere refers to which technique?",
            options: ["Wax resist dyeing", "Stitch resist using needle and thread", "Paste resist using a comb", "Folding and clamping fabric"],
            answer: 1
        },
        {
            q: "What is the natural source of the deep blue dye traditionally used in Adire?",
            options: ["Blueberries", "Indigo plant (Indigofera tinctoria)", "Woad plant", "Cobalt mineral"],
            answer: 1
        },
        {
            q: "What is the purpose of the resist material in tie-dye and Adire techniques?",
            options: ["To add colour to the fabric", "To strengthen the fabric fibres", "To prevent dye from penetrating certain areas", "To soften the fabric texture"],
            answer: 2
        },
        {
            q: "Which fabric is most traditionally used for Adire in Yoruba culture?",
            options: ["Silk", "Polyester", "Hand-woven cotton", "Linen"],
            answer: 2
        },
        {
            q: "What does 'Adire Oniko' refer to?",
            options: ["Paste resist Adire", "Adire made with wax", "Tie-dye Adire using raffia or thread", "Machine-printed Adire pattern"],
            answer: 2
        },
        {
            q: "In indigo dyeing, why is the fabric dipped multiple times in the dye vat?",
            options: ["To clean the fabric", "To build up depth of colour through oxidation", "To fix the resist agent", "To shrink the fabric"],
            answer: 1
        },
        {
            q: "What happens to indigo dye when freshly applied fabric is exposed to air?",
            options: ["It fades immediately", "It turns green then oxidises to blue", "It turns red then darkens", "Nothing — it requires heat to develop"],
            answer: 1
        },
        {
            q: "The traditional wooden comb used to apply cassava paste in Adire Eleko is called?",
            options: ["Obi", "Aso", "Egbe", "Pako"],
            answer: 0
        },
        {
            q: "Which of these is NOT a common Adire pattern name?",
            options: ["Ibadandun", "Olokun", "Asoke", "Durbar"],
            answer: 3
        },
        {
            q: "What is the correct way to fix natural indigo dye in fabric after dyeing?",
            options: ["Iron at high heat immediately", "Rinse thoroughly in cold water and air dry", "Soak in boiling water for 30 minutes", "Apply vinegar directly to the fabric"],
            answer: 1
        },
        {
            q: "What role did Adire play in Yoruba society historically?",
            options: ["Only used for royal ceremonies", "A form of currency and cultural identity", "Exclusively for women's burial cloth", "Used only during festivals"],
            answer: 1
        },
        {
            q: "Which state in Nigeria is most associated with the origin of Adire cloth?",
            options: ["Lagos State", "Ogun State", "Osun State", "Oyo State"],
            answer: 1
        },
        {
            q: "When preparing fabric for natural indigo dyeing, what pre-treatment is recommended?",
            options: ["Apply wax coating", "Scour the fabric to remove oils and sizing", "Bleach the fabric white first", "Soak in salt water overnight"],
            answer: 1
        },
        {
            q: "What is the effect of over-oxidation on indigo-dyed fabric?",
            options: ["It makes the colour brighter", "It causes the colour to become greener", "It has no effect on colour", "It permanently sets the dye"],
            answer: 1
        },
        {
            q: "In the context of Adire, what does 'Alabere' literally translate to?",
            options: ["Cloth of the river", "Sewing with needle", "Blue thread pattern", "Sacred wrapping"],
            answer: 1
        },
        {
            q: "What is the recommended water temperature for rinsing indigo-dyed Adire after dyeing?",
            options: ["Boiling (100°C)", "Hot (70-80°C)", "Warm (40-50°C)", "Cold water"],
            answer: 3
        },
        {
            q: "Which of these best describes the term 'vat dye' as it relates to indigo?",
            options: ["A dye that requires vinegar to fix", "A dye that is reduced to a soluble form before dyeing and re-oxidises on fabric", "A dye that only works on synthetic fabrics", "A dye applied directly without water"],
            answer: 1
        }
    ];

    // ═══════════════════════════════════════
    // QUIZ STATE
    // ═══════════════════════════════════════
    let currentQ    = 0;
    let score       = 0;
    let selected    = null;
    let timerInterval = null;
    let timeLeft    = 240; // 4 minutes in seconds
    let quizPassed  = false;

    // DOM refs
    const quizIntro    = document.getElementById('quizIntro');
    const quizActive   = document.getElementById('quizActive');
    const quizResult   = document.getElementById('quizResult');
    const quizStartBtn = document.getElementById('quizStartBtn');
    const quizNextBtn  = document.getElementById('quizNextBtn');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions  = document.getElementById('quizOptions');
    const quizQCount   = document.getElementById('quizQCount');
    const quizTimer    = document.getElementById('quizTimer');
    const quizTimerText= document.getElementById('quizTimerText');
    const quizProgressBar = document.getElementById('quizProgressBar');
    const quizResultInner = document.getElementById('quizResultInner');
    const discountNote    = document.getElementById('discountNote');

    if (!quizStartBtn) return;

    // ── Start quiz ──
    quizStartBtn.addEventListener('click', () => {
        quizIntro.classList.add('hidden');
        quizActive.classList.remove('hidden');
        renderQuestion();
        startTimer();
    });

    // ── Render current question ──
    function renderQuestion() {
        const q = QUESTIONS[currentQ];
        selected = null;
        quizNextBtn.disabled = true;

        quizQCount.textContent = `Question ${currentQ + 1} of ${QUESTIONS.length}`;
        quizProgressBar.style.width = `${((currentQ + 1) / QUESTIONS.length) * 100}%`;
        quizProgressBar.setAttribute('aria-valuenow', currentQ + 1);

        quizQuestion.textContent = q.q;
        quizOptions.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];

        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.setAttribute('role', 'radio');
            btn.setAttribute('aria-checked', 'false');
            btn.innerHTML = `
                <span class="quiz-option-letter" aria-hidden="true">${letters[i]}</span>
                ${opt}
            `;
            btn.addEventListener('click', () => selectOption(i, btn));
            quizOptions.appendChild(btn);
        });
    }

    // ── Select an answer ──
    function selectOption(index, btn) {
        if (selected !== null) return; // already answered
        selected = index;
        quizNextBtn.disabled = false;

        const allBtns = quizOptions.querySelectorAll('.quiz-option');

        // Mark selected
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');

        // Immediately show correct/wrong after selection
        setTimeout(() => {
            allBtns.forEach((b, i) => {
                b.disabled = true;
                if (i === QUESTIONS[currentQ].answer) {
                    b.classList.add('correct');
                    b.classList.remove('selected');
                }
            });

            if (index !== QUESTIONS[currentQ].answer) {
                btn.classList.remove('selected');
                btn.classList.add('wrong');
            }

            if (index === QUESTIONS[currentQ].answer) score++;
        }, 300);
    }

    // ── Next question ──
    quizNextBtn.addEventListener('click', () => {
        currentQ++;
        if (currentQ >= QUESTIONS.length) {
            endQuiz();
        } else {
            renderQuestion();
        }
    });

    // ── Timer ──
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            quizTimerText.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

            // Go red/urgent in last 30 seconds
            if (timeLeft <= 30) {
                quizTimer.classList.add('urgent');
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endQuiz(true);
            }
        }, 1000);
    }

    // ── End quiz ──
    function endQuiz(timedOut = false) {
        clearInterval(timerInterval);
        quizActive.classList.add('hidden');
        quizResult.classList.remove('hidden');

        const total      = QUESTIONS.length;
        const percentage = Math.round((score / total) * 100);
        quizPassed       = percentage >= 70;

        if (quizPassed) {
            // ── PASS ──
            // Store pass in sessionStorage so registration form shows discount note
            try { sessionStorage.setItem('ronaks_quiz_passed', 'true'); } catch(e) {}
            discountNote && discountNote.classList.remove('hidden');

            const waMsg = encodeURIComponent(
                `Hello Ronaks! I just completed your Adire experience quiz and scored ${score}/${total} (${percentage}%). I qualify for the 50% training discount. Please confirm my discount and send registration details. Thank you!`
            );

            quizResultInner.innerHTML = `
                <div class="quiz-result-icon">🎉</div>
                <p class="quiz-result-score">${percentage}%</p>
                <p class="quiz-result-title">You Passed!</p>
                <p class="quiz-result-desc">
                    Excellent work — you scored <strong>${score} out of ${total}</strong>. You clearly know your Adire!
                    Your <strong>50% discount</strong> is waiting — claim it on WhatsApp now and register for the advanced track.
                </p>
                <a href="https://wa.me/${WA_NUMBER}?text=${waMsg}"
                   target="_blank" rel="noopener noreferrer"
                   class="quiz-result-cta"
                   aria-label="Claim your 50% discount on WhatsApp">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.526 5.856L0 24l6.343-1.497A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.373l-.36-.214-3.727.979.995-3.638-.234-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
                    Claim 50% Discount on WhatsApp
                </a>
                <a href="#register" class="quiz-result-retry" style="text-decoration:none;font-size:0.72rem;color:var(--text-faint);">Or scroll down to register →</a>
            `;

        } else {
            // ── FAIL ──
            const msg = timedOut
                ? `Time ran out! You answered ${score}/${total} correctly.`
                : `You scored ${score} out of ${total} (${percentage}%). You need 70% to pass.`;

            quizResultInner.innerHTML = `
                <div class="quiz-result-icon">${timedOut ? '⏰' : '📚'}</div>
                <p class="quiz-result-score">${percentage}%</p>
                <p class="quiz-result-title">${timedOut ? 'Time\'s Up!' : 'Not Quite!'}</p>
                <p class="quiz-result-desc">
                    ${msg} No worries — our <strong>beginner program</strong> is designed exactly for you.
                    You will learn everything from scratch inside our Ile-Ife studio.
                </p>
                <a href="#register" class="training-cta-primary" style="font-size:0.68rem;padding:0.85rem 2rem;text-decoration:none;margin-top:0.5rem;">
                    Register for Beginner Training →
                </a>
                <button class="quiz-result-retry" id="quizRetryBtn">Try the quiz again</button>
            `;

            // Retry
            const retryBtn = document.getElementById('quizRetryBtn');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => {
                    currentQ  = 0;
                    score     = 0;
                    selected  = null;
                    timeLeft  = 240;
                    quizPassed = false;
                    quizResult.classList.add('hidden');
                    quizActive.classList.remove('hidden');
                    quizTimer.classList.remove('urgent');
                    quizTimerText.textContent = '4:00';
                    renderQuestion();
                    startTimer();
                });
            }
        }
    }

    // ═══════════════════════════════════════
    // REGISTRATION FORM
    // ═══════════════════════════════════════
    const registerForm = document.getElementById('registerForm');

    // Show discount note if quiz was passed this session
    try {
        if (sessionStorage.getItem('ronaks_quiz_passed') === 'true' && discountNote) {
            discountNote.classList.remove('hidden');
        }
    } catch(e) {}

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name     = document.getElementById('regName').value.trim();
            const phone    = document.getElementById('regPhone').value.trim();
            const email    = document.getElementById('regEmail').value.trim();
            const location = document.getElementById('regLocation').value.trim();
            const level    = document.getElementById('regLevel').value;
            const schedule = document.getElementById('regSchedule').value;
            const message  = document.getElementById('regMessage').value.trim();
            const passed   = (() => { try { return sessionStorage.getItem('ronaks_quiz_passed') === 'true'; } catch(e) { return false; }})();

            if (!name)     { alert('Please enter your full name.'); return; }
            if (!phone)    { alert('Please enter your WhatsApp number.'); return; }
            if (!location) { alert('Please enter where you are based.'); return; }
            if (!level)    { alert('Please select your experience level.'); return; }

            const discountLine = passed
                ? `\n*Discount:* 50% quiz discount applied (₦50,000 fee)`
                : '';

            const waMsg = encodeURIComponent([
                `Hello Ronaks! I would like to register for the Adire Training Program. 🎨`,
                ``,
                `*Name:* ${name}`,
                `*WhatsApp:* ${phone}`,
                email    ? `*Email:* ${email}` : '',
                `*Location:* ${location}`,
                `*Experience Level:* ${level}`,
                schedule ? `*Preferred Schedule:* ${schedule}` : '',
                message  ? `*Additional Info:* ${message}` : '',
                discountLine,
                ``,
                `Please confirm my registration and let me know the next steps. Thank you!`
            ].filter(Boolean).join('\n'));

            window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
        });
    }

    // ═══════════════════════════════════════
    // NAVBAR
    // ═══════════════════════════════════════
    const hamburger        = document.getElementById('hamburger');
    const mobileNavInner   = document.querySelector('.mobile-nav-inner');
    const mobileShopToggle = document.getElementById('mobileShopToggle');
    const mobileShopSub    = document.getElementById('mobileShopSub');

    if (hamburger && mobileNavInner) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', String(!isOpen));
        });
    }

    if (mobileShopToggle && mobileShopSub) {
        mobileShopToggle.addEventListener('click', () => {
            const isOpen = mobileShopToggle.getAttribute('aria-expanded') === 'true';
            mobileShopToggle.setAttribute('aria-expanded', String(!isOpen));
            mobileShopSub.classList.toggle('open', !isOpen);
        });
    }

    const deskNav = document.getElementById('deskNav');
    if (deskNav) {
        window.addEventListener('scroll', () => {
            deskNav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    window.handleNewsletterSubmit = function (e) {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail');
        const btn   = e.target.querySelector('button');
        if (!input?.value) return;
        const original    = btn.textContent;
        btn.textContent   = 'Subscribed ✓';
        btn.style.color   = '#1a6b3c';
        input.value       = '';
        input.placeholder = 'Thank you!';
        setTimeout(() => {
            btn.textContent   = original;
            btn.style.color   = '';
            input.placeholder = 'Your email address';
        }, 3000);
    };

}); // end DOMContentLoaded