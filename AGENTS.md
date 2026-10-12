# Prototype Instructions

User-approved proximity audit (2026-10-12): preserve the existing 8/16/24/32/48/64/96/128px spacing scale, the 24px shared card gap, breakpoints, container widths, side gutters, card dimensions, typography and composition. Use tighter gaps for label/heading and heading/description within a text group, larger gaps to the next content group, and the existing section rhythm for separate sections. Audit the relationships in each component rather than applying one mechanical gap rule across the site.

User-approved spacing system refactor (2026-10-12): use only the shared --space-1…--space-8 scale (8, 16, 24, 32, 48, 64, 96, 128px) for spacing properties. Set section rhythm to 128px on large desktop, 96px on laptop/tablet, and 64px on mobile; use 32px card padding on desktop and 24px from tablet down. Keep the existing responsive --mobile-space page gutter exactly unchanged, including full-bleed compensating margins. Preserve component geometry/control sizes and only allow justified optical/layout exceptions. Validate all requested desktop, tablet and mobile widths.

User-approved unified card spacing (2026-10-12): use `--card-gap` (24px) for the gap between every adjacent card across the site, in both axes and at every breakpoint. Apply it to statistic tiles, plot cards, concept/campus/format/offer grids and media thumbnail grids; do not vary it by viewport. Keep card padding and surrounding section/layout gaps semantically separate.

User-approved hero title line break (2026-10-12): keep the main heading on exactly two lines: «РЕЧКУНОВСКАЯ» and «ЗОНА ОТДЫХА». Use explicit block spans with no internal wrapping; at <=370px use clamp(27px,8.5vw,31px) to fit the full first word without horizontal overflow. Preserve the original spelling and all other hero content.

User-approved subdued provenance and customer notes (2026-10-12): use a shared --note-opacity of .45 for small section footer captions, asset/source notes, hotel source credit, potential customer-estimate note, housing customer-information label and market reach/source footnotes. Apply to the notes themselves rather than entire sections or footer content; preserve existing typography and colors. This unifies and supersedes the former .6 AI-caption opacity. Leave interface labels, forms, CTA text and existing legal-link behavior unchanged.

User-approved stronger video gallery backdrop (2026-10-12): use a 92% opaque dark green/black modal backdrop with 18px backdrop blur (including WebKit support). Scope to .dialog.video-dialog::backdrop so the general dialog rule does not override it. Preserve straight video/thumbnail edges, existing gallery layout and playback behavior; the user's proposed rounded corners were explicitly withdrawn.

User-approved hero video preview and first-screen fit (2026-10-12): remove stale black-bar preview caching with content-hashed WebP poster filenames, preserving source MP4s. Increase the hero image from 359/128 to 16/9, with proportional object-fit:cover and no black sidebars. Match video CTA typography exactly to the hero KPI captions (Nimbus Sans Regular, 14px desktop/tablet; both 12px on phones <=650px, shared tracking/line-height). On phones use a compact horizontal preview/text card, three KPI columns and reduced vertical gaps; on short screens tighten spacing further without hiding content. Fit all hero content within tested first screens 320×568, 390×844, 768×1024, 1280×720 and 1992×956. Use a soft hyphen in the long hero health-purpose caption for clean narrow wrapping. This supersedes prior hero preview aspect-ratio/18px CTA and large vertical spacing decisions.

User-approved new video sources and strict Play-only loading (2026-10-12): replace the old repeated video and JPEG previews with all seven distinct *_1.mp4 files directly in video/Бердск (six DJI clips plus the territory overview), copied unchanged to public/videos with separate optimized WebP posters. Keep MP4 moov-before-mdat fast-start layout and source files untouched. The hero opens the existing dark gallery with seven previews; opening/selecting a preview loads only its poster. Assign native video src from data-src only on explicit Play, with preload=none, muted/playsInline/native controls, calm loading indicator, retry and autoplay-policy fallback. Keep one active player and unload it on selection change/close. Crop only the DJI's baked-in 160px sidebars visually via native video object-fit:cover in a 4:3 box and in posters; preserve the full 16:9 territory overview. Preserve gallery styling and hero card dimensions. Remove obsolete public/video assets. Locally verify HTTP 206/Accept-Ranges for all seven; verify actual hosting Range support after publication.

