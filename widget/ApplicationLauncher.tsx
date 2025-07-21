import { execAsync } from "ags/process";
import { ICON_SIZE } from "./Bar";

export function ApplicationLauncher() {
  return (
    <box name="launcher" class="module">
      <button
        tooltipText="Application Launcher"
        onClicked={() => execAsync("anyrun")}
      >
        <image
          iconName="preferences-desktop-apps-symbolic"
          pixelSize={ICON_SIZE}
        />
      </button>
    </box>
  );
}
