<svelte:head>
    <title>Oleg Polin</title>
    <meta name="description" content="Oleg Polin - Web Developer. Cloud Engineer. Photographer." />
</svelte:head>

<script>
    import PortfolioItemSmall from "$lib/components/PortfolioItemSmall.svelte";
    import SkillItem from "$lib/components/SkillItem.svelte";

    let phrases = ["Web Development", "Photography", "Cloud Engineering"];
    let phrase = "";
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
            }
        } else {
            if (currentChar >= 0) {
                phrase = phrase.substring(0, phrase.length-1);
                currentChar--;
                setTimeout(typing, 75);
            } else {
                phrase = " ";
                currentPhrase ++;
                currentPhrase = currentPhrase % 3;
                forward = true;
                setTimeout(typing, 1000);
            }
        }
    }

    typing();
</script>

<br>
<div class="flex justify-center h-9 md:h-12 m-8">
    <p class="text-3xl md:text-4xl font-bold border-solid border-r-2 border-white">{phrase}</p>
</div>

<div class = "flex justify-center mt-16 mb-8">
    <p class="text-2xl">Experience:</p>
</div>

<div class="grid
            grid-rows-3 grid-cols-1 
            md:grid-rows-2 md:grid-cols-2 
            lg:grid-rows-1 lg:grid-cols-3 
            gap-4 mx-8 md:mx-16 lg:mx-32"
>
    <SkillItem 
        title = "Svelte / SvelteKit"
        icon = "svelte"
    />
    <SkillItem 
        title = "AWS"
        icon = "amazon"
    />
    <SkillItem 
        title = "GCP"
        icon = "google"
    />
</div>

<div class="flex justify-center mt-16 mb-8">
    <p class="text-2xl">Top websites: </p>
</div>

<div class="flex flex-col md:flex-row jusitfy-center gap-8 my-8 mx-8 md:mx-16 lg:mx-32">
    <PortfolioItemSmall 
        title = "MakeAI"
        link = "https://makeai.org"
        icon = "makeai"
    />
    <PortfolioItemSmall 
        title = "Gubbus"
        link = "https://gubbus.com"
        icon = "gubbus"
    />
</div>

<div class="flex justify-center">
    <a href="/portfolio"><button class="btn btn-secondary btn-lg border-solid border-4 border-primary">View full portfolio</button></a>
</div>
