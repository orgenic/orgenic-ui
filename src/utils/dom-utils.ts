async function getElement(element: Element, selector: string, timeout: number): Promise<Element> {
  const timeoutFn = async ms => new Promise(resolve => setTimeout(resolve, ms));
  let time = 0;

  let result = element.querySelector(selector);

  while (!result && time < timeout) {
    time += 25;
    await timeoutFn(25);
    result = element.querySelector(selector);
  }

  return result;
}

export {
  getElement
};
