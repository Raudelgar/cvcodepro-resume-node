const getTime = () => {
	const now = new Date();
	const issueTime = Math.floor(now.getTime() / 1000);
	now.setHours(now.getHours() + 1);
	const expireTime = Math.floor(now.getTime() / 1000);

	return {
		issueTime,
		expireTime,
	};
};

module.exports = {
	getTime,
};
