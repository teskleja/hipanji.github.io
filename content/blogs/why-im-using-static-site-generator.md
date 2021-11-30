+++
title = "Why I'm using Static Site Generator?"
description = "People always asked me why use SSG instead of wordpress/medium,etc (Indonesia)"
date= "2019-04-26T09:38:53.648Z"
tags = [
    "SSG",
    "Wordpress",
    "Website",
]
+++

Sejak ada keinginan untuk membuat website sendiri, saya sudah merancang dari jauh-jauh hari bahwasanya website pribadi yang nanti akan saya buat akan sepenuhnya blog yang berisi tulisan tulisan yang mungkin tidak bisa saya sampaikan atau cerita di dunia nyata.

# Using Wordpress is a good idea

Awalnya saya berencana untuk memakai Wordpress sebagai _Tech-Stack_ dibalik website yang akan saya buat. Hal ini lantaran wordpress yang bersifat open source dan sudah populer karena keramahannya dalam interaksi antar muka. Saya semakin yakin ketika beberapa hari yang lalu membaca artikel mengenai [Why Use Wordpress](https://kinsta.com/blog/why-use-wordpress/).

## Good stuff

Wordpress mempunyai keunggulan yang sangat banyak dalam hal manajemen website. Tak terpungkiri bahwa Wordpress merupakan CMS yang paling populer saat ini.

{{< img src="images/uploads/wp.png" alt="Stats about CMS market share" >}}

Proses instalasi wordpress yang mudah dan support penuh terhadap SEO membuat CMS ini menjadi pilihan utama hampir setiap orang yang ingin memiliki website/blog pribadi.

## Why I'm not using it

Terlepas dari kelebihan dan kepopuleran Wordpress, ada beberapa pertimbangan kenapa saya akhirnya tidak melabuhkan pilihan saya pada CMS ini:

* **Kecepatan**: Wordpress menggunakan PHP sebagai bahasa pemrogramannya. Untuk sebuah blog yang hanya berisi tulisan-tulisan (terutama blog yang akan saya buat), wordpress terlalu berlebihan untuk itu. Bundle nya yang lumayan besar ukurannya (lebih dari 10 MB) belum termasuk tema atau konten yang akan dibuat, akan sangat mempengaruhi kecepatan dan cukup menambah _space_ di hostingan kita.
* **Kompleksitas:** Saya tidak berbicara mengenai instalasi atau cara penggunaan. Tapi kompleksitas dari wordpress itu sendiri. Sehingga membutuhkan pengetahuan khusus jika ingin mengubah core dari wordpress.
* **Keamanan:** Saya rasa, dari semua poin diatas, kebanyakan orang akan setuju dengan poin satu ini. Karena kepopulerannya, wordpress merupakan CMS yang paling sering diincar dan ditemukan celah keamanannya. Dan poin ini yang membuat saya benar-benar tidak memakainya.

# Why not using Medium?

Untuk teman-teman yang belum tahu medium, silahkan kunjungi situs [medium](https://medium.com) untuk mencobanya.
Medium saat ini cukup terkenal sebagai wadah untuk menulis di dunia maya. Platform medium menyediakan banyak kelebihan yang tidak ditemukan di platform sejenis yang lain.

Tapi, satu hal yang membuat saya tidak memakai medium adalah karena prinsip. Saya tidak suka tulisan saya  berada diplatform pihak ketiga yang sewaktu-waktu bisa berubah kebijakannya atau tiba-tiba hilang?. Kontrol terhadap apa yang saya tulis disana suatu saat bisa terancam dan dieksploitasi. Selagi saya bisa buat sendiri, yah kenapa tidak.

# Why using SSG?

Static Site Generator (SSG) saat ini sedang populer. Selain karena kemudahannya, SSG memberikan kecepatan maksimum untuk website yang akan kita buat. Website yang ditampilkan akan di _generate_ seluruhnya sebagai html tanpa embel-embel bahasa pemrograman. Untuk _section_ ini akan saya jelaskan diartikel selanjutnya, sekaligus kenapa saya memilih [Hugo](https://gohugo.io) ketimbang jenis SSG yang lain.
