import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
	const userMovies = prisma.starRatings.findMany({
		select: {
			user: userId,
		},
	});
};
