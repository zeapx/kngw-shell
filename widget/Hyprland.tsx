import { createBinding } from "ags";

import AstalHyprland from "gi://AstalHyprland";

const NUM_WORKSPACES = 6;
const WORKSPACE_ICONS = ["一", "二", "三", "四", "五", "六"];

const hyprland = AstalHyprland.get_default();

function Workspace(id: number) {
  const icon = WORKSPACE_ICONS[id];
  const workspaceId = id + 1;

  return (
    <button
      tooltipText={"Workspace " + workspaceId.toString()}
      onClicked={() => hyprland.dispatch("workspace", workspaceId.toString())}
    >
      <label label={icon} />
    </button>
  );
}

export function Workspaces() {
  return (
    <box class="module">
      {[...Array(NUM_WORKSPACES).keys()].map((x) => Workspace(x))}
    </box>
  );
}

export function FocusedClient() {
  const focusedClient = createBinding(hyprland, "focusedClient").as(
    (x) => x.title,
  );

  return (
    <box class="module" tooltipText="Focused Client">
      <button onClicked={(self) => hyprland.focusedClient.focus()}>
        <label label={focusedClient} />
      </button>
    </box>
  );
}
