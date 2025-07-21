import { createState } from "ags";
import { exec } from "ags/process";
import Gtk from "gi://Gtk";
import { ICON_SIZE } from "./Bar";

export function PowerMenu() {
  const { SLIDE_LEFT } = Gtk.RevealerTransitionType;

  const [reveal, setReveal] = createState(false);

  return (
    <box name="powermenu" class="module">
      <Gtk.EventControllerMotion
        onEnter={() => setReveal(true)}
        onLeave={() => setReveal(false)}
      />
      <revealer revealChild={reveal} transitionType={SLIDE_LEFT}>
        <box>
          <button
            tooltipText="Lock"
            onClicked={() => exec("hyprctl dispatch exec hyprlock")}
          >
            <image
              iconName="system-lock-screen-symbolic"
              pixelSize={ICON_SIZE}
            />
          </button>
          <button
            tooltipText="Suspend"
            onClicked={() =>
              exec(["hyprctl dispatch exec hyprlock", "systemctl suspend"])
            }
          >
            <image
              iconName="weather-clear-night-symbolic"
              pixelSize={ICON_SIZE}
            />
          </button>
          <button
            tooltipText="Reboot"
            onClicked={() => exec("systemctl reboot")}
          >
            <image iconName="system-reboot-symbolic" pixelSize={ICON_SIZE} />
          </button>
        </box>
      </revealer>
      <button
        tooltipText="Poweroff"
        onClicked={() => exec("systemctl poweroff")}
      >
        <image iconName="system-shutdown-symbolic" pixelSize={ICON_SIZE} />
      </button>
    </box>
  );
}
