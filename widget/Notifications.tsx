import { createBinding } from "ags";
import GObject, { property, register } from "ags/gobject";
import { Gtk } from "ags/gtk4";
import { createSubprocess, execAsync, subprocess } from "ags/process";

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

const dndIcon = createBinding(swaync, "dnd").as((x) =>
  x
    ? "notifications-disabled-symbolic"
    : "preferences-system-notifications-symbolic",
);
const count = createBinding(swaync, "count").as((c) => " " + c.toString());

export function Notifications() {
  return (
    <box class="module">
      <button onClicked={() => execAsync("swaync-client --toggle-panel")}>
        <box>
          <image iconName={dndIcon} />
          <label label={count} />
        </box>
      </button>
    </box>
  );
}
