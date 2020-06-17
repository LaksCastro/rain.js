export type Loader = {
  show: () => void;
  hide: () => void;
};

export default function Loader(): Loader {
  function getNode(): HTMLElement {
    return document.querySelector(".loader");
  }

  function show(): void {
    const node = getNode();

    node.classList.add("loader--loading");
    node.classList.remove("loader--static");
  }

  function hide(): void {
    const node = getNode();

    node.classList.add("loader--static");
    node.classList.remove("loader--loading");
  }

  const self: Loader = {
    show,
    hide,
  };

  return Object.freeze(self);
}
