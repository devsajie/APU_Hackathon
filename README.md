# LBEF/APU Hackathon Website 2026

Event website for the LBEF/APU Hackathon, organized by Lord Buddha Education Foundation (LBEF) in Kathmandu, Nepal, and Asia Pacific University of Technology & Innovation (APU) in Kuala Lumpur, Malaysia.

The website provides event information, registration details, resources, and interactive features for participants.

## Technologies Used
- **Structure**: HTML5 (Semantic elements)
- **Styling**: CSS3 (CSS Variables, Grid, Flexbox, Media Queries)
- **Interactions**: Vanilla JavaScript (no external libraries or frameworks)

## Key Interactivity Features
1. **Responsive Mobile Menu**: Hamburger menu toggling using vanilla JavaScript.
2. **Countdown Timer**: Real-time countdown to November 30, 2026.
3. **Challenge Category Filtering**: Dynamic cards filter matching category tags.
4. **Workshop Details**: Poster-matched workshop details in an accessible modal.
5. **Registration Validation**: Client-side checks for team details, team size, email, phone, and terms.
6. **FAQ Accordion**: Keyboard-operable, single-item accordion with animated expansion.
7. **Gallery Lightbox Modal**: Custom modal opening and overlay close handlers.
8. **Form Validation and EmailJS**: Contact and registration forms validate locally. To send submissions, add the EmailJS public key, service ID, and template ID to `emailJsConfig` in `js/script.js`; without these settings, forms explain that email delivery is unavailable and do not send or store information.
9. **Theme Preference**: Light/dark mode preference is saved in `localStorage`.

## File Structure
- `index.html` (Home)
- `about.html` (About)
- `schedule.html` (Schedule)
- `challenges.html` (Challenges)
- `workshops.html` (Workshops)
- `rules.html` (Rules & Eligibility)
- `register.html` (Registration)
- `resources.html` (Resources)
- `gallery.html` (Gallery)
- `news.html` (News & Updates)
- `faq.html` (FAQ)
- `contact.html` (Contact)
- `sponsors.html` (Sponsors & Partners)
- `feedback.html` (Feedback)
- `css/style.css` (Main stylesheet)
- `js/script.js` (Interactions)
- `images/` (Project graphic assets and supplied logos)

## Forms
Contact and registration forms validate entries in the browser. Email delivery requires the EmailJS settings in `js/script.js`.
