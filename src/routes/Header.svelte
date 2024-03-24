<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Sheet from "$lib/components/ui/sheet";

    import Menu from "lucide-svelte/icons/menu";
</script>

<header class="flex flex-row justify-between items-center p-6">
    <div class="md:basis-1/4">
        <a class="text-2xl font-semibold" href="/">Oleg Polin</a>
    </div>
    <nav class="max-md:hidden basis-1/2">
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
    <div class="md:basis-1/4">
        <div class="md:hidden">
            <Sheet.Root>
                <Sheet.Trigger aria-label="Menu">
                    <Menu />
                </Sheet.Trigger>
                <Sheet.Content>
                    <nav class="h-full">
                        <ul class="flex flex-col h-full justify-center items-center gap-8">
                            <li class="w-full">
                                <Sheet.Close asChild let:builder>
                                    <Button builders={[builder]} class="text-lg w-full" variant="ghost" href="/">Home</Button>
                                </Sheet.Close>
                            </li>
                            <li class="w-full">
                                <Sheet.Close asChild let:builder>
                                    <Button builders={[builder]} class="text-lg w-full" variant="ghost" href="/portfolio">Portfolio</Button>
                                </Sheet.Close>
                            </li>
                            <li class="w-full">
                                <Sheet.Close asChild let:builder>
                                    <Button builders={[builder]} class="text-lg w-full" variant="ghost" href="/about">About</Button>
                                </Sheet.Close>
                            </li>
                        </ul>
                    </nav>
                </Sheet.Content>
            </Sheet.Root>
        </div>
    </div>
</header>
