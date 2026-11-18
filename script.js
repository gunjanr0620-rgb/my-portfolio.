/* =========================================
   KIRANDEEP KAUR — PORTFOLIO JAVASCRIPT
========================================= */

"use strict";


// =========================================
// 1. SCROLL REVEAL ANIMATIONS
// =========================================

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");

                    // Animate each section once.
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });

} else {
    // Fallback for older browsers.
    revealItems.forEach((item) => {
        item.classList.add("is-visible");
    });
}


// =========================================
// 2. OPENING BUBBLE ANIMATION
// =========================================

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
    const bubbleContainer = document.createElement("div");

    bubbleContainer.id = "bubble-container";

    document.body.appendChild(bubbleContainer);

    // Create bubbles in different sizes and positions.
    for (let i = 0; i < 26; i++) {
        const bubble = document.createElement("span");

        bubble.className = "bubble";

        const size = Math.random() * 38 + 10;
        const duration = Math.random() * 3 + 4;
        const delay = Math.random() * 1.8;

        bubble.style.setProperty(
            "--left",
            `${Math.random() * 100}%`
        );

        bubble.style.setProperty(
            "--size",
            `${size}px`
        );

        bubble.style.setProperty(
            "--duration",
            `${duration}s`
        );

        bubble.style.setProperty(
            "--delay",
            `${delay}s`
        );

        bubbleContainer.appendChild(bubble);
    }

    // Remove the temporary bubbles after the opening effect.
    window.setTimeout(() => {
        bubbleContainer.remove();
    }, 9000);
}


// =========================================
// 3. MOUSE-FOLLOWING GLOW
// =========================================

if (
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
) {
    const cursorGlow = document.createElement("div");

    cursorGlow.className = "cursor-glow";

    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });

    const tiltTargets = document.querySelectorAll(
        ".hero-art, .experience-card, .work-card"
    );

    tiltTargets.forEach((target) => {
        target.addEventListener("pointermove", (event) => {
            const bounds = target.getBoundingClientRect();
            const pointerX = (event.clientX - bounds.left) / bounds.width;
            const pointerY = (event.clientY - bounds.top) / bounds.height;
            const tiltX = (pointerX - 0.5) * 8;
            const tiltY = (0.5 - pointerY) * 8;

            target.style.setProperty("--tilt-x", `${tiltX}deg`);
            target.style.setProperty("--tilt-y", `${tiltY}deg`);

            if (target.classList.contains("work-card")) {
                const image = target.querySelector(".work-image");

                if (image) {
                    image.style.setProperty("--pointer-x", `${pointerX * 100}%`);
                    image.style.setProperty("--pointer-y", `${pointerY * 100}%`);
                }
            }
        });

        target.addEventListener("pointerleave", () => {
            target.style.removeProperty("--tilt-x");
            target.style.removeProperty("--tilt-y");

            const image = target.querySelector(".work-image");

            if (image) {
                image.style.removeProperty("--pointer-x");
                image.style.removeProperty("--pointer-y");
            }
        });
    });
}


// =========================================
// 4. SCROLL PROGRESS BAR
// =========================================

const progressBar = document.getElementById("progressBar");

