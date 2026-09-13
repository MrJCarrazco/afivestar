# PLACEHOLDERS — swap these before sharing widely

Every placeholder below is also marked in the HTML with a `<!-- JUAN: replace -->` comment right next to it.

## 1. Phone number — currently `(907) 555-0155` / `tel:+19075550155`
Appears in ALL FOUR pages (index.html, services.html, gallery.html, contact.html) in these spots:
- Header nav CTA button
- Hero "Call" button (index only)
- Quote-section lead text
- CTA band button
- Footer "Contact" column
- Sticky "Call Now" floating button (bottom of every page)

Find-and-replace both forms: `(907) 555-0155` and `+19075550155`.

## 2. Email — currently `quotes@afivestar.com`
Appears in ALL FOUR pages:
- Quote form `action="https://formsubmit.co/quotes@afivestar.com"` — swap the address in the URL; the first submission after the swap triggers a one-time FormSubmit confirmation email, then leads flow to your inbox automatically.
- `mailto:` fallback link under each form ("Form not working? Email us directly")
- Footer "Contact" column
- index.html JSON-LD schema (`"email": "quotes@afivestar.com"`, `"telephone": "+1-907-555-0155"`)

## 3. License / Bonded / Insured
- "Licensed · Bonded · Insured" appears in the hero trust row, the trust strip (index), and every footer. Add the real Alaska contractor license number (e.g. "AK Lic. #XXXXXX") once available — or remove any claim that isn't accurate yet.

## 4. Testimonials (index.html, "What Clients Say" section)
All three review cards are SAMPLE TEXT, clearly captioned "Sample Review — placeholder text" on the page. Replace with real customer quotes (with permission) and real names/cities, then delete the "Sample Review" captions.

## 5. Domain / URLs
All canonical URLs, OG tags, JSON-LD, sitemap.xml, and robots.txt currently point to `https://mrjcarrazco.github.io/afivestar/`. If you buy a custom domain (e.g. afivestarak.com), replace that base URL in: all four HTML `<head>` sections, sitemap.xml, and robots.txt.

## 6. Gallery photos
gallery.html currently uses animated illustrations and says "Project photos from real Alaska jobs are coming soon." Add real before/after job photos when available.
