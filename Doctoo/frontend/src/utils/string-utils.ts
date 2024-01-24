export function capitalize(string?: string) {
  return (string?.toString()?.[0]?.toUpperCase() ?? '') + (string?.toString()?.slice(1) ?? '');
}
