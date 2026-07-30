(function () {
  function copyCode(button, code) {
    navigator.clipboard.writeText(code.textContent).then(function () {
      var originalText = button.textContent;
      button.textContent = "Copied!";
      setTimeout(function () {
        button.textContent = originalText;
      }, 1500);
    });
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll(".markdown-body pre").forEach(function (pre) {
      var code = pre.querySelector("code");
      if (!code || pre.parentElement.classList.contains("code-block")) {
        return;
      }

      var details = document.createElement("details");
      details.className = "code-block";

      var summary = document.createElement("summary");
      var label = document.createElement("span");
      var language = code.className.match(/language-([\w+-]+)/);
      label.textContent = language ? language[1] : "Code";

      var copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "code-block-copy";
      copyButton.textContent = "Copy";
      copyButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        copyCode(copyButton, code);
      });

      summary.append(label, copyButton);
      details.append(summary, pre.cloneNode(true));
      pre.replaceWith(details);
    });
  }

  document.addEventListener("DOMContentLoaded", enhanceCodeBlocks);
})();
