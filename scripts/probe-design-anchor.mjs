#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const target = resolve(process.argv[2] || process.cwd());

function readText(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

function readJson(path) {
  try {
    return JSON.parse(readText(path));
  } catch {
    return null;
  }
}

function has(rel) {
  return existsSync(join(target, rel));
}

function countFiles(rel, extensions, options = {}) {
  const root = join(target, rel);
  const maxDepth = options.maxDepth ?? 4;
  const ignored = new Set([
    "node_modules",
    ".git",
    ".next",
    ".nuxt",
    ".anchor",
    "dist",
    "build",
    "coverage",
    ...(options.ignored || []),
  ]);

  function walk(dir, depth) {
    if (depth > maxDepth) return 0;
    let entries = [];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return 0;
    }

    return entries.reduce((count, entry) => {
      if (ignored.has(entry.name)) return count;
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return count + walk(path, depth + 1);
      if (!entry.isFile()) return count;
      if (options.exclude?.some((part) => path.includes(part))) return count;
      return extensions.some((ext) => entry.name.endsWith(ext)) ? count + 1 : count;
    }, 0);
  }

  return walk(root, 0);
}

function packageManager() {
  if (has("pnpm-lock.yaml")) return "pnpm";
  if (has("yarn.lock")) return "yarn";
  if (has("bun.lockb") || has("bun.lock")) return "bun";
  if (has("package-lock.json")) return "npm";
  return "npm";
}

function dependencyVersion(pkg) {
  return pkg?.devDependencies?.["design-anchor"]
    || pkg?.dependencies?.["design-anchor"]
    || pkg?.optionalDependencies?.["design-anchor"]
    || null;
}

function nodeModuleVersion() {
  return readJson(join(target, "node_modules/design-anchor/package.json"))?.version || null;
}

function hasDesignAlias() {
  const configs = ["tsconfig.json", "tsconfig.app.json", "jsconfig.json"];
  return configs.some((config) => {
    const json = readJson(join(target, config));
    const paths = json?.compilerOptions?.paths;
    return Boolean(paths?.["@design"] || paths?.["@design/*"]);
  });
}

function gitignoreHasAnchor() {
  const gitignore = readText(join(target, ".gitignore"));
  const gitExclude = readText(join(target, ".git/info/exclude"));
  return /(^|\n)\s*\.anchor\/?\s*(\n|$)/.test(`${gitignore}\n${gitExclude}`);
}

function mcpConfigFiles() {
  return [".mcp.json", ".cursor/mcp.json"].filter(has);
}

function hasPortableMcpConfig() {
  return mcpConfigFiles().some((rel) => {
    const json = readJson(join(target, rel));
    const servers = json?.mcpServers || json?.servers || {};
    return Object.values(servers).some((server) => {
      const command = String(server?.command || "");
      const args = Array.isArray(server?.args) ? server.args.map(String) : [];
      const commandLine = [command, ...args].join(" ");
      return command.includes("npx")
        && commandLine.includes("design-anchor")
        && commandLine.includes("mcp")
        && commandLine.includes("./.anchor");
    });
  });
}

function hasGovernanceBridge() {
  return has("AGENTS.md")
    || has("CLAUDE.md")
    || has(".cursorrules")
    || has(".cursor/rules/anchor.mdc")
    || has(".github/copilot-instructions.md")
    || hasPortableMcpConfig();
}

function installCommand(pm) {
  if (pm === "pnpm") return "pnpm add -D design-anchor";
  if (pm === "yarn") return "yarn add -D design-anchor";
  if (pm === "bun") return "bun add -d design-anchor";
  return "npm install -D design-anchor";
}

function syncCommand(pm) {
  if (pm === "pnpm") return "pnpm exec design-anchor sync";
  if (pm === "yarn") return "yarn design-anchor sync";
  if (pm === "bun") return "bunx design-anchor sync";
  return "npx design-anchor sync";
}

function hydrateCommand(pm) {
  if (pm === "pnpm") return "pnpm exec design-anchor hydrate";
  if (pm === "yarn") return "yarn design-anchor hydrate";
  if (pm === "bun") return "bunx design-anchor hydrate";
  return "npx design-anchor hydrate";
}

