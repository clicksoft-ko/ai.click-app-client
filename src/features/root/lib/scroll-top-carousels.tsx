export function scrollTopCarousels() {
  document.querySelectorAll(".carousel-item")?.forEach((item) => {
    item.scrollTo({ top: 0, behavior: "smooth" });
  });
}
