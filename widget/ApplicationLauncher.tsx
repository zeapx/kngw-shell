import { execAsync } from "ags/process";

export function ApplicationLauncher() {
  return (
    <box name="launcher" class="module">
      <button
        tooltipText="Application Launcher"
        onClicked={() => execAsync("anyrun")}
      >
        <image iconName="preferences-desktop-apps-symbolic" />
      </button>
    </box>
  );
}
