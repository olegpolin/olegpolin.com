<script lang="ts">
    export let title: string;
    export let description: string;
    export let link: string;
    export let icon: string;

    let iconSrc = "icons/sites/" + icon + ".png";
    let iconAlt = title + " Icon";
</script>

<div class="flex flex-col md:flex-row items-center gap-4 w-full rounded-lg border-solid border-4 border-primary">
    <div class="basis-1/3"><img class="md:w-32 md:h-32 w-16 h-16 m-8" src = {iconSrc} alt={iconAlt}/></div>
    <div class="basis-2/3">
        <p class="text-center text-4xl pb-2 md:pt-4">{title}</p>
        <p class="text-center py-2 px-8">{description}</p>
        <div class="flex justify-center pt-2 pb-4">
            <a href={link} target="_blank" rel="noopener noreferrer"><button class="mx-auto btn btn-primary">Visit 🔗</button></a>
        </div>
    </div>
</div>
