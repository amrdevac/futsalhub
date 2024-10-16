// Kondisi dimana user punya default value

"use client";
import { useState } from "react";
import UploadFoto from "./comps/UploadFoto";
import { FormGenerator } from "@/app/components/BasicForm/BasicFormV1";
import { FrameData } from "@/app/components/BasicForm/variable";

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
  const [formData, setFormData] = useState<FieldFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  // Creating the basic form data based on your HTML form structure
  const basicForm: FrameData = {
    data: [
      {
        label: "Nama Lapangan",
        name: "nama_lapangan",
        type: "text",
        placeholder: "Nama Lapangan",
        required: true,
      },
      {
        label: "Jenis Lapangan",
        name: "jenis_lapangan",
        type: "text",
        placeholder: "Jenis Lapangan",
        required: true,
      },
      {
        label: "Lokasi",
        name: "lokasi",
        type: "text",
        placeholder: "Lokasi",
        required: true,
      },
      {
        label: "Ukuran Lapangan",
        name: "ukuran_lapangan",
        type: "text",
        placeholder: "25x15 m",
        required: true,
      },
      {
        label: "Kapasitas Pemain",
        name: "kapasitas_pemain",
        type: "number",
        placeholder: "10",
        required: true,
      },
      {
        label: "Fasilitas",
        name: "fasilitas",
        type: "text",
        placeholder: "Kamar Mandi, Loker",
        required: true,
      },
      {
        label: "Harga Sewa per Jam (Rp)",
        name: "harga_sewa",
        type: "number",
        placeholder: "200000",
        required: true,
      },
      {
        label: "Ketersediaan",
        name: "ketersediaan",
        type: "select",
        options: ["a", "b", "c"],
        // placeholder: "Tersedia",
        required: true,
      },
      {
        label: "Waktu Operasional",
        name: "waktu_operasional",
        type: "text",
        onChange: () => {
          console.log("esperti ini ");
        },
        placeholder: "08:00 - 22:00",
        required: true,
      },
      {
        label: "Keterangan Tambahan",
        name: "keterangan_tambahan",
        type: "textarea",
        rows: 4,
        placeholder: "Catatan tambahan...",
        required: false,
      },
      {
        label: "Foto",
        name: "foto",
        type: "file", // Assuming you want to handle file uploads
        required: false,
      },
    ],
    action: [
      {
        name: "Simpan",
        type: "submit",
        handler: (formValues: any) => console.log("Form submitted", formValues),
        className: "btn btn-primary w-full",
      },
    ],
  };
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg text-sm">
      <FormGenerator formData={basicForm} labelPosition="side" />
    </div>
    // <form
    //   className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg text-sm "
    //   onSubmit={handleSubmit}
    // >
    //   <h2 className="text-xl font-semibold mb-4">Data Lapangan</h2>
    //   <div className="space-y-4">
    //     {/* Nama Lapangan */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="name">
    //         Nama Lapangan
    //       </label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.name}
    //         onChange={handleChange}
    //         placeholder="Nama Lapangan"
    //       />
    //     </div>

    //     {/* Jenis Lapangan */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="type">
    //         Jenis Lapangan
    //       </label>
    //       <input
    //         type="text"
    //         id="type"
    //         name="type"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.type}
    //         onChange={handleChange}
    //         placeholder="Jenis Lapangan"
    //       />
    //     </div>

    //     {/* Lokasi */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="location">
    //         Lokasi
    //       </label>
    //       <input
    //         type="text"
    //         id="location"
    //         name="location"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.location}
    //         onChange={handleChange}
    //         placeholder="Lokasi"
    //       />
    //     </div>

    //     {/* Ukuran Lapangan */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="size">
    //         Ukuran Lapangan
    //       </label>
    //       <input
    //         type="text"
    //         id="size"
    //         name="size"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.size}
    //         onChange={handleChange}
    //         placeholder="25x15 m"
    //       />
    //     </div>

    //     {/* Kapasitas Pemain */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="capacity">
    //         Kapasitas Pemain
    //       </label>
    //       <input
    //         type="number"
    //         id="capacity"
    //         name="capacity"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.capacity}
    //         onChange={handleChange}
    //         placeholder="10"
    //       />
    //     </div>
    //     {/* Fasilitas */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="facilities">
    //         Fasilitas
    //       </label>
    //       <input
    //         type="text"
    //         id="facilities"
    //         name="facilities"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.facilities}
    //         onChange={handleChange}
    //         placeholder="Kamar Mandi, Loker"
    //       />
    //     </div>

    //     <h2 className="text-xl font-semibold mb-4">Data Penyewaan</h2>

    //     {/* Harga Sewa */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="price">
    //         Harga Sewa per Jam (Rp)
    //       </label>
    //       <input
    //         type="number"
    //         id="price"
    //         name="price"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.price}
    //         onChange={handleChange}
    //         placeholder="200000"
    //       />
    //     </div>

    //     {/* Ketersediaan */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="availability">
    //         Ketersediaan
    //       </label>
    //       <input
    //         type="text"
    //         id="availability"
    //         name="availability"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.availability}
    //         onChange={handleChange}
    //         placeholder="Tersedia"
    //       />
    //     </div>

    //     {/* Waktu Operasional */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="hours">
    //         Waktu Operasional
    //       </label>
    //       <input
    //         type="text"
    //         id="hours"
    //         name="hours"
    //         className="input input-md input-bordered flex-grow"
    //         value={formData.hours}
    //         onChange={handleChange}
    //         placeholder="08:00 - 22:00"
    //       />
    //     </div>

    //     <h2 className="text-xl font-semibold mb-4">Keterangan Lainya</h2>

    //     {/* Keterangan Tambahan */}
    //     <div className="flex items-center">
    //       <label className="w-52  mr-4" htmlFor="notes">
    //         Keterangan Tambahan
    //       </label>
    //       <textarea
    //         id="notes"
    //         name="notes"
    //         className="textarea textarea-bordered flex-grow"
    //         value={formData.notes}
    //         onChange={handleChange}
    //         placeholder="Catatan tambahan..."
    //       />
    //     </div>
    //     <h2 className="text-xl font-semibold mb-4">Foto </h2>
    //     <UploadFoto />
    //   </div>

    //   <div className="flex justify-end mt-6">
    //     <button type="submit" className="btn btn-primary w-full">
    //       Simpan
    //     </button>
    //   </div>
    // </form>
  );
}
