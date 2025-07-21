import { createBinding, createComputed, createState } from "ags";
import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";
import AstalWp from "gi://AstalWp?version=0.1";

const SCROLL_STEP = 0.01;
const REVEAL_DURATION_MS = 1000;

const wp = AstalWp.get_default()!;

const speaker = wp.audio.defaultSpeaker;
const speakerIcon = createBinding(speaker, "volumeIcon");
const speakerMuted = createBinding(speaker, "mute");
const speakerVolume = createBinding(speaker, "volume");
const speakerVolumeStr = speakerVolume.as((x) => ` ${Math.round(x * 100)}%`);

const speakerTooltipText = createComputed(
  [speakerVolumeStr, speakerMuted],
  (speakerVolumeStr, speakerMuted) => {
    const prefix = speakerMuted ? "Muted: " : "Volume: ";
    return `${prefix}${speakerVolumeStr}`;
  },
);

const microphone = wp.audio.defaultMicrophone;
const micIcon = createBinding(microphone, "volumeIcon");
const micMuted = createBinding(microphone, "mute");
const micVolume = createBinding(microphone, "volume");
const micVolumeStr = micVolume.as((x) => ` ${Math.round(x * 100)}%`);

const micTooltipText = createComputed(
  [micVolumeStr, micMuted],
  (micVolumeStr, micMuted) => {
    const prefix = micMuted ? "Muted: " : "Volume: ";
    return `${prefix}${micVolumeStr}`;
  },
);

type VolumeScrollerProps = {
  onScroll?: () => void;
  endpoint: AstalWp.Endpoint;
};

function VolumeScroller({ onScroll, endpoint }: VolumeScrollerProps) {
  const { VERTICAL } = Gtk.EventControllerScrollFlags;

  return (
    <Gtk.EventControllerScroll
      flags={VERTICAL}
      onScroll={(_, _dx, dy) => {
        const volumeChange = dy < 0 ? SCROLL_STEP : -SCROLL_STEP;
        endpoint?.set_volume(endpoint.volume + volumeChange);
        endpoint?.set_mute(false);
        onScroll?.();
      }}
    />
  );
}

export function AudioController() {
  const { SLIDE_LEFT: SLIDE_RIGHT } = Gtk.RevealerTransitionType;

  const [reveal, setReveal] = createState(false);
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

  return (
    <box name="audio" class="module">
      <Gtk.GestureClick button={3} onPressed={() => execAsync("pavucontrol")} />
      <button
        tooltipText={speakerTooltipText}
        onClicked={() => toggleMute(speaker)}
      >
        <box>
          <VolumeScroller endpoint={speaker} />
          <image iconName={speakerIcon} />
          <label label={speakerVolumeStr} />
        </box>
      </button>
      <button
        tooltipText={micTooltipText}
        onClicked={() => toggleMute(microphone)}
      >
        <box>
          <VolumeScroller
            onScroll={() => {
              if (scrollTimeout) clearTimeout(scrollTimeout);

              setReveal(true);

              scrollTimeout = setTimeout(() => {
                setReveal(false);
              }, REVEAL_DURATION_MS);
            }}
            endpoint={microphone}
          />
          <image iconName={micIcon} />
          <revealer revealChild={reveal} transitionType={SLIDE_RIGHT}>
            <label label={micVolumeStr} />
          </revealer>
        </box>
      </button>
    </box>
  );
}

function toggleMute(endpoint: AstalWp.Endpoint) {
  const toggleStatus = endpoint.get_mute();
  return endpoint.set_mute(!toggleStatus);
}
