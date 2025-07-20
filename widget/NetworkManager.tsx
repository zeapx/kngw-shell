import { Accessor, createBinding } from "ags";
import AstalNetwork from "gi://AstalNetwork";

const network = AstalNetwork.get_default();

const wiredIconName = createBinding(network.wired, "iconName");
const wiredConnectionId = createBinding(
  network.wired?.device.activeConnection,
  "id",
);

const wifiIconName = createBinding(network.wifi, "iconName");
const wifiConnectionId = createBinding(network.wifi?.activeConnection, "id");

const iconName = wiredIconName ?? wifiIconName;
const activeId = wiredConnectionId ?? wifiConnectionId;

export function NetworkManager() {
  return (
    <box class="module" tooltipText={activeId}>
      <image iconName={iconName} />
    </box>
  );
}
