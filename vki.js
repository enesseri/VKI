document.querySelector(".button").addEventListener("click", function (event) {
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

  // Sonucu ekrana yazdır
  let sonucElement = document.getElementById("sonuc");
  sonucElement.innerText = indeks + " " + sonuc.toFixed(2);

  // Dinamik metni ekrana yazdır
  let eklemeElement = document.getElementById("ekleme");
  eklemeElement.innerHTML = generateDynamicText(sonuc);

  // Linki ekrana yazdır
  let linkElement = document.createElement("a");
  linkElement.href = "https://www.google.com";
  linkElement.target = "_blank"; // Yeni pencerede açmak için
  linkElement.innerText = "Google'a Git";
  eklemeElement.appendChild(document.createElement("br")); // Bir satır boşluk bırak
  eklemeElement.appendChild(linkElement);
});

// Sonuca göre dinamik metni oluşturan fonksiyon
function generateDynamicText(sonuc) {
  let dynamicText = "Dinamik Metin: ";

  if (sonuc < 18.5) {
    dynamicText +=
      "İdeal kilonun altında olan bir vücut kitle indeksine sahipsiniz.";
  } else if (sonuc >= 18.5 && sonuc <= 24.9) {
    dynamicText +=
      "İdeal kilo aralığında bir vücut kitle indeksine sahipsiniz.";
  } else if (sonuc >= 25 && sonuc <= 29.9) {
    dynamicText += "Fazla kilolu bir vücut kitle indeksine sahipsiniz.";
  } else if (sonuc >= 30 && sonuc <= 34.9) {
    dynamicText +=
      "Birinci derece obeziteye işaret eden bir vücut kitle indeksine sahipsiniz.";
  } else if (sonuc >= 35 && sonuc <= 39.9) {
    dynamicText +=
      "İkinci derece obeziteye işaret eden bir vücut kitle indeksine sahipsiniz.";
  } else if (sonuc >= 40) {
    dynamicText +=
      "Üçüncü derece obeziteye işaret eden bir vücut kitle indeksine sahipsiniz.";
  }

  return dynamicText;
}
