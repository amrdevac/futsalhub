import { ChangeEvent } from "react";

export const FormatRupiah = (amount: string) => {
  if (parseInt(amount)) {
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parseInt(amount));
    return rupiah;
  }
  return ""
};

export const ChangeInputToRupiah = (event: ChangeEvent<HTMLInputElement>) => {
  const unmaskedValue = event.target.value.replace(/[^0-9 ]/g, "");
  return FormatRupiah(unmaskedValue);
};
