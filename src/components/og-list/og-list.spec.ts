import { OgList } from "./og-list";

describe("og-list", () => {
    let component: OgList;
      
    beforeEach(async () => {
        component = new OgList();
    });
  
    it("should apply multiselect feature", async () => {
      const items =  [
        { key: "1", label: "V1", value: 23 },
        { key: "2", label: "V2", value: 24 }
      ];
  
      component.multiselect = true;
      component.items = items;
      component.selected = [];
  
      component.listItemSelected(items[0]);
      expect(component.selected.length).toEqual(1);
      
      component.listItemSelected(items[0]);
      expect(component.selected.length).toEqual(0);

      component.listItemSelected(items[0]);
      expect(component.selected.length).toEqual(1);
      component.listItemSelected(items[1]);
      expect(component.selected.length).toEqual(2);

      component.multiselect = false;

      component.listItemSelected(items[0]);
      expect(component.selected.length).toEqual(0);
      component.listItemSelected(items[0]);
      expect(component.selected.length).toEqual(1);
      component.listItemSelected(items[1]);
      expect(component.selected.length).toEqual(1);
    });
  });
  