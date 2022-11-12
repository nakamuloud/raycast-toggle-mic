import { closeMainWindow, Icon, MenuBarExtra } from "@raycast/api";
import { useCachedState } from "@raycast/utils";
import { getMicVolume, setMicVolume } from "./ mic.service";

export default function Command() {
  closeMainWindow({ clearRootSearch: true });
  const [volumeState, setVolumeState] = useCachedState(
    "currentMicVolume",
    { previous: "100", current: "0" },
    { cacheNamespace: "MicControl" }
  );
  if (getMicVolume() === "0") {
    // case unMute
    const vol = volumeState.previous === "0" ? "100" : volumeState.previous;
    setVolumeState({ current: vol, previous: "0" });
    setMicVolume(vol);
  } else {
    // case Mute
    const vol = volumeState.current === "0" ? "100" : getMicVolume();
    setVolumeState({ current: "0", previous: vol });
    setMicVolume("0");
  }
  return (
    <MenuBarExtra
      tooltip="Current Mic input volume"
      title={(volumeState.current + "  ").slice(0, 3)}
      icon={volumeState.current === "0" ? Icon.MicrophoneDisabled : Icon.Microphone}
    ></MenuBarExtra>
  );
}
