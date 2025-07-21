import { Accessor, createBinding, createComputed } from "ags";
import AstalNetwork from "gi://AstalNetwork";
import { ICON_SIZE } from "./Bar";

const network = AstalNetwork.get_default();

const wired = createBinding(network, "wired");
const wifi = createBinding(network, "wifi");

const iconName = createComputed([wired, wifi], (wired, wifi) => {
  return wired?.iconName || wifi?.iconName || "network-offline-symbolic";
});

const activeId = createComputed([wired, wifi], (wired, wifi) => {
  return (
    wired?.device?.activeConnection?.id ??
    wifi?.activeConnection?.id ??
    "Disconnected"
  );
});

export function NetworkManager() {
  return (
    <box name="network" class="module" tooltipText={activeId}>
      <image iconName={iconName} pixelSize={ICON_SIZE} />
    </box>
  );
}
