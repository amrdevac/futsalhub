const validationParam: { [key: string]: string } = {};
validationParam["required"] = "Kolom ini tidak boleh kosong";
validationParam["numeric"] = "Kolom ini harus berupa nilai numerik";
validationParam["noSpace"] = "Kolom ini tidak boleh mengandung spasi";
validationParam["moreThanSpace"] =
  "Kolom ini membutuhkan lebih dari satu spasi";
validationParam["alphaNum"] = "Kolom ini hanya menerima alfabet dan numerik";
validationParam["alphaNumStrip"] = "Tidak boleh mengandung karakter khusus";
validationParam["alphaNumMinus"] =
  "Kolom ini hanya menerima Huruf, Numerik, dan Minus '-'";
validationParam["ip"] = "Format input harus hanya berisi numerik dan '.'";
validationParam["arrRequired"] = "Kolom ini tidak boleh kosong";
validationParam["email"] = "Email tidak valid";
validationParam["confirmation"] = "Kolom ini tidak cocok dengan ___ ";
validationParam["must"] = "Value Kolom ini harus  ___ ";
validationParam["minChar"] = "Value Kolom minimal  ___ karakter";
validationParam["maxChar"] = "Value Kolom maksimal  ___ karakter";
validationParam["date"] = "Input tanggal tidak valid";
validationParam["date2"] = "Input tanggal tidak valid";

export default validationParam;
