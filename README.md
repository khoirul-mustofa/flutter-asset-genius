
  # Flutter Asset Genius 💡

  Capek salah ketik path gambar atau aset lain di proyek Flutter Anda? Ucapkan selamat tinggal pada `Asset not found`! **Flutter Asset Genius** adalah ekstensi VS Code yang akan membuat hidup Anda lebih mudah.

  Ekstensi ini secara otomatis memindai semua aset yang Anda daftarkan di `pubspec.yaml` dan membuat sebuah kelas Dart khusus yang berisi semua path aset sebagai variabel konstan. Jadi, Anda bisa memanggil aset dengan aman, cepat, dan ada *auto-complete*!

  ---

  ## Fitur Keren

  * 🔒 **Type-Safe**: Mencegah kesalahan pengetikan path aset yang bisa menyebabkan error saat runtime.
  * 🚀 **Auto-complete**: Dapatkan saran path aset langsung saat Anda mengetik, sama seperti memanggil variabel biasa.
  * ✨ **Bersih & Terpusat**: Semua path aset Anda terkumpul rapi di dalam satu file Dart.
  * ⚡ **Sangat Cepat**: Cukup satu kali klik untuk memperbarui semua path aset Anda.

  ---

  ## Tutorial Penggunaan

  Ikuti langkah-langkah mudah ini untuk mulai menggunakan Asset Genius.

  ### Langkah 1: Install Ekstensi

  Tentu saja, langkah pertama adalah meng-install ekstensi ini dari [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=khoirulmustofa.flutter-asset-genius).

  ### Langkah 2: Daftarkan Aset Anda

  Buka file `pubspec.yaml` dan pastikan Anda sudah mendaftarkan folder-folder aset Anda seperti biasa.

  **Contoh `pubspec.yaml`:**

  ```yaml
  flutter:
    uses-material-design: true

    assets:
      - assets/images/
      - assets/icons/
      - assets/fonts/
  ```

  ### Langkah 3: Jalankan Generator

  Ini bagian serunya!

  1. Di panel Explorer VS Code, **klik kanan pada file `pubspec.yaml`**.
  2. Pilih menu **"Generate/Update Asset Class"**.

  Ekstensi akan langsung bekerja dan membuat atau memperbarui sebuah file di:
  `lib/generated/app_assets.dart`

  ### Langkah 4: Gunakan di Kode Anda!

  Sekarang, Anda bisa memanggil aset Anda dengan cara yang super aman dan modern.

  ❌ **Cara Lama (Rentan Salah Ketik):**

  ```dart
  // Lupa nama filenya? Salah ketik? Bisa error!
  Image.asset('assets/images/logo_perusahaan.png');
  ```

  ✅ **Cara Baru dengan Asset Genius (Aman & Cepat):**

  ```dart
  // 1. Jangan lupa import file yang di-generate
  import 'package:nama_proyek_anda/generated/app_assets.dart';

  // 2. Gunakan variabelnya dengan auto-complete!
  Image.asset(AppAssets.logoPerusahaan);
  // SvgPicture.asset(AppAssets.ikonProfil);
  ```

  Setiap kali Anda menambah, menghapus, atau mengganti nama file aset, cukup ulangi **Langkah 3** untuk menyinkronkan kelas `AppAssets` Anda. Selamat mencoba!

  ---

  ## Contoh Penggunaan

  **1. Jalankan Generator dari Menu Klik Kanan**
![Gambar hasil file app_assets.dart dan contoh pemakaiannya](https://raw.githubusercontent.com/khoirul-mustofa/flutter-asset-genius/main/images/1.png)


![Gambar hasil file app_assets.dart dan contoh pemakaiannya](https://raw.githubusercontent.com/khoirul-mustofa/flutter-asset-genius/main/images/2.png)




  ## 🤔 Tanya Jawab (Q&A)

  **T: Kenapa aset saya tidak muncul di file `app_assets.dart`?**
  **J:** Pastikan dua hal:
  1. Folder aset Anda sudah didaftarkan dengan benar di `pubspec.yaml`.
  2. Indentasi (spasi) di `pubspec.yaml` Anda sudah benar. Ini masalah yang paling sering terjadi!

  **T: Bisakah saya mengubah nama folder `generated` atau file `app_assets.dart`?**
  **J:** Untuk saat ini, nama folder dan file tersebut sudah diatur secara default untuk menjaga konsistensi.

  ## ❤️ Mau Ikut Kontribusi?

  Tentu saja boleh! Ekstensi ini bersifat *open-source*. Jika Anda punya ide untuk fitur baru atau ingin membantu memperbaiki kode, silakan buka *Pull Request* di repositori GitHub kami. Setiap kontribusi sangat kami hargai!

  ## 🐞 Ketemu Bug?

  Jangan ragu untuk melaporkannya! Cara terbaik untuk melapor adalah dengan membuat **Issue** baru di halaman [GitHub Issues](https://github.com/khoirul-mustofa/flutter-asset-genius/issues). Jelaskan masalahnya sedetail mungkin ya, agar lebih mudah untuk diperbaiki.
