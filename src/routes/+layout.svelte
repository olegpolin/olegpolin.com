<script lang="ts">
    import "../app.css";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<Header />

{@render children?.()}

<Footer />
