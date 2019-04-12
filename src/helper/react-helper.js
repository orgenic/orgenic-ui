export default function og(properties, events) {
    return el => {
        if (!el) {
            return;
        }
        for (let key of Object.keys(properties)) {
            el[key] = properties[key];
        }
        for (let event of Object.keys(events)) {
            el.addEventListener(event, events[event]);
        }
    };
}
