<script>
    import PortfolioItem from "$lib/components/PortfolioItem.svelte";
</script>

<div class="flex md:justify-start justify-center">
    <h1 class="text-3xl md:mx-40 mt-16 mb-6">Portfolio:</h1>
</div>

<div class="flex flex-col jusitfy-center gap-16 mb-32 mx-8 md:mx-40">
    <PortfolioItem 
        title = "MakeAI"
        description = "The all-in-one platform for learning about AI."
        link = "https://makeai.org"
        icon = "makeai"
    />
    <PortfolioItem 
        title = "Gubbus"
        description = "AI-generated memes"
        link = "https://gubbus.com"
        icon = "gubbus"
    />
    <PortfolioItem 
        title = "Ocelly"
        description = "Everything tech. Tutorials, news, deals, and more."
        link = "https://ocelly.com"
        icon = "ocelly"
    />
</div>
