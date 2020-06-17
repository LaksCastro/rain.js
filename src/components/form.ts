import Api from "./api";
import Loader from "./loader";
import Label from "./label";
import Link from "./link";
import Utils from "./utils";

export type Form = {
  start: () => void;
};

export default function Form(): Form {
  const loader = Loader();
  const label = Label();
  const link = Link();
  const utils = Utils();

  function getNode(): HTMLFormElement {
    return document.querySelector(".form__wrapper");
  }

  function getInputNode(): HTMLInputElement {
    return document.querySelector(".form__input");
  }

  function getUsername(): string {
    const node = getInputNode();

    return node.value;
  }

  async function onSubmit() {
    const username = getUsername();

    loader.show();

    try {
      const api = Api(username);

      if (!(await api.isValidUser())) {
        label.showError("Invalid username :(");
      } else {
        label.hideError();

        const starsCount = await api.getStarsCount();

        if (starsCount === 0)
          return label.showError("This user not have starred repositories :(");

        const index = utils.randomInt(0, starsCount - 1);

        const { name, url } = await api.getRepoFromIndex(index);

        console.log(name + ": " + url);

        link.showLink(name, url);
      }
    } catch (e) {
      label.showError("Ops, something wrong, reload the page");
    } finally {
      loader.hide();
    }
  }

  function start(): void {
    const node = getNode();

    node.addEventListener("submit", function (e: Event) {
      e.preventDefault();
      onSubmit();
    });
  }

  const self: Form = {
    start,
  };

  return Object.freeze(self);
}
