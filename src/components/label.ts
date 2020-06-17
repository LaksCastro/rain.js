export type Label = {
  showError: (msg: string) => void;
  hideError: () => void;
};

export default function Label(): Label {
  function getNode(): HTMLElement {
    return document.querySelector(".error-label");
  }

  function showError(msg: string): void {
    const node = getNode();

    node.style.display = "inline";
    node.textContent = msg;
  }

  function hideError(): void {
    const node = getNode();

    node.style.display = "none";
    node.textContent = "";
  }

  const self: Label = {
    showError,
    hideError,
  };

  return Object.freeze(self);
}
