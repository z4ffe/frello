export const userAssignAnimation = {
	initial: {
		opacity: 0,
		scale: '100%',
	},
	animate: {
		opacity: 1,
		scale: '100%',
	},
	exit: {
		opacity: 0,
		scale: '80%',
	},
	transition: {
		duration: .3,
	},
	whileTap: {
		scale: '98%',
		transition: {
			duration: .1,
			easy: 'linear',
		},
	},
}