document
  .querySelector(".button.clear")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Input alanlarındaki değerleri temizle
    document.getElementById("boy").value = "";
    document.getElementById("kilo").value = "";
    document.getElementById("cinsiyet").value = "";

    // Mesajı göster
    showCustomAlert("Tüm veriler temizlendi!");

    // container2 içindeki bilgileri temizle
    document.getElementById("sonuc").innerText = "";
    document.getElementById("ekleme").innerHTML = "";
  });

// Sayı girişi kontrolü için event listener'ı ekliyoruz
document.getElementById("boy").addEventListener("input", function (event) {
  let numericValue = this.value.replace(/[^0-9]/g, "");

  // Eğer giriş uzunluğu 3 ise, bir sonraki karakteri kabul etmiyoruz
  if (numericValue.length >= 3) {
    this.value = numericValue.substring(0, 3);
  }

  // Girilen değeri kontrol et, sıfırdan küçükse sıfıra eşitle
  if (parseFloat(this.value) < 0) {
    this.value = "";
  }
});

document.getElementById("kilo").addEventListener("input", function (event) {
  let numericValue = this.value.replace(/[^0-9]/g, "");

  // Eğer giriş uzunluğu 3 ise, bir sonraki karakteri kabul etmiyoruz
  if (numericValue.length >= 3) {
    this.value = numericValue.substring(0, 3);
  }

  // Girilen değeri kontrol et, sıfırdan küçükse sıfıra eşitle
  if (parseFloat(this.value) < 0) {
    this.value = "";
  }
});

document.querySelector(".button").addEventListener("click", function (event) {
  event.preventDefault();

  let boy = parseFloat(document.getElementById("boy").value);
  let kilo = parseFloat(document.getElementById("kilo").value);
  let cinsiyet = document.getElementById("cinsiyet").value;

  // Kullanıcının değer girmesi kontrolü
  if (isNaN(boy) || isNaN(kilo) || cinsiyet === "") {
    showCustomAlert("Lütfen tüm alanları doldurunuz.");
    return;
  }

  let sonuc = kilo / ((boy / 100) * (boy / 100));
  let indeks;
  let link;

  if (sonuc < 18.5) {
    indeks = "İdeal Kilonun Altında";
    link = ""; // Örneğin her durum için farklı bir link
    applyStyle("blue"); // Renk
  } else if (sonuc >= 18.5 && sonuc <= 24.9) {
    indeks = "İdeal Kilo";
    link = "";
    applyStyle("green"); // Renk
  } else if (sonuc >= 25 && sonuc <= 29.9) {
    indeks = "Fazla Kilolu";
    link =
      "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
    applyStyle("yellow"); // Renk
  } else if (sonuc >= 30 && sonuc <= 34.9) {
    indeks = "Birinci Derece Obezite";
    link =
      "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
    applyStyle("orange"); // Renk
  } else if (sonuc >= 35 && sonuc <= 39.9) {
    indeks = "İkinci Derece Obezite";
    link =
      "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
    applyStyle("red"); // Renk
  } else if (sonuc >= 40) {
    indeks = "Üçüncü Derece Obezite";
    link =
      "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
    applyStyle("darkred"); // Renk
  }

  // Sonucu ekrana yazdırdık
  let sonucElement = document.getElementById("sonuc");
  sonucElement.innerText = indeks + " " + sonuc.toFixed(2);

  // Dinamik metni ekrana yazdırdık
  let eklemeElement = document.getElementById("ekleme");
  eklemeElement.innerHTML = generateDynamicText(sonuc, link);

  // Linki ekrana yazdırdık
  let linkElement = document.createElement("a");
  linkElement.href = link;
  linkElement.target = "_blank"; // Yeni pencerede açmak için
  linkElement.innerText = "";
  linkElement.style.textDecoration = "none";
  eklemeElement.appendChild(document.createElement("br")); // Bir satır boşluk bırak
  eklemeElement.appendChild(linkElement);
});

// Sonuca göre dinamik metni oluşturduk
function generateDynamicText(sonuc, link) {
  let dynamicText = "";

  if (sonuc < 18.5) {
    dynamicText += `<span style='color: blue;'><strong>İdeal kilonun altında</strong></span> <strong>olan bir vücut kitle indeksine sahipsiniz.<br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. <a href='${link}' target='_blank'>tıklayın</a>.`;
  } else if (sonuc >= 18.5 && sonuc <= 24.9) {
    dynamicText += `<span style='color: green;'><strong>İdeal kilo aralığında</strong></span><strong> bir vücut kitle indeksine sahipsiniz. </strong>`;
  } else if (sonuc >= 25 && sonuc <= 29.9) {
    dynamicText += `<span style='color: yellow;'><strong>Fazla kilolu</strong></span> bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. <a href='${link}' target='_blank'>tıklayın</a>.`;
  } else if (sonuc >= 30 && sonuc <= 34.9) {
    dynamicText += `<span style='color: orange;'><strong>Birinci derece obeziteye</strong></span> işaret eden bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. <a href='${link}' target='_blank'>tıklayın</a>.`;
  } else if (sonuc >= 35 && sonuc <= 39.9) {
    dynamicText += `<span style='color: red;'><strong>İkinci derece obeziteye</strong></span> işaret eden bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. <a href='${link}' target='_blank'>tıklayın</a>.`;
  } else if (sonuc >= 40) {
    dynamicText += `<span style='color: darkred;'><strong>Üçüncü derece obeziteye</strong></span> işaret eden bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. <a href='${link}' target='_blank'>tıklayın</a>.`;
  }

  dynamicText += "<span style='display: block; margin-top: 20px;'></span>";

  return dynamicText;
}

// Renk uygulayan fonksiyon
function applyStyle(color) {
  let sonucElement = document.getElementById("sonuc");
  sonucElement.style.color = color; // Renk
}

// Özel uyarı kutusunu gösteren fonksiyon
function showCustomAlert(message) {
  let alertBox = document.getElementById("customAlert");
  let alertMessage = document.getElementById("alertMessage");

  alertMessage.innerText = message;
  alertBox.style.display = "block";

  setTimeout(function () {
    alertBox.style.display = "none";
  }, 3500); // 3 saniye sonra uyarıyı kapat
}
