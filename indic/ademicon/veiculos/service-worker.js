const CACHE_NAME =
    "uw-veiculos-sprint3-4-v1";


const CORE_FILES = [
    "./",
    "index.html",
    "assets/css/style.css",
    "assets/js/config.js",
    "assets/js/app.js",
    "campanhas.json"
];


self.addEventListener(
    "install",
    (event) => {
        event.waitUntil(
            caches
                .open(
                    CACHE_NAME
                )
                .then(
                    (cache) => {
                        return cache.addAll(
                            CORE_FILES
                        );
                    }
                )
        );

        self.skipWaiting();
    }
);


self.addEventListener(
    "activate",
    (event) => {
        event.waitUntil(
            caches
                .keys()
                .then(
                    (keys) => {
                        const oldCaches =
                            keys.filter(
                                (key) => {
                                    return (
                                        key !==
                                        CACHE_NAME
                                    );
                                }
                            );

                        return Promise.all(
                            oldCaches.map(
                                (key) => {
                                    return caches.delete(
                                        key
                                    );
                                }
                            )
                        );
                    }
                )
        );

        self.clients.claim();
    }
);


self.addEventListener(
    "fetch",
    (event) => {
        if (
            event.request.method !==
            "GET"
        ) {
            return;
        }

        event.respondWith(
            fetch(
                event.request
            )
                .then(
                    (response) => {
                        const responseCopy =
                            response.clone();

                        caches
                            .open(
                                CACHE_NAME
                            )
                            .then(
                                (cache) => {
                                    cache.put(
                                        event.request,
                                        responseCopy
                                    );
                                }
                            );

                        return response;
                    }
                )
                .catch(
                    () => {
                        return caches.match(
                            event.request
                        );
                    }
                )
        );
    }
);
