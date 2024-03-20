<script lang="ts">
    import { Button } from "$lib/components/ui/button";
</script>

<header class="flex flex-row justify-between p-6">
    <div class="basis-1/4">
        <a class="text-2xl font-semibold" href="/">Oleg Polin</a>
    </div>
    <nav class="basis-1/2">
        <ul class="flex flex-row justify-center gap-4">
            <li>
                <Button class="text-lg" variant="ghost" href="/">Home</Button>
            </li>
            <li>
                <Button class="text-lg" variant="ghost" href="/portfolio">Portfolio</Button>
            </li>
            <li>
                <Button class="text-lg" variant="ghost" href="/about">About</Button>
            </li>
        </ul>
    </nav>
    <div class="basis-1/4">
        
    </div>
</header>
