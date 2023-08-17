<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="flex justify-center">
    <h1 class="text-4xl mt-32 mb-8">Error {$page.status}: Page {$page.error?.message}</h1>
</div>

<div class="flex justify-center mb-32">
    <a href="/"><button class="btn btn-primary">Return Home</button></a>
</div>
