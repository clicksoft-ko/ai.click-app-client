export function scrollClearCarousels() {
  document.querySelectorAll(".carousel-item")?.forEach((item) => {
    item.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
}