User-approved market range number enlargement (2026-10-12): render the third market KPI as separately animated «80–100» and a baseline-aligned «тыс.» suffix. Use clamp(42px,3.5vw,65px) for numbers, matching other desktop KPIs while keeping them larger than the retained suffix on small screens. Retain the suffix's previous responsive font size and Nimbus Sans face. Preserve the full accessible text and existing counter identity.

User-approved animated and enlarged plot outlines (2026-10-12): both plot SVGs draw their original visible contour once over 1.6s when the card enters view, then fade their existing fill in over 0.6s. Mark only the displayed contour and fill paths, normalize stroke length via pathLength=1 and preserve source geometry/colors. Use existing card reveal timing, with immediate static artwork for reduced-motion. Enlarge both visual caps from 230 to 280px and mobile width from 110 to 140px, giving the desktop visual column more room (1.15fr/1fr). Preserve text, links and responsive card layout.

User-approved repeating location marker pulse (2026-10-12): make the map's project marker continuously noticeable using a 2.2s expanding/fading accent ring (scale 1 to 1.7, 2px non-scaling stroke) and a subtle center-dot pulse (scale 1 to 1.18). Preserve marker coordinates, map labels and leader line on every viewport. Respect prefers-reduced-motion with a static visible marker. This supersedes the former single-entry-only location marker animation.

User-approved nature feature text spacing (2026-10-12): reduce the gap between the headings and subtitles in both nature feature columns («Сосновый бор / характер места» and «Берег Берди / связь с водой») from 15px to 6px at every viewport. Preserve font sizes, inter-column spacing and icon placement.

User-approved resort concept pictogram alignment (2026-10-12): raise all four #resort-concept statistic card icons by 5px relative to their existing centered position at every viewport. Preserve their optical sizes, shapes, grid slots, numbers and captions.

User-approved location statistic cards (2026-10-12): make the three location distance/time statistics separate cards with the existing green surface background, 24px padding and 16px gaps. Match their number size to the resort concept statistics via shared --text-stat-concept (clamp(26px,2.2vw,44px), 42px at <=600px). Preserve the existing P052 number face, text and order. Stack the three cards on phones <=600px, including <=370px, and retain three columns above that width.

User-approved header request arrow optical alignment (2026-10-12): offset the shared arrow in .header-desktop .header-request upward by 2px so its visual center aligns with the uppercase label. Preserve the ArrowIcon geometry, size, stroke, color and horizontal hover translation. Scope this optical adjustment to the header request link.

User-approved flush map frame and shorter pointer (2026-10-12): crop location-map.svg to the bitmap bounds with viewBox 15 10 770 735 and matching map-panel ratio, removing the remaining empty edge strips. Shorten only the horizontal location leader endpoint from source x1510 to x1475 so it stops 20 SVG units inside the right frame. Preserve map markers, city labels, source credit and 2px frame on all devices. This supersedes the previous right-only crop.

User-approved location map right-edge crop (2026-10-12): crop the empty right strip of location-map.svg by changing its width/viewBox from 810 to 785 while retaining the 750 height and original map geometry. Match .map-panel aspect-ratio to 785/750 and contain overflow so the original callout line ends at the frame. Preserve city labels, map credit and the 2px accent frame at every viewport. This supersedes the previous 810/750 map frame ratio.

User-approved location map frame (2026-10-12): add a visible rectangular 2px border in the site's accent color around .map-panel. Keep the complete map, proportional 810/750 layout and existing labels; preserve the same border thickness on desktop, tablet and mobile, with border-box sizing so the frame fits the available width. The red screenshot outline indicates the frame location, not a new brand color.

User-approved hero generation caption size (2026-10-12): use exactly 12px for the generation-credit caption in #home at every viewport, sharing the existing generation-credit rule. Remove the former 14px hero exception; preserve opacity, color, tracking and placement.

User-approved market footer caption removal (2026-10-12): remove the «Речкуновская зона отдыха / Инвестиционная концепция» section footer from #market only. Preserve the reach estimate, source footnotes and corresponding captions in other sections.

User-approved market heading baseline alignment (2026-10-12): align the last text baseline of «Большой рынок. Загородный ритм.» with the last line of the adjacent Novosibirsk/Berdsk/Academgorodok context paragraph using grid align-items:last baseline. Keep typography, text, column widths and gaps. Retain natural stacked layout on mobile.

User-approved factual photo caption size (2026-10-12): use exactly 12px for «Фактическая фотография из материалов заказчика» in the #next-step section footer at every viewport. Preserve its color, tracking and placement.

