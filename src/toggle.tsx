import { closeMainWindow, showHUD } from "@raycast/api";
import { toggleMicVolume } from "./ mic.service";

export default async function Command() {
  await closeMainWindow();
  const vol = await toggleMicVolume();
  await showHUD(`Mic Input is set to ${vol}`);
}
