import { createBinding } from "ags";
import GObject, { property, register } from "ags/gobject";
import { Gtk } from "ags/gtk4";
import { execAsync, subprocess } from "ags/process";

@register()
class Swaync extends GObject.Object {
  @property(Boolean) dnd = false;
  @property(Number) count = 0;
}

const swaync = new Swaync();

const swayncHandle = subprocess("swaync-client --subscribe");
swayncHandle.connect("stdout", (_, out) => {
  let data = JSON.parse(out);
  swaync.dnd = data.dnd;
  swaync.count = data.count;
});

const dndIcon = createBinding(swaync, "dnd").as((dnd) =>
  dnd
    ? "notifications-disabled-symbolic"
    : "preferences-system-notifications-symbolic",
);
const count = createBinding(swaync, "count").as((c) => c.toString());
const tooltipText = createBinding(swaync, "count").as((c) => {
  var tooltipText = c.toString() + " notification";
  if (c != 1) {
    tooltipText += "s";
  }
  return tooltipText;
});

export function Notifications() {
  return (
    <box name="notifications" class="module" tooltipText={tooltipText}>
      <Gtk.GestureClick
        button={3}
        onPressed={() => execAsync("swaync-client --toggle-dnd")}
      />
      <button onClicked={() => execAsync("swaync-client --toggle-panel")}>
        <box>
          <image iconName={dndIcon} />
          <label label={count} />
        </box>
      </button>
    </box>
  );
}
