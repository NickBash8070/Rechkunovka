# Prototype Instructions

User-requested initial percentage loader (2026-10-15): render a white full-screen loader with green percentage directly in the initial HTML, with critical inline styles hiding #root before any app script runs, preventing content flashes before loading. Advance monotonically through app readiness, font and hero-image completion; show 100% before revealing the site with a brief fade. Preserve lazy video/map loading. Respect reduced motion, StrictMode and asset failures; provide a bounded fallback/retry if boot cannot complete. Publish the change.

User-requested tablet hero video alignment correction (2026-10-15): left-align the hero video card throughout widths <=1119px, including 856px, rather than restricting alignment to individual iPad widths. Preserve all existing card dimensions, spacing and desktop grid placement. Publish this isolated correction.

User-requested subtle phone agency logo zoom (2026-10-15): observe the footer logo with the shared once-per-appearance reveal mechanism. On phones <=650px, gently scale from .94 to 1 over 650ms when it enters the viewport, without opacity fades or positional movement. Preserve the 128px layout box and final size; tablet/desktop and reduced-motion users see a static logo.

User-requested direct phone contact-form landing (2026-10-15): at widths <=650px route all #contact navigation, including menu Contacts and request-material CTAs, to #contact-request-form instead of the FAQ/section introduction. Align the form with a 24px top inset, focus the form without opening the keyboard, and hide the mobile header so the complete request form is immediately visible. Keep #contact URL/history and tablet/desktop section landing unchanged.

User-requested refined hamburger menu motion (2026-10-15): at all hamburger/mobile layouts coordinate 360ms opening and 280ms closing panel/backdrop/icon transitions with gentle cubic easing, 10px panel travel, compact staggered links and reverse closing stagger. Retain a separate menu-present phase to keep body scroll locked and main inert until the close animation ends; cancel pending close cleanup on reopening. Category navigation releases the lock immediately and retains the previously approved hidden-header section landing. Preserve Escape, backdrop, focus trap, focus restoration and reduced-motion behavior.

User-requested mobile menu anchor behavior (2026-10-15): for the hamburger navigation at all mobile/tablet widths, choosing a category or request CTA closes the menu, restores body scrolling and hides the fixed header throughout the anchor transition, including upward transitions. Land at the section boundary with focus in the destination, keeping the header hidden until subsequent user scrolling/focus reveals it. Preserve desktop navigation and Escape/backdrop behavior.

User-requested subtle phone contact underlines (2026-10-15): at widths <=650px underline both manager phone and email links with a 1px project-green line at 35% opacity and a .15em underline offset. Preserve contact centering, typography, links and tablet/desktop styling.

User-requested further tightening of phone format-card text (2026-10-15): at widths <=650px use a 4px grid row gap and zero description top margin in all housing format cards, bringing the heading and description closer. Supersedes the prior 8px row gap plus 4px paragraph margin; preserve card padding, icons, typography and other viewport layouts.

