// method for React components which azure devops is using to update input's value - they are subscribe on `input` change (via InputEvent).
export const triggerInputChange = (node: HTMLTextAreaElement | HTMLInputElement, value = '') => {
    if (node.value == value) {
        console.info("Skipped emitting of input change event because incoming value is the same as before");
        return;
    }
    const event = new Event('input', { bubbles: true });
    node.value = value;
    node.dispatchEvent(event);
};