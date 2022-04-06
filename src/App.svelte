<script lang="ts">
  import "remixicon/fonts/remixicon.css";
</script>

<!-- For icon pre-rendering -->
<i class="ri-trophy-line ri-xl invisible absolute top-0 left-0" />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @font-face {
    font-family: "remixicon";
    src: url("chrome-extension://__MSG_@@extension_id__/fonts/remixicon.eot?t=1590207869815"); /* IE9*/
    src: url("chrome-extension://__MSG_@@extension_id__/fonts/remixicon.eot?t=1590207869815#iefix")
        format("embedded-opentype"),
      /* IE6-IE8 */
        url("chrome-extension://__MSG_@@extension_id__/fonts/remixicon.woff2?t=1590207869815")
        format("woff2"),
      url("chrome-extension://__MSG_@@extension_id__/fonts/remixicon.woff?t=1590207869815")
        format("woff"),
      url("chrome-extension://__MSG_@@extension_id__/fonts/remixicon.ttf?t=1590207869815")
        format("truetype"),
      /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url("chrome-extension://__MSG_@@extension_id__/fonts/remixicon.svg?t=1590207869815#remixicon")
        format("svg"); /* iOS 4.1- */
    font-display: swap;
  }
</style>
