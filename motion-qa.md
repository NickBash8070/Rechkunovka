# Motion verification — 2026-10-12

Implementation covers one semantic responsive document with 16 sections. Headings and paragraphs are whole text blocks with natural wrapping. Normal-flow grid/flex layouts replace PDF line coordinates. Fonts, content, anchors, diagrams and photographic artwork are preserved.

- 21 meaningful numeric values in the shared document: land areas, travel distances/time, resort capacity/category/areas, concept-page count and market indicators. Cadastral IDs, phone numbers, dates and numbered lists remain static.
- Reserved original text width prevents numeric layout shifts. Visible animated values are hidden from assistive technology; the original final text remains available.
- One IntersectionObserver starts entrances and counters only in view, then unobserves each item. One shared requestAnimationFrame loop handles active counters. Numeric identity is retained across desktop/mobile changes.
- Headings, body text, statistical blocks, cards, conceptual previews, location diagrams, CTA, contact content and agency footer use the same easing and a capped stagger. Existing full-bleed photographic backgrounds remain stable for readability. Only the location diagram uses the artwork reveal; photographic backgrounds remain stable.
- Hero stages: headline, supporting copy, key statistics, additional visual/control elements. No parallax, bounce or perpetual marker animation.
- Initial and live prefers-reduced-motion preferences show final content immediately. Missing IntersectionObserver leaves content visible. Keyboard focus reveals its target immediately.
- Native dialog gallery retains click-only video loading and unloads playback when closed. Anchor navigation retains the existing distance-based scroll and cancellation behavior.

Validation: production build successful; 2 semantic-structure tests, 4 motion tests and 4 existing packaging/serving tests and 3 existing phone/navigation tests passed (13 total). Structure tests cover intact headings across all 16 sections, removal of positioned PDF text, unique KPI identities and retention of CTA markup. Motion tests cover formatting, once-only execution, final values, shared scheduler termination, reduced motion and observer fallback.

Limitation: full visual/browser verification is pending because browser auto-review denied localhost access based on an earlier browser-policy refusal. No attempt was made to bypass that restriction for this motion task.
