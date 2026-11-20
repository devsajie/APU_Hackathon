/**
 * Handles navigation, event details, forms, and page interactions.
 */

const emailJsConfig = {
    publicKey: 'JyVAvHGxP67TwHDjh',
    serviceId: 'service_fijnqd3',
    confirmationTemplateId: 'template_486d4bg',
    adminTemplateId: 'template_d6k5btg',
    adminEmail: 'guinpen787@gmail.com'
};

const isConfigured = (value) => value && !value.startsWith('YOUR_EMAILJS_');
const isEmailJsConfigured = () => isConfigured(emailJsConfig.publicKey) && isConfigured(emailJsConfig.serviceId);
const isRegistrationConfigured = () => isEmailJsConfigured()
    && isConfigured(emailJsConfig.confirmationTemplateId)
    && isConfigured(emailJsConfig.adminTemplateId);
const isContactConfigured = () => isEmailJsConfigured() && isConfigured(emailJsConfig.templateId);

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Navigation, More Menu & Hamburger Menu
    // ==========================================
    const hamburger = document.getElementById('hamburgerToggle');
    const navMenu = document.getElementById('navMenu');
    const moreToggle = document.querySelector('.dropdown-toggle');
    const moreMenu = moreToggle ? moreToggle.closest('.dropdown') : null;

    if (hamburger && navMenu) {
        hamburger.setAttribute('aria-controls', navMenu.id);
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(navMenu.classList.contains('active')));
        });
        window.addEventListener('resize', () => {
            document.querySelectorAll('.faq-item.active .faq-answer').forEach((answer) => {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            });
        });
    }

    const videoFrame = document.querySelector('.video-responsive-container iframe[data-video-src]');
    const videoFallback = document.getElementById('videoEmbedFallback');
    if (videoFrame && videoFallback) {
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            videoFrame.src = videoFrame.dataset.videoSrc;
            videoFrame.hidden = false;
        } else {
            videoFallback.hidden = false;
        }
    }

    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }

        if (moreMenu && moreToggle && !moreMenu.contains(e.target)) {
            moreMenu.classList.remove('open');
            moreToggle.setAttribute('aria-expanded', 'false');
        }
    });

    if (moreToggle && moreMenu) {
        moreToggle.setAttribute('role', 'button');
        moreToggle.setAttribute('aria-haspopup', 'true');
        moreToggle.setAttribute('aria-expanded', 'false');
        moreToggle.setAttribute('aria-controls', moreMenu.querySelector('.dropdown-menu').id || 'moreMenu');
        if (!moreMenu.querySelector('.dropdown-menu').id) {
            moreMenu.querySelector('.dropdown-menu').id = 'moreMenu';
        }
        moreToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = moreMenu.classList.toggle('open');
            moreToggle.setAttribute('aria-expanded', String(isOpen));
        });
        moreToggle.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                e.preventDefault();
                moreToggle.click();
            }
        });

        moreMenu.querySelectorAll('.dropdown-menu a').forEach((link) => {
            link.addEventListener('click', () => {
                moreMenu.classList.remove('open');
                moreToggle.setAttribute('aria-expanded', 'false');
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && moreMenu && moreToggle) {
            moreMenu.classList.remove('open');
            moreToggle.setAttribute('aria-expanded', 'false');
            moreToggle.focus();
        }
    });


    // ==========================================
    // 2. Countdown Timer (Homepage)
    // ==========================================
    const countdownContainer = document.getElementById('countdownGrid');
    if (countdownContainer) {
        const eventDate = new Date('2026-11-30T09:00:00+05:45').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference <= 0) {
                // Event started
                if (document.getElementById('countdownTitle')) {
                    document.getElementById('countdownTitle').textContent = "HACKATHON IS NOW LIVE!";
                }
                countdownContainer.style.display = 'none';
                clearInterval(timerInterval);
                return;
            }

            // Calculations for days, hours, minutes, and seconds
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Output the results
            const daysEl = document.getElementById('timerDays');
            const hoursEl = document.getElementById('timerHours');
            const minutesEl = document.getElementById('timerMinutes');
            const secondsEl = document.getElementById('timerSeconds');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        };

        // Run immediately then every second
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }


    // ==========================================
    // 3. Challenge Filtering (Challenges Page)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const challengeCards = document.querySelectorAll('.challenge-card');

    if (filterButtons.length > 0 && challengeCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                const selectedCategory = button.getAttribute('data-filter');

                // Filter card logic
                challengeCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }


    // ==========================================
    // 4. Registration Form Validation and Submission
    // ==========================================
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const submitButton = registerForm.querySelector('button[type="submit"]');
        registerForm.querySelectorAll('input, select, textarea').forEach((field) => {
            const clearFieldError = () => {
                field.removeAttribute('aria-invalid');
                const errorAlert = document.getElementById('errorAlert');
                if (errorAlert) errorAlert.style.display = 'none';
            };
            field.addEventListener('input', clearFieldError);
            field.addEventListener('change', clearFieldError);
        });

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const successAlert = document.getElementById('successAlert');
            const errorAlert = document.getElementById('errorAlert');
            if (successAlert) successAlert.style.display = 'none';
            if (errorAlert) errorAlert.style.display = 'none';

            const values = {
                team_name: document.getElementById('teamName').value.trim(),
                leader_name: document.getElementById('leaderName').value.trim(),
                student_id: document.getElementById('studentId').value.trim(),
                leader_email: document.getElementById('email').value.trim(),
                leader_phone: document.getElementById('phone').value.trim(),
                member_count: document.getElementById('memberCount').value,
                challenge_category: document.getElementById('category').value,
                team_members: document.getElementById('teamMembers').value.trim(),
                project_idea: document.getElementById('projectIdea').value.trim(),
                terms_agreed: document.getElementById('termsCheckbox').checked ? 'Yes' : 'No'
            };
            const memberNames = values.team_members.split(/[,\n]/).map((name) => name.trim()).filter(Boolean);

            const validationError = (() => {
                if (!values.team_name) return ['teamName', 'Enter a team name.'];
                if (!values.leader_name) return ['leaderName', 'Enter the team leader’s full name.'];
                if (!values.student_id) return ['studentId', 'Enter the team leader’s student ID.'];
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.leader_email)) return ['email', 'Enter a valid email address.'];
                if (!/^\+?[\d\s()-]{7,20}$/.test(values.leader_phone)) return ['phone', 'Enter a valid phone number.'];
                if (!['2', '3', '4'].includes(values.member_count)) return ['memberCount', 'Choose a team size from 2 to 4 members.'];
                if (!values.challenge_category) return ['category', 'Choose a challenge category.'];
                if (memberNames.length !== Number(values.member_count) - 1) {
                    return ['teamMembers', `Enter the names of the other ${Number(values.member_count) - 1} team member(s), separated by commas.`];
                }
                if (values.project_idea.length < 10) return ['projectIdea', 'Describe your project idea in at least 10 characters.'];
                if (values.terms_agreed !== 'Yes') return ['termsCheckbox', 'Agree to the hackathon rules before submitting.'];
                return null;
            })();

            if (validationError) {
                const [fieldId, message] = validationError;
                const field = document.getElementById(fieldId);
                if (field) {
                    field.setAttribute('aria-invalid', 'true');
                    field.focus();
                }
                showError(message);
                return;
            }

            if (!isRegistrationConfigured()) {
                if (successAlert) {
                    successAlert.textContent = 'Your registration details passed validation. Email delivery is not configured. Add the public key, service ID, confirmation template ID, and admin template ID in js/script.js to enable delivery.';
                    successAlert.style.display = 'block';
                }
                registerForm.scrollIntoView({ behavior: 'smooth' });
                return;
            }

            if (!window.emailjs) {
                showError('EmailJS could not be loaded. Check your internet connection and try again; your entries have been kept.');
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }

            try {
                const emailValues = {
                    ...values,
                    admin_email: emailJsConfig.adminEmail
                };

                await Promise.all([
                    window.emailjs.send(
                        emailJsConfig.serviceId,
                        emailJsConfig.confirmationTemplateId,
                        emailValues
                    ),
                    window.emailjs.send(
                        emailJsConfig.serviceId,
                        emailJsConfig.adminTemplateId,
                        emailValues
                    )
                ]);

                if (successAlert) {
                    successAlert.textContent = 'Registration submitted successfully. Confirmation sent to the team leader email and organizer notified.';
                    successAlert.style.display = 'block';
                }
                registerForm.reset();
            } catch (error) {
                console.error('EmailJS registration submission failed:', error);
                showError('We could not send your registration. Please check your connection and try again; your entries have been kept.');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit Registration';
                }
                registerForm.scrollIntoView({ behavior: 'smooth' });
            }
        });

        function showError(message) {
            const errorAlert = document.getElementById('errorAlert');
            if (errorAlert) {
                errorAlert.textContent = message;
                errorAlert.style.display = 'block';
            }
            registerForm.scrollIntoView({ behavior: 'smooth' });
        }
    }


    // ==========================================
    // 5. FAQ Accordion (FAQ Page)
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach((question, index) => {
            const parent = question.closest('.faq-item');
            const answer = parent ? parent.querySelector('.faq-answer') : null;
            if (!parent || !answer) return;

            const answerId = answer.id || `faq-answer-${index + 1}`;
            answer.id = answerId;
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-controls', answerId);
            question.setAttribute('aria-expanded', 'false');

            const toggleQuestion = () => {
                const willOpen = !parent.classList.contains('active');
                document.querySelectorAll('.faq-item.active').forEach((item) => {
                    if (item !== parent) {
                        item.classList.remove('active');
                        const openQuestion = item.querySelector('.faq-question');
                        const openAnswer = item.querySelector('.faq-answer');
                        if (openQuestion) openQuestion.setAttribute('aria-expanded', 'false');
                        if (openAnswer) openAnswer.style.maxHeight = '0px';
                    }
                });

                parent.classList.toggle('active', willOpen);
                question.setAttribute('aria-expanded', String(willOpen));
                answer.style.maxHeight = willOpen ? `${answer.scrollHeight}px` : '0px';
            };

            question.addEventListener('click', toggleQuestion);
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleQuestion();
                }
            });
        });
    }


    // ==========================================
    // 6. Gallery Lightbox Modal (Gallery Page)
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    if (galleryItems.length > 0 && modal && modalImage && modalCaption && modalClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-overlay h3').textContent;
                const category = item.querySelector('.gallery-overlay span').textContent;

                modal.style.display = 'flex';
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalCaption.textContent = `${title} (${category})`;
            });
        });

        // Close modal when close button is clicked
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }


    // ==========================================
    // 7. Workshop Details Modal
    // ==========================================
    const workshopButtons = document.querySelectorAll('.workshop-details-button');
    const workshopModal = document.getElementById('workshopModal');
    const workshopModalClose = document.getElementById('workshopModalClose');
    const workshopModalImage = document.getElementById('workshopModalImage');
    const workshopModalHeader = document.getElementById('workshopModalHeader');
    const workshopModalBadge = document.getElementById('workshopModalBadge');
    const workshopModalTitle = document.getElementById('workshopModalTitle');
    const workshopModalSubtitle = document.getElementById('workshopModalSubtitle');
    const workshopModalDetails = document.getElementById('workshopModalDetails');
    let activeWorkshopButton = null;

    const workshopInformation = {
        ai: {
            title: 'Explore BEST AI COURSES in Nepal',
            image: 'images/workshops/ai.png'
        },
        cloud: {
            title: 'AWS STUDENT COMMUNITY DAY KATHMANDU 2026',
            image: 'images/workshops/cloud.png',
            details: [
                ['Logo Text', 'AWS Student Builder Group LBEF'],
                ['Location', 'LBEF College, Maitidevi, Kathmandu'],
                ['Contact Email', 'awssbg.lbef@gmail.com'],
                ['Social Media', 'AWS SBG at LBEF']
            ]
        },
        cyber: {
            header: 'LBEF CYBER SECURITY CLUB (AWARENESS • DEFENSE • UNITY) PRESENTS',
            title: "Girls' in Cybersecurity",
            subtitle: 'WOMENS ONLY',
            image: 'images/workshops/cyber.png',
            details: [
                ['Location', 'Block B, Seminar Hall, LBEF College, Maitidevi']
            ]
        },
        web: {
            header: 'LBEF COLLEGE (SINCE 1998) — THE FIRST IT COLLEGE OF NEPAL\nA P U (ASIA PACIFIC UNIVERSITY OF TECHNOLOGY & INNOVATION)\nLBEF CYBER SECURITY CLUB (AWARENESS • DEFENSE • UNITY)',
            title: 'Ethical Hacking & Web Application Penetration Testing',
            badge: '8 HRS WORKSHOP',
            subtitle: 'For Students',
            image: 'images/workshops/web.png',
            details: [
                ['Location', 'Tamor Hall, Kathmandu Block, LBEF College, Maitidevi'],
                ['Secondary Logo', 'EVOLVE with LBEF'],
                ['Footer', 'Maitidevi, Kathmandu, Nepal']
            ]
        }
    };

    const closeWorkshopModal = () => {
        if (!workshopModal || workshopModal.hidden) return;
        workshopModal.hidden = true;
        workshopModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (activeWorkshopButton) activeWorkshopButton.focus();
    };

    if (workshopModal && workshopModalClose && workshopModalImage && workshopModalHeader && workshopModalBadge &&
        workshopModalTitle && workshopModalSubtitle && workshopModalDetails) {
        workshopButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const workshop = workshopInformation[button.dataset.workshopDetails];
                if (!workshop) return;

                activeWorkshopButton = button;
                workshopModalImage.src = workshop.image;
                workshopModalImage.alt = `${workshop.title} poster`;
                workshopModalHeader.textContent = workshop.header || '';
                workshopModalHeader.hidden = !workshop.header;
                workshopModalBadge.textContent = workshop.badge || '';
                workshopModalBadge.hidden = !workshop.badge;
                workshopModalTitle.textContent = workshop.title;
                workshopModalSubtitle.textContent = workshop.subtitle || '';
                workshopModalSubtitle.hidden = !workshop.subtitle;
                workshopModalDetails.replaceChildren();

                (workshop.details || []).forEach(([label, value]) => {
                    const term = document.createElement('dt');
                    const description = document.createElement('dd');
                    term.textContent = label;
                    description.textContent = value;
                    workshopModalDetails.append(term, description);
                });

                workshopModal.hidden = false;
                workshopModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                workshopModalClose.focus();
            });
        });

        workshopModalClose.addEventListener('click', closeWorkshopModal);
        workshopModal.addEventListener('click', (e) => {
            if (e.target === workshopModal) closeWorkshopModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeWorkshopModal();
        });
    }


    // ==========================================
    // 8. Contact Form Validation and EmailJS
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        contactForm.querySelectorAll('input, textarea').forEach((field) => {
            field.addEventListener('input', () => {
                field.removeAttribute('aria-invalid');
                const errorAlert = document.getElementById('contactError');
                if (errorAlert) errorAlert.style.display = 'none';
            });
        });
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const successAlert = document.getElementById('contactSuccess');
            const errorAlert = document.getElementById('contactError');

            if (successAlert) successAlert.style.display = 'none';
            if (errorAlert) errorAlert.style.display = 'none';

            const values = {
                from_name: document.getElementById('contactName').value.trim(),
                reply_to: document.getElementById('contactEmail').value.trim(),
                subject: document.getElementById('contactSubject').value.trim(),
                message: document.getElementById('contactMessage').value.trim()
            };
            const invalidField = Object.entries(values).find(([, value]) => !value);

            if (invalidField || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.reply_to)) {
                const fieldId = invalidField
                    ? { from_name: 'contactName', reply_to: 'contactEmail', subject: 'contactSubject', message: 'contactMessage' }[invalidField[0]]
                    : 'contactEmail';
                const field = document.getElementById(fieldId);
                if (field) {
                    field.setAttribute('aria-invalid', 'true');
                    field.focus();
                }
                if (errorAlert) {
                    errorAlert.textContent = invalidField ? 'Please complete every field.' : 'Enter a valid email address.';
                    errorAlert.style.display = 'block';
                }
                return;
            }

            if (!isContactConfigured()) {
                if (successAlert) {
                    successAlert.textContent = 'Your message passed validation. Email delivery is not configured. Add your EmailJS public key, service ID, and contact template ID in js/script.js to enable delivery.';
                    successAlert.style.display = 'block';
                }
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }
            try {
                await window.emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, values);
                if (successAlert) {
                    successAlert.textContent = `Thank you, ${values.from_name}. Your message has been sent.`;
                    successAlert.style.display = 'block';
                }
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS contact submission failed:', error);
                if (errorAlert) {
                    errorAlert.textContent = 'We could not send your message. Please check your connection and try again; your entries have been kept.';
                    errorAlert.style.display = 'block';
                }
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            }
        });
    }


    // ==========================================
    // 8. Feedback Form Confirmation (Feedback Page)
    // ==========================================
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const successAlert = document.getElementById('feedbackSuccess');
            const errorAlert = document.getElementById('feedbackError');

            if (successAlert) successAlert.style.display = 'none';
            if (errorAlert) errorAlert.style.display = 'none';

            const name = document.getElementById('feedbackName').value.trim();
            const rating = document.querySelector('input[name="rating"]:checked');
            const experience = document.getElementById('experience').value;
            const comments = document.getElementById('comments').value.trim();

            if (!rating || !experience || !comments) {
                if (errorAlert) {
                    errorAlert.textContent = "ERROR: Please complete the required feedback fields.";
                    errorAlert.style.display = 'block';
                }
                return;
            }

            if (successAlert) {
                successAlert.textContent = `Thank you ${name ? name : 'Valued Participant'}! Your feedback has been submitted successfully.`;
                successAlert.style.display = 'block';
            }
            feedbackForm.reset();
        });
    }

    // ==========================================
    // 9. Dark Mode Toggle with LocalStorage
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('site-theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    const updateThemeButton = () => {
        if (!themeToggleBtn) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeToggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    };
    updateThemeButton();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('site-theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('site-theme', 'dark');
            }
            updateThemeButton();
        });
    }

    // ==========================================
    // 10. EmailJS Initialization
    // ==========================================
    if (isEmailJsConfigured() && window.emailjs) {
        try {
            window.emailjs.init({ publicKey: emailJsConfig.publicKey });
        } catch (error) {
            console.error('EmailJS initialization failed:', error);
        }
    }
});
