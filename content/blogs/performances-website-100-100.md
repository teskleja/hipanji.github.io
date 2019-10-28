---
title: Little Tips to Gain 100/100 on Lighthouse
description: >-
  Figuring out some best approach to make web fully max-performances (based on
  real case)
date: 2019-10-27T15:43:27.760Z
tags:
  - Performances
  - Javascript
  - CSS
  - PWA
---
![arhen.dev performances](/images/uploads/wow.png "https://arhen.dev performances")

# Overview

My current [website](https://arhen.dev) has got 100/100 performances on lighthouse today. If you don't know about lighthouse, that is plugin from Google Chrome that reviewing a website and show performances result based on some categories. You can try it with enable that plugin from Chrome web store.

## How I Can Do That

So basically, this website is running on top of minimalist css/js and some font that I've used for blog (Noto-Sans, It's GREAT FTW). Based on that, actually this website is fast enough to render on client browser. But, When I try to review again about my website performances, I got some issues especially on performances section. This is what I did:

* Remove Jquery dependencies

For some reason, there are some javascript function that still using jquery. So, I rewrite that function using pure javascript.

* Add preload

What I did here is put preload attribute to my CSS asset. This is the most known issues about critical asset rendering on website. Read more about it [here](https://web.dev/preload-critical-assets). Example:

```html
<link rel="preload" href="{{ .Site.BaseURL }}css/monosocialiconsfont.css" as="style" onload="this.onload=null; this.rel='stylesheet'">
```

* Add font-face css.

since I've used MonoSocialIcon font, I have to make sure that if the fonts not load correctly, the display of the section that use the font still show something to user. In this case, My social button in this website:

![social button](/images/uploads/social-button.png "social button")

```css
@font-face {
	font-family: 'Mono Social Icons Font';
	src: url('/fonts/MonoSocialIconsFont-1.10.eot');
	src: url('/fonts/MonoSocialIconsFont-1.10.eot?#iefix') format('embedded-opentype'),
	url('/fonts/MonoSocialIconsFont-1.10.woff') format('woff'),
	url('/fonts/MonoSocialIconsFont-1.10.ttf') format('truetype'),
	url('/fonts/MonoSocialIconsFont-1.10.svg#MonoSocialIconsFont') format('svg');
	src: url('/fonts/MonoSocialIconsFont-1.10.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
    font-display: swap;
}
```

The main line here is `font-display: swap;`. My website will render font-system when MonoIconFont not load yet! You can read more [here](https://developers.google.com/web/updates/2016/02/font-display)

* Using preconnect.

and then, since I'm using font API from google, , it will make a request to Font Google API server. This is happened every single time when my website is loaded. This is will affect my performance because when client connection drop, it will make some blocking request (you can see on Network Tab in  Google chrome DevTools). Good news, chrome give us some trick and tips to avoid this. It called [preconnect](https://web.dev/uses-rel-preconnect). In short, it let the browser know that the page intends to connect to `example.com` and retrieve content from there in early connections of client request and tell it to process as soon as possible. Example:

```html
<link href="https://fonts.googleapis.com" rel="preconnect" crossorigin="crossorigin">
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="crossorigin">
<link href="https://www.google-analytics.com" rel="preconnect" crossorigin="crossorigin">
<link href="https://maxcdn.bootstrapcdn.com" rel="preconnect" crossorigin="crossorigin">
```

## What I Can Do Next

To improve performances, there are some another tips from google like _Progressive Web Apps_ (PWA), Using _LazyLoad_ for Image, etc. I'll try to add it to this website later!

Thanks for read my post. Hope you enjoy it and Happy coding!
