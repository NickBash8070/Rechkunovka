// Ignore taps and vertical/diagonal gestures; one completed gesture changes one page.
export function gallerySwipeStep(dx, dy) {
  if (Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy) * 1.4) return 0;
  return dx < 0 ? 1 : -1;
}
