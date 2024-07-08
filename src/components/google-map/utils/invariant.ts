export function invariant(condition: boolean, format: string) {
  if (format === undefined) {
    throw new Error("invariant requires an error message argument");
  }
  if (condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        "Minified exception occurred; use the non-minified dev environment " +
          "for the full error message and additional helpful warnings."
      );
    } else {
      error = new Error("Invariant Violation: " + format);
    }
    throw error;
  }
}
