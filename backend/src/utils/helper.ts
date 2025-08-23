export function capitalizeFirstLetterOfName(name: string): string {
  if (!name) return name;
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
