import { createPoll, interval } from "ags/time";

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
    <box class="module"
     tooltipText="Current Time">
      <label label={time} />
    </box>
  );
}

export function CurrentDate() {
  return (
    <box class="module"
      tooltipText="Current Date">
      <label label={monthAndDay} />
      <label label={weekday} />
    </box>
  );
}
