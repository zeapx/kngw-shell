import { createBinding, For } from "ags";

import AstalTray from "gi://AstalTray";

const tray = AstalTray.get_default();

const items = createBinding(tray, "items");

export function SystemTray() {
  return (
    <box class="module">
      <For each={items}>
        {(item) => (
          <button
           tooltipText={item.title}>
            <image iconName={item.iconName} />
          </button>
        )}
      </For>
    </box>
  );
}
