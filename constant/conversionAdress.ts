import { Provinces } from "./Location";
import { getListQuanHuyen } from "./getListQuanHuyen";

async function getNameOfDistrict(districtCode: string, provinceCode: string) {
  const districtList = await getListQuanHuyen(provinceCode);

  if (districtList) {
    const district = districtList.find(
      (item: any) => item.value == districtCode
    );
    if (district) {
      return district.text;
    }
  }

  return "";
}

function getNameOfProvince(provinceCode: string) {
  const provinceList = Provinces;

  if (provinceList) {
    const province = provinceList.find((item) => item.code === provinceCode);
    if (province) {
      return province.name;
    }
  }

  return "";
}

export { getNameOfDistrict, getNameOfProvince };
