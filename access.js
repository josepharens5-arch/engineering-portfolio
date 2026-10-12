// Casual-viewing gate only. This is not access control.
// The password and all website files are available to visitors and automated tools.
(() => {
  const password = "Arens_EE";
  const key = "arens-portfolio-viewing-v1";
  const gate = document.querySelector(".access-gate");
  const form = gate.querySelector("form");
  const input = gate.querySelector("input");
  const error = gate.querySelector(".access-error");
  const lock = document.querySelector(".access-lock");
  const showPortfolio = (focusHeading) => {
    document.body.classList.remove("portfolio-locked");
    gate.hidden = true;
    lock.hidden = false;
    error.textContent = "";
    input.value = "";
    if (focusHeading) {
      const heading = document.querySelector("main h1");
      if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus(); }
    }
  };
  form.querySelector("button").disabled = false;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value !== password) {
      error.textContent = "Incorrect password. Please try again.";
      input.focus(); input.select();
      return;
    }
    try { sessionStorage.setItem(key, "open"); } catch {}
    showPortfolio(true);
  });
  lock.addEventListener("click", () => {
    try { sessionStorage.removeItem(key); } catch {}
    gate.hidden = false;
    lock.hidden = true;
    document.body.classList.add("portfolio-locked");
    input.focus();
  });
  try { if (sessionStorage.getItem(key) === "open") showPortfolio(false); } catch {}
})();
