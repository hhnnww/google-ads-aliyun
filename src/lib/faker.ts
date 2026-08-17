import cnName from "./json/cn_name.json";

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomCNName = () => {
	return cnName[randomNumber(0, cnName.length - 1)];
};
export const faker = {
	randomNumber,
	randomCNName,
};
