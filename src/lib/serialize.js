/** Convert mongoose docs / lean results into plain JSON-safe objects. */
export function serialize(value) {
  return JSON.parse(JSON.stringify(value));
}
