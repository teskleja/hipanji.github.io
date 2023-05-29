---
title: CSS Principles
description: An exploration into CSS principles
date: 2023-05-21T16:11:08.123Z
tags:
  - programming
---

In a recent [tweet conversation](https://twitter.com/wesbos/status/1661029788260212739?s=20) in a surprising turn, more than half of the respondents guessed incorrectly about

> "What color is 'Hello World!'?"

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">Without cheating - what color is the &lt;p&gt; tag&#39;s text?<br><br>&lt;p class=&quot;hello&quot;&gt;Hello&lt;/p&gt;<br>&lt;style&gt;<br> body { color: red; }<br> p { color: green; }<br> .hello { color: unset; }<br>&lt;/style&gt;</p>&mdash; Wes Bos (@wesbos) <a href="https://twitter.com/wesbos/status/1661029788260212739?ref_src=twsrc%5Etfw">May 23, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This sheds light on a wider issue: the `unset` keyword in CSS styling is not widely understood or used. The `unset` keyword can be used in CSS to make a property inherit its value from its parent element, or to revert to its initial value if it doesn't inherit one.

The use of the `unset` keyword was a common approach in the early days of CSS, especially when styling elements without the aid of current CSS utility frameworks such as Tailwind or Bootstrap.

In the context of these modern frameworks, it's more typical to override or reset the style directly by assigning new values. This method provides web developers with more granular control over each element's appearance.

```html
/* ... prevs styles */
<body>
  <span>
    // overide the color of element using new value
    <p class="welcome" style="color: green">Hello World!</p>
  </span>
</body>
```

However, using `unset` can lead to more consistent behaviour across different elements, as it avoids the need to define any constant value again. It appears that many developers overlooked the basic CSS principle of inheritance, which can provide a lot of power and flexibility when used effectively. However, the caveat is that using `unset` in reusable components in modern development can lead to reduced readability and increased complexity.

```html
<style>
    .container { font-size: 20px; }
    .special { font-size: 24px; }
</style>

<div class="container">
    <p>This is some text in the container.</p>
    <p class="special">This is some special text.</p>
    <div>
        <p>This is nested text.</p>
    </div>
</div>
```

## Inheritance, Specificity, and the Box Model

Understanding basic CSS principles like inheritance, specificity, and the box model is essential. These concepts are crucial for applying styles, resolving conflicts, and rendering elements on web pages. Since we already discussed inheritance, let's look at the specificity and box model.

Let's break down others principles:

### Specificity

Specificity is a weight that is applied to a given CSS declaration, influenced by the number of each selector type in the matching selector. When multiple declarations have equal specificity, the last declaration found in the CSS is applied to the element. Specificity only applies when the same element is targeted, inheritance is a separate process. For example:

```css
#content h1 {
    color: blue;
}

h1 {
    color: red;
}
```

In this case, if there's an `h1` inside an element with the id content, it will be blue, not red, because the first selector is more specific.

```html
<div id="content">
    <h1>Heading</h1>
</div>
```

### Box Model

The CSS box model is essentially a box that wraps around HTML elements, and it consists of: margins, borders, padding, and the actual content. For example, when you set the width and height of an element, you're setting the width and height of the content area. To calculate the full size of an element, you also need to add padding, borders and margins.

```css
div {
    width: 300px;
    padding: 10px;
    border: 5px solid black;
    margin: 20px;
}
```

Here, the actual space the `div` takes up is more than 300px due to the padding, border, and margin. The total width of the element is 370px. So simple yet some people still get it wrong.

## Conslusion

Despite these challenges, it remains beneficial to have an understanding of the basic principles of CSS. Grasping foundational CSS principles like inheritance, specificity, and the box model is crucial. These concepts play a significant role in applying styles, resolving style conflicts, and rendering elements on web pages. A good understanding of these principles can greatly improve a developer's efficiency and the quality of their work.