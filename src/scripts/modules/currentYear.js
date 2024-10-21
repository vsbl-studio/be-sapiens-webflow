export default function () {
    const currentYear = new Date().getFullYear();
    $(`[data="year"]`).html(currentYear);
}
