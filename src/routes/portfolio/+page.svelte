<svelte:head>
	<title>Portfolio - Oleg Polin</title>
	<meta name="description" content="Portfolio - Oleg Polin - Web Development, Cloud Engineering, AI Applications" />
</svelte:head>

<script lang="ts">
    import PortfolioItem from "$lib/components/portfolio/PortfolioItem.svelte";

    import makeai from "$lib/assets/projects/makeai.webp";
    import makeaiScreenshot from "$lib/assets/portfolio/makeai-screenshot.webp"
    import gubbus from "$lib/assets/projects/gubbus.svg";
    import gubbusScreenshot from "$lib/assets/portfolio/gubbus-screenshot.webp";
    import ocelly from "$lib/assets/projects/ocelly.webp";
    import ocellyScreenshot from "$lib/assets/portfolio/ocelly-screenshot.webp";
    import plonai from "$lib/assets/projects/plonai.webp";
    import plonaiScreenshot from "$lib/assets/portfolio/plonai-screenshot.webp";
    import craftedCologne from "$lib/assets/projects/crafted-cologne.webp";
    import craftedCologneScreenshot from "$lib/assets/portfolio/crafted-cologne-screenshot.webp";
    import bilangify from "$lib/assets/projects/bilangify.webp";
    import bilangifyScreenshot from "$lib/assets/portfolio/bilangify-screenshot.webp";
</script>

<div class="mx-auto px-4 md:max-w-[48rem] my-16 flex flex-col items-center gap-16">
    <h1 class="text-3xl text-center font-semibold">Projects:</h1>
    <PortfolioItem 
        name="MakeAI" 
        icon={makeai} 
        description="The all-in-one platform for learning about AI." 
        link="https://makeai.org" 
        screenshot={makeaiScreenshot} 
    />
    <PortfolioItem 
        name="Gubbus" 
        icon={gubbus} 
        description="AI-generated entertainment." 
        link="https://gubbus.com" 
        screenshot={gubbusScreenshot} 
    />
    <PortfolioItem 
        name="Ocelly" 
        icon={ocelly} 
        description="Everything tech. Tutorials, news, deals, and more." 
        link="https://ocelly.com" 
        screenshot={ocellyScreenshot} 
    />
    <PortfolioItem 
        name="PlonAI" 
        icon={plonai} 
        description="A customized version of the Hugging Face Chat UI." 
        link="https://plonai.com" 
        screenshot={plonaiScreenshot} 
    />
    <PortfolioItem 
        name="Crafted Cologne" 
        icon={craftedCologne} 
        description="Carefully crafted cologne." 
        link="https://craftedcologne.com" 
        screenshot={craftedCologneScreenshot} 
    />
    <PortfolioItem 
        name="Bilangify" 
        icon={bilangify} 
        description="A language learning platform for immigrants." 
        link="https://bilangify.com" 
        screenshot={bilangifyScreenshot} 
    />
</div>
