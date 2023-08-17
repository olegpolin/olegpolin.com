<script>
    import '../app.css';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte'
</script>

<Header />

<div class="bg-gradient-to-b from-[#00152e] to-[#2e2200]">
    <slot />

    <Footer />
</div>
