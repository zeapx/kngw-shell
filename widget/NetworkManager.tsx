import { createBinding } from "ags";
import AstalNetwork from "gi://AstalNetwork";

const network = AstalNetwork.get_default();

let iconName = "network-wired-no-route-symbolic";
if (network.wired) {
  iconName = createBinding(network.wired, "iconName");
} else if (network.wifi) {
  iconName = createBinding(network.wifi, "iconName");
}

export function NetworkManager() {
  return (
    <box class="module">
      <image iconName={iconName} />
    </box>
  );
}
