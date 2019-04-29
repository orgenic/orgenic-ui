

export class SvgRegistry {
    static icons = {
        solid: {
            menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Ebene 5"><path d="M21 8H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zM21 13H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zM21 18H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"/></g></svg>`
        },
        stroke: {
            menu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Ebene 5"><path d="M21 8H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zM21 13H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2zM21 18H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"/></g></svg>`
        },
    };

    static getIcon(ns, name): string {
        const lib = this.icons[ns];
        if (!lib) {
            return null;
        }
        return lib[name];
    }
}
