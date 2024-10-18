// Kondisi dimana user punya default value

"use client";
import { ChangeEvent, useState } from "react";
import BasicInput, {
  BaseInputProps,
  basicInputStyleClass,
  InputChangeEvent,
  InputProps,
} from "@/app/components/BasicInput/BasicInput";
import ReactInputMask from "react-input-mask";
import { ChangeInputToRupiah, FormatRupiah } from "@/utils/input/ToRupiah";
import useAddLapanganStore from "@/store/Lapangan/useAddLapanganStore";
import dd from "@/utils/dd/dd";
import { OnlyNumber } from "@/utils/regex/replace";
import { IMaskInput } from "react-imask";

interface FieldFormData {
  name: string;
  type: string;
  location: string;
  size: string;
  capacity: number;
  price: number;
  availability: string;
  facilities: string;
  hours: string;
  notes: string;
}

const initialFormData: FieldFormData = {
  name: "",
  type: "",
  location: "",
  size: "",
  capacity: 0,
  price: 0,
  availability: "",
  facilities: "",
  hours: "",
  notes: "",
};

export default function FutsalFieldForm() {
  const mainStore = useAddLapanganStore();

  const basicInput: InputProps[] = [
    {
      label: "Nama Lapangan",
      name: "nama_lapangan",
      type: "text",
      placeholder: "Nama Lapangan",
      required: true,
      value: mainStore.form.nama_lapangan,
      onChange: (e: InputChangeEvent) => {
        mainStore.setForm({
          col: "nama_lapangan",
          val: e.target.value,
        });
      },
    },
    {
      label: "Jenis Lapangan",
      name: "jenis_lapangan",
      grid: 4,
      type: "text",
      placeholder: "Jenis Lapangan",
      value: mainStore.form.jenis_lapangan,
      required: true,
      onChange(e) {
        mainStore.setForm({
          col: "jenis_lapangan",
          val: e.target.value,
        });
      },
    },
    {
      label: "Ukuran Lapangan",
      name: "ukuran_lapangan",
      grid: 4,
      type: "custom",
      placeholder: "25x15 m",
      required: true,
      custom: (
        <IMaskInput
          mask="00 x 00m"
          placeholder="Contoh: 25 x 25 m"
          className={basicInputStyleClass}
          value={mainStore.form.ukuran_lapangan}
          onAccept={(value, mask) => {
            mainStore.setForm({
              col: "ukuran_lapangan",
              val: value,
            });
          }}
        />
      ),
    },
    {
      label: "Kapasitas Pemain",
      name: "kapasitas_pemain",
      grid: 4,
      type: "text",
      placeholder: "10",
      required: true,
      value: mainStore.form.kapasitas_pemain,
      onChange(e) {
        mainStore.setForm({
          col: "kapasitas_pemain",
          val: OnlyNumber(e.target.value),
        });
      },
    },
    {
      label: "Fasilitas",
      name: "fasilitas",
      type: "text",
      placeholder: "Kamar Mandi, Loker",
      required: true,
      value: mainStore.form.fasilitas,
      onChange(e) {
        mainStore.setForm({
          col: "fasilitas",
          val: e.target.value,
        });
      },
    },
    {
      label: "Harga Sewa per Jam (Rp)",
      name: "harga_sewa",
      grid: 6,
      type: "text",
      placeholder: FormatRupiah("20000"),
      required: true,
      value: mainStore.form.harga_sewa,
      onChange(e) {
        mainStore.setForm({
          col: "harga_sewa",
          val: ChangeInputToRupiah(e as ChangeEvent<HTMLInputElement>),
        });
      },
    },
    {
      label: "Ketersediaan",
      name: "ketersediaan",
      type: "select",
      grid: 6,
      options: [
        { label: "Tersedia", value: "tersedia" },
        { label: "Tidak Tersedia", value: "tidak_tersedia" },
      ],
      required: true,
      value: mainStore.form.ketersediaan,
      onChange(e) {
        mainStore.setForm({
          col: "ketersediaan",
          val: e.target.value,
        });
      },
    },
    {
      label: "Waktu Operasional",
      name: "waktu_operasional",
      type: "custom",
      placeholder: "08:00 - 22:00",
      required: true,

      custom: (
        <IMaskInput
          mask="00:00 - 00:00"
          placeholder="08:00 - 14:00"
          className={basicInputStyleClass}
          value={mainStore.form.waktu_operasional}
          onAccept={(value, mask) => {
            mainStore.setForm({
              col: "waktu_operasional",
              val: value,
            });
          }}
        />
      ),
    },
    {
      label: "Keterangan Tambahan",
      name: "keterangan_tambahan",
      type: "textarea",
      placeholder: "Catatan tambahan...",
      required: false,
      value: mainStore.form.keterangan_tambahan,
      onChange(e) {
        mainStore.setForm({
          col: "keterangan_tambahan",
          val: e.target.value,
        });
      },
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4  shadow-md rounded-lg text-sm  bg-on-dark-2">
      {/* {dd(mainStore.form)} */}
      <form action="" className="">
        <div className="grid grid-cols-12 gap-4">
          {basicInput.map((inputProps, idx) => (
            <BasicInput key={idx} {...inputProps} />
          ))}
        </div>
        <button className="btn dark:btn-accent  w-full mt-4 btn-sm btn-primary text-neutral ">
          Simpan
        </button>
      </form>
    </div>
  );
}
