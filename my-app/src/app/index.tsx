import { Host, List, Section, Text } from "@expo/ui/swift-ui";
import { deleteDisabled, environment, moveDisabled } from "@expo/ui/swift-ui/modifiers";

const data = [
    { id: "1", title: "Locked", locked: true },
    { id: "2", title: "A", locked: false },
    { id: "3", title: "B", locked: false },
];

const actions = { onMove: () => {}, onDelete: () => {} };

const row = (item: (typeof data)[number]) => (
    <Text
        key={item.id}
        modifiers={[moveDisabled(item.locked), deleteDisabled(item.locked)]}
    >
        {item.title}
    </Text>
);

export default function Index() {
    return (
        <Host style={{ flex: 1 }}>
            <List modifiers={[environment("editMode", "active")]}>
                <Section title="Deprecated: works">
                    <List.ForEach {...actions}>{data.map(row)}</List.ForEach>
                </Section>
                <Section title="Render function: broken">
                    <List.ForEach {...actions} data={data} keyExtractor={(item) => item.id}>
                        {({ item }) => row(item)}
                    </List.ForEach>
                </Section>
            </List>
        </Host>
    );
}
