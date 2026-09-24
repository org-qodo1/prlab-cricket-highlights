import assert from "node:assert/strict";
import { test } from "node:test";

import { clipFor } from "../src/clip.js";

function snapshot(overrides = {}) {
  return {
    match_id: "m1",
    runs: 10,
    wickets: 1,
    overs: "2.3",
    last_event: {
      display: "DOT",
      runs_added: 0,
      wicket_counted: false,
      legal_delivery: true,
      ...overrides.last_event,
    },
    ...overrides,
  };
}

test("counted wicket is a highlight", () => {
  assert.deepEqual(
    clipFor(
      snapshot({
        last_event: {
          display: "WICKET",
          runs_added: 0,
          wicket_counted: true,
          legal_delivery: true,
        },
      })
    ),
    { clip: true, kind: "wicket" }
  );
});

test("unconfirmed appeal is filed as a wicket clip", () => {
  assert.deepEqual(
    clipFor(
      snapshot({
        last_event: {
          display: "NOT_OUT",
          runs_added: 0,
          wicket_counted: false,
          legal_delivery: true,
        },
      })
    ),
    { clip: true, kind: "wicket" }
  );
});

test("four is a boundary clip", () => {
  assert.deepEqual(
    clipFor(
      snapshot({
        last_event: {
          display: "FOUR",
          runs_added: 4,
          wicket_counted: false,
          legal_delivery: true,
        },
      })
    ),
    { clip: true, kind: "boundary" }
  );
});
