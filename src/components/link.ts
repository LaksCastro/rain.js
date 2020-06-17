export type Link = {
  showLink: (msg: string, link: string) => void;
  hideLink: () => void;
};

export default function Link(): Link {
  function getNode(): HTMLLinkElement {
    return document.querySelector(".success-link");
  }

  function showLink(msg: string, link: string): void {
    const node = getNode();

    node.style.display = "inline";
    node.href = link;
    node.textContent = msg;
  }

  function hideLink(): void {
    const node = getNode();

    node.style.display = "none";
    node.href = "#";
    node.textContent = "";
  }

  const self: Link = {
    showLink,
    hideLink,
  };

  return Object.freeze(self);
}
