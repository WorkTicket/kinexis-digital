(function () {
  try {
    var root = document.documentElement;
    var ua = navigator.userAgent || "";
    if (/FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram|Messenger/i.test(ua)) {
      root.classList.add("in-app-browser");
      if (/Instagram/i.test(ua)) root.classList.add("in-app-instagram");
      else if (/FBAN|FBAV|FB_IAB|FB4A|FBIOS/i.test(ua)) root.classList.add("in-app-facebook");
    }
  } catch (_e) {
    /* ignore */
  }
  try {
    var consent = localStorage.getItem("kinexis-cookie-consent");
    if (!(consent === "accepted" || consent === "rejected")) {
      var match = document.cookie.match(/(?:^|; )kinexis-cookie-consent=(accepted|rejected)/);
      consent = match && match[1];
    }
    if (consent === "accepted" || consent === "rejected") {
      document.documentElement.classList.remove("cookie-pending");
    }
  } catch (_e) {
    /* ignore private browsing */
  }
})();
