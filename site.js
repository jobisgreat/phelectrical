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
