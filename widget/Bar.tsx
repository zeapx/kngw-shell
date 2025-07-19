import app from "ags/gtk4/app";
import { Astal, Gdk } from "ags/gtk4";

import { ApplicationLauncher } from "./ApplicationLauncher";
import { CurrentDate, CurrentTime } from "./Date";
import { FocusedClient, Workspaces } from "./Hyprland";
import { BatteryIndicator } from "./Battery";
import { PowerMenu } from "./PowerMenu";
import { AudioController } from "./AudioController";
import { NetworkManager } from "./NetworkManager";
import { Notifications } from "./Notifications";
import { SystemTray } from "./SystemTray";

export default function Bar(monitor = 0) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="bar"
      class="Bar"
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start">
          <ApplicationLauncher />
          <CurrentTime />
          <CurrentDate />
          <FocusedClient />
        </box>
        <box $type="center">
          <Workspaces />
        </box>
        <box $type="end">
          <SystemTray />
          <Notifications />
          <NetworkManager />
          <AudioController />
          <BatteryIndicator />
          <PowerMenu />
        </box>
      </centerbox>
    </window>
  );
}
