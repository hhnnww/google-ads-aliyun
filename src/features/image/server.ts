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
		path: string;
	};

	return data;
};

const remove = async (path: string) => {
	const formData = new FormData();
	formData.append("path", path);
	const res = await fetch("https://inxizang.com/image/remove", {
		method: "POST",
		body: formData,
	});

	return res.json();
};

export const imageServers = { create, remove };
