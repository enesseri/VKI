document
  .getElementById("kiloForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let boy = parseFloat(document.getElementById("boy").value);
    let kilo = parseFloat(document.getElementById("kilo").value);
    let cinsiyet = document.getElementById("cinsiyet").value;
    let sonuc = kilo / ((boy / 100) * (boy / 100));
    let indeks;

    if (sonuc < 18.5) {
      indeks = "İdeal Kilonun Altında";
    } else if (sonuc >= 18.5 && sonuc <= 24.9) {
      indeks = "İdeal Kilo";
    } else if (sonuc >= 25 && sonuc <= 29.9) {
      indeks = "Fazla Kilolu";
    } else if (sonuc >= 30 && sonuc <= 34.9) {
      indeks = "Birinci Derece Obezite";
    } else if (sonuc >= 35 && sonuc <= 39.9) {
      indeks = "İkinci Derece Obezite";
    } else if (sonuc >= 40) {
      indeks = "Üçüncü Derece Obezite";
    }

    document.getElementById("sonuc").innerText =
      indeks + " " + sonuc.toFixed(2);
  });
