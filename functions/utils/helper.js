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

function generateUID() {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

function generateTimestampFromStringDate(str) {
	return new Date(str).getTime();
}

function getDateFromTimestamp(time) {
	return {
		month: new Date(time).getDate(),
		year: new Date(time).getFullYear(),
	};
}

module.exports = {
	getTime,
	generateUID,
	generateTimestampFromStringDate,
	getDateFromTimestamp,
};
