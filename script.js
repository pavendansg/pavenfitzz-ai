// ============================================
// 🔥 PAVENFITZZ — script.js
// ============================================

function unlockPremium() {
  const btn = document.querySelector(".cta-btn");
  btn.innerText = "Loading...";
  btn.disabled = true;
  setTimeout(() => {
    window.location.href = "payment.html";
  }, 400);
}
