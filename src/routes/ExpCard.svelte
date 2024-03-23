<script lang="ts">
    import * as Card from "$lib/components/ui/card";

    export let name: string;
    export let icon: string;
</script>

<Card.Root class="w-32 flex flex-col items-center">
    <Card.Content class="pt-6">
        <img class="h-16" src={icon} alt={name}/>
    </Card.Content>
    <Card.Footer>
        {name}
    </Card.Footer>
</Card.Root>
