var routes = {
    '/author': author,
    '/books': [books, function() {
        console.log("An inline route handler.");
    }],
    '/books/view/:bookId': viewBook
};

var router = Router(routes);

router.init();