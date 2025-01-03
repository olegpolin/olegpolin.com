<script lang="ts">
    import "../app.css";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";

    let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
    <Header />

    <main class="grow">
        {@render children()}
    </main>

    <Footer />
</div>
