(function () {
  try {
    var consent = localStorage.getItem("kinexis-cookie-consent");
    if (!consent) {
      document.documentElement.classList.add("cookie-pending");
    }
  } catch (e) {
    /* ignore private browsing */
  }
})();
