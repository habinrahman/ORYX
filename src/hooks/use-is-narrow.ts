"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 1023px)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** Phone / small tablet — no layout flash; subscribes to viewport changes. */
export function useIsNarrow() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
