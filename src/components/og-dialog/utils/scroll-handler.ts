export class ScrollHandler {
    public static cancelScrollingKeyFilter = ev => {
        /* 33: pgup; 34: pgdwn; 35: end; 36: pos1; 37 - 40: arrows */
        if (ev.keyCode >= 33 && ev.keyCode <= 40) {
            ScrollHandler.cancelScrolling(ev);
        }
    }

    public static cancelScrolling = ev => {
        if (ev.preventDefault) {
            ev.preventDefault();
        }
        ev.returnValue = false;
    };
}
