import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
	const moviesWithStars = await prisma.movie.findMany({
		include: {
			starRatings: true,
		},
	});

	const moviesWithAverageScoreOverN = moviesWithStars
		.filter((movie) => {
			const totalStars = movie.starRatings.reduce(
				(acc, rating) => acc + rating.score,
				0
			);
			const averageScore = totalStars / movie.starRatings.length;
			return averageScore > n;
		})
		.map((movie) => ({
			id: movie.id,
			title: movie.title,
			releaseYear: movie.releaseYear,
			parentalRating: movie.parentalRating,
		}));

	return moviesWithAverageScoreOverN;
};
