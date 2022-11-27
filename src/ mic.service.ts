import { Cache } from "@raycast/api";
import { exec as pExec } from "child_process";
import util from "util";

const exec = util.promisify(pExec);

export async function setMicVolume(vol: number) {
  if (vol >= 100) {
    await exec("osascript -e 'set volume input volume 100'");
  } else if (vol <= 0) {
    await exec("osascript -e 'set volume input volume 0'");
  } else {
    await exec(`osascript -e 'set volume input volume ${vol.toString()}'`);
  }
  return vol;
}

export async function toggleMicVolume() {
  const vol = (await exec('osascript -e "(get volume settings)\'s input volume"')).stdout.match(/^[0]+/);
  return vol ? await setMicVolume(100) : await setMicVolume(0);
}

export async function getMicVolume(): Promise<number> {
  const vol = await (await exec('osascript -e "(get volume settings)\'s input volume"')).stdout.match(/^[0-9]+/);
  return parseInt(vol?.at(0) ?? "0");
}
