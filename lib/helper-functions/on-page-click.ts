import { rememberUtility } from "../recent/recent";

export function onPageClick(e: MouseEvent) {
    if(e.button !== 0)
        return;

    if (!(e.target instanceof HTMLElement))
        return;

    const card = e.target.closest("li[data-utility]") as HTMLLIElement;
    const link = card?.querySelector("a");
    const id = card?.dataset.utility;
    if (!id || !link)
        return;

    rememberUtility(id);
    window.location.assign(link.href);
}