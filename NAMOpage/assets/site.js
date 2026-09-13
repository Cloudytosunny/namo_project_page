(() => {
  const videos = Array.from(document.querySelectorAll("video"));

  for (const video of videos) {
    video.addEventListener("error", () => {
      video.closest(".media-shell")?.classList.add("has-error");
    });

    const source = video.querySelector("source");
    source?.addEventListener("error", () => {
      video.closest(".media-shell")?.classList.add("has-error");
    });
  }

  const useManualPlayback = window.matchMedia(
  "(max-width: 900px), (pointer: coarse)"
).matches;

if (useManualPlayback || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target;

        if (entry.isIntersecting) {
          const playRequest = video.play();
          playRequest?.catch(() => {
            // Browser autoplay policies may require the user to press play.
          });
        } else {
          video.pause();
        }
      }
    },
    { rootMargin: "120px 0px", threshold: 0.18 },
  );

  videos.forEach((video) => observer.observe(video));
})();
