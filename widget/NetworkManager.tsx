import { Accessor, createBinding, createComputed } from "ags";
import AstalNetwork from "gi://AstalNetwork";
import { ICON_SIZE } from "./Bar";
import { execAsync } from "ags/process";
import { Gtk } from "ags/gtk4";

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

const vpn = createBinding(network.client, "activeConnections").as(
  (connections) => {
    if (!connections || !Array.isArray(connections)) return false;

    return connections.some((conn) => conn?.id === "wg0-mullvad");
  },
);

const vpnIconName = vpn.as((connected) =>
  connected ? "network-vpn-symbolic" : "network-vpn-disabled-symbolic",
);
const vpnTooltipText = vpn.as((connected) =>
  connected ? "VPN: Connected" : "VPN: Disconnected",
);
const vpnCmd = vpn.as((connected) => {
  return () => execAsync(connected ? "mullvad disconnect" : "mullvad connect");
});

export function NetworkManager() {
  return (
    <box name="network" class="module">
      <button tooltipText={activeId}>
        <image iconName={iconName} pixelSize={ICON_SIZE} />
      </button>
      <button
        tooltipText={vpnTooltipText}
        onClicked={() => execAsync("mullvad connect")}
      >
        <Gtk.GestureClick
          button={3}
          onPressed={() => execAsync("mullvad disconnect")}
        />
        <image iconName={vpnIconName} pixelSize={ICON_SIZE} />
      </button>
    </box>
  );
}
