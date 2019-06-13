import { OgButton } from "./og-button";

it('emits clicked event', async () => {
    const button = new OgButton();

    const emitter  = {
        emit: (): CustomEvent<MouseEvent> => { return null; }
    };
    const spy = jest.spyOn(emitter, 'emit');
    button.clicked = emitter;
    button.handleClick(<any>{ });
    expect(spy).toHaveBeenCalled();
});
