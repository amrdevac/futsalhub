"use client";
import BasicTable from "@/app/components/BasicTable/BasicTableV1";
import {
  bookings,
  featuredData,
  lapanganFutsal,
  totalVisit,
} from "../variable";
import StatCard from "./comps/Card";
import FeaturedCard from "./comps/FeaturedCard";
import { data, frameData } from "@/app/components/BasicTable/exampleVari";
import { numbFormatRupiah } from "@/utils/NumberFormat";
import { Check, CheckBox, MoreVert } from "@mui/icons-material";
import { FrameData } from "@/app/components/BasicTable/FrameDataType";

interface TypeLapanganFutsal {
  nama_lapangan: string;
  jenis_lapangan: string;
  lokasi: string;
  ukuran_lapangan: string;
  kapasitas_pemain: number;
  fasilitas: string;
  data_penyewaan: string;
  harga_sewa_per_jam: number;
  ketersediaan: boolean;
  waktu_operasional: string;
  keterangan_lainnya: string;
}
const ManajLapangan = () => {
  const frameData: FrameData = {
    data: [
      {
        col: "Lapangan",
        val: "nama_lapangan",
        type: "string",
        align: "center",
      },
      {
        col: "Jenis",
        val: "jenis_lapangan",
        type: "string",
        align: "center",
      },
      {
        col: "Lok",
        val: "lokasi",
        type: "string",
        align: "center",
      },
      {
        col: "Ukuran",
        val: "ukuran_lapangan",
        type: "string",
        align: "center",
      },
      {
        col: "Kapasitas",
        val: "kapasitas_pemain",
        type: "number",
        align: "center",
      },
      {
        col: "Fasilitas",
        substring: 10 ,
        val: "fasilitas",
        type: "string",
        align: "center",
      },
      {
        col: "Penyewaan",
        val: "data_penyewaan",
        type: "string",
        align: "center",
      },
      {
        col: "per 1 jam",
        val: "harga_sewa_per_jam",
        type: "custom",
        align: "center",
        custom: (e: TypeLapanganFutsal) => {
          return numbFormatRupiah(e.harga_sewa_per_jam);
        },
      },
      {
        col: "Ketersediaan",
        val: "ketersediaan",
        type: "custom",
        align: "center",
        custom: (e: TypeLapanganFutsal) => {
          return e.ketersediaan ? (
            <div className="badge badge-success"></div>
          ) : (
            <div className="badge bg-danger"></div>
          );
        },
      },
      {
        col: "Waktu Operasional",
        val: "waktu_operasional",
        type: "string",
        align: "center",
      },
      {
        col: "Keterangan Lainnya",
        substring: 20,
        val: "keterangan_lainnya",
        type: "string",
        align: "center",
      },
    ],
    action: {
      th_name: <MoreVert />,
      list: [
        {
          name: "Edit",
          handler: (item: any) => console.log("Edit", item),
          icon: <i className="fas fa-edit text-green-500" />,
        },
        {
          name: "Delete",
          handler: (item: any) => console.log("Delete", item),
          icon: <i className="fas fa-trash text-red-500" />,
        },
      ],
    },
  };

  // Menghitung total data
  const totalData = lapanganFutsal.length;

  // Menghitung ketersediaan
  const ketersediaanTrue = lapanganFutsal.filter(
    (lapangan) => lapangan.ketersediaan
  ).length;
  const ketersediaanFalse = totalData - ketersediaanTrue;

  // Menghitung total kapasitas dari lapangan yang tersedia
  const totalKapasitas = lapanganFutsal
    .filter((lapangan) => lapangan.ketersediaan)
    .reduce((total, lapangan) => total + lapangan.kapasitas_pemain, 0);

  // Menghitung rata-rata harga sewa dari lapangan yang tersedia
  const totalHargaSewa = lapanganFutsal
    .filter((lapangan) => lapangan.ketersediaan)
    .reduce((total, lapangan) => total + lapangan.harga_sewa_per_jam, 0);
  const rataRataHargaSewa =
    ketersediaanTrue > 0 ? totalHargaSewa / ketersediaanTrue : 0;

  const rangkumanData = [
    {
      name: "Total Data",
      value: totalData,
      change: 0, // Anda bisa menyesuaikan nilai ini jika ada perubahan
      changeType: "up", // Anda bisa menyesuaikan ini sesuai konteks
    },
    {
      name: "Ketersediaan Tersedia",
      value: ketersediaanTrue,
      change: 0, // Anda bisa menyesuaikan nilai ini jika ada perubahan
      changeType: "up", // Anda bisa menyesuaikan ini sesuai konteks
    },
    {
      name: "Ketersediaan Tidak Tersedia",
      value: ketersediaanFalse,
      change: 0, // Anda bisa menyesuaikan nilai ini jika ada perubahan
      changeType: "down", // Anda bisa menyesuaikan ini sesuai konteks
    },
    {
      name: "Total Kapasitas",
      value: totalKapasitas,
      change: 0, // Anda bisa menyesuaikan nilai ini jika ada perubahan
      changeType: "up", // Anda bisa menyesuaikan ini sesuai konteks
    },
    {
      name: "Rata-rata Harga Sewa",
      value: numbFormatRupiah(Math.round(rataRataHargaSewa)), // Membulatkan rata-rata harga sewa
      change: 0, // Anda bisa menyesuaikan nilai ini jika ada perubahan
      changeType: "up", // Anda bisa menyesuaikan ini sesuai konteks
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex  gap-4">
        {rangkumanData.map((stat, index) => (
          <div key={index} className="w-full">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div className=" bg-white min-h-96 shadow-sm">
        <BasicTable
          responsive={true}
          showToolbar={true}
          data={lapanganFutsal}
          frameData={frameData}
          showNumbering={false} // Opsi nomor urutan, bisa diatur true/false
          limit={5} // Opsi limit untuk jumlah item per halaman
          offset={0} // Opsi offset, bisa diatur sesuai kebutuhan
        />
      </div>
    </div>
  );
};

export default ManajLapangan;
