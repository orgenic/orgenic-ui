export default function hasClass(el: Element, className: string): boolean {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
}
