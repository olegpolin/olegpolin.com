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
    import afind from "$lib/assets/projects/afind.webp";
    import afindScreenshot from "$lib/assets/portfolio/afind-screenshot.webp";
    import superai from "$lib/assets/projects/superai.webp";
    import superaiScreenshot from "$lib/assets/portfolio/superai-screenshot.webp";
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
        name="Afind" 
        icon={afind} 
        description="A landing page for an AI startup." 
        link="https://afind.ai" 
        screenshot={afindScreenshot} 
    />
    <PortfolioItem 
        name="SuperAI" 
        icon={superai} 
        description="A hackathon project - an AI aggregator." 
        link="https://superai.pages.dev" 
        screenshot={superaiScreenshot} 
    />
</div>
