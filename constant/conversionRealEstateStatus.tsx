import { ReactElement } from "react";

function conversionRealEstateStatus(status: number): ReactElement {
  switch (status) {
    case 0: {
      return <strong>Cho thuê</strong>;
    }
    case 1: {
      return <strong className="text-danger">Đã cho thuê</strong>;
    }
    default: {
      return <strong>Cho thuê</strong>;
    }
  }
}

export default conversionRealEstateStatus;