function addCommand(pm) {
  if (pm === "pnpm") return "pnpm exec design-anchor add <component>";
  if (pm === "yarn") return "yarn design-anchor add <component>";
  if (pm === "bun") return "bunx design-anchor add <component>";
  return "npx design-anchor add <component>";
}

function dependencyNames(pkg) {
  return new Set([
    ...Object.keys(pkg?.dependencies || {}),
    ...Object.keys(pkg?.devDependencies || {}),
    ...Object.keys(pkg?.optionalDependencies || {}),
  ]);
}

function hasKnownUiDependency(pkg) {
  const names = dependencyNames(pkg);
  return [
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@mui/material",
    "@chakra-ui/react",
    "antd",
    "react-aria-components",
    "next-themes",
    "class-variance-authority",
    "tailwind-variants",
    "lucide-react",
  ].some((name) => names.has(name));
}

const KNOWN_ICON_LIBRARIES = [
  "lucide-react",
  "@heroicons/react",
  "react-icons",
  "@fortawesome/react-fontawesome",
  "@fortawesome/free-solid-svg-icons",
  "@fortawesome/free-regular-svg-icons",
  "@phosphor-icons/react",
  "@tabler/icons-react",
  "@mui/icons-material",
  "@ant-design/icons",
];

function detectIconLibraries(pkg) {
  const names = dependencyNames(pkg);
  return KNOWN_ICON_LIBRARIES.filter((lib) => names.has(lib));
}

function detectLayoutSignals(pkg) {
  const names = dependencyNames(pkg);
  const hasLayoutComponents = has("src/components/layout")
    || has("src/components/Layout")
    || has("src/layouts")
    || has("src/app/layout.tsx")
    || has("src/app/layout.jsx")
    || has("app/layout.tsx")
    || has("app/layout.jsx");
  const hasSidebarComponent = has("src/components/Sidebar.tsx")
    || has("src/components/sidebar.tsx")
    || has("src/components/Sidebar/index.tsx")
    || has("src/components/sidebar/index.tsx")
    || has("src/components/layout/Sidebar.tsx")
    || has("src/components/layout/sidebar.tsx");
  const hasShellComponent = has("src/components/Shell.tsx")
    || has("src/components/shell.tsx")
    || has("src/components/AppShell.tsx")
    || has("src/components/app-shell.tsx");
  const hasGridLibrary = names.has("react-grid-layout")
    || names.has("@dnd-kit/core")
    || names.has("react-resizable-panels");

  return {
    hasLayoutComponents,
    hasSidebarComponent,
    hasShellComponent,
    hasGridLibrary,
  };
}

function detectFormLibrary(pkg) {
  const names = dependencyNames(pkg);
  if (names.has("react-hook-form")) return "react-hook-form";
  if (names.has("formik")) return "formik";
  if (names.has("@tanstack/react-form")) return "@tanstack/react-form";
  return null;
}

function detectTableLibrary(pkg) {
  const names = dependencyNames(pkg);
  if (names.has("@tanstack/react-table")) return "@tanstack/react-table";
  if (names.has("react-table")) return "react-table";
  if (names.has("ag-grid-react")) return "ag-grid-react";
  if (names.has("@mui/x-data-grid")) return "@mui/x-data-grid";
  return null;
}

function detectFramework(pkg) {
  const names = dependencyNames(pkg);
  if (names.has("next")) return "next";
  if (names.has("nuxt")) return "nuxt";
  if (names.has("@remix-run/react") || names.has("remix")) return "remix";
  if (names.has("vite") && names.has("react")) return "vite-react";
  if (names.has("@sveltejs/kit")) return "sveltekit";
  if (names.has("svelte")) return "svelte";
  if (names.has("vue")) return "vue";
  if (names.has("astro")) return "astro";
  if (names.has("react")) return "react";
  return null;
}

