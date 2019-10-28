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
  });

  it("renders", async () => {
    await page.waitForChanges();
    expect(component).toHaveClass("hydrated");
  });

  it("should render empty list message when empty", async () => {
    await page.waitForChanges();
    let items = await page.findAll("og-list >>> og-list-item >>> li");
    expect(items.length).toEqual(1);

    component.setProperty("items", []);
    await page.waitForChanges();
    items = await page.findAll("og-list >>> og-list-item >>> li");
    expect(items.length).toEqual(1);
  });

  it("should render og-list-item elements", async () => {
    component.setProperty("items", items);

    await page.waitForChanges();
    const listItems = await page.findAll("og-list >>> og-list-item");
    expect(listItems.length).toEqual(2);
  });
});
