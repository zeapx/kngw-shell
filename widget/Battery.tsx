import { createBinding, createComputed } from "ags";
import Battery from "gi://AstalBattery";
import { ICON_SIZE } from "./Bar";

export const battery = Battery.get_default();

export function BatteryIndicator() {
  const icon = createBinding(battery, "batteryIconName");
  const label = createBinding(battery, "percentage").as(
    (n) => ` ${Math.round(n * 100)}%`,
  );

  const charging = createBinding(battery, "charging");
  const timeToFull = createBinding(battery, "timeToFull");
  const timeToEmpty = createBinding(battery, "timeToEmpty");

  const tooltipText = createComputed(
    [charging, timeToFull, timeToEmpty],
    (charging, timeToFull, timeToEmpty) => {
      const seconds = charging ? battery.timeToFull : battery.timeToEmpty;
      const totalMinutes = Math.floor(seconds / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const pad = (n: number) => n.toString().padStart(2, "0");

      const prefix = charging ? "Charging: " : "";
      return `${prefix}${pad(hours)}:${pad(minutes)}h left`;
    },
  );

  return (
    <box class="module" tooltipText={tooltipText}>
      <image iconName={icon} pixelSize={ICON_SIZE} />
      <label label={label} />
    </box>
  );
}