function detectComponentLibrary(pkg) {
  const names = dependencyNames(pkg);
  const libs = [];
  if (names.has("@radix-ui/react-dialog") || names.has("@radix-ui/react-slot")) libs.push("radix-ui");
  if (names.has("@mui/material")) libs.push("mui");
  if (names.has("@chakra-ui/react")) libs.push("chakra-ui");
  if (names.has("antd")) libs.push("antd");
  if (names.has("@mantine/core")) libs.push("mantine");
  if (names.has("@headlessui/react")) libs.push("headless-ui");
  if (names.has("react-aria-components")) libs.push("react-aria");
  if (has("components.json")) libs.push("shadcn-ui");
  return libs;
}

function detectStateManagement(pkg) {
  const names = dependencyNames(pkg);
  if (names.has("zustand")) return "zustand";
  if (names.has("@reduxjs/toolkit") || names.has("redux")) return "redux";
  if (names.has("jotai")) return "jotai";
  if (names.has("recoil")) return "recoil";
  if (names.has("mobx")) return "mobx";
  if (names.has("valtio")) return "valtio";
  return null;
}

function detectValidationLibrary(pkg) {
  const names = dependencyNames(pkg);
  if (names.has("zod")) return "zod";
  if (names.has("yup")) return "yup";
  if (names.has("joi")) return "joi";
  if (names.has("@sinclair/typebox")) return "typebox";
  return null;
}

function detectCssStrategy(pkg) {
  const names = dependencyNames(pkg);
  const strategies = [];
  if (names.has("tailwindcss")) strategies.push("tailwind");
  if (names.has("styled-components")) strategies.push("styled-components");
  if (names.has("@emotion/react") || names.has("@emotion/styled")) strategies.push("emotion");
  if (names.has("sass") || names.has("node-sass")) strategies.push("sass");
  if (names.has("@vanilla-extract/css")) strategies.push("vanilla-extract");
  if (names.has("@stitches/react")) strategies.push("stitches");
  if (strategies.length === 0 && has("src")) strategies.push("css-modules-or-plain");
  return strategies;
}

function detectTechStackFit(pkg, framework, cssStrategies, signals) {
  if (!pkg) {
    return {
      level: "unknown",
      label: "No package.json detected",
      installPolicy: "confirm-app-root",
      canAutoInstallRuntime: false,
      canInstallComponents: false,
      notes: ["Confirm the app root before installing Design Anchor."],
    };
  }

  const names = dependencyNames(pkg);
  const hasReact = names.has("react")
    || ["next", "remix", "vite-react", "react"].includes(framework);
  const hasTailwind = cssStrategies.includes("tailwind") || signals.hasTailwindConfig;
  const isFullReactWeb = hasReact && hasTailwind
    && ["next", "remix", "vite-react", "react"].includes(framework);
  const isAstroReact = framework === "astro" && hasReact && hasTailwind;
  const isNonReactWeb = ["vue", "nuxt", "svelte", "sveltekit"].includes(framework)
    || names.has("@angular/core")
    || names.has("solid-js");
  const isNativeMobile = names.has("react-native")
    || names.has("expo")
    || names.has("@react-native/core")
    || names.has("@flutter-js/core");

  if (isFullReactWeb) {
    return {
      level: "full",
      label: "React + Tailwind web app",
      installPolicy: "auto-for-implementation",
      canAutoInstallRuntime: true,
      canInstallComponents: true,
      notes: ["Full Design Anchor runtime path is appropriate for implementation work."],
    };
  }

  if (hasReact && !hasTailwind) {
    return {
      level: "partial",
      label: "React without Tailwind",
      installPolicy: "ask-before-runtime",
      canAutoInstallRuntime: false,
      canInstallComponents: false,
      notes: ["Confirm token CSS/Tailwind integration before installing runtime or components."],
    };
  }

  if (isAstroReact) {
    return {
      level: "partial",
      label: "Astro with React islands + Tailwind",
      installPolicy: "ask-before-runtime",
      canAutoInstallRuntime: false,
      canInstallComponents: false,
      notes: ["Install only after confirming the target React island uses the compatible setup."],
    };
  }

  if (isNonReactWeb) {
    return {
      level: "design-guidance",
      label: `${framework || "non-React"} web app`,
      installPolicy: "do-not-install-by-default",
      canAutoInstallRuntime: false,
      canInstallComponents: false,
      notes: ["Use Design Anchor for design guidance/token thinking; offer an adaptation plan before installing runtime."],
    };
  }

  if (isNativeMobile) {
    return {
      level: "not-direct-runtime-target",
      label: "native/mobile app",
      installPolicy: "do-not-install",
      canAutoInstallRuntime: false,
      canInstallComponents: false,
      notes: ["Do not install runtime/components; use prompt, token, layout, and visual guidance only."],
    };
  }

  if (hasTailwind && !hasReact) {
    return {
      level: "partial",
      label: "Tailwind without detected React",
      installPolicy: "ask-before-runtime",
      canAutoInstallRuntime: false,
      canInstallComponents: false,
      notes: ["Confirm framework and integration target before installing runtime."],
    };
  }

  return {
    level: "unknown",
    label: framework || "unknown frontend stack",
    installPolicy: "inspect-before-install",
    canAutoInstallRuntime: false,
    canInstallComponents: false,
    notes: ["Inspect package/framework files before installing Design Anchor."],
  };
}

