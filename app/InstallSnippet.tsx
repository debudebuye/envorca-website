"use client";

import { useState } from "react";

const LINES = [
  `iwr -UseBasicParsing -O envorca.zip https://github.com/debudebuye/envorca/releases/download/nightly/envorca-windows-amd64.zip`,
  `tar -xf envorca.zip`,
  `.\envorca.exe doctor`,
];

export default function InstallSnippet() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = LINES.join("`n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="codeblock" aria-label="Install Envorca from Windows PowerShell">
      <div className="codeblock__bar">
        <span className="codeblock__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="codeblock__title">Windows PowerShell</span>
        <button className="codeblock__copy" onClick={copy} type="button">
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre>
        {LINES.map((line, i) => (
          <div key={line} className="codeblock__line">
            <span className="codeblock__prompt">{i === 0 ? "PS>" : "PS>"}</span>
            <code>{line}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}