import { h as _h } from "preact";
import { useEffect, useState } from "preact/hooks";

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];
const fontSizes = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];
const accents = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
];

function applyTheme(theme: string) {
  if (theme === "system") {
    const prefersDark = globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  } else {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
}
function applyFontSize(size: string) {
  document.documentElement.dataset.fontsize = size;
}
function applyAccent(accent: string) {
  document.documentElement.dataset.accent = accent;
}

export default function SettingIsland() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });
  const [fontSize, setFontSize] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fontSize") || "md";
    }
    return "md";
  });
  const [accent, setAccent] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accent") || "blue";
    }
    return "blue";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    applyFontSize(fontSize);
  }, [fontSize]);
  useEffect(() => {
    localStorage.setItem("accent", accent);
    applyAccent(accent);
  }, [accent]);

  return (
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 class="text-xl font-bold mb-4 text-blue-700">Appearance Settings</h2>
      <div class="mb-4">
        <label class="block mb-2 font-medium">Theme</label>
        <select
          class="border rounded px-3 py-2 w-full"
          value={theme}
          onChange={e => setTheme((e.target as HTMLSelectElement).value)}
        >
          {themes.map(t => (
            <option value={t.value}>{t.label}</option>
          ))}
        </select>
        <p class="text-gray-500 text-sm mt-2">
          Choose your preferred appearance. "System" will follow your OS setting.
        </p>
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-medium" htmlFor="font-size-select">Font Size</label>
        <select
          id="font-size-select"
          title="Font Size"
          class="border rounded px-3 py-2 w-full"
          value={fontSize}
          onChange={e => setFontSize((e.target as HTMLSelectElement).value)}
        >
          {fontSizes.map(f => (
            <option value={f.value}>{f.label}</option>
          ))}
        </select>
        <p class="text-gray-500 text-sm mt-2">
          Adjust the font size for better readability.
        </p>
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-medium" htmlFor="accent-select">Primary Accent Color</label>
        <select
          id="accent-select"
          title="Primary Accent Color"
          class="border rounded px-3 py-2 w-full"
          value={accent}
          onChange={e => setAccent((e.target as HTMLSelectElement).value)}
        >
          {accents.map(a => (
            <option value={a.value}>{a.label}</option>
          ))}
        </select>
        <p class="text-gray-500 text-sm mt-2">
          Change the main accent color of the site.
        </p>
      </div>
    </div>
  );
}
