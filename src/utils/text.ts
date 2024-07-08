export function camelCase(str: string): string {
  const words = str.split(/\s+/);
  const camelCaseStr = words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

  return camelCaseStr;
}
export function capitalizeTxt(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
}
export function toTittle(txt: string) {
  console.log(txt);
  if (!txt || txt === undefined) return "";
  return txt
    .split(/\s+/)
    .map((word) => capitalizeTxt(word))
    .join(" "); //or if you want lowercase the rest txt.slice(1).toLowerCase();
}

export function formatHeaderText(header: string): string {
  const words = header.split(/(?=[A-Z])/);
  return words
    .map((word) => {
      // Ensure the word is not empty
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}
