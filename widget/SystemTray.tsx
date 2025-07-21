import { createBinding, For } from "ags";
import { Gtk } from "ags/gtk4";

import AstalTray from "gi://AstalTray";
import { ICON_SIZE } from "./Bar";

const tray = AstalTray.get_default();

const items = createBinding(tray, "items");

export function SystemTray() {
  return (
    <box class="module">
      <For each={items}>
        {(item) => (
          <menubutton tooltipText={item.title}>
            <Gtk.GestureClick
              button={3}
              onPressed={(gesture) => {
                const widget = gesture.get_widget() as Gtk.MenuButton;
                if (widget && "popup" in widget) {
                  widget.popup();
                }
              }}
            />
            <image gicon={item.gicon} pixelSize={ICON_SIZE} />
            {TrayItemMenu(item)}
          </menubutton>
        )}
      </For>
    </box>
  );
}

function TrayItemMenu(item: AstalTray.TrayItem) {
  const menu = Gtk.PopoverMenu.new_from_model(item.menuModel);
  menu.insert_action_group("dbusmenu", item.actionGroup);
  return menu;
}
