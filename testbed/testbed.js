// Testbed JavaScript for Hui Prism Theme

// Theme switching functionality
function switchTheme(theme) {
  const devBtn = document.getElementById("btn-dev");
  const prodBtn = document.getElementById("btn-prod");
  const themeLink = document.querySelector('link[href*="theme.css"]');

  // Update button states
  devBtn.classList.toggle("active", theme === "dev");
  prodBtn.classList.toggle("active", theme === "prod");

  // Switch CSS file
  if (theme === "dev") {
    themeLink.href = "../dist/theme.css";
  } else {
    themeLink.href = "../dist/theme.min.css";
  }

  // Store preference
  localStorage.setItem("hui-prism-theme", theme);

  // Show notification
  showNotification(
    `Switched to ${theme === "dev" ? "Development" : "Production"} theme`
  );
}

// Copy to clipboard functionality
function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre[class*="language-"]');

  codeBlocks.forEach((block) => {
    // Create copy button
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = "Copy";
    copyBtn.setAttribute("aria-label", "Copy code to clipboard");

    // Add click handler
    copyBtn.addEventListener("click", async () => {
      const code = block.querySelector("code");
      const text = code.textContent;

      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied!";
        copyBtn.style.background = "#3bfc43";
        copyBtn.style.color = "#212121";

        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.style.background = "";
          copyBtn.style.color = "";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
        copyBtn.textContent = "Failed";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      }
    });

    // Add button to block
    block.style.position = "relative";
    block.appendChild(copyBtn);
  });
}

// Notification system
function showNotification(message) {
  // Remove existing notification
  const existing = document.querySelector(".notification");
  if (existing) {
    existing.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff0054;
        color: white;
        padding: 12px 20px;
        border-radius: 0.5rem;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;

  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 300);
  }, 3000);
}

// Language detection and labeling
function addLanguageLabels() {
  const codeBlocks = document.querySelectorAll('pre[class*="language-"]');

  codeBlocks.forEach((block) => {
    const className = block.className;
    const languageMatch = className.match(/language-(\w+)/);

    if (languageMatch) {
      const language = languageMatch[1];
      block.setAttribute("data-language", language);

      // Add language-specific styling
      switch (language) {
        case "javascript":
        case "typescript":
          block.style.borderLeft = "4px solid #fbff12";
          break;
        case "python":
          block.style.borderLeft = "4px solid #3bfc43";
          break;
        case "css":
        case "scss":
          block.style.borderLeft = "4px solid #0fb4f0";
          break;
        case "html":
          block.style.borderLeft = "4px solid #fd7e47";
          break;
        case "json":
          block.style.borderLeft = "4px solid #02e5ac";
          break;
        case "bash":
          block.style.borderLeft = "4px solid #1982c4";
          break;
        default:
          block.style.borderLeft = "4px solid #9B47FA";
      }
    }
  });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + D for dev theme
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
      e.preventDefault();
      switchTheme("dev");
    }

    // Ctrl/Cmd + P for prod theme
    if ((e.ctrlKey || e.metaKey) && e.key === "p") {
      e.preventDefault();
      switchTheme("prod");
    }

    // Escape to close notifications
    if (e.key === "Escape") {
      const notification = document.querySelector(".notification");
      if (notification) {
        notification.remove();
      }
    }
  });
}

// Performance monitoring
function monitorPerformance() {
  // Monitor theme switching performance
  const originalSwitchTheme = switchTheme;
  switchTheme = function (theme) {
    const start = performance.now();
    originalSwitchTheme(theme);
    const end = performance.now();

    console.log(`Theme switch to ${theme} took ${(end - start).toFixed(2)}ms`);
  };

  // Monitor page load performance
  window.addEventListener("load", () => {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  });
}

// Accessibility enhancements
function enhanceAccessibility() {
  // Add ARIA labels to code blocks
  const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
  codeBlocks.forEach((block, index) => {
    block.setAttribute("role", "region");
    block.setAttribute("aria-label", `Code example ${index + 1}`);
  });

  // Add focus management for copy buttons
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Announce theme changes to screen readers
  const originalSwitchTheme = switchTheme;
  switchTheme = function (theme) {
    originalSwitchTheme(theme);

    // Create live region for announcements
    let liveRegion = document.getElementById("live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = `Switched to ${
      theme === "dev" ? "Development" : "Production"
    } theme`;
  };
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Restore saved theme preference
  const savedTheme = localStorage.getItem("hui-prism-theme") || "dev";
  switchTheme(savedTheme);

  // Initialize features
  addCopyButtons();
  addLanguageLabels();
  setupKeyboardShortcuts();
  monitorPerformance();
  enhanceAccessibility();

  // Show welcome message
  setTimeout(() => {
    showNotification(
      "Welcome to Hui Prism Theme Testbed! Use Ctrl+D for dev theme, Ctrl+P for prod theme."
    );
  }, 1000);

  console.log("🎨 Hui Prism Theme Testbed initialized");
  console.log("📝 Features:");
  console.log("  - Theme switching (Dev/Prod)");
  console.log("  - Copy to clipboard");
  console.log("  - Language detection");
  console.log("  - Keyboard shortcuts");
  console.log("  - Performance monitoring");
  console.log("  - Accessibility enhancements");
});

// Export functions for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    switchTheme,
    addCopyButtons,
    addLanguageLabels,
    showNotification,
  };
}
