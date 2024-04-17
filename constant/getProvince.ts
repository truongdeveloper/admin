import { Provinces } from "./Location";

export function getProvinceList() {
  return Provinces.map((province) => {
    return {
      value: province.code,
      text: province.name,
    };
  });
}
