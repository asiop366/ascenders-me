// app/settings/appearance/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appearance Settings | Ascenders",
};

export default function AppearanceSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Appearance</h2>
        <p className="text-gray-400">Customize how Ascenders looks for you</p>
      </div>

      <div className="space-y-6">
        {/* Theme */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Dark", active: true },
              { name: "Light", active: false },
              { name: "Auto", active: false },
            ].map((theme) => (
              <button
                key={theme.name}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  theme.active
                    ? "border-white bg-white/10"
                    : "border-zinc-700 hover:border-zinc-600"
                }`}
              >
                <div className="font-medium">{theme.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Font Size</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Small</span>
            <input type="range" min="12" max="20" defaultValue="16" className="flex-1" />
            <span className="text-sm text-gray-400">Large</span>
          </div>
        </div>

        {/* Compact Mode */}
        <div>
          <label className="flex items-center justify-between p-4 bg-black border border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-600 transition-colors">
            <div>
              <div className="font-medium">Compact Mode</div>
              <div className="text-sm text-gray-400">Reduce spacing between elements</div>
            </div>
            <input type="checkbox" />
          </label>
        </div>

        <div className="pt-4">
          <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
