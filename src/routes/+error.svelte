<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1 class="text-3xl text-center font-semibold mt-32 mx-auto px-6">{$page.status}</h1>
<h2 class="text-3xl text-center font-semibold mb-96 mx-auto px-6">{$page.error?.message}</h2>
