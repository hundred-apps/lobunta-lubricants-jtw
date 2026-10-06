<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  strokeWidth?: number
}>(), { size: 24, strokeWidth: 1.6 })

const PATHS: Record<string, string> = {
  shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z',
  truck: 'M3 7h11v9H3zM14 10h4l3 3v3h-7zM7.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  academy: 'M3 9l9-4 9 4-9 4-9-4zM7 11v4c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4',
  target: 'M12 4a8 8 0 100 16 8 8 0 000-16zM12 9a3 3 0 100 6 3 3 0 000-6z',
  engineer: 'M14.5 3.5a4.5 4.5 0 00-4.2 7.5L4 17.4l2.6 2.6 6.4-6.4a4.5 4.5 0 005.9-5.9l-2.4 2.4-2.2-.6-.6-2.2 2.4-2.4z',
  lab: 'M10 3v6L4.5 18a2 2 0 001.7 3h11.6a2 2 0 001.7-3L14 9V3M9 3h6M7.5 14h9',
  delivery: 'M12 3l8 4v10l-8 4-8-4V7l8-4zM4 7l8 4 8-4M12 11v10',
  gear: 'M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1',
  bearing: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z',
  piston: 'M9 3h6v5H9zM7 8h10v4H7zM11 12h2v5h-2zM8 17h8v4H8z',
  factory: 'M3 21V11l6 4V11l6 4V7l6 4v10zM3 21h18',
  gas: 'M12 3s5 4.5 5 8.5a5 5 0 01-10 0c0-2 1-3.5 1-3.5s0 2 2 2 2-2 2-4c0-1 0-3 0-3z',
  heat: 'M12 4a2 2 0 012 2v6a4 4 0 11-4 0V6a2 2 0 012-2zM12 8v4.5',
  compressor: 'M4 8h11v8H4zM15 11h3l2 2v3h-5zM7.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  grease: 'M7 4h10v5a5 5 0 01-10 0V4zM12 14v3M9 20h6M10 17h4',
  phone: 'M6 3h3l2 5-2.5 1.5a12 12 0 005 5L15 12l5 2v3a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  'map-pin': 'M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11zM12 10.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z',
  clock: 'M12 4a8 8 0 100 16 8 8 0 000-16zM12 8v4l3 2',
  sun: 'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14a8 8 0 11-9.5-11 7 7 0 009.5 11z',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 13l4 4L19 7',
  'chevron-down': 'M6 9l6 6 6-6',
  download: 'M12 4v10M8 11l4 4 4-4M5 19h14',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  whatsapp: 'M20 12a8 8 0 01-11.6 7.1L4 20l1-4.4A8 8 0 1120 12zM9 9c0 3 3 6 6 6 .8 0 1.5-.7 1.5-1.5 0-.4-.9-.7-1.3-.7-.3 0-.5.2-.6.5-.7-.3-1.4-.8-2-1.4.6-.6 1-1.3.9-1.8-.1-.4-.4-.6-.8-.6h-.6c-.4 0-.9.5-.9 1.1 0 2.3 2.6 5.2 5.3 5.7.5.1 1.1-.2 1.2-.6z',
  document: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5'
}

const d = computed(() => PATHS[props.name] || PATHS.target)
const px = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    :width="px"
    :height="px"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0"
  >
    <path :d="d" />
  </svg>
</template>