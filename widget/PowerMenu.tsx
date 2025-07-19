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
          <button onClicked={() => exec("hyprctl dispatch exec hyprlock")}>
            <label label="Lock" />
          </button>
          <button
            onClicked={() =>
              exec(["hyprctl dispatch exec hyprlock", "systemctl suspend"])
            }
          >
            <label label="Suspend" />
          </button>
          <button onClicked={() => exec("systemctl reboot")}>
            <label label="Reboot" />
          </button>
        </box>
      </revealer>
      <button onClicked={() => exec("systemctl poweroff")}>
        <label label="Poweroff" />
      </button>
    </box>
  );
}
