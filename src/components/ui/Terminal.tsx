"use client";

import { useEffect } from "react";

const ARCHITECT_CODE = `const architect = {<br/>  background: "Enterprise Software",<br/>  specializing: "AI/ML Applications",<br/>  focus: "System Architecture" 🧠<br/>};<br/><br/><span class="comment">// Click anywhere to edit the code</span><br/><span class="comment">// ESC to restore</span>`;

const ARCHITECT_CODE_PLAIN = `const architect = {
  background: "Enterprise Software",
  specializing: "AI/ML Applications",
  focus: "System Architecture" 🧠
};

// Click anywhere to edit the code
// ESC to restore`;

type TerminalState = "normal" | "expanded" | "minimized" | "closed";

interface TerminalProps {
  terminalState: TerminalState;
  onTerminalAction: (action: "close" | "minimize" | "expand") => void;
}

export default function Terminal({ terminalState, onTerminalAction }: TerminalProps) {
  useEffect(() => {
    const terminal = document.getElementById("code-terminal");
    const container = document.getElementById("terminal-container");

    if (terminal) {
      terminal.setAttribute("data-state", terminalState);
    }

    if (container) {
      container.setAttribute(
        "data-terminal-expanded",
        terminalState === "expanded" ? "true" : "false"
      );
    }
  }, [terminalState]);

  useEffect(() => {
    const setupEditableTerminal = () => {
      const codeContent = document.querySelector(".code-content") as HTMLElement;
      if (!codeContent) return;

      const originalContent = codeContent.getAttribute("data-original") || "";

      const handleInput = () => {
        const terminal = document.querySelector(".code-terminal") as HTMLElement;
        if (!terminal) return;

        terminal.style.borderColor = "var(--primary)";
        terminal.style.boxShadow = "0 0 30px rgba(255, 107, 53, 0.3)";

        const currentLength = codeContent.textContent?.length || 0;
        const originalLength = originalContent.length;

        if (Math.abs(currentLength - originalLength) > 20) {
          terminal.classList.add("terminal-celebration");
          setTimeout(() => {
            terminal.classList.remove("terminal-celebration");
          }, 1000);
        }

        setTimeout(() => {
          terminal.style.borderColor = "rgba(255, 107, 53, 0.3)";
          terminal.style.boxShadow = "none";
        }, 2000);
      };

      const restoreOriginal = () => {
        const terminal = document.querySelector(".code-terminal") as HTMLElement;
        if (!terminal) return;

        codeContent.innerHTML = ARCHITECT_CODE;
        terminal.style.borderColor = "rgba(255, 107, 53, 0.3)";
        terminal.style.boxShadow = "none";
      };

      codeContent.addEventListener("input", handleInput);
      codeContent.addEventListener("paste", () => {
        setTimeout(handleInput, 0);
      });

      codeContent.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          restoreOriginal();
          codeContent.blur();
        }

        if (e.key === "Tab") {
          e.preventDefault();
          document.execCommand("insertText", false, "  ");
        }

        if (e.key === "a" && e.ctrlKey) {
          e.preventDefault();
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(codeContent);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      });

      codeContent.addEventListener("focus", () => {
        const terminal = document.querySelector(".code-terminal") as HTMLElement;
        if (terminal) {
          terminal.classList.add("terminal-focused");
        }
      });

      codeContent.addEventListener("blur", () => {
        const terminal = document.querySelector(".code-terminal") as HTMLElement;
        if (terminal) {
          terminal.classList.remove("terminal-focused");
        }
      });

      codeContent.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          const tempBR = document.createElement("br");
          codeContent.appendChild(tempBR);

          const computedStyle = window.getComputedStyle(codeContent);
          const lineHeight = parseFloat(computedStyle.lineHeight);
          const bufferSpace = lineHeight * 3;

          const currentContainerHeight = Math.max(
            codeContent.clientHeight,
            codeContent.parentElement?.clientHeight ?? codeContent.clientHeight
          );

          const wouldOverflow =
            codeContent.scrollHeight > currentContainerHeight - bufferSpace;

          if (wouldOverflow) {
            codeContent.removeChild(tempBR);
          } else {
            codeContent.removeChild(tempBR);
            document.execCommand("insertHTML", false, "<br>");
          }
        }
      });

      codeContent.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const terminal = codeContent.closest(".code-terminal");
          const isExpanded =
            terminal?.getAttribute("data-state") === "expanded";

          if (!isExpanded) {
            codeContent.style.display = "none";
            codeContent.offsetHeight;
            codeContent.style.display = "";
            codeContent.focus();
          }
        }
      });

      codeContent.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const terminal = codeContent.closest(".code-terminal");
          const isExpanded =
            terminal?.getAttribute("data-state") === "expanded";

          if (!isExpanded) {
            const currentContent = codeContent.innerHTML;
            codeContent.innerHTML = "";
            codeContent.innerHTML = currentContent;
            codeContent.focus();

            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(codeContent);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }
      });
    };

    setTimeout(setupEditableTerminal, 3000);
  }, []);

  return (
    <div className="code-terminal" id="code-terminal">
      <div className="terminal-header">
        <div
          className="terminal-dot dot-red"
          onClick={() => onTerminalAction("close")}
        ></div>
        <div
          className="terminal-dot dot-yellow"
          onClick={() => onTerminalAction("minimize")}
        ></div>
        <div
          className="terminal-dot dot-green"
          onClick={() => onTerminalAction("expand")}
        ></div>
      </div>
      <div
        className="code-content"
        contentEditable
        suppressContentEditableWarning
        data-original={ARCHITECT_CODE_PLAIN}
        dangerouslySetInnerHTML={{
          __html: ARCHITECT_CODE,
        }}
      />
    </div>
  );
}
