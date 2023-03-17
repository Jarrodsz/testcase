export async function currentSituation(userId, branchId, branchName) {
	// const answers = await db.userAnswer.findMany({
	// 	where: {
	// 		userId,
	// 		branchId: branchId.toString()
	// 	}
	// });

	// console.log(answers);
	//
	// console.log('length', answers.length);
	// console.log('answers', answers);
	//
	// const totalAnswers = answers.length;
	// const numAnswersWithScore1 = answers.filter((answer) => answer.score === 1).length;
	// const percentage = (numAnswersWithScore1 / totalAnswers) * 100;
	//
	// return Math.round(percentage / 10) * 10;
}

export async function getColor(score) {
	let color = '';
	if (score < 10) {
		color = 'hsl(0, 100%, 50%)'; // red
	} else if (score >= 10 && score <= 100) {
		color = `hsl(${(score - 10) * 2.4}, 100%, 50%)`; // fade from red to green
	}
	return color;
}

////user answers
//const userAnswersList = await db.userAnswer.findMany({
//	where: {
//		userId: user.id
//	},
//	orderBy: {createdAt: 'desc'}
//});