User-approved investment concept footer size (2026-10-12): every occurrence of the footer caption «Речкуновская зона отдыха / Инвестиционная концепция» uses exactly 12px at all viewport sizes. Use the shared investment-credit classification rather than section-specific overrides; preserve color, tracking and spacing.

User-approved housing icon/title line alignment (2026-10-12): vertically center housing format pictograms against the heading's first line, rather than aligning the top of the 32px icon box with the text. Use half the difference between the current title line-height and icon height as the icon's block offset. Preserve optical icon sizes, heading typography and card content. Retain the above-title mobile layout at 371–650px; apply the matching 20px title correction in the side-by-side layout at 370px and below.

User-approved subdued footer legal links (2026-10-12): both legal document links in the agency footer use 30% resting opacity, returning to full opacity on hover or keyboard focus. Preserve link behavior, underline and focus indicators; scope this to footer links, leaving form consent text readable.

User-approved personal-data form changes (2026-10-12): add a separate unchecked required consent checkbox before the request button, with links to /privacy and /personal-data-consent in new tabs and the agency footer. Use 18px accessible native checkbox with project styling and 13px legal text. Show linked inline errors, loading/duplicate protection and recoverable request errors. Preserve existing 56px fields/button, 16px input text and required name/phone. The site has no submission API: report request preparation, not delivery; add privacyConsent, document versions and UTC consentDate to the manually sent email. Do not store personal data in browser storage. Legal pages use src/legal/operator.js placeholders for verified operator identity, email, processors, storage and protections; they remain drafts until those facts are confirmed. Do not assume project manager contact is the legal operator.

User-approved single-line manager caption (2026-10-12): display «Руководитель проекта Бурдэ Алексей» as one paragraph, in sentence case and one shared Nimbus Sans Regular style/size (clamp(14px,1.2vw,20px)). Keep it on one line at every viewport; replace the separate uppercase eyebrow and larger name.

User-approved matching manager contact sizes (2026-10-12): the email and phone links in .manager-links use the same responsive font-size, clamp(24px,3vw,32px), at every viewport. Keep natural flex wrapping and existing link behavior.

User-approved compact contact input text (2026-10-12): use 16px text inside both contact fields (name and phone), including placeholders, phone mask and entered values, at all viewport sizes. Preserve the 56px field heights, colors, focus treatment and validation.

User-approved unified arrow design system (2026-10-12): all interface arrows use components/ArrowIcon.jsx, with one 24×24px viewBox/optical size, 2px non-scaling stroke, butt caps/miter joins and currentColor. Left is an exact mirrored right geometry. No per-context or responsive icon sizing; vary only color/container spacing. All CTA/card/footer/request links, header and gallery controls share this component. Centralize styling in styles/arrows.css, including 3px directional hover/focus translation over 250ms and reduced-motion support; never scale on hover. Preserve native media controls and source images/diagrams. This supersedes prior separate arrow assets, dimensions and motion rules.

User-approved sequential concept viewer (2026-10-12): the 12 concept gallery images can be browsed within the open dialog using previous/next SVG arrow buttons and keyboard Left/Right. Open on the clicked image, retain numbered order, and wrap first/last. Use the shared 2px stroke; keep arrows beside the image on desktop and below on mobile, with 44px hit areas. Preserve proportional full-quality images, click-only full-image loading, Escape/backdrop dismissal and accessible labels/live position. This supersedes the earlier image-only viewer requirement for navigation controls only.

User-approved Contacts navigation category (2026-10-12): add КОНТАКТЫ immediately after ПРЕДЛОЖЕНИЕ in desktop and mobile category navigation, linking to #contact (questions and contact). Use the existing shared smooth scroll, 60px header offset and active section underline/aria-current. Close the mobile menu on selection. Preserve the separate materials request CTA, including its mobile menu entry.

User-approved housing format icon optical sizing (2026-10-12): balance the six housing format card pictograms optically. Within existing 28×32px icon slots, enlarge SPA to a 32×36px SVG canvas and people to 36×36px, each offset -2px on both axes; retain boat/building dimensions as the reference. Preserve the shared 2px non-scaling stroke, geometry, colors, card spacing and responsive layout.

User-approved agency logo circle restoration (2026-10-12): retain the circle around НАИЗИ as a clean SVG circle (center 35/35, radius 29 in the 70px viewBox) with a 2px non-scaling stroke matching the pale lettering. Preserve the cleaned original letter shapes. This supersedes removal of the circular outline; do not restore the damaged raster outline or unrelated PDF artwork.

