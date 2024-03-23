<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import makeai from "$lib/assets/projects/makeai.webp";
    import gubbus from "$lib/assets/projects/gubbus.svg";
    import SquareArrow from "lucide-svelte/icons/square-arrow-out-up-right";
</script>

<div class="flex flex-col md:flex-row gap-6 md:gap-12">
    <Card.Root class="w-64 flex flex-col items-center">
        <Card.Header>
            <div class="flex gap-2 items-center">
                <img class="size-8" src={makeai} alt="MakeAI logo"/>
                <Card.Title class="text-3xl">MakeAI</Card.Title>
            </div>
        </Card.Header>
        <Card.Content>
            <Card.Description class="text-lg text-center">The all-in-one platform for learning about AI.</Card.Description>
        </Card.Content>
        <Card.Footer>
            <Button href="https://makeai.org" target="_blank" rel="noopener noreferrer">
                Visit
                <SquareArrow class="ml-2 h-4 w-4" />
            </Button>
        </Card.Footer>
    </Card.Root>
    <Card.Root class="w-64 flex flex-col items-center">
        <Card.Header>
            <div class="flex gap-2 items-center">
                <img class="size-8" src={gubbus} alt="Gubbus logo"/>
                <Card.Title class="text-3xl">Gubbus</Card.Title>
            </div>
        </Card.Header>
        <Card.Content>
            <Card.Description class="text-lg text-center">AI-generated entertainment.</Card.Description>
        </Card.Content>
        <Card.Footer>
            <Button href="https://gubbus.com" target="_blank" rel="noopener noreferrer">
                Visit
                <SquareArrow class="ml-2 h-4 w-4" />
            </Button>
        </Card.Footer>
    </Card.Root>
</div>