function projectSignals(pkg) {
  const uiExtensions = [".tsx", ".jsx", ".vue", ".svelte"];
  const styleExtensions = [".css", ".scss", ".sass", ".less"];
  const appFiles = countFiles("src/app", uiExtensions)
    + countFiles("src/pages", uiExtensions)
    + countFiles("app", uiExtensions)
    + countFiles("pages", uiExtensions);
  const componentFiles = countFiles("src/components", uiExtensions, {
    exclude: [`${join("src", "components", "anchor-ui")}`],
  });
  const routeFiles = countFiles("src/routes", uiExtensions) + countFiles("routes", uiExtensions);
  const styleFiles = countFiles("src", styleExtensions) + countFiles("styles", styleExtensions);
  const hasTailwindConfig = has("tailwind.config.js")
    || has("tailwind.config.cjs")
    || has("tailwind.config.mjs")
    || has("tailwind.config.ts");
  const hasUiDependency = hasKnownUiDependency(pkg) || has("components.json");
  const score = appFiles * 2
    + routeFiles * 2
    + componentFiles
    + Math.min(styleFiles, 8)
    + (hasUiDependency ? 6 : 0)
    + (hasTailwindConfig ? 3 : 0);
  const projectMaturity = score >= 24
    ? "complete"
    : score >= 10
      ? "established"
      : "new-or-small";

  return {
    appFiles,
    routeFiles,
    componentFiles,
    styleFiles,
    hasTailwindConfig,
    hasUiDependency,
    score,
    projectMaturity,
  };
}

const pkg = readJson(join(target, "package.json"));
const pm = packageManager();
const isSourceRepo = pkg?.name === "design-anchor"
  && has("bin/anchor.mjs")
  && has("src/anchor-portal");
const signals = projectSignals(pkg);
const iconLibraries = detectIconLibraries(pkg);
const layoutSignals = detectLayoutSignals(pkg);
const framework = detectFramework(pkg);
const componentLibraries = detectComponentLibrary(pkg);
const formLibrary = detectFormLibrary(pkg);
const tableLibrary = detectTableLibrary(pkg);
const stateManagement = detectStateManagement(pkg);
const validationLibrary = detectValidationLibrary(pkg);
const cssStrategies = detectCssStrategy(pkg);
const techStackFit = isSourceRepo
  ? {
    level: "source-package",
    label: "Design Anchor source repo",
    installPolicy: "use-package-scripts",
    canAutoInstallRuntime: false,
    canInstallComponents: false,
    notes: ["Edit package source directly; do not run consumer install/start here."],
  }
  : detectTechStackFit(pkg, framework, cssStrategies, signals);

