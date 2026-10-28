  (function () {
    var form = document.getElementById("rfq-form");
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { status.textContent = "Please complete every field."; return; }
      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint) { status.textContent = "Online requests are not connected yet. Please call 603-382-3182."; return; }
      status.textContent = "Sending…";
      fetch(endpoint, { method: "POST", body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw 0; form.reset(); status.textContent = "Received. We'll be in touch."; })
        .catch(function () { status.textContent = "That didn't go through. Please call 603-382-3182."; });
    });
  })();

  // "View Your Proposal" bar: only when the site was opened from the proposal (?from=proposal), so the public never sees it.
  (function () {
    var q = new URLSearchParams(location.search), p = q.get("p"), on = q.get("from") === "proposal";
    try {
      if (on) sessionStorage.setItem("ph-proposal", p || "");
      else if (sessionStorage.getItem("ph-proposal") !== null) { on = true; p = sessionStorage.getItem("ph-proposal"); }
    } catch (e) {}
    if (!on) return;
    var bar = document.createElement("div");
    bar.className = "proposal-bar";
    var a = document.createElement("a");
    a.href = "/proposal/" + (p ? "?p=" + encodeURIComponent(p) : "");
    a.textContent = "View Your Proposal →";
    bar.appendChild(a);
    document.body.insertBefore(bar, document.body.firstChild);
  })();
