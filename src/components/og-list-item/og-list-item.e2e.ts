import { newE2EPage, E2EPage, E2EElement } from "@stencil/core/testing";

describe("og-list", () => {
  let page: E2EPage;
  let component: E2EElement;
  const item = { key: "1", label: "V1", value: 23 };

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent("<og-list-item></og-list-item>");
    component = await page.find("og-list-item");
    component.setProperty("label", item.label);
    component.setProperty("value", item.value);
  });

  it("should render label correctly", async () => {
    await page.waitForChanges();
    const labels: E2EElement[] = await page.findAll(
      "og-list-item >>> .og-list-item__label"
    );
    expect(labels[0].textContent).toEqual(`V1`);
  });

  it("should empty image container although property does not exist", async () => {
    component.setProperty("showImage", true);
    await page.waitForChanges();
    const icons: E2EElement[] = await page.findAll(
      "og-list-item >>> .og-list-item__icon"
    );
    expect(icons.length).toEqual(1);
  });

  it("should render value correctly", async () => {
    component.setProperty("showValue", true);
    await page.waitForChanges();
    const values: E2EElement[] = await page.findAll(
      "og-list-item >>> .og-list-item__value"
    );
    expect(values[0].textContent).toEqual(`23`);
  });
});
