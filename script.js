// Mo Famiz Productions - Dynamic behaviors (no framework)

document.getElementById("year").textContent = new Date().getFullYear();

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

hamburger?.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  mobileNav.classList.toggle("show");
  mobileNav.setAttribute("aria-hidden", String(expanded));
});

mobileNav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileNav.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

async function loadTracks() {
  const el = document.getElementById("tracksList");
  if (!el) return;

  try {
    const res = await fetch("./data/tracks.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Could not load tracks.json");
    const data = await res.json();

    el.innerHTML = "";
    (data.tracks || []).forEach((t) => {
      const a = document.createElement("a");
      a.href = t.url || "#";
      a.target = "_blank";
      a.rel = "noreferrer";
      a.className = "link-item";
      a.innerHTML = `
        <div>
          <div class="link-item__title">${escapeHtml(t.title || "Untitled")}</div>
          <div class="tiny muted">${escapeHtml(t.type || "Link")}</div>
        </div>
        <div class="tag">Open</div>
      `;
      el.appendChild(a);
    });

    if (!(data.tracks || []).length) {
      el.innerHTML = '<div class="tiny muted">No links yet. Add some to data/tracks.json</div>';
    }
  } catch (err) {
    el.innerHTML = '<div class="tiny muted">Could not load portfolio. Check data/tracks.json</div>';
  }
}
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
loadTracks();

const form = document.getElementById("bookingForm");
const statusEl = document.getElementById("formStatus");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Sending…";
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "Request failed");

    statusEl.textContent = "Request sent. We’ll reach out soon!";
    form.reset();
  } catch (err) {
    statusEl.textContent = "Could not send. Please try again or email us directly.";
  }
});
