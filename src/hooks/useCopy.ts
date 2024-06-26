import { useCallback } from "react";
import { toast } from "../lib";

export const useCopy = () => {
  const isSafari = () => navigator.userAgent.match(/ipad|iphone|Mac OS/i);
  const copyTextToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);

      let range, selection: Selection | null;
      textarea.focus();

      if (isSafari()) {
        range = document.createRange();
        range.selectNodeContents(textarea);
        selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        textarea.setSelectionRange(0, 999999);
      } else {
        textarea.select();
      }

      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (!successful) {
        throw new Error("Failed to copy text");
      }
    } catch (err) {
      alert(err?.toString());
      toast("Failed to copy text", { error: true });
    }
  }, []);

  return copyTextToClipboard;
};
