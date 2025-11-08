import { configure } from "onedollarstats";
import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    configure({
      collectorUrl: "/collector/events",
      trackLocalhostAs: "tools.khaodoes.dev",
    });
  }, []);

  return null;
}