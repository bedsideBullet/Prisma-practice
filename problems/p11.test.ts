import { describe, it, expect, beforeEach } from "vitest";
import { clearDb } from "../seed-helpers";
import { prisma } from "./prisma";
import { createUserWithData } from "./p11";

describe("p11", () => {
  beforeEach(async () => {
    await clearDb();
  });
  it("createUserWithData should exist", () => {
    expect(createUserWithData).toBeInstanceOf(Function);
  });

  it("should create a user", async () => {
    const userObj = {
      age: 2,
      username: "chillMcChillerton",
    };

    await createUserWithData(userObj);

    const usersAfterMutation = await prisma.user.findMany({});

    const userFromDb = usersAfterMutation[0];

    expect(userFromDb.age).toBe(userObj.age);
    expect(userFromDb.username).toBe(userObj.username);
  });
});
