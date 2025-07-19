import app from "ags/gtk4/app";

import { ApplicationLauncher } from "./ApplicationLauncher";
import { CurrentDate, CurrentTime } from "./Date";
import { CurrentWindow } from "./CurrentWindow";
import { Workspaces } from "./Workspaces";
import { BatteryIndicator } from "./Battery";
import { PowerMenu } from "./PowerMenu";
import { AudioController } from "./AudioController";
import { Astal, Gdk } from "ags/gtk4";
import { NetworkManager } from "./NetworkManager";
import { Notifications } from "./Notifications";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start">
          <ApplicationLauncher />
          <CurrentTime />
          <CurrentDate />
          <CurrentWindow />
        </box>
        <box $type="center">
          <Workspaces />
        </box>
        <box $type="end">
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

// export default function Bar(gdkmonitor: Gdk.Monitor) {
//   const time = createPoll("", 1000, "date");
// const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

//   return (
//     <window
//       visible
//       name="bar"
//       class="Bar"
//       gdkmonitor={gdkmonitor}
//       exclusivity={Astal.Exclusivity.EXCLUSIVE}
//       anchor={TOP | LEFT | RIGHT}
//       application={app}
//     >
//       <centerbox cssName="centerbox">
//         <button
//           $type="start"
//           onClicked={() => execAsync("echo hello").then(console.log)}
//           hexpand
//           halign={Gtk.Align.CENTER}
//         >
//           <label label="Welcome to AGS!" />
//         </button>
//         <box $type="center" />
//         <MyButton />
//         <menubutton $type="end" hexpand halign={Gtk.Align.CENTER}>
//           <label label={time} />
//           <popover>
//             <Gtk.Calendar />
//           </popover>
//         </menubutton>
//       </centerbox>
//     </window>
//   );
// }
