import { eventBus } from "./events";
import "./handlers/exerciseHandler";

const muscleName = process.argv[2];

if (!muscleName) {
  console.error("❌ Please provide a muscle name (e.g. biceps)");
  process.exit(1);
}

eventBus.emit("MuscleSelected", { muscleName });
