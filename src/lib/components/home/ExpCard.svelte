<script lang="ts">
    import * as Card from "$lib/components/ui/card";

    interface Props {
        name: string;
        icon: string;
    }

    let { name, icon }: Props = $props();
</script>

<Card.Root class="w-32 flex flex-col items-center">
    <Card.Content class="pt-6">
        <img class="h-16" src={icon} alt={name}/>
    </Card.Content>
    <Card.Footer class="text-center">
        {name}
    </Card.Footer>
</Card.Root>
