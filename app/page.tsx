import InstallSnippet from "./InstallSnippet";
import ThemeToggle from "./ThemeToggle";

const DOWNLOAD_URL =
  "https://github.com/debudebuye/envorca/releases/download/nightly/envorca-windows-amd64.zip";
const GITHUB_URL = "https://github.com/debudebuye/envorca";
const VERSION = "0.1.0-dev";

const features = [
  {
    tag: "detect",
    title: "Detects",
    body: "Seven probes cover the whole WSL2 + Docker stack: daemon, Windows OS, virtualization firmware and services, WSL lifecycle, Linux kernel version, memory, and the container runtime.",
  },
  {
    tag: "explain",
    title: "Explains",
    body: "Every probe reports what is wrong, why it matters, and a recommendation — in plain language. No cryptic WSL error dumps.",
  },
  {
    tag: "fix",
    title: "Fixes",
    body: 'Recovery follows a diagnose → propose → confirm → execute → verify flow. Destructive actions always require your explicit "yes".',
  },
  {
    tag: "remember",
    title: "Remembers",
    body: "Diagnostic snapshots and repair outcomes are stored in a local SQLite database with bounded retention.",
  },
  {
    tag: "stream",
    title: "Streams",
    body: "A real-time event bus surfaces daemon activity as it happens, with a replay buffer so nothing is missed.",
  },
];

const probes = [
  "daemon",
  "windows",
  "virtualization",
  "wsl",
  "linux_kernel",
  "resources",
  "container_runtime",
];

const steps = [
  {
    title: "Download",
    body: "Grab envorca-windows-amd64.zip from the latest release — the nightly build refreshes on every push to main.",
  },
  {
    title: "Unzip",
    body: "Keep envorca.exe (12 MB) and envorcad.exe (16 MB) in the same folder. The CLI auto-finds the daemon next to it.",
  },
  {
    title: "Start",
    body: "Run envorca.exe start. The daemon launches detached on the named pipe \\.\pipe\envorca — no admin rights, no TCP, no installation.",
  },
];

const commands: Array<[string, string]> = [
  ["envorca doctor", "Diagnose the whole WSL2 + Docker stack, in plain language"],
  ["envorca repair [--yes]", "Propose and apply safe, deterministic repair actions"],
  ["envorca status", "Quick overall health summary"],
  ["envorca events [--replay]", "Stream daemon events (startup, repairs, lifecycle)"],
  ["envorca history [--limit N]", "Recorded diagnostic snapshots and repair outcomes"],
  ["envorca start | stop", "Launch / gracefully shut down the daemon"],
  ["envorca ping", "Check daemon liveness and version"],
];

type DoctorLineProps = {
  cmd: string;
  cls?: string;
  st?: "ok" | "warn" | "err";
};

const doctorLines: DoctorLineProps[] = [
  { cmd: "$ envorca doctor", cls: "" },
  { cmd: "", cls: "" },
  { cmd: "  COMPONENT             STATUS     NOTES", cls: "dim" },
  { cmd: "  daemon                HEALTHY    daemon running", st: "ok" },
  { cmd: "  windows               HEALTHY    Windows 10.0 (build 26200)", st: "ok" },
  { cmd: "  virtualization        HEALTHY    CPU virtualization + VMP available", st: "ok" },
  { cmd: "  wsl                   HEALTHY    WSL2 ready; default distro Ubuntu-24.04", st: "ok" },
  { cmd: "  linux_kernel          HEALTHY    6.18.33.2-2", st: "ok" },
  { cmd: "  resources             HEALTHY    memory: 15.8 GB installed", st: "ok" },
  { cmd: "  container_runtime     HEALTHY    Docker ready; 3 running, 5 total", st: "ok" },
  { cmd: "", cls: "" },
  { cmd: "  Overall: HEALTHY", st: "ok" },
  { cmd: "  Summary: 0 problems detected", cls: "dim" },
];

