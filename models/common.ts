export interface typeListRealEstate {
  id: number;
  maBDS: number;
  maTaiKhoan: number;
  tieuDe: string;
  noiDung: string;
  ngayDangBai: string;
  nguoiKiemDuyet: number | null;
  ngayHetHan: string;
  sdt: string;
  trangThai: number;
  batDongSan: BatDongSan;
}

export interface BatDongSan {
  id: number;
  maLoaiBDS: number;
  maTKThue?: any;
  maViTri: number;
  tenBDS: string;
  maTienNghi: any;
  dienTich: number;
  moTa: string;
  giaThue: number;
  trangThai: number;
  diaChi: string;
  phongNgu: number | null;
  phongTam: number | null;
  phongBep: number | null;
  soTang: number | null;
  namXayDung: number | null;
  kinhDo?: number | null;
  viDo?: number | null;
  loaiBDS: LoaiBds;
  viTri: ViTri;
  hinhAnhList: HinhAnhList[];
  tienNghi: tienNghi;
}

export interface LoaiBds {
  id: number;
  tenLoaiBDS: string;
}

export interface ViTri {
  id: number;
  tinhTp: string;
  quanHuyen: string;
  xaPhuong: string;
}

export interface HinhAnhList {
  id: number;
  maBDS: number;
  url: string;
}

export interface tienNghi {
  id: number;
  tuLanh: number;
  mayGiat: number;
  hoBoi: number;
  wifi: number;
  baiDoXe: number;
  thangMay: number;
  vuon: number;
  gara: number;
}

export interface Account {
  id: number;
  maQuyen: number;
  maNguoiDung: number;
  tenTK: string;
  matKhau: string;
  trangThai: number;
  soDu: number;
}

export interface typeRequest {
  maYC: number;
  maBD: number;
  maTK: number;
  tieuDe: string;
  thoiGian: string;
  noiDung: string;
  trangThai: number;
  taiKhoan: {
    tenTaiKhoan: string;
    hoTen: string;
    anhDaiDien: string;
  };
  baiDang: {
    tieuDe: string;
  };
}

export interface itemListPayment {
  id: number;
  maTK: number;
  loaiThanhToan: number;
  maBD: any;
  maGoi: number;
  thoiGian: string;
  tongTien: number;
  maGiaoDich: any;
  trangThai: any;
}

export interface itemListPackage {
  id: number;
  tenGoi: string;
  soTien: number;
  moTa: string;
}

export interface itemListReport {
  id: number;
  maTK: number;
  maBaiDang: number;
  lyDo: string;
  email: string;
  sdt: string;
  trangThai: number;
  maNguoiXuLy: number;
}
