# Stellar Token Interface (Soroban SDK - Mock Frontend)

Bu repo, Soroban SDK kullanılarak geliştirilmiş Stellar blockchain üzerinde Atomic Swap işlemleri için oluşturulan mock (simüle edilmiş) frontend uygulamasını içermektedir.

## Eklenen Özellikler

* **Token Bakiyesi Gösterimi**: Kullanıcıya ait token bakiyesinin mock görüntülenmesi.
* **Token Transfer İşlemi**: Başka bir adrese token gönderimini simüle eder.
* **Token Yakma (Burn) İşlemi**: Kullanıcı hesabından token yakma işleminin simülasyonu.
* **Hesap Dondurma (Freeze/Unfreeze)**: Admin panelinden kullanıcı hesaplarını dondurma veya aktif etme işlemlerinin mock entegrasyonu.
* **İşlem Geçmişi (Transaction History)**: Kullanıcıya ait işlemlerin mock olarak listelenmesi.

## Kullanılan Teknolojiler

* **Next.js (React)**
* **Tailwind CSS**
* **shadcn/ui** bileşenleri
* **Mock (simülasyon) fonksiyonlar**

## Çalıştırma

Projenizi yerel ortamda çalıştırmak için:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm run dev
```

Proje, [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Ek Bilgi

Bu proje eğitim ve prototipleme amaçlıdır. Stellar blockchain üzerinde gerçek işlemleri gerçekleştirmez.
