import { useState } from "react";
import Sidebar from "./Sidebar";
import NavigationBar from "./NavigationBar";

// ─────────────────────────────────────────────────────────────────────────────
export default function LayoutWrapper({
  children,
  pageTitle,            // passed to NavigationBar
}) {
  return (
    <div className="layout-root">

      {/* ── Topbar ── */}
      <header className="layout-topbar">
        <span className="layout-brand">MAGNETIC</span>
      </header>

      {/* ── Body: sidebar ── */}
      <div className="layout-body">
        <Sidebar/>

        {/* Content panel */}
        <div className="layout-content">
          <NavigationBar pageTitle={pageTitle} />
          <main className="layout-main">
            {children}
          </main>
        </div>

      </div>

      {/* ── Styles ── */}
      <style>{`
        /* ── Tokens ── */
        .layout-root {
          --teal-dark:  #1a3d35;
          --teal-mid:   #2d5a4e;
          --teal-light: #4a7c6f;
          --topbar-h:   56px;
          --cream:      #f5f0e8;
          --font-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          --font-sans:  'DM Sans', system-ui, -apple-system, sans-serif;
        }

        /* ── Root ── */
        .layout-root {
          min-height: 100svh;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: var(--font-sans);
          background: linear-gradient(135deg, var(--teal-light) 0%, var(--teal-mid) 40%, var(--teal-dark) 100%);
          background: -webkit-linear-gradient(135deg, #4a7c6f 0%, #2d5a4e 40%, #1a3d35 100%);
          overflow: hidden;
        }

        /* ── Topbar ── */
        .layout-topbar {
          height: var(--topbar-h);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 0 clamp(16px, 2.5vw, 28px);
          position: relative;
          z-index: 20;
        }

        .layout-brand {
          font-family: var(--font-serif);
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 600;
          letter-spacing: 6px;
          color: rgba(255,255,255,0.92);
        }

        /* ── Body ── */
        .layout-body {
          flex: 1;
          display: flex;
          align-items: stretch;
          min-height: 0;
        }

        /* ── Content panel ── */
        .layout-content {
          flex: 1;
          background: var(--cream);
          border-radius: 16px 0 0 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        .layout-main {
          flex: 1;
          overflow-y: auto;
        }

        /* ── Responsive ── */
        @media (max-width: 400px) {
          .layout-content { border-radius: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .layout-content { transition: none; }
        }
      `}</style>
    </div>
  );
}