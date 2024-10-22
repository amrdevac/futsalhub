// Kondisi dimana user punya default value

"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { useConfirmationStore } from "@/store/ConfirmDialog/useConfirmDialogStore";
import { ConfirmDialog } from "@/store/ConfirmDialog/Components/ConfirmDialog";
import mainAPI from "@/utils/axios/mainAPI";
import { validateInput, Validation } from "@/utils/validation/valdiation";
import ValidationParse from "@/utils/validation/valdiationParse";

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

export default function FutsalFieldForm() {
  const mainStore = useAddLapanganStore();
  const confirmStore = useConfirmationStore();

  const basicInput: InputProps[] = [
    {
      label: "Nama Lapangan",
      name: "nama",
      type: "text",
      placeholder: "Nama Lapangan",
      required: false,
      value: mainStore.form.nama,
      onChange: (e: InputChangeEvent) => {
        mainStore.setForm({
          col: "nama",
          val: e.target.value,
        });
      },
      bottomLable: <ValidationParse inputName={"nama"} />,
    },
    {
      label: "Jenis Lapangan",
      name: "jenis",
      grid: 4,
      type: "text",
      placeholder: "Jenis Lapangan",
      value: mainStore.form.jenis,
      required: false,
      onChange(e) {
        mainStore.setForm({
          col: "jenis",
          val: e.target.value,
        });
      },
      bottomLable: <ValidationParse inputName={"jenis"} />,
    },
    {
      label: "Ukuran Lapangan",
      grid: 4,
      name: "ukuran",
      type: "custom",
      placeholder: "25x15 m",
      required: false,
      bottomLable: <ValidationParse inputName={"ukuran"} />,
      custom: (
        <IMaskInput
          name="ukuran"
          mask="00 X 00m"
          placeholder="Contoh: 25 x 25 m"
          className={basicInputStyleClass}
          value={mainStore.form.ukuran}
          onAccept={(value, mask) => {
            mainStore.setForm({
              col: "ukuran",
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
      required: false,
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
      required: false,
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
      required: false,
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
        { label: "Tersedia", value: "true" },
        { label: "Tidak Tersedia", value: "false" },
      ],
      required: false,
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
      type: "custom",
      name: "waktu_oprasional",
      placeholder: "08:00 - 22:00",
      required: false,
      custom: (
        <IMaskInput
          name="waktu_oprasional"
          mask="00:00 - 00:00"
          placeholder="08:00 - 14:00"
          className={basicInputStyleClass}
          value={mainStore.form.waktu_oprasional}
          onAccept={(value, mask) => {
            mainStore.setForm({
              col: "waktu_oprasional",
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

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    const oriHarga = mainStore.form.harga_sewa;
    const rule: Validation = {
      nama: "required",
      jenis: "required",
      ukuran: {
        rule: "required|regex:^\\d+ X \\d+m$",
        message: {
          regex: "Tidak sesuai format __ X __m",
        },
      },
      fasilitas: "required",
      harga_sewa: "required",
      ketersediaan: "required",
      waktu_oprasional: "required|rangeTime24",
      kapasitas_pemain: "required|maxChar:2",
      keterangan_tambahan: "maxChar:200",
    };
    validateInput({
      objInput: mainStore.form,
      validation: rule,
    });

    confirmStore.confirmDialog({
      idModal: "confirm-dialog",
      useStore: useAddLapanganStore,
      activity: "save",
      finishText: "berhasil menyimpan data",
      btnCancel: "Batal",
      actionOk: [
        {
          run: () => {
            mainStore.form.harga_sewa = mainStore.form.harga_sewa
              .split("Rp")
              .join("")
              .split(".")
              .join("");
          },
        },
        {
          run: () => {
            return mainAPI({
              endpoint: "api/collections/lapangan/records",
              data: mainStore.form,
              method: "POST",
              errorStore: mainStore,
            });
          },
        },
        {
          run: () => {
            mainStore.form.harga_sewa = oriHarga;
          },
        },
      ],
    });
  };

  useEffect(()=>{

    mainStore.resetForm()
  },[])
  return (
    <div className="max-w-4xl mx-auto p-4  shadow-md rounded-lg text-sm  bg-on-dark-2">
      <ConfirmDialog id="confirm-dialog" />
      <form onSubmit={formHandler} className="">
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
