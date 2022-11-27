import { closeMainWindow, environment, Icon, MenuBarExtra } from "@raycast/api";
import { useCachedState } from "@raycast/utils";
import { useEffect } from "react";
import { toggleMicVolume } from "./ mic.service";
import { micVolumeKey } from "./config";

export default function Command() {
  console.log(environment.launchType);
  const [volume, setVolume] = useCachedState<number>(micVolumeKey, 0);
  // useEffect(() => {
  //   return () => {
  //     f();
  //   };
  // }, []);
  return (
    <MenuBarExtra title={`${volume}`} icon={volume === 0 ? Icon.MicrophoneDisabled : Icon.Microphone}></MenuBarExtra>
  );
}
