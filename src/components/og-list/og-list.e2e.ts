import { newE2EPage, E2EPage, E2EElement } from "@stencil/core/testing";

describe("og-list", () => {
  let page: E2EPage;
  let component: E2EElement;
  const items = [
    { key: "1", label: "V1", value: 23 },
    { key: "2", label: "V2", value: 24 }
  ];

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent("<og-list></og-list>");
    component = await page.find("og-list");
    component.setProperty("items", items);
  });

  it("renders", async () => {
    await page.waitForChanges();
    expect(component).toHaveClass("hydrated");
  });

  it("should render og-list-item elements", async () => {
    await page.waitForChanges();
    const listItems = await page.findAll("og-list >>> og-list-item");
    expect(listItems.length).toEqual(2);
  });
});
