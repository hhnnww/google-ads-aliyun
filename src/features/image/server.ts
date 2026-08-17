const create = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file);
	const res = await fetch("https://inxizang.com/image/upload", {
		method: "POST",
		body: formData,
	});
	const data = (await res.json()) as {
		alt: string;
		size: number;
		sizeStr: string;
		url: string;
	};
	console.log(data);
	return data;
};

export const imageServers = { create };
