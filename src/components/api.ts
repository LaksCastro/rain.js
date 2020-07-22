import parseLinkHeader from "parse-link-header";

type Repo = {
  url: string;
  name: string;
};

export type API = {
  isValidUser: () => Promise<boolean>;
  getStarsCount: () => Promise<number>;
  getRepoFromIndex: (index: number) => Promise<Repo>;
};

export default function Api(username: string): API {
  const baseURL = "https://api.github.com/users/";

  async function isValidUser(): Promise<boolean> {
    const response = await fetch(baseURL + username);

    return response.status === 200;
  }

  async function getStarsCount(): Promise<number> {
    try {
      const response = await fetch(baseURL + username + "/starred?per_page=1");

      let link = new Map(response.headers.entries()).get("link");

      const {
        last: { page: starsCount },
      } = parseLinkHeader(link);

      return starsCount;
    } catch (e) {
      return 0;
    }
  }

  async function getRepoFromIndex(index: number): Promise<Repo> {
    index++;

    const response = await fetch(
      baseURL + username + "/starred?per_page=1&page=" + index
    );

    const [{ html_url: url, name }] = await response.json();

    const repo: Repo = {
      url,
      name,
    };

    return repo;
  }

  const self: API = {
    isValidUser,
    getStarsCount,
    getRepoFromIndex,
  };

  return Object.freeze(self);
}
