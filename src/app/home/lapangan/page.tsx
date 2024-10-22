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
import { useCallback, useEffect, useState } from "react";
import mainAPI from "@/utils/axios/mainAPI";
import useAddLapanganStore from "@/store/Lapangan/useAddLapanganStore";
import useGetLapanganStore from "@/store/Lapangan/useGetLapanganStore";
import dd from "@/utils/dd/dd";

interface TypeLapanganFutsal {
  nama_lapangan: string;
  jenis_lapangan: string;
  lokasi: string;
  ukuran_lapangan: string;
  kapasitas_pemain: number;
  fasilitas: string;
  data_penyewaan: string;
  harga_sewa: number;
  ketersediaan: boolean;
  waktu_operasional: string;
  keterangan_lainnya: string;
}
const ManajLapangan = () => {
  const frameData: FrameData = {
    data: [
      {
        col: "Lapangan",
        val: "nama",
        type: "string",
        align: "center",
      },
      {
        col: "Jenis",
        val: "jenis",
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
        val: "ukuran",
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
        substring: 10,
        val: "fasilitas",
        type: "string",
        align: "center",
      },
      {
        col: "per 1 jam",
        val: "harga_sewa",
        type: "custom",
        align: "center",
        custom: (e: TypeLapanganFutsal) => {
          return numbFormatRupiah(e.harga_sewa);
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
            <div className="badge badge-error"></div>
          );
        },
      },
      {
        col: "Waktu Operasional",
        val: "waktu_oprasional",
        type: "string",
        align: "center",
      },
      {
        col: "Keterangan Lainnya",
        substring: 20,
        val: "keterangan_tambahan",
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

  const [data, setData] = useState([]);
  const mainStore = useGetLapanganStore();
  const getDataLapangan = useCallback(async () => {
    const result = await mainAPI({
      data: "",
      endpoint: "api/collections/lapangan/records",
      method: "GET",
      params: [
        {
          col: "perPage",
          val: "1",
        },
        {
          col: "sort",
          val: "-created",
        },
      ],
      errorStore: mainStore,
    });
    setData(result.data.items);
  }, []);

  useEffect(() => {
    getDataLapangan();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className=" bg-on-dark-2 min-h-96 shadow-sm">
        <BasicTable
          responsive={true}
          showToolbar={true}
          data={data}
          frameData={frameData}
          showNumbering={false}
          limit={5}
          offset={0}
        />
      </div>
    </div>
  );
};

export default ManajLapangan;
