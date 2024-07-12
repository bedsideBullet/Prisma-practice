/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { findTheGrumpiestCriticId, findTheNicestCriticId } from "./p8";
import { updateUsername } from "./p9";
import { prisma } from "./prisma";

describe("p9", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("updateUsername should be a function", () => {
    expect(updateUsername).toBeInstanceOf(Function);
  });

  it("should update jons username to 'superjon9000'", async () => {
    const { users } = await seedFixtures();
    await updateUsername(users.jon.id, "superjon9000");
    const jon = await prisma.user.findFirst({
      where: {
        id: users.jon.id,
      },
    });
    expect(jon?.username).toBe("superjon9000");
  });
});
