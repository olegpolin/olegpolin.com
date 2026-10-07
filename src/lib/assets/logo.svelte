<!--
  The logo is rendered from src/lib/assets/favicon.svg, which is also
  the favicon linked in the root layout. Edit that file to change the
  logo, then rerender it to static/favicon.ico and keep the two in sync.
-->
<script lang="ts">
  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props();
  const clip = $props.id();
</script>

<svg class={className} viewBox="98 98 484 484" aria-hidden="true">
  <defs>
    <clipPath id={clip}><circle cx="340" cy="340" r="230" /></clipPath>
  </defs>
  <g clip-path="url(#{clip})">
    <rect x="110" y="110" width="460" height="460" fill="#FFC53D" />
    <rect x="110" y="416.67" width="460" height="153.33" fill="#E4342B" />
    <line x1="110" y1="416.67" x2="570" y2="416.67" stroke="#111111" stroke-width="24" />
  </g>
  <circle cx="340" cy="340" r="230" fill="none" stroke="#111111" stroke-width="24" />
</svg>