function DoctorLine({
  cmd,
  cls = "",
  st,
}: {
  cmd: string;
  cls?: string;
  st?: "ok" | "warn" | "err";
}) {
  return (
    <div className="terminal__line">
      {st === "ok" && <span className="st st--ok">●</span>}
      <span className={cls}>{cmd}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <nav className="nav">
        <a className="nav__brand" href="#top">
          <span className="nav__mark" aria-hidden="true" />
          <span className="nav__name">ENVORCA</span>
          <span className="nav__ver">{VERSION}</span>
        </a>
        <div className="nav__links">
          <a href="#terminal">&gt; demo</a>
          <a href="#features">features</a>
          <a href="#install">install</a>
          <a href="#usage">cli</a>
        </div>
        <ThemeToggle />
        <a
          className="btn nav__cta"
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </nav>

      <header id="top" className="hero">
        <div className="chips">
          <span className="chip">{VERSION}</span>
          <span className="chip">WSL2</span>
          <span className="chip">Windows 10/11</span>
          <span className="chip">Apache-2.0</span>
        </div>

        <h1 className="hero__title">
          envorca<span className="cursor" aria-hidden="true" />
        </h1>
        <p className="hero__tagline">
          Linux development on Windows <span className="accent">just works.</span>
        </p>
        <p className="hero__sub">
          A local daemon that manages WSL2 and Docker behind your Windows dev
          workflow — it watches your environment, explains what broke in plain
          language, and repairs it safely. No admin rights. Nothing leaves your
          machine.
        </p>

        <div className="hero__actions">
          <a className="btn btn--primary" href={DOWNLOAD_URL}>
            ↓ download envorca-windows-amd64.zip
          </a>
          <a className="btn btn--ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
            source on github
          </a>
        </div>
        <p className="hero__meta">
          envorca.exe 12 MB · envorcad.exe 16 MB · built nightly from main
        </p>
      </header>

      <main>
        <section id="terminal" className="section section--wide">
          <SectionLabel>real output, not a mock</SectionLabel>
          <h2>It tells you what broke — and fixes it</h2>
          <div className="terminal">
            <div className="terminal__bar">
              <span className="terminal__title">
                envorca doctor — 7 health probes
              </span>
            </div>
            <div className="terminal__body">
              {doctorLines.map((l, i) => (
                <DoctorLine key={i} {...l} />
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <SectionLabel>what it does</SectionLabel>
          <h2>One command, seven probes, zero guesswork</h2>
          <div className="cards">
            {features.map((f) => (
              <article key={f.tag} className="card">
                <span className="card__tag">// {f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
          <div className="probes">
            {probes.map((p) => (
              <span key={p} className="probe">
                {p}
              </span>
            ))}
          </div>
        </section>

        <section id="install" className="section">
          <SectionLabel>install in 30s</SectionLabel>
          <h2>Setup</h2>
          <InstallSnippet />
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <strong>
                  0{i + 1} · {s.title}
                </strong>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="note">
            <strong>Requirements:</strong> Windows 10/11 with WSL2 enabled ({" "}
            <code>wsl --install -d Ubuntu</code>), a user distro as WSL default, and
            Docker — optional: Docker Desktop with WSL integration, or a docker CLI
            inside the distro. Envorca ships as two binaries; no Go runtime required.
          </div>
        </section>

        <section id="usage" className="section">
          <SectionLabel>command reference</SectionLabel>
          <h2>CLI</h2>
          <div className="cmdtable-wrap">
            <table className="cmdtable">
              <tbody>
                {commands.map(([cmd, desc]) => (
                  <tr key={cmd}>
                    <th scope="row">
                      <code>{cmd}</code>
                    </th>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section section--wide">
          <SectionLabel>under the hood</SectionLabel>
          <h2>Daemon + thin client</h2>
          <p className="how-body">
            The CLI dials the daemon over local IPC — a named pipe on Windows ( SDDL-
            protected), a Unix socket on Linux — and renders responses. All
            infrastructure logic lives in the daemon: it talks to WSL2 via{" "}
            <code>wsl.exe</code> argument slices, never shell strings, and reaches
            containers through a runtime-driver interface. Nothing listens on TCP,
            and nothing requires elevation.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>
          <a href={GITHUB_URL}>github.com/debudebuye/envorca</a> · Apache-2.0 · CI
          rebuilds this site&apos;s download link on every push
        </p>
        <p className="footer__mono">
          powerful infrastructure underneath · simple experience on top
        </p>
      </footer>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section__label">// {children}</p>;
}