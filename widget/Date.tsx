import { Gtk } from "ags/gtk4";
import { createPoll, interval } from "ags/time";
import { ICON_SIZE } from "./Bar";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

const time = createPoll("", 1000, "date +'%H:%M:%S %Z'");
const monthAndDay = createPoll("", 1000, "date +%m月%d日");
const weekday = createPoll("", 1000, "date +%w", (stdout, _prev) => {
  const dayIndex = parseInt(stdout);
  const weekday = WEEKDAYS[dayIndex] ?? "?";
  return "(" + weekday + ")";
});

export function CurrentTime() {
  return (
    <box name="clock" class="module" tooltipText="Current Time">
      <button>
        <image
          iconName="preferences-system-time-symbolic"
          pixelSize={ICON_SIZE}
        />
        <label label={time} />
      </button>
    </box>
  );
}

export function CurrentDate() {
  return (
    <box class="module" tooltipText="Current Date">
      <menubutton>
        <box>
          <label name="date" label={monthAndDay} />
          <label name="weekday" label={weekday} />
        </box>
        <popover>
          <Gtk.Calendar />
        </popover>
      </menubutton>
    </box>
  );
}
