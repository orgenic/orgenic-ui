import { OgCombobox } from './og-combobox';

it('should show dropdown when clicking button', async () => {
  const combobox = new OgCombobox();
  // eslint-disable-next-line
  combobox.el = {offsetTop: 0, offsetHeight: 0, offsetLeft: 0, offsetWidth: 0} as HTMLElement;

  expect(await combobox.dropdownActive).toBeFalsy();
  combobox.buttonClicked();
  expect(await combobox.dropdownActive).toBeTruthy();
});
