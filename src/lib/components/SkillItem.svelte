<script lang="ts">
    export let title: string;
    export let icon: string;

    let iconSrc = "icons/exp/" + icon + ".svg";
    let iconAlt = title + " Icon";
</script>

<div class="flex flex-row items-center gap-8 w-full rounded-lg border-solid border-4 border-primary">
    <div class="basis-1/3"><img class="p-6" src = {iconSrc} alt = {iconAlt}/></div>
    <div class="flex items-center basis 2/3"><p class="text-2xl p-6">{title}</p></div>
</div>
