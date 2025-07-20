import { createState } from "ags";
import { exec } from "ags/process";
import Gtk from "gi://Gtk";

export function PowerMenu() {
  const [reveal, setReveal] = createState(false);

  return (
    <box class="module">
      <Gtk.EventControllerMotion
        onEnter={() => {
          setReveal(true);
        }}
        onLeave={() => {
          setReveal(false);
        }}
      />
      <revealer
        revealChild={reveal}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <box>
          <button
            tooltipText="Lock"
            onClicked={() => exec("hyprctl dispatch exec hyprlock")}
          >
            <image iconName="system-lock-screen-symbolic" />
          </button>
          <button
            tooltipText="Suspend"
            onClicked={() =>
              exec(["hyprctl dispatch exec hyprlock", "systemctl suspend"])
            }
          >
            <image iconName="weather-clear-night-symbolic" />
          </button>
          <button
            tooltipText="Reboot"
            onClicked={() => exec("systemctl reboot")}
          >
            <image iconName="system-reboot-symbolic" />
          </button>
        </box>
      </revealer>
      <button
        tooltipText="Poweroff"
        onClicked={() => exec("systemctl poweroff")}
      >
        <image iconName="system-shutdown-symbolic" />
      </button>
    </box>
  );
}
