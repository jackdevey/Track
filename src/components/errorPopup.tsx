import { Button, Text, Title } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";

/**
 * Show an error popup modal
 * @param type The type of error
 * @param title A friendly short description of the error
 * @param resolveMessage Tips on how to resolve the error
 */

export default function showErrorPopup(type: string, title: string, resolveMessage: string) {
    openModal({
        modalId: `error.${type}`,
        title: type,
        centered: true,
        children: (
            <>
                <Title order={3}>{title}</Title>
                <Text>{resolveMessage}</Text>
                <Button fullWidth onClick={() => closeModal(`error.${type}`)} mt="md">
                    Close
                </Button>
            </>
        )
    });
}