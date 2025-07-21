import { createBinding, createComputed, For } from "ags";
import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";

import AstalHyprland from "gi://AstalHyprland";

const NUM_WORKSPACES = 6;
const WORKSPACE_ICONS = ["一", "二", "三", "四", "五", "六"];

const FOCUSED_CLIENT_MAX_LENGTH = 40;

const hyprland = AstalHyprland.get_default();

class Workspace {
  id: number;
  active: boolean;
  focused: boolean;

  constructor(id: number, active: boolean, focused: boolean) {
    this.id = id;
    this.active = active;
    this.focused = focused;
  }

  widget() {
    const icon = WORKSPACE_ICONS[this.id - 1];
    const workspaceId = this.id;

    const active = this.active ? "active" : "inactive";
    const focused = this.focused ? "focused" : "unfocused";
    const cssClass = active + " " + focused;

    return (
      <box>
        <Gtk.GestureClick
          button={3}
          onPressed={() =>
            hyprland.dispatch("movetoworkspace", workspaceId.toString())
          }
        />
        <button
          class={cssClass}
          tooltipText={"Workspace " + workspaceId.toString()}
          onClicked={() =>
            hyprland.dispatch("workspace", workspaceId.toString())
          }
        >
          <label label={icon} />
        </button>
      </box>
    );
  }
}

export function Workspaces() {
  const activeWorkspaces = createBinding(hyprland, "workspaces");
  const focusedWorkspace = createBinding(hyprland, "focusedWorkspace");

  const workspaces = createComputed(
    [activeWorkspaces, focusedWorkspace],
    (actives, focused) => {
      const activeIds = actives?.map((w) => w.id) ?? [];
      const focusedId = focused?.id ?? -1;

      return Array.from({ length: NUM_WORKSPACES }, (_, i) => {
        const id = i + 1;
        const active = activeIds.includes(id);
        const isFocused = focusedId === id;

        return new Workspace(id, active, isFocused);
      });
    },
  );

  return (
    <box name="workspaces" class="module">
      <For each={workspaces}>{(workspace) => workspace.widget()}</For>
    </box>
  );
}

export function FocusedClient() {
  const focusedClient = createBinding(hyprland, "focusedClient").as((x) => {
    const title = x?.title ?? "";
    return title.length > FOCUSED_CLIENT_MAX_LENGTH
      ? title.slice(0, FOCUSED_CLIENT_MAX_LENGTH) + "…"
      : title;
  });

  return (
    <box class="module" tooltipText="Focused Client">
      <Gtk.GestureClick
        button={3}
        onPressed={() => hyprland.dispatch("killactive", "")}
      />
      <button onClicked={(self) => hyprland.focusedClient.focus()}>
        <label label={focusedClient} />
      </button>
    </box>
  );
}
