import { toast } from "../lib";

export const useCopy = () => {
  const copyTextToClipboard = async (text: string) => {
    // text = text.replace("https://", "");
    text = "test"
    try {
      // Use the Clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed"; // Avoid scrolling to the bottom of the page
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.opacity = "0"; // Invisible but still selectable

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (!successful) {
          throw new Error("Failed to copy text");
        }
      }
    } catch (err) {
      toast("Failed to copy text", { error: true });
    }
  };

  return copyTextToClipboard;
};
