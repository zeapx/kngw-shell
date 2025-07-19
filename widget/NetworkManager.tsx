import { createBinding } from "ags";
import AstalNetwork from "gi://AstalNetwork";

const network = AstalNetwork.get_default();
const wifi = network.wifi;

const wifiIcon = createBinding(wifi, "iconName");

export function NetworkManager() {
  return (
    <box class="module">
      <image iconName={wifiIcon} />
    </box>
  );
}
