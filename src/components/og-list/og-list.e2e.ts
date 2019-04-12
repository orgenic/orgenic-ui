import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-list', () => {
    let page: E2EPage;
    let component: E2EElement;
    const items = [{ key: '1', label: 'V1', value: 23 }, { key: '2', label: 'V2', value: 24 }];

    beforeEach(async () => {
        page = await newE2EPage();

        await page.setContent('<og-list></og-list>');
        component = await page.find('og-list');
        component.setProperty('items', items);
    });

    it('renders', async () => {
        await page.waitForChanges();
        expect(component).toHaveClass('hydrated');
    });

    it('should render label correctly', async () => {
        await page.waitForChanges();
        const labels = await page.findAll('og-list >>> .og-list__item__label');
        expect(labels[0].textContent).toEqual(`V1`);
        expect(labels[1].textContent).toEqual(`V2`);
    });

    it('should empty image container although property does not exist', async () => {
        component.setProperty('imageUrlProperty', 'imageUrl');
        await page.waitForChanges();
        const icons = await page.findAll('og-list >>> .og-list__item__icon');
        expect(icons.length).toEqual(2);
    });

    it('should render value correctly', async () => {
        component.setProperty('valueProperty', 'value');
        await page.waitForChanges();
        const values = await page.findAll('og-list >>> .og-list__item__value');
        expect(values[0].textContent).toEqual(`23`);
        expect(values[1].textContent).toEqual(`24`);
    });
});
