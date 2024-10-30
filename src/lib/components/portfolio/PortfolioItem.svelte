<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import SquareArrow from "lucide-svelte/icons/square-arrow-out-up-right";

    interface Props {
        name: string;
        icon: string;
        description: string;
        link: string;
        screenshot: string;
    }

    let {
        name,
        icon,
        description,
        link,
        screenshot
    }: Props = $props();
</script>

<Card.Root class="flex flex-col md:flex-row items-center gap-16 p-6 md:p-16">
    <div class="md:basis-1/2">
        <Card.Header class="p-0 mb-6">
            <div class="flex gap-2 items-center mb-6">
                <img class="size-8" src={icon} alt={name + " Logo"}/>
                <Card.Title class="text-3xl">{name}</Card.Title>
            </div>
            <Card.Description>{description}</Card.Description>
        </Card.Header>
        <Card.Footer class="p-0">
            <Button class="w-full" href={link} target="_blank" rel="noopener noreferrer">
                Visit
                <SquareArrow class="ml-2 h-4 w-4" />
            </Button>
        </Card.Footer>
    </div>
    <div class="md:basis-1/2">
        <Card.Content class="p-0">
            <img src={screenshot} alt={name + " Screenshot"}>
        </Card.Content>
    </div>
</Card.Root>
