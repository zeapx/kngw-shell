import { createBinding, createComputed, For } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";

import AstalHyprland from "gi://AstalHyprland";

const NUM_WORKSPACES = 6;
const WORKSPACE_ICONS = ["一", "二", "三", "四", "五", "六"];

const FOCUSED_CLIENT_MAX_LENGTH = 40;

const hyprland = AstalHyprland.get_default();

class Workspace {
  id: number;
  monitor: number | null;
  active: boolean;
  focused: boolean;

  constructor(
    id: number,
    monitor: number | null,
    active: boolean,
    focused: boolean,
  ) {
    this.id = id;
    this.monitor = monitor;
    this.active = active;
    this.focused = focused;
  }

  widget() {
    const icon = WORKSPACE_ICONS[this.id - 1];
    const workspaceId = this.id.toString();

    const monitor = `monitor-${this.monitor?.toString() ?? "undefined"}`;
    const active = this.active ? "active" : "inactive";
    const focused = this.focused ? "focused" : "unfocused";

    const cssClass = `${monitor} ${active} ${focused}`;

    return (
      <box
        name={workspaceId}
        class={cssClass}
        tooltipText={"Workspace " + workspaceId}
      >
        <Gtk.GestureClick
          button={3}
          onPressed={() => hyprland.dispatch("movetoworkspace", workspaceId)}
        />
        <button onClicked={() => hyprland.dispatch("workspace", workspaceId)}>
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
      const focusedId = focused?.id ?? -1;

      return Array.from({ length: NUM_WORKSPACES }, (_, i) => {
        const id = i + 1;

        const activeWorkspace = actives?.find((w) => w.id === id);
        const monitor = activeWorkspace?.monitor.id ?? null;

        const active = !!activeWorkspace;
        const isFocused = focusedId === id;

        return new Workspace(id, monitor, active, isFocused);
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
  const focusedClient = createBinding(hyprland, "focusedClient");
  const focusedClientStr = focusedClient.as((client) => {
    const title = client?.title ?? "";
    return title.length > FOCUSED_CLIENT_MAX_LENGTH
      ? title.slice(0, FOCUSED_CLIENT_MAX_LENGTH) + "…"
      : title;
  });

  const appIcon = focusedClient.as((client) => {
    return resolveAppIcon(client);
  });

  return (
    <box class="module" tooltipText="Focused Client">
      <Gtk.GestureClick
        button={3}
        onPressed={() => hyprland.dispatch("killactive", "")}
      />
      <button onClicked={(self) => hyprland.focusedClient.focus()}>
        <box>
          <image iconName={appIcon} />
          <label label={focusedClientStr} />
        </box>
      </button>
    </box>
  );
}

function resolveAppIcon(client: AstalHyprland.Client) {
  if (!client) return "application-x-executable-symbolic";

  const rawClass = client.initialClass || client.class || "";
  if (!rawClass) return "application-x-executable-symbolic";

  const baseName = rawClass.toLowerCase().split(".").pop()!;
  const iconCandidates = [rawClass, baseName];

  const theme = Gtk.IconTheme.get_for_display(Gdk.Display.get_default()!);
  for (const name of iconCandidates) {
    if (theme.has_icon(name)) return name;
  }

  return "application-x-executable-symbolic";
}
