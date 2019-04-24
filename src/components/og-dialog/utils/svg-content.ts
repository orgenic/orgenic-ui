/**
 * Temporary helper class to separate SVG source from dialogs.
 * Will be deprecated when we have a SVG component and maybe a SVG registry.
 */
export class SVGContent{
    static success = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" tabindex="-1" class="orgenic-svg">
    <g fill="none" stroke="#000" stroke-width="2" stroke-miterlimit="10">
        <path stroke-linejoin="round" d="M30 5h-5V4a3 3 0 0 0-6 0v1h-5l-2 7h20l-2-7z"/>
        <path stroke-linejoin="round" d="M35 46H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h6M31 6h6a3 3 0 0 1 3 3v16"/>
        <path stroke-linejoin="round" d="M27 42H15l-7-7V10.008h5M31 10.008h5V24"/>
        <path stroke-linejoin="round" d="M8 35h7v7M13 20h7M13 25h17M13 30h12"/>
        <circle stroke-linejoin="round" cx="35" cy="35" r="11"/>
        <path stroke-linecap="round" d="M29 35l3 3 8-7"/>
    </g>
</svg>`;
}
