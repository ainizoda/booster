import { toast } from "../lib";

export const useCopy = () => {
  const copyTextToClipboard = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    textarea.setSelectionRange(0, 99999); // For mobile device

    try {
      const successful = document.execCommand("copy");
      navigator.clipboard.writeText(text);
      if (!successful) {
        throw "failed to copy text";
      }
    } catch (err) {
      toast(err as string, { error: true });
    }

    document.body.removeChild(textarea);
  };

  return copyTextToClipboard;
};
