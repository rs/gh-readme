$(function () {
    $("body").prepend("<nav><ul>");
    var nav = $("body > nav > ul");
    var h2;
    $(".readme > h2, .readme > h3").each(function () {
        var item = $('<li><a href="#' + $(this).attr("id") + '">' + $(this).text() + '</a>');
        if ($(this).prop("tagName") == "H3") {
            if (!h2) {
                return;
            }
            h2.append(item);
        } else {
            h2 = $("<ul>");
            item.append(h2);
            nav.append(item);
        }
    });

    // Cache selectors
    var lastId,
        topMenu = $("nav > ul"),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Recompute items position on resize
    $(window).resize(function() {
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
    });

    // Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop() + 50;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop) {
                return this;
            }
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });
});