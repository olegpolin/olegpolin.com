<script lang="ts">
    import { page } from "$app/state";
</script>

<h1 class="text-4xl font-semibold text-center px-4 pt-32">{page.status}</h1>
<h2 class="text-4xl text-center px-4 pb-32">{page.error?.message}</h2>
