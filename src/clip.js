/**
 * Clip decisions from scoring's last_event only.
 *
 * @param {import("./snapshot.js").ScoreSnapshot} snapshot
 * @returns {{ clip: boolean, kind: "none" | "wicket" | "boundary" | "appeal" }}
 */
export function clipFor(snapshot) {
  const event = snapshot.last_event;
  if (event.wicket_counted || event.display === "WICKET") {
    return { clip: true, kind: "wicket" };
  }
  if (event.display === "FOUR" || event.display === "SIX") {
    return { clip: true, kind: "boundary" };
  }
  if (event.display === "NOT_OUT") {
    return { clip: false, kind: "appeal" };
  }
  return { clip: false, kind: "none" };
}
