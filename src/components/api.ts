import parseLinkHeader from "parse-link-header";

export type API = {
  isValidUser: () => Promise<boolean>;
  getStarsCount: () => Promise<number>;
  getRepoURLFromIndex: (index: number) => Promise<string>;
};

export default function Api(username: string) {
  const baseURL = "https://api.github.com/users/";

  async function isValidUser(): Promise<boolean> {
    const response = await fetch(baseURL + username);

    return response.status === 200;
  }

  async function getStarsCount(): Promise<number> {
    const response = await fetch(baseURL + username + "/starred?per_page=1");

    let link = new Map(response.headers.entries()).get("link");

    const {
      last: { page: starsCount },
    } = parseLinkHeader(link);

    return starsCount;
  }

  async function getRepoURLFromIndex(index: number): Promise<string> {
    index++;

    const response = await fetch(
      baseURL + username + "/starred?per_page=1&page=" + index
    );

    const [{ html_url: url }] = await response.json();

    return url;
  }

  const self: API = {
    isValidUser,
    getStarsCount,
    getRepoURLFromIndex,
  };

  return Object.freeze(self);
}
