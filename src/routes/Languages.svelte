<script lang="ts">
    import ExpCard from "./ExpCard.svelte";
    import ts from "$lib/assets/languages/ts.svg";
    import html from "$lib/assets/languages/html.svg";
    import css from "$lib/assets/languages/css.svg";
    import js from "$lib/assets/languages/js.svg";
    import py from "$lib/assets/languages/py.svg";
    import java from "$lib/assets/languages/java.svg";
</script>

<div class="grid grid-cols-3 gap-16">
    <ExpCard name="TypeScript" icon={ts} />
    <ExpCard name="HTML" icon={html} />
    <ExpCard name="CSS" icon={css} />
    <ExpCard name="JavaScript" icon={js} />
    <ExpCard name="Python" icon={py} />
    <ExpCard name="Java" icon={java} />
</div>