const result = {
  target,
  packageManager: pm,
  hasPackageJson: Boolean(pkg),
  packageName: pkg?.name || null,
  isDesignAnchorSourceRepo: isSourceRepo,
  projectMaturity: isSourceRepo ? "source-package" : signals.projectMaturity,
  recommendedMode: isSourceRepo
    ? "source-package"
    : signals.projectMaturity === "complete"
      ? "offer-existing-product-governance"
      : "first-page-or-incremental-ui",
  governanceRequiresExplicitConsent: signals.projectMaturity === "complete" && !isSourceRepo,
  projectSignals: signals,
  designAnchorDependency: dependencyVersion(pkg),
  designAnchorNodeModuleVersion: nodeModuleVersion(),
  hasAnchorControlPlane: has(".anchor/package.json")
    || has(".anchor/src/anchor-portal/vite.config.ts")
    || has(".anchor/src/anchor/schema"),
  anchorIsGitignored: gitignoreHasAnchor(),
  hasInstalledComponents: has("src/components/index.ts")
    || has("src/components/anchor-ui/index.ts")
    || has("src/components/anchor-ui"),
  hasTokenSource: has("design-tokens.json"),
  hasLegacyTokenSource: has("src/design-tokens/tokens.json"),
  hasGeneratedTokenCss: has(".anchor/design-tokens.generated.css"),
  hasLegacyGeneratedTokenCss: has("src/styles/design-tokens.generated.css"),
  hasDesignAlias: hasDesignAlias(),
  hasAgentsRules: has("AGENTS.md"),
  hasClaudeRules: has("CLAUDE.md"),
  hasCursorRules: has(".cursorrules"),
  hasCursorAlwaysRules: has(".cursor/rules/anchor.mdc"),
  hasCursorSelfcheckRule: has(".cursor/rules/anchor-selfcheck.mdc"),
  mcpConfigFiles: mcpConfigFiles(),
  hasPortableMcpConfig: hasPortableMcpConfig(),
  hasGovernanceBridge: hasGovernanceBridge(),
  framework,
  techStackFit,
  componentLibraries,
  cssStrategies,
  formLibrary,
  tableLibrary,
  stateManagement,
  validationLibrary,
  iconLibraries,
  hasMultipleIconLibraries: iconLibraries.length > 1,
  layoutSignals,
  scripts: {
    syncAnchor: pkg?.scripts?.["sync:anchor"] || null,
    anchorAudit: pkg?.scripts?.["anchor:audit"] || null,
  },
  recommendedNextSteps: [],
};

