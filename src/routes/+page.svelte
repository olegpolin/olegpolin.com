<svelte:head>
	<title>Oleg Polin</title>
	<meta name="description" content="Oleg Polin - Web Development, Cloud Engineering, AI Applications" />
</svelte:head>

<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import TopProjects from "$lib/components/home/TopProjects.svelte";
    import Frameworks from "$lib/components/home/Frameworks.svelte";
    import Languages from "$lib/components/home/Languages.svelte";

    let phrases = ["Web Development", "AI Applications", "Cloud Engineering"];
    let phrase = $state("");
    let currentPhrase = 0;
    let currentChar = 0;
    let forward = true;
    async function typing(){
        if (forward) {
            if (currentChar < phrases[currentPhrase].length) {
                phrase += phrases[currentPhrase].charAt(currentChar);
                currentChar++;
                setTimeout(typing, 100);
            } else {
                forward = false;
                setTimeout(typing, 1000);
            };
        } else {
            if (currentChar >= 0) {
                phrase = phrase.substring(0, phrase.length-1);
                currentChar--;
                setTimeout(typing, 75);
            } else {
                phrase = "";
                currentPhrase ++;
                currentPhrase = currentPhrase % 3;
                forward = true;
                setTimeout(typing, 1000);
            };
        };
    };
    typing();
</script>

<div class="mx-auto px-4 md:max-w-[48rem] my-16 flex flex-col items-center gap-6">
    <h2 class="text-3xl text-center font-semibold border-r-2 border-white w-fit mb-12">
        {#if phrase.length == 0}
            &nbsp;
        {:else}
            {phrase}
        {/if}
    </h2>
    <p class="text-lg text-center mb-6">I turn ideas into code. I am a passionate full-stack web developer who creates stunning and functional websites and web applications. My goal is to make the web a better place by crafting user-friendly and innovative digital experiences.</p>
    <div class="flex flex-col items-center gap-6 border rounded-lg w-full p-6">
        <h3 class="text-2xl text-center font-semibold">Projects I've worked on:</h3>
        <TopProjects />
        <Button href="/portfolio">View Full Portfolio</Button>
    </div>
    <h3 class="text-2xl text-center font-semibold mt-6">Pixel-perfect frontend, precision-driven backend, agile full-stack.</h3>
    <p class="text-lg text-center">I prioritize speed, accessibility, and user experience.</p>
    <div class="w-full">
        <Frameworks />
        <Separator class="mx-auto h-16" orientation="vertical" />
        <Languages />
    </div>
</div>
