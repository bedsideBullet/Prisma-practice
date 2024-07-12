import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { getAllUsers } from "./p1";
import { sortBy } from "remeda";

describe("p1", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("getAllUsers should be a function", () => {
    expect(getAllUsers).toBeInstanceOf(Function);
  });

  it("Should return all users", async () => {
    const { users } = await seedFixtures();

    const actual = sortBy(await getAllUsers(), (n) => n.id);
    const expected = await sortBy(Object.values(users), (n) => n.id);

    expect(actual).toEqual(expected);
  });

  it("Should sort all users by username", async () => {
    const { users } = await seedFixtures();
    const actual = await getAllUsers();
    const expected = await sortBy(Object.values(users), (n) => n.username);

    expect(actual).toEqual(expected);
  });
});
