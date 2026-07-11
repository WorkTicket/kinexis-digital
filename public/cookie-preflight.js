(function () {
  try {
    var consent = localStorage.getItem("kinexis-cookie-consent");
    if (consent) {
      document.documentElement.classList.remove("cookie-pending");
    }
  } catch (_e) {
    /* ignore private browsing */
  }
})();
