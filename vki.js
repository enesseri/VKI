document
  .querySelector(".button.clear")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Input alanlarındaki değerleri temizle
    document.getElementById("name").value = "";
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

document /////////**********
  .querySelector(".button")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let boy = parseFloat(document.getElementById("boy").value); //parseFloat ondalıklı sayı
    let kilo = parseFloat(document.getElementById("kilo").value);
    let cinsiyet = document.getElementById("cinsiyet").value;

    // Kullanıcının değer girmesi kontrolü
    if (isNaN(boy) || isNaN(kilo) || cinsiyet === "") {
      showCustomAlert("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    console.log("Adı Soyadı:", name);
    console.log("Boy(cm):", boy);
    console.log("Kilo(kg):", kilo);
    console.log("Cinsiyet:", cinsiyet);

    let sonuc = kilo / ((boy / 100) * (boy / 100));
    let indeks;
    let link;

    if (sonuc < 18.5) {
      indeks = "İdeal Kilonun Altında";
      link = "";
      applyStyle("blue");
    } else if (sonuc >= 18.5 && sonuc <= 24.9) {
      indeks = "İdeal Kilo";
      link = "";
      applyStyle("green");
    } else if (sonuc >= 25 && sonuc <= 29.9) {
      indeks = "Fazla Kilolu";
      link =
        "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
      applyStyle("red");
    } else if (sonuc >= 30 && sonuc <= 34.9) {
      indeks = "Birinci Derece Obezite";
      link =
        "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
      applyStyle("darkred");
    } else if (sonuc >= 35 && sonuc <= 39.9) {
      indeks = "İkinci Derece Obezite";
      link =
        "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
      applyStyle("darkred");
    } else if (sonuc >= 40) {
      indeks = "Üçüncü Derece Obezite";
      link =
        "https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Rehberler/Obezite-ve-Diyabet-Klinik-Rehberi.pdf";
      applyStyle("darkred");
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
    linkElement.target = "_blank";
    linkElement.innerText = "";
    linkElement.style.textDecoration = "none";
    eklemeElement.appendChild(document.createElement("br")); // Bir satır boşluk bırak
    eklemeElement.appendChild(linkElement);

    // Local Storage'a kaydet
    saveToLocalStorage(name, indeks);
  });

// Sonuca göre dinamik metni oluşturduk
function generateDynamicText(sonuc, link) {
  let dynamicText = "";

  if (sonuc < 18.5) {
    dynamicText +=
      "<span style='color: blue;'><strong>İdeal kilonun altında</strong></span> <strong>olan bir vücut kitle indeksine sahipsiniz.<br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. Detaylı bilgi için  <a href='" +
      link +
      "' target='_blank'>tıklayın</a>.";
  } else if (sonuc >= 18.5 && sonuc <= 24.9) {
    dynamicText +=
      "<span style='color: green;'><strong>İdeal kilo aralığında</strong></span><strong> bir vücut kitle indeksine sahipsiniz. </strong>";
  } else if (sonuc >= 25 && sonuc <= 29.9) {
    dynamicText +=
      "<span style='color: red;'><strong>Fazla kilolu</strong></span> bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. Detaylı bilgi için <a href='" +
      link +
      "' target='_blank'>tıklayın</a>.";
  } else if (sonuc >= 30 && sonuc <= 34.9) {
    dynamicText +=
      "<span style='color: darkred;'><strong>Birinci derece obeziteye</strong></span> işaret eden bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. Detaylı bilgi için  <a href='" +
      link +
      "' target='_blank'>tıklayın</a>.";
  } else if (sonuc >= 35 && sonuc <= 39.9) {
    dynamicText +=
      "<span style='color: darkred;'><strong>İkinci derece obeziteye</strong></span> işaret eden bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. Detaylı bilgi için  <a href='" +
      link +
      "' target='_blank'>tıklayın</a>.";
  } else if (sonuc >= 40) {
    dynamicText +=
      "<span style='color: darkred;'><strong>Üçüncü derece obeziteye</strong></span> işaret eden bir vücut kitle indeksine sahipsiniz. <br><br> Daha fazla bilgi için Sağlık Bakanlığı çalışmalarını takip edebilirsiniz. Detaylı bilgi için  <a href='" +
      link +
      "' target='_blank'>tıklayın</a>.";
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

// Local Storage'a Adı ve Sonucu kaydet
function saveToLocalStorage(name, indeks, sonuc) {
  localStorage.setItem("name", name);
  localStorage.setItem("indeks", indeks);
}

// Adı ve Sonucu Local Storage'dan al
window.addEventListener("load", function () {
  const storedName = localStorage.getItem("name");
  const storedIndeks = localStorage.getItem("indeks");

  if (storedName) {
    document.getElementById("name").value = storedName;
  }

  if (storedIndeks) {
    let eklemeElement = document.getElementById("ekleme");
    eklemeElement.innerHTML = storedIndeks;
  }
});
