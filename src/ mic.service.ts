import { execSync } from "child_process";

export function setMicVolume(vol: string) {
  const level = parseInt(vol);
  if (level >= 100) {
    execSync("osascript -e 'set volume input volume 100'");
  } else if (level <= 0) {
    execSync("osascript -e 'set volume input volume 0'");
  } else {
    execSync(`osascript -e 'set volume input volume ${level.toString()}'`);
  }
}
export function getMicVolume() {
  const level = execSync('osascript -e "(get volume settings)\'s input volume"');
  return (
    level
      .toString()
      .match(/^[0-9]+/)
      ?.toString() ?? ""
  );
}
