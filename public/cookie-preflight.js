(function () {
  try {
    var consent = localStorage.getItem("kinexis-cookie-consent");
    if (!consent) {
      document.documentElement.classList.add("cookie-pending");
    }
  } catch (_e) {
    /* ignore private browsing */
  }
})();
