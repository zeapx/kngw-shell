import { createBinding } from "ags";
import Battery from "gi://AstalBattery";

const battery = Battery.get_default();

export function BatteryIndicator() {
  if (!battery.isBattery) {
    return null;
  }

  const icon = createBinding(battery, "batteryIconName");
  const label = createBinding(battery, "percentage").as(
    (n) => ` ${Math.round(n * 100)}%`,
  );

  return (
    <box class="module" visible={hasBattery}>
      <image iconName={icon} />
      <label label={label} />
    </box>
  );
}
