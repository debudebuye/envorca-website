"use client";

import { useState } from "react";

const DOWNLOAD_URL =
  "https://github.com/debudebuye/envorca/releases/download/nightly/envorca-windows-amd64.zip";

const POWER_SHELL_LINES = [
  `iwr -UseBasicParsing -O envorca.zip ${DOWNLOAD_URL}`,
  `tar -xf envorca.zip`,
  `.\\envorca.exe doctor`,
];

const CMD_LINES = [
  `curl -L -o envorca.zip "${DOWNLOAD_URL}"`,
  `tar -xf envorca.zip`,
  `envorca.exe doctor`,
];

function SnippetBlock({
  title,
  prompt,
  lines,
}: {
  title: string;
  prompt: string;
  lines: string[];
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = lines.join("\n");
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
    <div className="codeblock" aria-label={`Install Envorca from ${title}`}>
      <div className="codeblock__bar">
        <span className="codeblock__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="codeblock__title">{title}</span>
        <button className="codeblock__copy" onClick={copy} type="button">
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre>
        {lines.map((line, i) => (
          <div key={i} className="codeblock__line">
            <span className="codeblock__prompt">{prompt}</span>
            <code>{line}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}

export default function InstallSnippet() {
  return (
    <div className="codeblocks">
      <SnippetBlock title="Windows PowerShell" prompt="PS>" lines={POWER_SHELL_LINES} />
      <SnippetBlock title="CMD (cmd.exe)" prompt="C:\>" lines={CMD_LINES} />
    </div>
  );
}