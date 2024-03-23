<script lang="ts">
    import ExpCard from "$lib/components/home/ExpCard.svelte";
    import svelte from "$lib/assets/frameworks/svelte.svg";
    import tailwind from "$lib/assets/frameworks/tailwind.svg";
    import supabase from "$lib/assets/frameworks/supabase.svg";
    import aws from "$lib/assets/frameworks/aws.svg";
    import gcp from "$lib/assets/frameworks/gcp.svg";
</script>

<div class="flex flex-col items-center gap-16 w-full border rounded-lg px-4 py-12">
    <h3 class="text-2xl text-center font-semibold">Frameworks and platforms:</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
        <ExpCard name="Svelte" icon={svelte} />
        <ExpCard name="SvelteKit" icon={svelte} />
        <ExpCard name="Tailwind" icon={tailwind} />
        <ExpCard name="Supabase" icon={supabase} />
        <ExpCard name="AWS" icon={aws} />
        <ExpCard name="GCP" icon={gcp} />
    </div>
</div>