function updateScrollProgress() {
    if (!progressBar) {
        return;
    }

    const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    progressBar.style.width =
        `${Math.min(progress, 100)}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


// =========================================
// 5. MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    // Close the menu after selecting a section.
    navMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );
        });

    });
}


// =========================================
// 6. CREATIVE WORK CATEGORY FILTERS
// =========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Update active filter button.
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Display matching projects.
        workCards.forEach((card) => {

            const category = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;

            if (shouldShow) {

                card.classList.remove("is-filtered");

                // Re-run the entrance animation.
                if (!prefersReducedMotion) {
                    card.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(18px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 400,
                            easing: "ease-out"
                        }
                    );
                }

            } else {
                card.classList.add("is-filtered");
            }

        });

    });

});


// =========================================
// 7. AUTOMATIC COPYRIGHT YEAR
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================================
// 8. PORTFOLIO CHAT ASSISTANT
// =========================================

const chatLauncher = document.getElementById("chatLauncher");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatConsent = document.getElementById("chatConsent");
const chatFinish = document.getElementById("chatFinish");
const chatStatus = document.getElementById("chatStatus");

if (
    chatLauncher && chatPanel && chatClose && chatMessages && chatForm &&
    chatInput && chatSend && chatConsent && chatFinish && chatStatus
) {
    const conversation = [];
    let requestInProgress = false;
    let conversationFinished = false;

    function appendChatMessage(role, text) {
        const message = document.createElement("p");
        message.className = `chat-message chat-${role}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateChatControls() {
        const hasVisitorMessage = conversation.some((message) => message.role === "user");

        chatSend.disabled = requestInProgress || conversationFinished;
        chatInput.disabled = requestInProgress || conversationFinished;
        chatFinish.disabled = requestInProgress || conversationFinished ||
            !chatConsent.checked || !hasVisitorMessage;
    }

    async function postChatRequest(url, payload) {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result.error || "The request could not be completed.");
        }

        return result;
    }

    function getLocalChatReply(question) {
        const normalizedQuestion = question.toLowerCase();

        if (/\b(hi|hello|hey)\b/.test(normalizedQuestion)) {
            return "Hi! Ask me about Gunjan's education, experience, projects, skills, or contact details.";
        }

        if (/\b(email|phone|call|contacts?|reach|instagram)\b/.test(normalizedQuestion)) {
            return "You can email Gunjan at gunjanr0620@gmail.com, call +91 8837858187, or find her on Instagram at @gunjan_r26.";
        }

        if (/\b(education|degree|college|university|study|studied|bca|graduate)\b/.test(normalizedQuestion)) {
            return "Gunjan completed a Bachelor of Computer Applications at General Shivdev Singh Diwan Gurbachan Singh Khalsa College in Patiala.";
        }

        if (/\b(where|location|based|live|city)\b/.test(normalizedQuestion)) {
            return "Gunjan is based in Patiala, Punjab, India.";
        }

        if (/\b(experience|job|work|visa|consultant|counsell?or|client)\b/.test(normalizedQuestion)) {
            return "Gunjan has one year of experience as a visa consultant in Mohali, including client handling and documentation guidance.";
        }

        if (/\b(projects?|mock interview|interview|ai)\b/.test(normalizedQuestion)) {
            return "Gunjan's college project is an AI-powered mock interview website, designed around interviewer and candidate interactions.";
        }

        if (/\b(skills?|technical|html|css|javascript|editing|strengths?)\b/.test(normalizedQuestion)) {
            return "Gunjan's skills include HTML, CSS, basic JavaScript, web development, and basic editing. Her strengths include teamwork, communication, and learning quickly.";
        }

        if (/\b(designs?|posters?|creative|branding|social media|marketing)\b/.test(normalizedQuestion)) {
            return "Gunjan's creative work includes poster design, social media graphics, and branding. She is also interested in digital marketing and content creation.";
        }

        if (/\b(gunjan|about|who)\b/.test(normalizedQuestion)) {
            return "Gunjan Rai is a BCA graduate from Patiala interested in creative design, digital marketing, and web development.";
        }

        return "I can answer questions about Gunjan's education, experience, projects, skills, creative work, or contact details.";
    }

    chatLauncher.addEventListener("click", () => {
        chatPanel.hidden = false;
        chatLauncher.setAttribute("aria-expanded", "true");
        chatInput.focus();
    });

    chatClose.addEventListener("click", () => {
        chatPanel.hidden = true;
        chatLauncher.setAttribute("aria-expanded", "false");
        chatLauncher.focus();
    });

    chatConsent.addEventListener("change", updateChatControls);

    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const question = chatInput.value.trim();

        if (!question || requestInProgress || conversationFinished) {
            return;
        }

        conversation.push({ role: "user", content: question });
        appendChatMessage("user", question);
        chatInput.value = "";
        chatStatus.textContent = "Thinking...";
        requestInProgress = true;
        updateChatControls();

        try {
            const result = await postChatRequest("/api/chat", { messages: conversation });
            if (typeof result.reply !== "string" || !result.reply.trim()) {
                throw new Error("The assistant returned an empty reply.");
            }

            const reply = result.reply.trim();
            conversation.push({ role: "assistant", content: reply });
            appendChatMessage("assistant", reply);
            chatStatus.textContent = "";
        } catch {
            const reply = getLocalChatReply(question);
            conversation.push({ role: "assistant", content: reply });
            appendChatMessage("assistant", reply);
            chatStatus.textContent = "AI assistant unavailable; using built-in portfolio answers.";
        } finally {
            requestInProgress = false;
            updateChatControls();
            chatInput.focus();
        }
    });

    chatFinish.addEventListener("click", async () => {
        if (!chatConsent.checked || requestInProgress || conversationFinished) {
            return;
        }

        requestInProgress = true;
        chatStatus.textContent = "Sending your summary...";
        updateChatControls();

        try {
            const result = await postChatRequest("/api/finish", {
                messages: conversation,
                consent: true
            });

            conversationFinished = true;
            chatStatus.textContent = result.message || "Summary emailed. Thank you.";
        } catch (error) {
            chatStatus.textContent = error.message;
        } finally {
            requestInProgress = false;
            updateChatControls();
        }
    });

    updateChatControls();
}