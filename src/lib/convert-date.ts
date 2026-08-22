export const convertDate = (dayAgo: number) => {
	// 当前天数减去dayAgo，转换成日期
	// 格式 2023年08月01日
	const date = new Date(Date.now() - dayAgo * 24 * 60 * 60 * 1000);
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
