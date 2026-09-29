/**
 * Clip decisions from scoring's last_event only.
 *
 * @param {import("./snapshot.js").ScoreSnapshot} snapshot
 * @returns {{ clip: boolean, kind: "none" | "wicket" | "four" | "six" | "appeal" }}
 */
export function clipFor(snapshot) {
  const event = snapshot.last_event;
  if (event.wicket_counted || event.display === "WICKET") {
    return { clip: true, kind: "wicket" };
  }
  // Editors filter fours and sixes separately.
  if (event.display === "FOUR") {
    return { clip: true, kind: "four" };
  }
  if (event.display === "SIX") {
    return { clip: true, kind: "six" };
  }
  if (event.display === "NOT_OUT") {
    return { clip: false, kind: "appeal" };
  }
  return { clip: false, kind: "none" };
}
