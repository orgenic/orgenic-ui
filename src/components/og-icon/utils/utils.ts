interface IRequestMap {
  [url: string]: Promise<string> | string;
}

export class IconUtils {
  private static instance: IconUtils;
  private requests: IRequestMap = {};

  private constructor() { }

  public static getInstance(): IconUtils {
    if (!IconUtils.instance) {
      IconUtils.instance = new IconUtils();
    }
    return IconUtils.instance;
  }

  public async getIconSrc(url?: string): Promise<string> {
    const fetchUrl = url || '/orgenic-ui-assets/icons.svg';

    if (!this.requests[fetchUrl]) {
      this.requests[fetchUrl] = new Promise(async (resolve, reject) => {
        const response = await fetch(fetchUrl, {mode: 'no-cors'});
        if (!response) reject('no response');
        const data = await response.blob();
        if (!data) reject('no data');

        resolve(URL.createObjectURL(data));
      });
    }

    return await this.requests[fetchUrl];
  }
}
