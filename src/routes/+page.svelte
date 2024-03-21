<script lang="ts">
    import LangCard from "./LangCard.svelte";
    import ts from "$lib/assets/languages/ts.svg";
    import html from "$lib/assets/languages/html.svg";
    import css from "$lib/assets/languages/css.svg";
    import js from "$lib/assets/languages/js.svg";
    import py from "$lib/assets/languages/py.svg";
    import java from "$lib/assets/languages/java.svg";

    let phrases = ["Web Development", "AI Applications", "Cloud Engineering"];
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

<div class="mx-4 md:mx-16 my-16 flex flex-col items-center">
    <h2 class="text-3xl text-center font-semibold border-r-2 border-white w-fit mb-32">
        {#if phrase.length == 0}
            &nbsp;
        {:else}
            {phrase}
        {/if}
    </h2>
    <h3 class="text-2xl text-center font-semibold mb-16">Programming languages:</h3>
    <div class="grid grid-cols-3 gap-16">
        <LangCard language="TypeScript" icon={ts} />
        <LangCard language="HTML" icon={html} />
        <LangCard language="CSS" icon={css} />
        <LangCard language="JavaScript" icon={js} />
        <LangCard language="Python" icon={py} />
        <LangCard language="Java" icon={java} />
    </div>
</div>
