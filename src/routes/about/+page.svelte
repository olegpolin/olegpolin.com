<svelte:head>
	<title>About - Oleg Polin</title>
	<meta name="description" content="About - Oleg Polin - Web Development, Cloud Engineering, AI Applications" />
</svelte:head>

<script lang="ts">
    import { Button } from "$lib/components/ui/button";

    import Mail from "lucide-svelte/icons/mail";
    import x from "$lib/assets/about/x.svg";
</script>

<div class="mx-auto px-4 md:max-w-[48rem] my-16 flex flex-col items-center gap-16">
    <h1 class="text-3xl text-center font-semibold">About</h1>
    <p class="text-center">I am passionate about the world of technology. I've always been fascinated by how the internet can connect people all around the world, and provide instant access to high-quality applications in a matter of milliseconds.</p>
    <div class="flex flex-col items-center gap-6 border rounded-lg max-w-96 p-6">
        <p class="text-lg text-center">I am open to working on web projects!</p>
        <p class="text-muted-foreground">Contact me:</p>
        <Button href="mailto:hello@olegpolin.com">
            <Mail class="mr-2 h-4 w-4" />
            Email
        </Button>
        <Button variant="secondary" href="https://twitter.com/olegpolin" target="_blank" rel="noopener noreferrer">
            <img class="mr-2 h-4 w-4" src={x} alt = "X" />
            Message
        </Button>
    </div>
</div>
