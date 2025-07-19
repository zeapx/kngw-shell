import { createBinding } from "ags";

import AstalTray from "gi://AstalTray";

const tray = AstalTray.get_default();

function SystemTrayItem(item) {
  return (
    <button>
      <label label={item.name} />
    </button>
  );
}

export function SystemTray() {
  const items = createBinding(tray, "items").as((items) =>
    items.map((item) => SystemTrayItem(item)),
  );

  return <box class="module">{items.get()}</box>;
}