User-requested white hero video card (2026-10-15): at every breakpoint the hero video-card background is white (#fff) and its label uses project green (--color-text). Preserve preview, Play artwork, dimensions, placement and interactions.

User-requested phone hero statistics removal (2026-10-15): hide the entire three-area statistics block in the opening hero at phone widths <=650px, superseding earlier phone KPI icon/spacing changes. Keep other statistics and tablet/desktop hero values visible. Preserve the bottom-aligned hero video and provenance credit by applying auto top margin to the video card.

User correction to universal menu/852px landscape hero (2026-10-15): menu label is uppercase at every breakpoint and optically aligned with hamburger bars (default 2px downward shift; retain established 3px iPad alignment). At 851–853px and height <=500px increase hero minimum height to 800px, use 64px CTA-to-KPI padding and 48px KPI-to-video margin. Replace the full-width phone video with the compact 1024px iPad composition: 168px image, two-line label, 24px internal gap, 16px padding, content-sized left-aligned card. Preserve 48px bottom inset and 24px credit gap, other body parity and other viewport hero layouts.

User-requested 852x394 landscape parity (2026-10-15): at widths 851–853px and heights <=500px use the phone horizontal hero video card (140px preview, 44px Play, 8px padding, full content width), 48px hero bottom inset, 24px credit gap and 10px credit. Extend the established 768/820 iPad body refinements to this landscape view: location features in two columns with 64px outside separation, full-width headings/contact form, 16px consent with 24px vertical padding, market-feature separators, left resort caption, and shorter naturally expanding photo sections. Preserve existing header, hero text/KPIs and other viewport layouts.

User-requested exact phone agency logo size (2026-10-15): set the centered agency-footer logo to 128px by 128px at widths <=650px. Supersedes the earlier 30% increase to 70.2px; preserve artwork, spacing and tablet/desktop sizes.

User-requested centered phone manager label (2026-10-15): at widths <=650px center «Руководитель проекта Бурдэ Алексей» above the already centered phone/email links, preserving typography and spacing. Tablet/desktop remain unchanged.

User-requested larger phone agency logo (2026-10-15): at widths <=650px enlarge the centered agency-footer logo by 30%, from 54px to 70.2px square. Preserve the artwork, surrounding spacing and tablet/desktop sizes.

User-requested centered phone manager contacts (2026-10-15): at widths <=650px horizontally center the stacked phone and email links within the contact panel. Preserve their sizes, order, spacing and link targets; tablet/desktop remain unchanged.

User-approved direct email submission (2026-10-15): use FormSubmit AJAX to send contact requests to nicolaibashkirev@gmail.com without a visitor mail app. The user will confirm the activation email. This supersedes the prior mailto-only flow; preserve separate required consent, versions/date, loading lock, retry and no browser storage. Report service acceptance rather than inbox delivery. Keep public manager contact unchanged and legal documents consistent with FormSubmit processing.

User-requested application recipient (2026-10-15): all prepared form requests are addressed to nicolaibashkirev@gmail.com using REQUEST_EMAIL in contact-request.js. Preserve the public manager contact burde@bk.ru. Keep request recipient references consistent in the preparation dialog and legal documents. Automatic email delivery still requires a submission service/API; do not claim delivery from the existing mailto preparation flow.

User-requested tighter phone format-card text pairs (2026-10-15): at widths <=650px reduce the heading-to-description distance in all six housing format cards by about 20%. Use half of space-1 for the description top margin (4px instead of 8px), preserving the existing 8px grid row gap, icons, card padding and tablet/desktop layouts.

User-requested shorter phone photo sections (2026-10-15): at phone widths <=650px reduce large photographic sections after the hero by 20%, from 740px to 592px and the potential section from 820px to 656px. Preserve the fullscreen opening composition, tablet/desktop heights, shared padding, images and typography; allow natural height when content needs more room rather than clipping it.

User-requested phone plot land-use heading increase (2026-10-14): at phone widths <=650px promote both plot-card land-use headings from the H4 visual size to H3, one step up in the shared typography system. Preserve semantic headings and tablet/desktop sizes.

User-requested phone plot separator removal (2026-10-14): remove the horizontal top border before the second plot card at widths <=650px, preserving the existing spacing between cards and all parcel geometry.

User-requested larger phone parcel graphics and smaller corner circles (2026-10-14): at phone widths <=650px increase both diagram caps from 240px to 312px (30%), constrained to available content width. Reduce circle captions to 88px and position them in the free upper-right corner of the visual, without covering parcel geometry. Preserve the visual-before-information card order, original boundaries, aspect ratios and note text; supersedes phone caption-below placement.

User correction to phone parcel card order (2026-10-14): at phone widths <=650px show the entire parcel visual (outline followed by its circle caption) before the offer label and details. The information group then includes area, cadastral IDs, land use, description and CTA in their existing order. Apply to both plot cards; preserve desktop/tablet composition. This clarifies that the whole visual moves before offer information, not only the caption beneath its outline.

User-requested comprehensive phone refinements (2026-10-14): apply at widths <=650px. Hero credit has 48px bottom inset and 24px video gap; short screens <=700px height retain 16px bottom inset for first-screen fit. Location feature group uses 64px top / 32px bottom outside spacing and 8px internal gap. Parcel outlines precede their circle captions in normal flow, without overlays or reserved upper caption rows. Resort hotel caption aligns left. Concept CTA uses a taller two-row composition: «154 страницы» above the request label/arrow. Housing format heading/description gap is 8px. Manager phone/email stack with the shared H2 contact size (without the numeric doubling modifier). Agency footer centers logo first, then copy, agency link and legal links. Double standalone KPI/area/card count sizes outside the hero through scoped typography roles; preserve ordinary headings and cadastral identifiers. Location statistics stack description below the enlarged value; market range suffix may wrap to keep narrow phones within the viewport. Preserve accessibility, consent and existing content.

User-requested constant hamburger color (2026-10-14): on all viewport widths, the hamburger toggle and its menu label retain the header's current color during hover and keyboard focus. Remove the sage hover/focus color change for this control only; preserve visible focus outline and all other navigation hover behavior.

User-requested phone provenance note size (2026-10-14): all small AI/source/investment/customer-estimate notes use at most 10px on phone widths <=650px. Scope the Caption override to section notes, asset notes, market source notes, hotel source credit and housing customer-information label. Preserve functional UI, form consent, buttons and KPI caption sizes; tablet/desktop remain unchanged.

User-requested phone hero KPI icon removal (2026-10-14): hide the three feature icons in the opening-screen KPI group on all phone widths <=650px. Keep numbers, units and captions, with each caption directly below its number. Preserve icons in other sections and on tablets/desktop.

User-requested 430px menu optical alignment (2026-10-14): shift the visible uppercase menu label down 2px to align its letter center with the hamburger lines, preserving header height, icon dimensions and touch target. Scope to 429–431px only.

User-requested 430px phone hero/menu refinements (2026-10-14): at width 430px (429–431px tolerance), raise the hero KPI group above the video by adding a 48px (space-5, about 5% of the shown screen height) bottom margin, preserving KPI sizes and video/footer placement. Display «МЕНЮ» uppercase and widen both hamburger lines to 32px. Other viewport layouts remain unchanged.

User-requested shorter iPad photo sections (2026-10-14): reduce all photographic sections except the fullscreen hero by about 30% on iPad widths 768/820/1024 (±1px rounding tolerance for 768/820). Use min-height clamp(476px,70svh,735px), derived from the prior 680px/100svh/1050px scale. Allow natural content height if text plus shared padding needs more room; never clip text. Center full-size slice SVG backgrounds to prevent exposed green edges. Preserve original images, typography, content and spacing tokens; other device widths remain unchanged.

User-requested iPad consent readability/spacing (2026-10-14): at 820px and 768px (±1px tolerance), increase consent-label text to 16px and add 24px padding above/below the consent row. Preserve existing form margins, checkbox, links, validation and default unchecked state. This increases separation from both the name input and request button without changing other viewport layouts.

User-requested full-width iPad contact form (2026-10-14): remove the 620px form cap at the 820px and 768px iPad viewports (±1px tolerance). The contact panel, form, inputs and submit button occupy the full content width; let the form heading use that width too. Preserve section gutters, validation and consent behavior; other viewport layouts stay unchanged.

User-requested full iPad-to-mini parity (2026-10-14): extend every recent 820px iPad refinement to the 768px iPad mini as well, with ±1px rounding tolerance. This includes hero/header styling, full-width H2 headings, two-column location features with 64px outside gaps, left-aligned resort caption and market-feature dividers. Supersedes the earlier restriction limiting 768px parity to the opening screen. Do not extend the separate 1024px-specific changes.

User-requested standard iPad 768px opening screen (2026-10-14): apply the established 820px hero and header composition to width 768px as well (767–769px rounding tolerance): lower title/subtitle/CTA, balanced middle KPIs with the same 48px downward offset, bottom-left video, shared footer spacing, larger aligned uppercase menu and brand. Other section-specific 820px refinements are not extended by this opening-screen request.

User-requested full-width 820px section headings (2026-10-14): all large H2 section/photo heading blocks span the entire content width at the 820px iPad viewport (819–821px tolerance). Remove em-based width caps while preserving shared type sizes, natural wrapping and existing side gutters. Keep the two-line hero H1 treatment and other viewport layouts.

User-requested 820px market feature dividers (2026-10-14): separate the three stacked market text features with a 1px shared color-border rule between adjacent features, using 24px clearance on each side of the separator. Scope to 819–821px; preserve headings, body text, source block and other viewport layouts.

User-requested 820px resort caption left alignment (2026-10-14): place the «Гостиничный комплекс» caption at the bottom-left content edge at width 820px (819–821px tolerance). Preserve caption dimensions, inner padding, source credit and vertical placement; other viewport layouts stay unchanged.

User-requested 820px location group breathing room (2026-10-14): increase the gap above the forest/beach feature group and below its related CTA before the map to space-6 (64px), separating the feature/copy/button block from both the statistics and map. Preserve its two-column features, internal spacing and other viewport layouts.

User correction to 820px header optical alignment and brand size (2026-10-14): compensate Nimbus Sans's uppercase visual center by shifting the «МЕНЮ» label down 3px against the unchanged centered hamburger strokes; matching line-box centers alone appeared misaligned. Increase the two-line header brand to 18px using its type-ui size override. Scope remains 819–821px; preserve header height and menu behavior.

User correction to 820px menu prominence (2026-10-14): increase header height to 88px and the visible uppercase menu label to 22px via its own type-ui role, superseding the parent-only 18px override. Both 32px hamburger lines use exactly 3px thickness, centered as a pair in the 32px slot; maintain vertical centering with the label and matching cross geometry on open. Scope remains 819–821px.

User-requested uppercase 820px menu label (2026-10-14): display the hamburger's visible label as «МЕНЮ» at width 820px (819–821px tolerance), preserving the accessible open/close labels and other viewport treatments.

User-requested 820px location feature columns (2026-10-14): place «Реликтовый сосновый бор» and «Яхт-клубы и пляжи», with their existing icons, in two equal columns at width 820px (819–821px tolerance), using the shared 24px gap. Preserve surrounding content and other viewport layouts.

User-requested larger 820px hamburger/header (2026-10-14): at width 820px (819–821px rounding tolerance) increase header height to 72px, menu label to 18px, hamburger width to 32px and touch height to 48px. Keep two 2px lines, 10px separation, centered close-cross animation, existing colors and accessible menu behavior. Other widths remain unchanged.

User correction lowering 820px hero KPIs (2026-10-14): move the three-statistic group 48px (space-5) below its previously centered position at the 820px viewport. Preserve its font/icon sizes, width, grouping, and the unchanged heading/video positions. The request is to lower the block, not shrink it.

User-requested 820px hero composition (2026-10-14): lower the hero heading/subtitle/plots CTA group with header height + 96px top inset; center the KPI group in the available middle area using equal auto margins; place the existing video card at the bottom-left content edge. Use 24px video-to-credit gap and 48px bottom inset. Scope to 820px (819–821px tolerance for browser fractional sizing); preserve other widths.

User-requested FAQ answer right clearance (2026-10-14, 1754px reference): at width 1754px, all FAQ answers reserve an additional space-7 (96px) after their text on the right, beyond the shared 32px card padding. Match the annotated narrower answer column, retaining the left inset, questions and disclosure behavior. This browser comment refers to 1754px; preserve other viewport layouts.

User-requested 1024px offers layout (2026-10-14): stack the three offer cards in one full-width column only at viewport width 1024px. Preserve card content, colors, padding, list markers and the shared 24px card gap. Other viewport layouts stay unchanged.

User-reported 1024px potential photo gap (2026-10-14): the potential section photo must fill the entire section without an exposed green strip at the right. At width 1024px replace the legacy left:24% SVG offset with a centered full-width/full-height SVG using the existing slice behavior. Preserve section height/content/padding and scroll zoom; do not distort the photo or alter other viewport layouts.

User-requested 1024px housing formats layout (2026-10-14): stack the housing formats below the land facts at width 1024px only. The six format cards span the full section content width in two equal columns, using the existing 24px card gap and a shared 48px gap between the land and formats blocks. Preserve text, icons, card padding and source note placement; other viewport layouts stay unchanged.

User-requested 1024px hotel caption side (2026-10-14): align the resort photo's «Гостиничный комплекс» caption block to the left content edge at width 1024px only. Preserve its existing size, padding, text, icon and vertical placement; other viewport layouts remain unchanged.

User-required scope for ongoing responsive comments (2026-10-14): all current browser-comment refinements apply exclusively to viewport width 1024px unless the user explicitly requests a broader range. Preserve desktop and phone layouts outside that width. At 1024px both plot CTAs must use the same comfortable 365px width / 56px height / 16px vertical and 24px horizontal padding as the first-screen Action, with single-line text and the shared arrow, rather than compressing into the narrow details column.

User-requested centered 1024px hero KPIs (2026-10-14): center the entire three-statistic group vertically in the available space between the plots CTA and the bottom-aligned video card. Use equal auto margins around the stats and remove their top padding at this width. Preserve video position, credit spacing and other viewport layouts.

User-requested hero KPI separator removal (2026-10-14): remove all border lines on the three hero statistic groups at viewport widths 1024px and below, including mobile. Preserve layout, spacing, text and icons; wider layouts remain unchanged.

User-requested content-sized 1024px video surface (2026-10-14): size the horizontal hero video card to its 168px preview plus the actual two-line label width, shared 24px gap and 16px side padding. Remove the fixed 420px card width and excess space after the text. Keep the existing position and all other viewport layouts.

User-requested 1024px video label line break (2026-10-14): in the horizontal hero video card at width 1024px, show exactly two lines: «СМОТРЕТЬ ВИДЕООБЛЁТ» / «ЛОКАЦИИ». Preserve the card size, preview and alignment. Other widths retain natural wrapping.

User-requested horizontal 1024px video card (2026-10-14): widen the hero video card to 420px only at width 1024px, with the existing 168px preview on the left and vertically centered text on the right, separated by space-3 (24px). Preserve 16px card padding, left/bottom alignment and the established credit spacing. Supersedes the 240px vertical card at this width.

User-requested smaller 1024px video preview (2026-10-14): reduce only the hero video image to 168px wide (from 208px) at width 1024px, retaining 16:9, existing card width/text, left alignment and bottom spacing. Other widths remain unchanged.

User correction to 1024px hero video side (2026-10-14): move the compact 240px video card to the left content edge only at width 1024px. Preserve its current vertical bottom alignment, 16px internal padding, 24px gap to the credit and 48px hero bottom inset. Supersedes the prior 1024px right alignment; other widths stay unchanged.

User-requested 1024px caption system and bottom clearance (2026-10-14): at width 1024px use the shared Caption token at exactly 10px for small notes/captions throughout the site. Restore the standard 12px hero credit outside that viewport, superseding the global 10px exception. Hero bottom inset is 48px (space-5), with the existing 24px video-to-credit gap; the annotation must not sit at the section edge. Other sections retain their shared section padding.

User-requested 1024px hero video refinement (2026-10-14): only at width 1024px, keep the video card at the right content edge, reduce it to 240px with 16px internal padding and a smaller preview/44px Play, and use auto top margin to align it at the bottom of the content group. Keep a 24px gap to the 10px concept credit and 24px bottom inset. Other viewport compositions remain as before.

User correction reverting hero video relocation (2026-10-14): restore the video card's original position, preview size and composition before the compact-left change, including its right alignment on desktop/tablet and existing horizontal phone card. This supersedes the compact left hero video instruction. Keep the requested 10px hero preliminary-concept credit.

User-requested location features spacing at 1024px (2026-10-14): add shared 32px padding above and below the forest/beach feature group only at viewport width 1024px; preserve spacing at other widths.

User-requested compact left hero video (2026-10-14): align the entire video CTA to the left content edge under the hero KPIs, with a smaller 16:9 image in a horizontal preview/text card. Hero preliminary AI-concept credit uses exactly 10px, overriding the earlier 12px exception. Keep the credit and all hero content within the first viewport at tested desktop/tablet/phone sizes, without clipping or hiding content. Preserve click-only playback and existing text.

User-requested animated map icon (2026-10-14): animate the main project marker's existing sun-over-waves geometry with a gentle rising sun, breathing rays and counter-phase wave drift using native SVG/CSS. Preserve the marker text, dimensions, icon style and anchor. Pause offscreen, on page hiding and after map focus via existing motion state; render statically under reduced motion. No extra animation SDK is required.

User-provided agency URL (2026-10-14): «Сайт агентства» links to https://xn--g1abb.xn--p1acf/ in a new tab with noopener noreferrer, replacing the missing-URL explanation. Preserve the footer CTA styling and arrow.

User-requested project map label size (2026-10-14): the main «Речкуновская зона отдыха» marker uses exactly 23px text. Scope the H5 token override to this marker in typography.css and preserve its two-line label and icon height derived from the two-line text box.

User-requested campus list markers (2026-10-14): all list items in the four campus concept cards use the same small accent circular bullets as offer-card lists: 4px dot aligned to the first Body line, with shared 24px text inset. Preserve card numbers, headings, content and existing list rhythm.

User correction to contour circle placement (2026-10-14): position both white 132px contour caption circles in the free upper-right area beside the parcel outline, matching the annotated reference. Never cover the parcel shape. Narrow visual columns reserve a separate upper caption row. Preserve circle text, source geometry and delayed entrance; supersedes the earlier centered overlay placement.

User-requested local/deployment rules review (2026-10-14): reviewed the instruction history and packaging configuration, confirmed local browser opening at http://127.0.0.1:4176/, and saved the continuation summary in LOCAL-AND-DEPLOY.md. Use AGENTS.md as the authoritative detailed history; explicit superseding corrections override older README descriptions. Keep the summary available for future local runs and deployment preparation.

User correction to FAQ padding (2026-10-14): FAQ questions and answers use the global --card-padding token (32px desktop, 24px tablet/phone), superseding the compact fixed 16px padding. Keep answer side insets aligned with the question.

User correction to contour captions (2026-10-14): replace green pill captions with true white 132px circles and dark three-line text («Контур / территории / проекта» and «Контур / по схеме / заказчика»). Keep the overlay position and delayed entrance after SVG animation.

User-requested resort star KPI wording (2026-10-14): show «4 звезды» as one shared H2 value and «целевая категория» in the lower caption row beside the existing star icon.

User-requested FAQ surfaces (2026-10-14): FAQ disclosures use the shared light-green surface color, 16px compact side padding and 8px separation. Question and expanded answer share one surface. Keep animated opening/closing, one-open-item behavior and keyboard support.

User correction to map icon scale (2026-10-14): main map icon height equals exactly the two-line H5 text line box (2 × H5 size × H5 line-height). Remove oversized minimum plaque heights; retain normal padding and narrower 300px desktop / 252px phone minimums constrained to the map width.

User-requested map action removal (2026-10-14): remove the «Посмотреть участки» link from the interactive map, including after the recreation marker is selected. Keep marker zoom behavior.

User correction to hero subtitle (2026-10-14): render «Два инвестиционных участка с продуктовой концепцией» in sentence case and the shared Body role (24px desktop maximum), retaining paragraph semantics. Supersedes the earlier uppercase H2 treatment.

User correction to hero icon legibility (2026-10-14): replace complex parcel outlines with simple recognisable symbols: sun for resort, house for housing, square with dimension arrows for total area. Keep the three symbols unique and remove small embedded details.

User-requested icon cleanup (2026-10-14): Wellness/SPA uses one leaf separated from a bath/bench silhouette, avoiding overlapping petal lines. Event icon is a plain calendar without the internal star.

User-requested next-step text icons (2026-10-14): the first next-step paragraph uses the unique discussion icon and the purchase paragraph uses parcel-purchase (land + key). Use shared white line icons alongside the first text line, with 24px phone icons and the existing type/body roles.

User-requested exact section anchor landing (2026-10-14): align each anchor destination's section boundary to viewport y=0, with no 60px header offset or native scroll margin that exposes the preceding section. Recompute the destination during animation to account for layout changes. Preserve smooth scrolling, interruption, focus, history and reduced-motion behavior.

User-requested contour label bubbles (2026-10-14): show each contour caption as a rounded green pill over its SVG instead of a separate top label. Fade/scale in only after the outline/fill/dot entrance completes (2700ms plus card reveal delay). Keep captions readable at full opacity and immediately visible under reduced motion; constrain bubbles within desktop and phone diagram widths.

User-requested header navigation treatment (2026-10-14): remove all header/menu link underlines in every state and viewport. Use a smooth #647443 sage color for hover/focus/current navigation. Mobile and tablet menu toggle displays «Меню» beside the existing two-line icon, preserving touch target, keyboard accessibility and opening/closing behavior.

User-requested higher parcel CTAs (2026-10-13): place each plot action inside its text/details column, 24px after the descriptions, independently of drawing height. Align the two desktop/tablet text column bottoms using the maximum measured text height; phones retain natural text→CTA→diagram order. This supersedes whole-card bottom anchoring.

User-requested hero subtitle size (2026-10-13): «ДВА ИНВЕСТИЦИОННЫХ УЧАСТКА С ПРОДУКТОВОЙ КОНЦЕПЦИЕЙ» keeps uppercase text and uses the shared H2 visual role instead of H5, while retaining its paragraph semantics.

User-requested location map vertical placement (2026-10-13): on desktop align the map's upper edge with the first green location statistic card, using grid row 4 and the shared stats top margin. Supersedes centering the map alongside the whole section. Preserve the stacked mobile/tablet composition.

User-requested Play proportion refinement (2026-10-13): reduce the hero Play triangle by 20% around its visual center, retaining the existing circular background and hover scale.

User-requested semantic icon audit (2026-10-13): feature icons must match their text and not repeat across unrelated concepts. Hero parcels use dedicated resort-parcel, housing-parcel and combined-area shapes. Distinguish forest/pine, riverbank/yacht/marina, hotel facade/rooms/key, dining/rooftop terrace, thermal pool/medical SPA/wellness, event/population/agglomeration/countryside/business, and the two potential pins. Use semantic-icon-paths.js for the new code-native symbols with the shared 32-unit viewBox, 2px non-scaling stroke, accent/white colors and existing optical alignment. Repeating interface controls such as arrows and Play keep their established symbols.

User-requested prominent recreation icon (2026-10-13): enlarge the main map plaque's waterside icon from 28px to 84px, with a wider minimum 340px / 104px-high desktop plaque. On maps narrower than 480px use a 56px icon and 84px-high plaque, with width constrained to the map inset so the title remains readable.

User-requested optical centering of location quantities (2026-10-13): shift the three location number/unit rows down by 0.12em to compensate for Nimbus Sans's space below numerals, balancing their visible glyphs within the green cards. Preserve card padding and adjacent caption alignment on all viewports.

User-requested plot CTA alignment (2026-10-13): stretch adjacent plot cards and push each CTA to the card bottom, keeping both buttons on the same horizontal line regardless of diagram/text height. Preserve a minimum 24px content-to-button gap and consistent phone spacing when cards stack.

User-requested narrower large headings (2026-10-13): full-row section H2 headings and photographic H2 blocks use roughly half the available desktop width, without reducing font size or breaking long words. Headings already inside a half-width column retain that column width. Phones and tablets keep their responsive full-width text blocks; hero H1 remains unchanged.

User-requested stronger photo zoom (2026-10-13): increase the scroll-linked photographic background zoom range to 1.20→1 on desktop and 1.12→1 on phones, with 400ms transform smoothing. This supersedes the former 50px/24px amplitude limits; preserve reduced-motion disabling and stationary content.

User-requested small text tracking (2026-10-13): add 0.02em to small service text throughout the site. Caption/UI/input roles use 0.02em; existing label tracking increases from 0.06 to 0.08em and compact tracking from 0.04 to 0.06em. Include navigation, buttons, source notes and map credits; keep heading/body tracking unchanged.

User-requested footnote marker removal (2026-10-13): remove PDF superscript footnote markers ¹/² from visible site captions and source notes, preserving square-metre units м²/m² and all actual figures.

User-requested unique map recreation icon (2026-10-13): replace the repeated tree in the main map plaque with the dedicated waterside-recreation sun-over-waves icon, keeping the shared stroke, size and white color.

User-requested taller parcel diagrams (2026-10-13): enlarge both parcel diagrams proportionally using a wider visual grid column and 420px desktop / 240px phone width caps. Preserve their native aspect ratios (260/300 and 225/295). Move each contour caption above its SVG, centered; supersedes caption-below placement.

User correction to parcel decoration (2026-10-13): remove all tree motifs and scattered marks from both parcel diagrams. Use a subtle regular SVG dot pattern (18-unit pitch, 1.2-unit dot radius), clipped to each original boundary, with the green/blue diagram colors and a gentle entrance after outline drawing.

User-requested concept count size exception (2026-10-13): only the «154» concept-page total uses the H3 typography role, retaining centered alignment in its green action. This supersedes H2 for this particular count.

User correction to concept count (2026-10-13): center both «154» and «страницы» vertically within the green download action, using centered flex alignment instead of a shared baseline.

User-requested rooftop restaurant icon (2026-10-13): the housing-format «Панорамный ресторан / Терраса на крыше» uses the shared rooftop-terrace table/umbrella icon instead of a building symbol, preserving the common stroke, size and accent color.

User correction for opening KPI captions (2026-10-13): center each hero caption vertically against its icon in the shared second grid row, without the prior top alignment or icon margin. Keep the phone's separate stacked icon/caption arrangement.

User-requested parcel graphic decoration (2026-10-13): add small decorative outlined pine symbols and dots within both unchanged parcel silhouettes. Clip decorations to the original boundaries, stagger their appearance after contour drawing, and use three gentle sway/breathe cycles, with static visible decoration under reduced motion. These are decorative motifs rather than surveyed tree positions or planning data.

User-requested potential statement pins (2026-10-13): replace both green potential statement panels with unboxed text rows, each with its own outlined location pin at the left. Use the shared icon stroke/size and align the pin to the first text line on desktop and phones; supersedes the translucent panel treatment.

User-requested gentle photo scroll zoom (2026-10-13): all full-width photographic section backgrounds start slightly enlarged and return toward native scale as they pass through the viewport. Use at most 50px extra image width on desktop, a weaker phone effect, passive scroll + one scheduled frame, visible sections only, and disable the transform under reduced motion. Text, controls, maps, icons and source plan diagrams remain stationary.

User-requested housing note placement (2026-10-13): keep the housing-concept source footer inside the right housing-formats column, immediately after «Набор функций зависит…», including on phones.

User-requested large numeric values (2026-10-13): all standalone KPI quantities, area values, feature counts and concept-page total use the shared H2 role matching plot «5,5 га», including measurement units. Keep cadastral identifiers small. Adjust grid composition to fit the larger values rather than shrinking individual KPIs. Existing phone input, source references and navigation numbering remain functional text rather than numeric KPIs.

User-requested hero text removal (2026-10-13): remove the paragraph «Земельные участки у реки в Речкуновской зоне отдыха» from the first screen. Place the plots CTA immediately below the investment subtitle, with desktop CTA row 3 and KPI/video row 4. This supersedes the previous CTA row assignment.

User-requested single font (2026-10-13): use Nimbus Sans PDF throughout all headings, body copy, numeric values and live SVG text. Remove P052 registration, preload and font asset. Legacy serif role classes may remain for compatibility but resolve to the body family. This supersedes all earlier serif/display typography decisions; retain the shared visual size/weight roles and semantic tags.

User-requested hero CTA (2026-10-13): add «Посмотреть земельные участки» under the opening description, using the shared Action component with arrow and #plots destination. Keep it full width on phones; desktop KPI/video groups follow it in grid row 5.

User correction to KPI icon alignment (2026-10-13): in resort-concept, market and desktop hero statistics, align each icon to the center of the numeric heading row (dt), never span the number and description rows. This supersedes the earlier icon audit's two-row KPI alignment. Preserve mobile hero icons above numbers and the shared optical lift.

User-requested map frame refinement (2026-10-13): remove both outer and inner map outlines and their inset gap. Clip the full map to 6px rounded corners on every viewport.

User-requested premium architectural map redesign (2026-10-13, attachment 44356b1f): this supersedes the monochrome Leaflet map, separate project plaque, fullscreen/overview controls and phone movement toggle. Use MapLibre GL JS 6.14.0 with OpenFreeMap/OpenMapTiles vector data so land, forests, water, roads and boundaries have distinct quiet cream/sage/blue tones and native POI/place labels can be omitted entirely. Keep the existing section composition and shared typography/fonts. The primary object is one dark #154334 capsule button labelled «Наши участки», with integrated anchor dot, 48px visual height, shared H5/bold role and a single CSS green ring pulsing 1→1.8 / .35→0 over 2.8s. Use the actually embedded 700 weight instead of synthesizing an unavailable intermediate font. Cities are smaller integrated cream capsules (30px visual / 44px touch height), shared UI text, subtle hover 1.045; primary hover 1.05. No detached title cards, duplicated city names, pin-drop graphics, bright POI, shadows or fullscreen. Keep only compact custom +/− controls. Main marker activates/zooms and exposes the existing #plots route; do not duplicate parcel data. Coordinates remain in location-map-data.js, converted at the MapLibre boundary. Prioritize main marker and key cities in map-marker-layout.js; flip anchors, make modest city-label offsets, hide secondary collisions, and dock the primary marker to an edge with a return cue when its geographic point is offscreen. The primary marker always remains available. Keep rotation/wheel zoom disabled and cooperative two-finger touch movement so the page can scroll normally. Use 400px IntersectionObserver preload, dynamic component/library/style loading, a plain fixed-size placeholder, no initial WebGL/SDK/style/tile loading before approach, one retained map instance, once-only marker entry with project first, and reduced-motion/offscreen/page-hidden/focus handling. Vendor worker and CSS URLs carry the pinned SDK version, with its license. Preserve visible © OpenStreetMap contributors and OpenMapTiles credits. Verify 1440/1280/1024/768/390/375px, collisions, controls, keyboard, loading and retained instance; do not change unrelated site content or interactions.

User-requested interactive monochrome location map (2026-10-13): replace the static regional diagram with a real Leaflet 1.9.4 / OpenStreetMap map covering Novosibirsk, Koltsovo, Akademgorodok, Berdsk and the Rechkunovskaya recreation area. Desaturate only the tile pane; retain project-green geographic markers and a green recreation-area plaque using the shared typography. Coordinates belong to localities/recreation area, not cadastral boundaries. Include zoom, dragging, city/project focus, overview reset, keyboard controls and native fullscreen. Load the SDK and online tiles only when the map enters the viewport, retain the supplied optimized map image while loading, and show a retry action if tiles fail. Keep visible OpenStreetMap attribution and ordinary browser caching; no offline/bulk tile downloads. On phones, fit a narrower regional overview, use non-overlapping shared UI-size city labels and 44px controls, place the green plaque below the map, and require the explicit movement toggle for one-finger dragging so page scrolling remains available. Pinch zoom stays enabled. Preserve the geographic center when resizing or entering fullscreen. City labels enter sequentially; the project marker softly pulses while visible, stopping on focus, page hiding or reduced-motion preference. This explicit user-requested map animation supersedes the earlier single-entrance-only map marker instruction. Keep the other site's mobile/icon/typography decisions intact.

User-requested full icon optical alignment audit (2026-10-13): all ten feature/KPI icon assets (building, document, tree, boat, spa, people, waves, star and the two light variants) contain only their original visible stroke paths, with square viewBoxes centered on actual graphic bounds and proportional scaling. Remove clipped full-PDF fragments and oversized special-case people/SPA canvases. Shared icon slots are 32×32px, with 24×24px for compact phone KPIs; stroke remains 2px. Icon/text features use a fixed icon column and center against the full title-plus-description block. Resort/market KPIs and desktop hero KPIs place the icon across both text rows. Retain above-number hero icons on phones. Use one shared -1px optical lift, not per-instance/font-size/breakpoint offsets; interface arrows use -2px and FAQ signs -1px. Hotel title uses cap/alphabetic text-box trimming where supported, superseding the earlier 0.13×H4 font-size lift and 26×30px hotel slot. Preserve original path shapes/colors, semantic text, controls, and reduced-motion behavior. Arrow viewBox, two-line hamburger, Play graphics and checkbox checkmark were inspected as separate control geometries; agency branding and land/map diagrams are not feature icons.

User-requested full phone audit (2026-10-13): treat 320–430px as an intentional mobile composition, tested at real viewport heights and intermediate widths. Use mobile.css for phone layout refinements while retaining the shared six tag-independent typography roles, fonts, colors, assets, content and section order. Compact location statistics into number/description rows; compact resort and market KPI icon/value/label groups. Use two-column concept previews with the source page aspect ratio and single-column horizontal housing-format cards. Center/balance section headings, align both plot cards to the same inset, and give mobile CTAs the full content width. Retain the existing hero's lower intro placement and bottom KPI/video group. Improve source-note legibility (85% opacity) while keeping AI credits at 60%; legal footer links use 44px minimum touch rows. Mobile map labels compensate for the 770-unit SVG space to render at the shared 12px Caption size; lift the Akademgorodok label within the diagram to prevent overlap at 320px. Do not modify map paths or fabricate diagram data.

User-requested mobile navigation and motion quality (2026-10-13): keep the two 2px hamburger lines and smart header. Use a persistent inert closed navigation panel with a fading backdrop, 360ms opening / 220ms closing panel transition, 35ms item stagger, scroll lock, inert main content, keyboard focus containment, Escape/backdrop dismissal and restored toggle focus. Menu scrolls within dynamic viewport height and includes bottom safe-area padding; navigation closes before anchor scrolling. Honor reduced motion. Phone reveals use 12px/400ms and maximum 160ms delay; map marker animates once, plot drawing is shortened, and mobile video backdrop avoids blur. Preserve click-only video loading and the existing request preparation flow; no external messages are sent during QA.

User-requested centered plot captions (2026-10-13): center both plot source captions beneath their SVGs. On desktop match the caption width and right-aligned container to the diagram's 360px cap. On mobile stack diagram and caption in a centered column, with the existing 16px space; preserve SVG sizes and typography.

User-requested potential paragraph size (2026-10-13): both paragraphs in #potential .potential-copy use the shared Body role instead of H4, reaching 24px on large desktop with the shared fluid mobile scale. Preserve semantic paragraphs, wording, caption role and layout; no local font-size override.

User-requested housing photo tagline size (2026-10-13): «Жить в продолжение природы.» in #housing uses the shared Body role instead of H4, reaching 24px on large desktop while preserving the shared fluid mobile scale. Keep semantic p, wording, position, colors and section geometry; no local font-size override.

User-requested larger plot SVGs and hotel icon optical centering (2026-10-13): enlarge both plot diagram caps from 280px to 360px within the existing visual columns, and mobile diagram width from 140px to 180px. Let the mobile source note wrap below the diagram when the row cannot fit; preserve paths, colors, drawing animations, card grids and typography. In the hotel title row, optically center the building icon on the visible letters by lifting it by 0.13 × the shared H4 font size (about 4px desktop / 2px mobile), rather than centering it on the font's full line box including descender space. Retain the icon's 26×30px slot, 2px stroke and one-line title.

User-requested larger nature feature descriptions (2026-10-13): «характер места» and «связь с водой» in the two nature feature columns use the shared Body role (16–24px fluid Nimbus Sans) instead of the 12px Caption role. Keep H4 feature headings, existing white color, icon alignment, text spacing and responsive column layout. No new font family or local font-size exceptions.

User-requested location KPI units (2026-10-13): show 1 520 м, 980 м and 15 мин with their units immediately beside the animated numbers, baseline-aligned using shared stat-with-unit styling. Keep explanatory lines below as «от ж/д станции¹», «от остановки¹», «от Академгородка²». Preserve exact values, counter IDs and footnotes. Units use the existing H5 role and Nimbus Sans, numbers retain H3/P052; do not add local font sizes. Validate the cards across all breakpoints.

Location-unit layout exception: at 1120–1280px use shared 16px horizontal padding in location statistic cards so the number/unit rows fit the narrower left column; retain existing vertical padding, card widths and gaps. Other widths retain the shared card padding.

User-requested lower mobile hero introduction (2026-10-13): add more space below the 60px header for the hero title/introduction on phones <=650px. At heights 650–799px use header height + 48px top padding; at >=800px use header height + 64px; at >=950px use header height + 96px, retaining the existing title margin and shared spacing tokens. Keep compact spacing below 650px screen height, the bottom-aligned statistics/video group, credit, fonts and content unchanged. The added space should make the upper text group feel balanced without colliding with the lower group or overflowing the first screen.

User-requested bottom-aligned mobile hero group (2026-10-13): on phones <=650px, use margin-top:auto on the hero statistics inside the existing flex-column photo-content. The statistics and following video card form one bottom-aligned group immediately above the AI credit, with extra height absorbed between the introduction and statistics. Keep the credit at the section bottom, existing minimum gaps, typography and short-screen fit. The group stays in normal document flow, not fixed to the viewport during scrolling.

User-requested single-line hotel caption (2026-10-13): the resort photo's hotel-caption grows to its content width, capped by the available section width, instead of the former 400/420px cap. Keep «Гостиничный комплекс» on one line using the existing H4 role, center its icon vertically alongside that line, and keep the source caption below with the existing 8px gap. Use 24px block padding on desktop/tablet and 16px at <=650px so the same title/icon row fits small phones without new font sizes or overflow. Retain footer alignment, colors and source-caption role; verify all primary breakpoints.

User-requested resort rating star (2026-10-13): use the outline star.svg pictogram for the four-star target category in #resort-concept, replacing the document icon only in that statistic. Match the shared accent color, 2px non-scaling stroke, straight joins and existing 28×32px icon slot; retain the shared resort icon optical offset, typography and layout.

User-required tag-independent typography (2026-10-13): the six main visual roles are H1, H2, H3, H4, H5 and Body. Assign type-h1…type-h5/type-body classes according to function, regardless of whether the element is h1–h6, p, li, span, div, a, button or a form element. Preserve semantic tags. Do not use bare HTML tags or contextual tag selectors to assign typography sizes/line heights/weights; typography.css defines role classes only, with shared type-caption/type-ui/type-input service roles and type-bold/type-compact modifiers. Inline children, counters and links may inherit their enclosing text block's explicit role. Audit actual computed typography of all direct text nodes, form values/placeholders and accessible labels, including legal pages and dynamic dialog/status content. Body replaces the previous P token name without changing its scale.

Live SVG map text also uses shared typography roles via SourceArt, while source asset files remain intact. Retain each text run's starting x/first baseline and map geometry; remove per-glyph PDF x positioning in rendered markup so resized letters flow naturally. Project-label second-line offset must derive from H4 size and line-height tokens, not a fixed new spacing or font size. Include SVG text in computed-size audits.

User-requested unified typography (2026-10-13): typography.css is the sole source for font sizes, line heights, weights and tracking. Use six continuous visual levels H1–H5 and P, plus three documented service sizes (12px source/legal captions, 14px compact UI, 16px inputs). Map by function while preserving semantic heading tags, existing Nimbus Sans/P052, colors, page gutters and grids. Remove old local size/line-height/tracking declarations and breakpoint text overrides rather than stacking overrides. This supersedes earlier individual type-size instructions (including numeric and caption sizes); retain the two-line unwrapped hero title and shared icon/title alignment using typography tokens. Regular 400 and actual embedded Bold 700 only; do not synthesize missing weights.

User-requested offer separator clearance (2026-10-13): all three offer cards need at least 24px between the final list item's text box and the transaction-condition separator, on every viewport. Reserve this space as bottom padding on .offer-points while retaining margin-top:auto on .offer-condition to align conditions across equal-height cards. Keep existing card padding, backgrounds and wording.

User-requested smart header and mobile hamburger (2026-10-13): hide the fixed 60px header smoothly while scrolling down beyond the first 120px, and reveal it when scrolling up; ignore tiny direction changes with an 8px accumulated movement threshold and keep it visible near the page top. Keep the mobile menu visible while open and reveal the header for keyboard focus. Replace the mobile text toggle with two 24px-wide, 2px-thick lines that turn into a close cross when expanded, retaining accessible labels, aria-expanded, Escape dismissal and close-on-navigation. Respect reduced-motion; retain existing colors, header geometry and anchor offsets.

User-requested stable page bottom (2026-10-13): keep the full-width agency footer permanently visible and stationary; exclude .agency-footer from viewport entrance animations. Translating this final block extends scroll overflow and causes a temporary strip and jump below the green footer. Preserve its layout, spacing, colors, links and button interactions across all viewports.

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

User-requested map markers (2026-10-13): city labels and primary marker use rounded speech capsules with a centered downward triangular pointer, following the supplied reference. Remove integrated anchor dots. Primary label is «Речкуновская зона отдыха», split into two lines for readable phone sizing, superseding «Наши участки». Keep the project green and cities cream, shared typography, zoom interactions and reduced motion. Measure full marker dimensions for collision placement.

User-requested shared layout refinements (2026-10-13): KPI cards and hero values place the number above an icon + caption row, with zero extra row gap; this supersedes numeric-row icon alignment. Location descriptions follow their actual numeric width with a 16px gap. Text feature icons center on the heading alone, excluding supporting text. All map label surfaces have 6px corners and triangular pointers; main marker uses regular Nimbus Sans, a shared tree icon, and wider padding. Restore the original aerial video preview (original-1df96567a058ae97.jpg); grow Play on hover/keyboard focus, honoring reduced motion. Potential statements use restrained translucent green panels with accent rules. The concept count strip trims the numeric line box and uses compact vertical padding. Verify phone layouts and interactions.
