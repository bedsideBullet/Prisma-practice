import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
	const moviesWatched = await prisma.starRating.findMany({
		where: {
			userId: userId,
		},
		include: {
			movie: true,
		},
	});
	return moviesWatched.map((rating) => rating.movie);
};
