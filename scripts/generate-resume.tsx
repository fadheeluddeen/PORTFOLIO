/**
 * Regenerates public/Fadheeluddeen_Resume.pdf straight from src/data/resume-data.ts.
 *
 * Runs automatically as part of `npm run build` (and therefore on every
 * push, via .github/workflows/deploy.yml) — so the downloadable PDF can
 * never drift out of sync with what's on the website again.
 *
 * Run it manually any time with: npm run resume
 */
import React from "react";
import { renderToFile } from "@react-pdf/renderer";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ResumeDocument } from "./ResumeDocument";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, "../public/Fadheeluddeen_Resume.pdf");

async function main() {
  await renderToFile(<ResumeDocument />, outputPath);
  console.log(`✓ Resume generated: ${path.relative(process.cwd(), outputPath)}`);
}

main().catch((err) => {
  console.error("✗ Resume generation failed:", err);
  process.exit(1);
});