if (isSourceRepo) {
  result.recommendedNextSteps.push("This is the Design Anchor source repo; do not run consumer `design-anchor start` here.");
  result.recommendedNextSteps.push("Use package scripts such as `npm run sync:anchor`, `npm run anchor:audit`, `npm run lint`, `npm run typecheck`, or `npm publish --dry-run` as relevant.");
} else {
  if (!result.hasPackageJson) {
    result.recommendedNextSteps.push("No package.json found; confirm the app root before installing Design Anchor.");
  }

  if (result.recommendedMode === "offer-existing-product-governance") {
    result.recommendedNextSteps.push("This looks like an existing product. Offer `布局重构`（recommended）, `渐进优化`, or `只读审计`; do not modify files until the user explicitly confirms the governance mode.");
  }

  if (techStackFit.level !== "full" && techStackFit.level !== "unknown") {
    result.recommendedNextSteps.push(`Tech stack fit: ${techStackFit.label} (${techStackFit.level}). ${techStackFit.notes.join(" ")}`);
  }

  if (result.hasMultipleIconLibraries) {
    result.recommendedNextSteps.push(`Multiple icon libraries detected: ${iconLibraries.join(", ")}. Recommend consolidating to a single library (preferably lucide-react).`);
  }

  if (!result.designAnchorDependency && !result.designAnchorNodeModuleVersion) {
    if (techStackFit.canAutoInstallRuntime) {
      result.recommendedNextSteps.push(`For implementation work, first establish the Design Anchor token baseline: install the runtime with \`${installCommand(pm)}\`, then run sync.`);
    } else if (techStackFit.installPolicy === "ask-before-runtime" || techStackFit.installPolicy === "inspect-before-install") {
      result.recommendedNextSteps.push(`Do not auto-install Design Anchor yet. ${techStackFit.notes.join(" ")} If the user confirms adaptation, start with \`${installCommand(pm)}\` and sync.`);
    } else {
      result.recommendedNextSteps.push(`Do not install Design Anchor runtime/components by default for this stack. ${techStackFit.notes.join(" ")}`);
    }
  }

  const needsBackgroundSync = !result.hasAnchorControlPlane
    || !result.hasTokenSource
    || !result.hasGeneratedTokenCss;

  if (needsBackgroundSync && (techStackFit.canAutoInstallRuntime || result.designAnchorDependency || result.designAnchorNodeModuleVersion)) {
    result.recommendedNextSteps.push(`Run \`${syncCommand(pm)}\` to create/refresh the token baseline: .anchor, root design-tokens.json, generated token CSS, Tailwind extensions, and local rules.`);
  }

  if (!result.hasAnchorControlPlane && (result.hasTokenSource || result.hasLegacyTokenSource || result.hasGovernanceBridge)) {
    result.recommendedNextSteps.push(`.anchor/ is local and rebuildable; run \`${hydrateCommand(pm)}\` if Portal, specs, or MCP runtime files are missing after clone.`);
  }

  if (!result.anchorIsGitignored) {
    result.recommendedNextSteps.push("Ensure `.anchor/` is ignored via local git exclude or .gitignore so the local control plane stays rebuildable and out of source control.");
  }

  if (!result.hasInstalledComponents && techStackFit.canInstallComponents) {
    result.recommendedNextSteps.push(`No Design-anchor component source is installed yet; add only what the current screen needs with \`${addCommand(pm)}\`.`);
  } else if (!techStackFit.canInstallComponents) {
    result.recommendedNextSteps.push("Do not run `design-anchor add` unless the target UI surface is confirmed as React + Tailwind-compatible.");
  }

  if (result.hasInstalledComponents && !result.hasDesignAlias) {
    result.recommendedNextSteps.push("Check the `@design` path alias before writing app UI; business code should import from `@design` or `@/components`.");
  }

  if (!needsBackgroundSync && result.hasInstalledComponents) {
    result.recommendedNextSteps.push("Design Anchor appears ready; continue with `@design` components, semantic tokens, `sync`, and `audit` after UI changes.");
  }

  if (signals.projectMaturity !== "new-or-small" && !result.hasGovernanceBridge) {
    result.recommendedNextSteps.push("No optional AI governance bridge detected. Run `npx design-anchor govern` only if the team wants root-level AGENTS/CLAUDE/Cursor/MCP bridge files.");
  }

  if (componentLibraries.length > 1) {
    result.recommendedNextSteps.push(`Multiple component libraries detected: ${componentLibraries.join(", ")}. Consider consolidating to reduce bundle size and ensure consistent styling.`);
  }

  if (cssStrategies.length > 1 && cssStrategies.includes("tailwind")) {
    const others = cssStrategies.filter((s) => s !== "tailwind");
    result.recommendedNextSteps.push(`Mixed CSS strategies: Tailwind + ${others.join(", ")}. Prefer Tailwind with semantic token classes for Design Anchor governed components.`);
  }

  if (signals.projectMaturity !== "new-or-small" && !formLibrary) {
    result.recommendedNextSteps.push("No form library detected in an established project. Reuse existing form patterns; suggest a dedicated form library only if the user asks for form-system standardization.");
  }

  if (signals.projectMaturity !== "new-or-small" && !tableLibrary && signals.componentFiles > 5) {
    result.recommendedNextSteps.push("No table library detected. Reuse existing table/list patterns; suggest a dedicated table library only if advanced data-table behavior is requested and approved.");
  }

  if (layoutSignals.hasLayoutComponents && !layoutSignals.hasSidebarComponent && !layoutSignals.hasShellComponent) {
    result.recommendedNextSteps.push("Layout components exist but no sidebar or app shell detected. The product may lack a consistent navigation structure.");
  }
}

console.log(JSON.stringify(result, null, 2));
