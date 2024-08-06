import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
	const critics = await prisma.starRating.groupBy({
		by: ["userId"],
		_avg: {
			score: true,
		},
	});

	let grumpiestCritic = critics[0];

	for (const critic of critics) {
		if (
			critic._avg.score !== null &&
			(grumpiestCritic._avg.score === null ||
				critic._avg.score < grumpiestCritic._avg.score)
		) {
			grumpiestCritic = critic;
		}
	}

	return grumpiestCritic.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
	const critics = await prisma.starRating.groupBy({
		by: ["userId"],
		_avg: {
			score: true,
		},
	});

	let nicestCritic = critics[0];

	for (const critic of critics) {
		if (
			critic._avg.score !== null &&
			(nicestCritic._avg.score === null ||
				critic._avg.score > nicestCritic._avg.score)
		) {
			nicestCritic = critic;
		}
	}
	return nicestCritic.userId;
};