User-approved market KPI optical icon sizing (2026-10-12): balance the visible size and weight of the four market statistics icons. Enlarge the wide people pictogram within its existing 30×35px layout slot using a 40×40px SVG canvas, offset left -1px/top -2.5px, so its visible geometry matches the taller building/tree/document icons optically. Keep the shared 2px non-scaling stroke, colors, card layout and other sections unchanged.

User-approved agency logo outline removal (2026-10-12): remove the artifacted circular line around НАИЗИ in the agency footer. Preserve the original letter shapes using the existing clean source mask and a solid pale logo fill; omit unrelated PDF artwork. Keep the footer layout and logo box dimensions.

User-approved phone field height (2026-10-12): reduce the contact phone input to the same 56px height as the name input and materials request button at every viewport, with zero block padding. Preserve the phone mask, 18px horizontal padding, white background, validation and focus behavior. This supersedes the previous 60px phone input minimum.

User-approved name field height (2026-10-12): match the contact form's name input height to the existing 56px materials request button on desktop and mobile. Set height/min-height to 56px and vertically center text with zero block padding; retain 18px horizontal padding, white background and focus treatment. This supersedes the previous 60px minimum for the name field only.

User-approved white concept thumbnail surfaces (2026-10-12): use pure white (#fff) backgrounds for all 12 buttons/cards holding the concept page images in .concept-grid, replacing the cream paper background. Preserve image rendering, spacing, borders and interactions.

User-approved high-quality concept images (2026-10-12): replace all 12 resort concept gallery pages with numbered images 1.jpg–12.jpg from фото/2k/Кок, preserving their order. Keep source files untouched. Full-view images retain 1719×1214 resolution and identical decoded pixels; choose lossless WebP only when smaller than the original JPEG. Use separate 480px lossless WebP thumbnails with lazy loading, and load full images only when the viewer opens. Fit the viewer proportionally to the viewport without cropping or stretching. Regenerate via scripts/prepare-concept-images.py.

User-approved frameless video media (2026-10-12): remove the baked-in black sidebars from the gallery video and all six posters by cropping only the black 160px video margins (80px in 640px posters). Use the resulting native 4:3 media without stretching or cropping the picture; constrain dialog width by both viewport width and player height so CSS does not create new letterboxing. Preserve original source media, native playback controls and click-only loading.

User-approved location KPI divider removal (2026-10-12): remove top border lines from the three location statistic blocks (distance to station, distance to stop, travel time). Keep the values, descriptions, spacing and animations.

User-approved location caption removal (2026-10-12): remove the separate HTML source caption immediately below the location map («Карта из концепции DIALECTICA, 2024, с. 5»). Keep the map artwork and the section's route/source footer.

User-approved minimal video gallery (2026-10-12): remove the light dialog panel, visible gallery heading/counter, previous/next arrows and thumbnail borders/play badges. Show one large player on a dark backdrop with six frameless video previews below, using opacity and a caption underline for selection. Keep a discreet close control, Escape/backdrop dismissal, native playback controls, muted playback, click-only loading and unload-on-close. Remove the white ring from the hero Play artwork while retaining its filled disc and triangle.

User-approved FAQ icon weight consistency (2026-10-12): keep one permanent 18×2px horizontal bar for the minus, and an independent 2×18px vertical bar for the plus. Collapse only the vertical bar with scaleY when expanded instead of rotating it onto the horizontal bar. This preserves identical 2px stroke weight during opening/closing without overlapping horizontal strokes.

User-approved shared alignment guides (2026-10-12): align the housing area, title, customer label and facts with the section heading and bottom credit by removing the leftover inner padding from the background-free housing-land-card. Use the same responsive horizontal gutter token for desktop header edges and section content, including very wide viewports. Preserve card padding where cards still have visible backgrounds.

User-approved contact field focus refinement (2026-10-12): remove the visible resting border and hover border from both white contact inputs. Show only a thin 1px project-green border on focus, for mouse and keyboard alike, without the previous offset outline. Keep a transparent 1px resting border to prevent layout shifts.

User-approved sequential card entrances (2026-10-12): reveal repeated card groups in DOM order with a 100ms step (first 0ms, second 100ms, third 200ms, fourth 300ms) when they enter the viewport. Apply consistently to KPI, plot, campus, offer, housing-format, feature/list and concept-thumbnail groups. Calculate delay per group, not per section, and reveal individual format cards and thumbnails rather than their whole parent panel. Retain once-only entrances and reduced-motion support; this supersedes the old 80ms/240ms cap for repeated groups.

User-approved uppercase buttons (2026-10-12): display labels on all buttons and button-like CTA links in uppercase throughout the site, matching the header style. Include forms, video controls/cards, galleries, dialog actions and materials request links. Preserve typography sizing, semantic text, accessibility labels and behavior.

User-approved market feature simplification (2026-10-12): remove icons from the three market feature columns and align their headings directly with their descriptions at each column's left edge. This supersedes the previous icon/title alignment instruction; retain the three-column responsive grid.

User-approved market feature alignment (2026-10-12): vertically center the icons against the headings in all three market feature columns (year-round, local demand, service quality). Use one grid row for icon/title and a separate full-width row for the description instead of floats; keep content and responsive column layout.

User-approved global icon stroke (2026-10-12): use one --icon-stroke:2px token for all site pictogram strokes, CTA/header arrows, hero play artwork, FAQ plus/minus bars and gallery icon outlines. Apply non-scaling-stroke to SVG strokes. Replace font-glyph gallery navigation arrows with controlled 2px SVG strokes. Preserve geometry/colors/size and do not alter diagrams, photographs, logos or layout dividers.

User-approved market icon stroke (2026-10-12): use a consistent 2px visible stroke for the icons in the four market KPI cards, with non-scaling-stroke so their line weight stays stable. Preserve icon dimensions, geometry and colors.

User-approved resort card vertical balance (2026-10-12): vertically center each resort KPI card's complete icon/number/label group so visible whitespace above and below is balanced even when descriptions wrap to different line counts. Keep equal top/bottom padding and equal card heights.

User-approved housing land background removal (2026-10-12): remove the green background only from .housing-land-card, preserving its current padding/content and the green cards for possible formats on the right.

User-approved housing-concept cards (2026-10-12): place the 8.5-hectare land characteristics in a pale green card with matching 24–40px padding and remove the building icon above its area. Display the six possible-format items on the right as individual pale green cards with padding, removing their thin top dividers. Retain original content and responsive stacking.

User-approved compact market notes (2026-10-12): both reach/source paragraphs in .market-notes must use exactly 12px, line-height 1.4 and a compact 4px gap, superseding the previous larger typography and 10px gap. Retain the group divider and color.

User-approved offer marker optical alignment (2026-10-12): use 4px CSS circular markers centered vertically on each offer item's first line (half its 1.28 line-height), replacing font-dependent native bullet placement. Keep existing text indent and light/dark marker colors.

User-approved offer bullet markers (2026-10-12): display each informational paragraph within all three offer cards as a semantic list item with a small circular marker. Use subtle accent-green bullets on light cards and muted light-green bullets on the dark card. Retain headings, areas and bottom transaction-condition text as separate elements.

User-approved offers footer size (2026-10-12): set the bottom «Речкуновская зона отдыха / Инвестиционная концепция» caption in #offers to exactly 12px, retaining its existing color and tracking.

User-approved housing-concept footer size (2026-10-12): set the bottom note about customer-provided land characteristics and possible landscaping/services scenarios in #housing-concept to exactly 12px, retaining its color and tracking.

User-approved DIALECTICA source typography (2026-10-12): all small source notes, section footer credits and hotel visualization subtitles mentioning DIALECTICA/Диалектика must be exactly 12px throughout the site. Preserve existing tracking, color and generation-credit opacity.

User-approved header request gap refinement (2026-10-12): reduce the desktop materials request label-to-arrow gap to 16px instead of 32px. Retain the CTA right alignment and the centered category navigation.

User-requested hero rollback (2026-10-12): restore the first screen to its appearance before the latest hero refinements: original 359:128 video preview with its original SVG framing and a 14px generation credit. Other sections retain their current typography and layout. This supersedes the taller 16:9 hero preview and 12px hero credit instructions.

User-approved generation credit size (2026-10-12): set AI/preliminary visualization credit text to exactly 12px throughout the site, superseding the previous 14px size for this category only. Retain 60% opacity and existing caption tracking.

User-approved taller hero video preview (2026-10-12): change the hero video thumbnail from the shallow 359:128 strip to a 16:9 image area. Use proportional cover rendering with no stretching; retain card width, play control, label and click-only video loading.

User-approved resort concept list cleanup (2026-10-12): remove 01/02/03 number labels from the three descriptive items beside the concept thumbnail gallery. Keep the headings, descriptions and separators; do not change the campus card numbering.

User-approved concept image viewer (2026-10-12): clicking any of the 12 concept thumbnails opens only that enlarged image in the native modal, without a visible heading, caption, close button or request CTA. Fit the image proportionally within the viewport. Retain Escape/backdrop dismissal and an accessible dialog name; keep the existing concept grid and full-concept request link on the page.

User-approved CTA arrow artifact fix (2026-10-12): arrow-light.svg and arrow-dark.svg must contain only the original three arrow stroke paths on a transparent background. Remove unrelated PDF background/artwork fragments so hover background changes do not expose a rectangular patch behind arrows. Preserve arrow geometry, colors and motion.

User-approved compact plot cards (2026-10-12): position land-use labels (ВРИ), titles and descriptions directly below cadastral numbers in the left column of both plot cards, beside smaller right-hand territory diagrams (maximum 230px wide). Reduce the intervening whitespace, retain all data and CTA buttons, and let the content reflow naturally on mobile.

User-approved AI credit softness (2026-10-12): render preliminary visualization captions mentioning AI generation at 60% opacity throughout the site. Apply opacity only to the credit text, preserving its 14px type and tracking and keeping other footer content unaffected.

User-approved campus numbering (2026-10-12): remove icons from the four campus-concept cards and position their existing 01–04 numbers at the upper left in place of the icons, above the card headings. Keep the pale green background, padding and original content.

User-approved compact centered header menu (2026-10-12): place the four desktop category links in a single compact flex group centered on the viewport width, with a fluid 20–40px gap and small horizontal hit-area padding. Remove the former PDF coordinate bounds. Keep the brand at the left and the separate materials request CTA at the right with its 32px arrow gap.

User-approved resort KPI icon alignment (2026-10-12): in all four resort-concept cards, place the icon to the left of the number and put the descriptive label below the number in the same right-hand text column. Use a 28px icon column and 14px gap, maintaining green card surfaces and responsive behavior.

User-approved resort caption alignment (2026-10-12): move the Hotel complex caption into the resort photograph's bottom footer row, alongside the preliminary visualization credit. Align both at the bottom on desktop, retaining the caption at the right; stack naturally on tablet/mobile without overlapping text.

User-approved desktop menu alignment (2026-10-12): center the contents of each header navigation hit area horizontally and vertically with flex alignment, replacing PDF-specific text offsets. Center the request CTA text and arrow as a group with their existing 32px gap; this supersedes the earlier fixed arrow position for that CTA.

User-approved section label cleanup (2026-10-12): remove presentation numbering prefixes and slash separators from the small labels above section headings throughout the site. Display the section names as plain text; preserve meaningful area figures within names, KPI values and card/list numbering.

User-approved smooth FAQ (2026-10-12): animate both opening and closing of answers over 420ms with the project ease-out curve and a gentle opacity fade. Smoothly close the previous answer when another is selected. Retain native details/summary keyboard interaction, freeze interrupted animation frames for rapid toggles, and honor initial/live reduced-motion preferences.

User-approved input text softness (2026-10-12): soften contact field text to --color-text-secondary. Use that color at 65% opacity for placeholders and the empty phone mask, including when focused; apply transparency to text color only. Preserve the white field background and focus treatment.

User-approved form fields (2026-10-12): style both phone and name as conventional white (#fff) input fields with a thin full border, 16px vertical / 18px horizontal padding and at least 60px height. Preserve the phone mask, labels, validation and accessible keyboard focus indication.

User-approved form label cleanup (2026-10-12): label the contact fields simply «ТЕЛЕФОН» and «ИМЯ», removing «· ОБЯЗАТЕЛЬНО» from both labels. Preserve existing field validation and request behavior.

User-approved resort KPI cards (2026-10-12): apply the same pale green card surface, padding and gaps as market KPI cards to all four resort-concept indicators (270 rooms, 4 stars, 4,315 square metres, 2,546 square metres). Remove top divider lines, retain icons/content/counters and four desktop columns, and adapt the grid for smaller screens.

User-approved caption size correction (2026-10-12): set all caption categories in small-typography.css to exactly 14px at every viewport, replacing the previous fluid 14–16px and photographic 16–19px sizes. Slightly increase tracking to .06em for uppercase/source labels and .04em for supporting captions, hero KPI labels and secondary footer/dialog/gallery labels.

User-approved small typography refinement (2026-10-12): enlarge small content captions throughout the site, especially photographic AI/source credits. Use a shared 14–16px caption scale, line-height 1.55 and subtle .045em tracking for section notes, source notes, eyebrows and field labels. Supporting photographic captions use 16–19px with .02em tracking; hero KPI labels use at least 14px. Footer/dialog/gallery secondary labels use 14–16px and .025em tracking. Allow natural wrapping on mobile. This supersedes normal tracking for these small text categories; retain the recently reduced header brand sizing.

User-approved header brand sizing (2026-10-12): reduce the two-line brand font to give it more vertical breathing room inside the 60px header. Use 12–16px on desktop (13px at 1600px), 12px on mobile, line-height 1.2, bold Nimbus Sans, and retain vertical centering.

User-approved campus cards (2026-10-12): turn all four campus-concept columns into pale green cards using --color-surface (#e5e8d8), matching the market KPI cards. Remove their top thin dividers, add balanced internal padding, and preserve icons, numbering, headings and lists with the existing responsive grid.

User-approved market card color update (2026-10-12): use the same pale green surface (#e5e8d8, --color-surface) as the other light green cards for all four market KPI cards. This supersedes their previous white background; keep their padding and responsive layout.

User-approved market notes refinement (2026-10-12): group the additional reach estimate (>250 thousand within 30 minutes) and its data/source footnotes into one coherent block. Use matching text size, color and line height, a compact 10px gap and a subtle top divider; preserve the full wording and reveal the group together.

User-approved market KPI cards (2026-10-12): show the four Novosibirsk market indicators (1.6 million, >2 million, 80–100 thousand, 354) as separate white (#fff) cards with balanced internal padding. Keep four columns on wide screens, adapt the grid on smaller screens, and preserve original icons, labels, values and counter animations. Scope this treatment to the market statistics only.

User-approved semantic rebuild (2026-10-12): use one ordinary responsive HTML document for all 16 sections at every viewport. Headings and paragraphs must be whole text blocks with natural wrapping; no PDF line-positioned desktop text, fixed-coordinate text, fixed-height content cropping, or per-line animations. Use normal-flow grid/flex layouts, preserving original colors, fonts, photographs, content, section order and interactions. Animate semantic blocks/cards. Desktop information/photo content insets remain 150px, mobile 100px; the agency footer stays at the document bottom.

User-approved motion system (2026-10-12): apply restrained once-per-viewport-entry reveals (desktop 24px/680ms, mobile 16px/560ms), 80ms stagger capped at 240ms, and ease-out counters (1500ms desktop/1150ms mobile) to meaningful KPI values. Preserve exact typography, units, grouping, decimal separators, ranges and reserved numeric width; never count cadastral IDs, phones, dates or list numbers. Honor prefers-reduced-motion, including live changes, and keep content available without animation APIs. Maintain existing anchor scroll. Replace the previous perpetual map marker pulse with a single gentle entrance to meet the new no-continuous-motion requirement. Maps and land contours are diagrams, not fabricated statistical charts.

User-approved hero video gallery (2026-10-12): the hero video CTA opens a responsive six-item video gallery using one shared video from video/Бердск/DJI_20260928112737_0001_D_stabilized_2.mp4 for all six entries. Load video only after an explicit click; no video requests on initial page load. Keep a single active player, native controls, no audio, static image thumbnails, and stop/unload playback when the dialog closes. Preserve the existing hero card appearance on desktop/mobile.

User-approved contact-to-footer spacing (2026-10-11): maintain a visual 150 px gap from the bottom of desktop contact content/divider to the green agency footer, counting the original 31 PDF units of whitespace. Use 100 px between contact content and footer on tablet/mobile. Keep the green footer at the document bottom with no whitespace below it.

User-approved footer CTA spacing (2026-10-11): keep approximately 32 CSS px between «САЙТ АГЕНТСТВА» and its arrow on desktop, tablet and mobile.

User-approved FAQ interaction (2026-10-11): convert the four contact questions to a shared accessible accordion on desktop and mobile. Start collapsed; clicking a question reveals its original full PDF answer and closes the previous answer. Use native details/summary for keyboard operation and subtle plus/minus indicators, maintaining project typography and colors.

User-approved agency footer refinement (2026-10-11): make the full-width green footer taller (160 px minimum desktop with balanced 40 px vertical padding) and finish the website directly at its bottom edge, without cream whitespace underneath. Use balanced 32 px vertical padding on mobile. Preserve the agency logo, captions and button.

User-approved section navigation (2026-10-11): all section anchors and dialog CTAs use the shared distance-based smooth scroll (450–1100 ms), with 60 px fixed-header offset, no bounce, and native wheel/touch scrolling that cancels programmatic motion. Track current navigation groups with a subtle underline and aria-current. Close the mobile menu before scrolling. Preserve hashes, direct section links and Back/Forward, and honor prefers-reduced-motion.

User-approved location marker animation (2026-10-11): softly pulse the original Rechkunovskaya location dot and its surrounding ring on both desktop and mobile maps. Keep the original marker position, colors and connecting label line; respect prefers-reduced-motion.

User-approved typography refinement (2026-10-11): use standard letter-spacing: normal everywhere on desktop, tablet and mobile, including header navigation. No negative tracking. This supersedes the earlier .06em navigation tracking request.

User-approved phone input refinement (2026-10-11): use the shared +7 (___) ___-__-__ mask on desktop and mobile contact forms, reveal remaining digit positions while typing, support number paste with +7 or 8, caret-aware editing and deletion, and reject incomplete numbers. Keep the form's existing visual layout and request flow.

User-approved hero video-card refinement (2026-10-11): enlarge only the Play icon slightly (scale 1.14) on hover or keyboard focus, and remove «Превью · ссылка на ролик ожидается» from the card on desktop and mobile. Keep the original Play artwork and existing video-card interaction; do not invent a video URL.

User-approved photo overlay (2026-10-11): add a subtle project-green overlay on the left of photographic sections, fading smoothly to transparency toward the right, like the supplied nature screenshot. Keep photos visible and text above the overlay. Use a lighter pale-green tint on the hero to support its dark green text; white-text sections use dark green. Adapt the gradient width for mobile.

User-approved photographic-section spacing (2026-10-11): extend the 150 px desktop / 100 px mobile top and bottom content insets to ALL eight photographic sections, with fluid tablet spacing. Photographs must cover the entire section including the padding; do not introduce cream bands. Count the original desktop content whitespace toward the total.

User-approved global footer cleanup (2026-10-11): remove presentation page counters (01 / 16 through 16 / 16) and the bottom horizontal footer separator from ALL 16 sections at every viewport width. Keep explanatory/source captions and internal content dividers. This extends the earlier photo-only cleanup to every section.

User-approved information-section spacing (2026-10-11): all eight cream information sections need approximately 150 px whitespace above and below their content on desktop and 100 px on mobile, with fluid tablet spacing. Count existing PDF inner whitespace toward the desktop total. This supersedes the PDF's compact section-edge spacing; keep photographic sections full bleed.

User-approved resort caption refinement (2026-10-11): align «Гостиничный комплекс» vertically with its icon, with a compact 12 px gap at the 1600 px design width. Use a shared flex row, consistent left alignment of the subtitle, and balanced inner padding on desktop and mobile.

User-approved menu refinement (2026-10-11): no rectangular background blocks on header-link hover. Use a subtle text underline as the hover cue and .06em letter spacing on navigation labels and the mobile menu toggle. Preserve keyboard focus indicators and the 32 px CTA-to-arrow gap.

User-approved photo footer update (2026-10-11): remove the bottom thin horizontal separator and page counters (01 / 16 etc.) from all eight photographic sections (PDF pages 1, 3, 5, 7, 9, 11, 13, 15), on desktop, tablet and mobile. Keep the original visual-concept/photo credit captions. Preserve content dividers within the sections and all numeric investment data.

User-approved CTA spacing (2026-10-11): move the desktop «ЗАПРОСИТЬ МАТЕРИАЛЫ» label toward its arrow, with approximately 32 CSS px between the text and visible arrow. Keep the arrow's horizontal position.

User-approved header refinement (2026-10-11): use a compact 60 px header at every viewport width, vertically center the navigation and brand, and use the embedded Nimbus Sans Bold (700) for «Речкуновская зона отдыха». This supersedes the original PDF header height and vertical positioning. Preserve the fixed behavior and white/green scrolled state.

User-approved design update (2026-10-11): keep the main header/menu fixed on desktop, tablet and mobile. It is transparent at the top of the page; after scrolling, it has a white background and the project's green text/icons (#20362f). Keep the original desktop menu geometry and anchor labels. Anchor targets must account for the fixed header. This instruction supersedes the static PDF header behavior.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
