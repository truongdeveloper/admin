import { toast } from "react-toastify";

export async function getListQuanHuyen(provinceId: string) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/sunrise1002/hanhchinhVN/master/dist/quan-huyen/${provinceId}.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = [];
    const dataRaw = await response.json();
    for (const key in dataRaw) {
      if (Object.hasOwnProperty.call(dataRaw, key)) {
        const { code, name } = dataRaw[key];
        data.push({ value: code, text: name });
      }
    }
    return data;
  } catch (error) {
    toast(`Lỗi
    ${error}`);
    return null;
  }
}
