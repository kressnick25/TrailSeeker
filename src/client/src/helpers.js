export function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeAll(string){
    return string.replace(/(?:^|\s)\S/g, (a) =>  a.toUpperCase() );
}

export function removeDash(string) {
    return string.replace(/-/g, " ");
}