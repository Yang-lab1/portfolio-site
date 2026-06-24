# Daima Works Showcase Replica Notes

## Source Target

- URL: `https://wearedaima.framer.website/`
- Section: four work panels after the intro/service blocks.
- Desktop viewport sampled at `1440 x 900`.
- Mobile viewport sampled at `390 x 844`.

## Desktop Behavior

- Each work item is a full-viewport clickable panel: `100vw x 100vh`.
- The visible content sits inside an internal `position: sticky; top: 0` viewport.
- Page scroll is Lenis-smoothed and ScrollTrigger values are synced to the smooth-scroll frame.
- Image is a tall clipped layer: source measured approximately `1440 x 1060` inside a `900px` viewport.
- Image itself is not scaled or filtered; the wrapper moves vertically for parallax.
- Title uses a clipped window around `72.8px` high with two duplicate title rows.
- Hover/focus rolls the title track upward by one text row.
- Category text moves on its own scroll layer, separate from the title.
- The fixed site header should remain present but become weak/transparent while this section is active.

## Local Mapping

- `NovaTech Rebrand / Branding` opens `miro`.
- `Finverse Marketing Website / Web Design` opens `palifood`.
- `Medlink Mobile App / Mobile App Design` opens `libai`.
- `Orbit SaaS Dashboard / UI Design` opens `offer-quest`.

## Mobile Behavior

- Source mobile panels are compact work tiles around `390 x 480`, not full `844px` viewport panels.
- Mobile text is left aligned with roughly `24px` side padding.
- Mobile title uses approximately `32px / 44.8px`, medium weight.

## Verification Targets

- Desktop panel rect is full viewport.
- `.daima-work-panel__sticky` is sticky.
- `.daima-work-panel__title-window` clips duplicate title rows.
- Hover changes `.daima-work-panel__title-track` transform by one row.
- `.daima-work-panel__image` has no scale/filter transform.
- Mobile panel height is `480px` and no horizontal overflow appears.
