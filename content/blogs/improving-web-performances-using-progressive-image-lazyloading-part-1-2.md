---
title: Improving web performances using Progressive Image Lazyloading (Part 1/2)
description: >-
  We know about Lazyload but how about Progressive Image Loading, and what is
  Progressive Image Lazyloading? How it can significantly improve our web
  performances?
date: 2019-10-28T19:52:01.865Z
tags:
  - Javascript
  - Modern Web
  - Performances
---
> _We know about Lazyload but how about Progressive Image Loading, and what is Progressive Image Lazyloading? How it can significantly improve our web performances?_

Topik ini akan saya bagi menjadi 2 artikel karena lumayan panjang. Ini adalah artikel pertama.

# Overview

Seperti yang sudah saya jelaskan pada bagian akhir artikel sebelumnya, kali ini saya akan mengulas beberapa cara dalam menampilkan gambar dengan memperhatikan  _performances_ pada web .

Setiap front-end/fullstack developer memiliki cara yang berbeda-beda dalam meningkatkan _performances_ pada website. Salah satu cara paling umum adalah melakukan _request management_ pada proses _rendering images_. Salah satu teknik yang terkenal ialah _Lazyloading_. Cara yang lain dan cukup populer ialah [_Progressive Image Loading_](https://jmperezperez.com/medium-image-progressive-loading-placeholder), cara ini hampir (r: mirip) dengan yang [Medium](https://medium.com) lakukan. 2 teknik ini secara umum akan meningkatkan performa web secara signifikan. Untuk penjelasan lebih detail di artikel ini, artikel ini akan dibagi menjadi 3 bagian beserta contoh, implementasinya, dan seberapa besar pengaruhnya pada performa website.

# 1. Old ways, STF*, let's rendering all images

Cara pertama dan yang paling banyak masih dilakukan oleh developer terutama pemula, adalah menampilkan seluruh gambar secara langsung dari _server_ ke _client_ browser. Cara yang sangat beresiko, karena jika satu halaman tertentu memiliki banyak gambar dan tidak ada _image management request_ dari sisi _code_, akan seperti apa lama _load web_-nya nanti?

Coba kita perhatikan contoh berikut ini. Saya sudah menyediakan sebuah web yang menampilkan 6 gambar dengan 5 gambar diantaranya beresolusi besar dan lebih dari 1MB Total (10.1 MB). Silahkan buka [blog-without-lazyload.herokuapp.com](https://blog-without-lazyload.herokuapp.com/), matikan cache browser, atau tekan _cmd+shift+R_. 

Sederhanya website ini hanya menampikan 6 gambar, dan informasi seberapa lama waktu yang dibutuhkan untuk proses _load_ seluruh gambar yang ada pada halaman.

```html
<body>
    <h1>DISCLAIMER: All Images from <a href="https://unsplash.com">https://unsplash.com</a> (THANK YOU). FOR Educational
 Purpose Only!</h1>
    <h2>Rendering time: <span style="background-color: red; color: white; padding: 2px 5px;" id="rendering-time"> ... counting (wait until all image fully loaded)</span> </h2>
    <img src="img/photo@1.jpg">
    <img src="img/photo@2.jpg">
    <img src="img/photo@3.jpg">
    <img src="img/photo@4.jpg">
    <img src="img/photo@5.jpg">
    <img src="img/photo@6.jpg">
</body>
```

Untuk menampilkan informasi waktu, saya membuat script JS sederhana untuk melakukan  _time tracking_ pada _event windows.onload_.

```javascript
var timerStart = Date.now();
window.onload = (event) => {
    //eksekusi waktu ketika page telah load seutuhnya
    let loadTime = (Date.now() - timerStart) / 1000;
    document.getElementById("rendering-time").innerHTML = loadTime + 's';
};
```

Hasilnya seperti berikut (Waktu _rendering_ tergantung _device_ dan koneksi):

{{< img src="images/uploads/site-without-lazyload.png" alt="site-without-lazyload" >}}

Proses ini membutuhkan setidaknya **41 detik** untuk menampilkan ke-6 gambar secara utuh. Terlihat pada _network tab DevTools_ bagaimana proses _rendering_ terjadi.

Dengan waktu seperti itu, sangat tidak memungkinkan untuk menerapkannya pada koneksi yang lebih rendah seperti 3G, bukan?. Bagaimana kita mengurangi waktu _onload_ ini? nah, kita gunakan teknik yang disebut **lazyloading**.

# 2. Lazyload, Rendering image based on current visible viewport.

_Lazyload_ adalah teknik yang diperuntukan saat sebuah halaman memiliki banyak _images_. Dengan _Lazyload_, browser hanya akan me-_render_ gambar yang terlihat pada layar kaca device yang kita miliki. Misalnya, contoh diatas ada 6 gambar, dan yang terlihat saat pertama kali _loading web_ adalah 3 gambar. Maka hanya 3 gambar ini yang akan di _request_ oleh _borwser_ ke _server_. 3 gambar lain akan di _request_ ketika kita melakukan _scrolling_ pada web nantinya. Silahkan baca teknik ini [lebih lanjut dari google web dev](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video).

Untuk teknik ini, saya menambahkan script javascript lazyload yang populer di [_github_](https://github.com/tuupola/lazyload). Sesuai dokumentasinya, _code  HTML_ akan menyesuaikan menjadi:

```html
<img class="lazyload" data-src="img/photo@1.jpg" src="img/thumbs/photo@1.jpg">
<img class="lazyload" data-src="img/photo@2.jpg" src="img/thumbs/photo@2.jpg">
<img class="lazyload" data-src="img/photo@3.jpg" src="img/thumbs/photo@3.jpg">
<img class="lazyload" data-src="img/photo@4.jpg" src="img/thumbs/photo@4.jpg">
<img class="lazyload" data-src="img/photo@5.jpg" src="img/thumbs/photo@5.jpg">
<img class="lazyload" data-src="img/photo@6.jpg" src="img/thumbs/photo@6.jpg">
```

Kemudian, kita aktifkan fitur _lazyload_-nya:

```javascript
<script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js"></script>
<script>
    //aktifkan lazyload. semua tag img dengan attr data-src dan class lazyload akan mendapatkan efek lazyload.
    lazyload();
</script>
```

Setelah menerapkan _lazyload_, waktu _rendering_ halaman menurun hingga **\- 25%** menjadi **29.6 detik!** Silahkan buka [blog-without-lazyload.herokuapp.com/lazyload.html](https://blog-without-lazyload.herokuapp.com/lazyload.html), matikan cache browser, atau tekan _cmd+shift+R_ (Waktu _rendering_ tergantung _device_ dan koneksi).

{{< img src="images/uploads/site-with-lazyload.png" alt="site-with-lazyload" >}}

Terlihat pada gambar, _browser_ hanya melakukan _request_ 3 gambar yang muncul dilayar ke _server_. Jika halaman di _scroll_, _browser_ kembali melakukan request 3 gambar sisanya. Teknik _lazyload_ ini pada dasarnya menggunakan [_Intersect Observer API_](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), sebuah teknik _modern web app_ dengan melakukan observasi pada halaman secara _asynchronous_.

Pertanyaannya adalah, apakah teknik ini sudah yang paling baik? apakah ada teknik yang lain untuk mengurangi waktu _rendering page_ lebih baik lagi? Jawabannya ada, teknik itu disebut dengan **Progressive Image Loading**.

# Progressive Image Loading, Medium-like Rendering Image Method

Progressive Image Loading pertama kali diperkenalkan oleh [José M. Pérez](https://jmperezperez.com/medium-image-progressive-loading-placeholder). Teknik ini mirip dengan yang diperkenalkan _facebook_ dengan fitur [_review image_](https://engineering.fb.com/android/the-technology-behind-preview-photos/) pada aplikas android-nya. Singkatnya, teknik ini akan mengganti proses umum _rendering image_ pada halaman kita menjadi 3 step utama:

* **Render div with image & placeholder**. Terdapat sebuah _placeholder_ (_div_) yang didalamnya terdiri dari gambar utama dan gambar pengganti (_placeholder_). Gambar pengganti ialah gambar yang sama dengan gambar utama hanya saja memiliki kualitas kompresi dan juga ukuran yang lebih kecil. Biasanya berukuran sekitar 42px. Pada kasus ini saya menggunakan 2px saja, selain lebih kecil dan hasilnya sama saja, juga sangat mengurangi penggunaan _bandwidth user_.
* **Render placeholder image instead of original-image**. Saat halaman dibuka, _browser_ melakukan _request_ ke _server_ untuk kedua jenis gambar. Sejalan dengan _request original image_ yang lama dan besar, _browser_ akan menampilkan gambar pengganti (_placeholder image_).
* **Once Original Image is loaded, it will shown to the user and placeholder is hidden**. 

Antara proses 2 & 3, _placeholder image_ akan ditampilkan dalam efek _blurring_ hingga gambar asli selesai di _load_ oleh _browser_. Proses mengunduh gambar asli inilah yang disebut dengan _progressive_. Lebih jelasnya silahkan lihat contoh hasil penerapan metode ini di [blog-without-lazyload.herokuapp.com/progressive.html](https://blog-without-lazyload.herokuapp.com/progressive.html), matikan cache browser, atau tekan _cmd+shift+R_ (Waktu _rendering_ tergantung _device_ dan koneksi).

{{< img src="images/uploads/site-with-progressive.png" alt="Site-with-progressive" >}}

_And that's it!_ _Rendering Time_ pada halaman web berkurang dengan sangat drastis. Saya sendiri selalu memilih teknik ini ketimbang _lazyloading_ walau penggunaan _bandwidth user_ akan lebih besar. Kekurangan ini akan diatasi pada teknik selanjutnya.

## How it can be so fast?

_**Actually, it's a tricky method**_. Setiap gambar _placeholder_ memiliki ukuran sebesar 2px dan 20% _quality_ dari gambar asli. Gambar ini dipakai sebagai gambar `sementara` selagi gambar asli sedang diunduh _browser_. Dengan sedikit bantuan **CSS**, proses transisi antara gambar _placeholder_ dan gambar asli dapat dilakukan dengan memanfaatkan transisi _opacity_. 

```css
.placeholder img {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
 
    transition: opacity 1s linear;
}

.placeholder img.loaded {
    opacity: 1;
}
```

Untuk bagian ini, akan saya jelaskan lebih rinci pada artikel kedua. Yang perlu diperhatikan adalah dengan teknik ini, proses _rendering time_ berkurang drastis dari **41 detik** ke hanya **1.9 detik!! -95% DARI PROSES PADA TAHAP PERTAMA!** tanpa mengurangi kualitas dari gambar yang akan ditampilkan. 

Hal-hal yang perlu dicatat untuk di-_optimize_ selanjutnya:

* Total _request_ masih dilakukan secara utuh (10.2 MB) oleh _browser_ meskipun gambar belum tampil pada layar. Dengan menggunakan _Intersect Observer API_, kita akan menerapkan _lazyload_ teknik kedalam teknik ini (_That's why it called Progressive Lazyload Image_).
* Setiap gambar wajib memiliki versi _thumbnail_ yang digunakan sebagai placeholder yang akan di _request_ oleh browser ke _server_. Harapannya, proses ini telah dilakukan oleh _server_ (_server side compressing_). Untuk simulasinya, kita akan menggantinya dengan _client side compressing_ menggunakan _javascript_ terlebih dahulu.  

Source code dari semua contoh diatas, dapat diakses pada [repo github](https://github.com/arhen/image-rendering-tips). _Code_ oleh [Jose](https://jmperezperez.com/medium-image-progressive-loading-placeholder) telah saya modifikasi untuk memenuhi kebutuhan bukan hanya untuk 1 gambar saja, tapi semua gambar yang ditentukan pada halaman.

Sekian artikel kali ini. Hope you enjoy it. Happy Coding! (/¯◡ ‿ ◡)/¯
