import { Cache, closeMainWindow, Icon, MenuBarExtra } from "@raycast/api";
import { useCachedState } from "@raycast/utils";
import { useEffect } from "react";
import { getMicVolume, setMicVolume } from "./ mic.service";

export default function Command() {
  closeMainWindow({ clearRootSearch: true });
  console.log("hoge");
  const [volumeState, setVolumeState] = useCachedState(
    "currentMicVolume",
    { previous: "100", current: "0" },
    { cacheNamespace: "MicControl" }
  );
  if (getMicVolume() === "0") {
    // case unMute
    console.log("unmute", volumeState, getMicVolume());
    const vol = volumeState.previous === "0" ? "100" : volumeState.previous;
    setVolumeState({ current: vol, previous: "0" });
    setMicVolume(vol);
  } else {
    // case Mute
    console.log("mute", volumeState, getMicVolume());
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
