import { clearDb, seedFixtures } from "./seed-helpers";

Promise.resolve().then(clearDb).then(seedFixtures).catch(console.error);
