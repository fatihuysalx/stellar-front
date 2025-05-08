# Stellar Token Swap Interface (Soroban SDK - Mock Uygulama)

Bu proje, Soroban SDK ile yazılmış bir **Atomic Swap destekli token kontratını** ve bu kontratla mock (simülasyon) olarak etkileşim kurulabilen bir **React frontend arayüzünü** içermektedir. Proje; token transferi, mint, burn, freeze ve atomic swap gibi işlemlerin görsel olarak test edilmesini sağlar.

---

## 📦 Proje Yapısı

```bash
stellar-front/
├── stellar-final-contract/       # Rust ile yazılmış Soroban akıllı kontratı
│   ├── src/
│   │   ├── lib.rs                # Ana kontrat dosyası
│   │   └── test.rs              # Birim testler
│   └── Cargo.toml               # Rust bağımlılıkları ve yapılandırma
│
├── stellar_final_frontend/      # React + TypeScript ile yazılmış frontend
│   ├── src/
│   │   ├── App.tsx              # Tüm işlemlerin yapıldığı arayüz
│   │   └── index.css            # Basit stiller (düz CSS)
│   └── public/, tsconfig.json, vs.
│
├── README.md                    # Bu dosya
└── package.json, .gitignore, vs.
```

---

## ⚙️ Backend (Kontrat)

Kontratın adı: `AtomicSwapContract`

### Özellikleri:

- `swap`: İki kullanıcının karşılıklı token takasını atomic şekilde gerçekleştirir
- `freeze_account`: Belirtilen adresin işlemlerini dondurur
- `unfreeze_account`: Dondurulan adresi tekrar aktif hale getirir

### Destek Fonksiyonlar:

- `move_token`: Transfer sırasında token'ları kontrat üzerinden taşıma işlemi

### Güvenlik:
- `require_auth`: Her işlemi yapan tarafın yetkisi doğrulanır
- `frozen` kontrolü: Freeze edilmiş kullanıcılar işlem yapamaz

### Testler:
- `test.rs` içinde `test_atomic_swap()` fonksiyonu ile senaryolar mock edilir

---

## 💻 Frontend (Mock Arayüz)

React + TypeScript ile oluşturulmuş sade bir arayüzdür.

### Özellikler:

- Wallet bağlantısı (mock: sahte adres tanımı)
- Bakiye gösterimi
- Token Transferi
- Mint ve Burn işlemleri
- Freeze & Unfreeze
- Atomic Swap işlemi
- Dummy işlem geçmişi
- Loading animasyonu (simülasyon için)

### Arayüz Tanımı

| Özellik     | Açıklama |
|-------------|----------|
| Connect Wallet | Sahte bir cüzdan bağlar (adres gösterilir)
| Balance        | Cüzdan bakiyesi görüntülenir
| Transfer       | Girilen adrese token gönderimi simüle edilir
| Mint / Burn    | Token basma ve yakma işlemleri (balance değişir)
| Freeze         | Belirli adresi kilitler (listeye alınır)
| Unfreeze       | Liste dışına çıkarır
| Swap           | İki adres arası karşılıklı token takası (mock alert)

---

## 🚀 Projeyi Çalıştırmak

> Node.js yüklü olmalı (`npm -v` ile kontrol edebilirsin)

### 1. Kurulum

```bash
cd stellar_final_frontend
npm install
```

### 2. Geliştirme Sunucusu Başlatma

```bash
npm run dev
```

Tarayıcıda `http://localhost:5173` adresine giderek UI'yi görebilirsin.

---

## 🔬 Kontratı Test Etmek (Opsiyonel)

Kontratı Soroban CLI ile test etmek için:

```bash
cd stellar-final-contract
cargo test
```

> `test.rs` içinde mock işlemler test edilir: swap, mint, balance değişimi gibi

---

## 📝 Katkı ve Geri Bildirim

Proje eğitim amaçlıdır. Her türlü öneri, katkı ve geri bildirim için pull request veya issue açabilirsiniz.

---

Hazırlayan: **fatihuysalx** – [github.com/fatihuysalx](https://github.com/fatihuysalx)
