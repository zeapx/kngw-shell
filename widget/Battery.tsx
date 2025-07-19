import { createBinding } from "ags";
import Battery from "gi://AstalBattery";

const battery = Battery.get_default();

const icon = createBinding(battery, "batteryIconName");
const label = createBinding(battery, "percentage").as(
  (n) => ` ${Math.round(n * 100)}%`,
);

export function BatteryIndicator() {
  return (
    <box class="module">
      <image iconName={icon} />
      <label label={label} />
    </box>
  );
}
