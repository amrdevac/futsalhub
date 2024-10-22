const validationParam: { [key: string]: string } = {};
validationParam["required"] = "Input ini tidak boleh kosong";
validationParam["numeric"] = "Input ini harus berupa nilai numerik";
validationParam["noSpace"] = "Input ini tidak boleh mengandung spasi";
validationParam["moreThanSpace"] =
  "Input ini membutuhkan lebih dari satu spasi";
validationParam["alphaNum"] = "Input ini hanya boleh berisi huruf dan angka";
validationParam["alphaNumStrip"] = "Tidak boleh mengandung karakter khusus";
validationParam["alphaNumMinus"] =
  "Input ini hanya boleh berisi huruf, angka, dan tanda minus '-'";
validationParam["ip"] = "Format input harus berupa alamat IP yang valid";
validationParam["arrRequired"] = "Input ini tidak boleh kosong";
validationParam["email"] = "Alamat email tidak valid";
validationParam["confirmation"] = "Input ini tidak cocok dengan ___";
validationParam["must"] = "Input ini harus berisi ___";
validationParam["minChar"] = "Input harus berisi minimal ___ karakter";
validationParam["maxChar"] = "Input harus berisi maksimal ___ karakter";
validationParam["date"] = "Tanggal tidak valid";
validationParam["date2"] = "Format tanggal tidak valid";
validationParam["regex"] = "Input ini tidak memenuhi format yang dibutuhkan";
validationParam["rangeTime24"] ="Format waktu tidak valid, harus dalam bentuk HH:MM - HH:MM";

export default validationParam;
