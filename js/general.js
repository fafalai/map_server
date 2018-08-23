function redirect(address) {
    location.href = address;
}

function changeMenuColor() {
    var path = window.location.pathname;
    var link = $("#DIV_topMenu a");
    var pageName = path.split("/");
    var currentPage = pageName[pageName.length - 1];
    switch (currentPage) {
        case "":
            link.eq(0).addClass("current_page_item");
            break;
        case "jobs.php":
            link.eq(1).addClass("current_page_item");
            break;
        case "jobdetails.php":
            link.eq(1).addClass("current_page_item");
            break;
        case "index.php":
            link.eq(0).addClass("current_page_item");
            break;
        case "clients.php":
            link.eq(2).addClass("current_page_item");
            break;
        case "resource.php":
            link.eq(3).addClass("current_page_item");
            break;
        case "contact.php":
            link.eq(4).addClass("current_page_item");
            break;
        default:
            link.eq(5).addClass("current_page_item");
            break;
    }
    return currentPage;
}

$(document).ready(function () {
    var currentPage = changeMenuColor();
});