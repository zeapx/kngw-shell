import { execAsync } from "ags/process";

export function ApplicationLauncher() {
  return (
    <box class="module">
      <button
        tooltipText="Application Launcher"
        onClicked={() => execAsync("anyrun")}>
        <label label="" />
      </button>
    </box>
  );
}
