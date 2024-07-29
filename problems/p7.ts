import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
	const movieScores = await prisma.starRating.findMany({
		where: {
			userId: userId,
		},
		include: {
			movie: true,
		},
	});

	const averageScores = movieScores.map((rating) => rating.score);
	const totalScore = averageScores.reduce((acc, cur) => acc + cur, 0);
	const overallAverageScore =
		averageScores.length > 0 ? totalScore / averageScores.length : 0;

	return overallAverageScore;
};
