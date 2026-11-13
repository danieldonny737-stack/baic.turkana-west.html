document.addEventListener("DOMContentLoaded", function () {
    const mapElement = document.getElementById("service-map");
    const statusElement = document.getElementById("service-map-status");
    const fallbackElement = document.getElementById("service-map-fallback");
    const queryLink = document.getElementById("service-map-query-link");
    const healthToggle = document.getElementById("show-health");
    const waterToggle = document.getElementById("show-water");
    const schoolToggle = document.getElementById("show-schools");
    const trainingToggle = document.getElementById("show-training");
    const organizationToggle = document.getElementById("show-organizations");
    const refreshButton = document.getElementById("refresh-service-map");

    if (!mapElement || !statusElement || !fallbackElement || !queryLink || !healthToggle ||
        !waterToggle || !schoolToggle || !trainingToggle || !organizationToggle || !refreshButton) {
        return;
    }

    if (!window.L) {
        statusElement.textContent = "The map could not start. Check your internet connection and reload the page.";
        return;
    }

    const turkanaWestBounds = L.latLngBounds(
        [2.9968938, 33.9877616],
        [4.6133330, 35.4818050]
    );
    const map = L.map(mapElement, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    map.fitBounds(turkanaWestBounds);

    const markerLayer = typeof L.markerClusterGroup === "function"
        ? L.markerClusterGroup({
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: true,
            maxClusterRadius: 42
        }).addTo(map)
        : L.layerGroup().addTo(map);
    const mappedLocations = [
        {
            type: "way",
            id: 412997353,
            title: "Clinic 6",
            category: "health",
            ward: "Lopur ward",
            coordinates: [3.7589046, 34.8104352]
        },
        {
            type: "way",
            id: 703060901,
            title: "Kakuma Medical Clinic",
            category: "health",
            ward: "Kakuma ward",
            coordinates: [3.7094537, 34.8622265]
        },
        {
            type: "node",
            id: 10864747457,
            title: "Shepherds Hospital",
            category: "health",
            ward: "Lopur ward",
            coordinates: [3.7106229, 34.8555924]
        },
        {
            type: "node",
            id: 10864747466,
            title: "Hong Kong Health Dispensary",
            category: "health",
            ward: "Lopur ward",
            coordinates: [3.7474341, 34.8404639]
        },
        {
            type: "node",
            id: 10864747459,
            title: "Jesus Is King Clinic",
            category: "health",
            ward: "Lopur ward",
            coordinates: [3.7318324, 34.8160068]
        },
        {
            type: "node",
            id: 10973377388,
            title: "SDA Clinic Six Church",
            category: "health",
            ward: "Lopur ward",
            coordinates: [3.7495629, 34.8131435]
        },
        {
            type: "node",
            id: 10992253098,
            title: "The Guardian Medical Clinic",
            category: "health",
            ward: "Kakuma ward",
            coordinates: [3.7080543, 34.8636959]
        },
        {
            type: "node",
            id: 10981352947,
            title: "Bismilahi Chemist And Clinic",
            category: "health",
            ward: "Lopur ward",
            coordinates: [3.7431698, 34.8064114]
        },
        {
            type: "node",
            id: 10864747437,
            title: "Kaapoka Health Centre",
            category: "health",
            ward: "Lopur ward",
            coordinates: [3.7354050, 34.8397987]
        },
        {
            type: "node",
            id: 10864747444,
            title: "Natukobenyo Health Centre",
            category: "health",
            ward: "Kalobeyei ward",
            coordinates: [3.7744317, 34.7308655]
        },
        {
            type: "node",
            id: 3810780166,
            title: "Lokangae Health Centre",
            category: "health",
            ward: "Songot ward",
            coordinates: [4.1061770, 34.8896040]
        },
        {
            type: "node",
            id: 3810780483,
            title: "Nayanae Emeyan Water Pan",
            category: "water",
            waterType: "water pan",
            ward: "Nkalale ward",
            coordinates: [3.6985390, 34.8804380]
        },
        {
            type: "node",
            id: 3810779930,
            title: "Komudei Water Pan",
            category: "water",
            waterType: "water pan",
            ward: "Kakuma ward",
            coordinates: [3.7344620, 34.8907520]
        },
        {
            type: "node",
            id: 3810780206,
            title: "Longidin Water Pan",
            category: "water",
            waterType: "water pan",
            ward: "Nanaam ward",
            coordinates: [4.3398200, 34.7243970]
        },
        {
            type: "node",
            id: 3810780403,
            title: "Nalapatui Water Pan",
            category: "water",
            waterType: "water pan",
            ward: "Kalobeyei ward",
            coordinates: [3.7000940, 34.4953650]
        },
        {
            type: "way",
            id: 680694836,
            title: "Good Shepherd Primary School",
            category: "school",
            ward: "Kakuma ward",
            coordinates: [3.7108144, 34.8625437]
        },
        {
            type: "way",
            id: 412996811,
            title: "Lokitaung Primary School",
            category: "school",
            ward: "Lopur ward",
            coordinates: [3.7529868, 34.8112413]
        },
        {
            type: "way",
            id: 693570967,
            title: "Kakuma Mixed Primary School",
            category: "school",
            ward: "Kakuma ward",
            coordinates: [3.7148792, 34.8610611]
        },
        {
            type: "node",
            id: 10908345189,
            title: "St Paul Kakuma Secondary School",
            category: "school",
            ward: "Lopur ward",
            coordinates: [3.7523696, 34.8405227]
        },
        {
            type: "node",
            id: 10910984795,
            title: "Kakuma Girls Primary School",
            category: "school",
            ward: "Kakuma ward",
            coordinates: [3.7104447, 34.8637833]
        },
        {
            type: "way",
            id: 1168585344,
            title: "Arid Zone Primary School",
            category: "school",
            ward: "Kakuma ward",
            coordinates: [3.6992380, 34.8686043]
        },
        {
            type: "node",
            id: 10908345186,
            title: "Ngundeng Primary School",
            category: "school",
            ward: "Lopur ward",
            coordinates: [3.7160423, 34.8515681]
        },
        {
            type: "node",
            id: 10908383423,
            title: "Peace Primary School",
            category: "school",
            ward: "Lopur ward",
            coordinates: [3.7359871, 34.8148937]
        },
        {
            type: "node",
            id: 10905276182,
            title: "Kalobeyei Secondary School",
            category: "school",
            ward: "Kalobeyei ward",
            coordinates: [3.7689424, 34.6332926]
        },
        {
            type: "node",
            id: 10910942106,
            title: "Kalobeyei Settlement Primary School",
            category: "school",
            ward: "Kalobeyei ward",
            coordinates: [3.7668191, 34.7336040]
        },
        {
            type: "node",
            id: 10908345193,
            title: "St Kizito Kalobeyei Primary",
            category: "school",
            ward: "Kalobeyei ward",
            coordinates: [3.7727514, 34.6264032]
        },
        {
            type: "node",
            id: 10908383424,
            title: "St Benedicts Kalobeyei Primary",
            category: "school",
            ward: "Kalobeyei ward",
            coordinates: [3.7683951, 34.6339179]
        },
        {
            type: "way",
            id: 703076535,
            title: "Turkana Driving School",
            category: "training",
            ward: "Kakuma ward",
            coordinates: [3.7017117, 34.8776023]
        },
        {
            type: "way",
            id: 693570975,
            title: "Don Bosco",
            category: "organization",
            ward: "Kakuma ward",
            coordinates: [3.7137147, 34.8606999]
        },
        {
            type: "node",
            id: 6996882585,
            title: "Norwegian Refugee Council",
            category: "organization",
            ward: "Lopur ward",
            coordinates: [3.7073711, 34.8566884]
        },
        {
            type: "node",
            id: 10973377395,
            title: "Community Access Service Organization",
            category: "organization",
            ward: "Lopur ward",
            coordinates: [3.7433281, 34.8062965]
        }
    ];

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];
        });
    }

    function getLocationCategory(tags) {
        const amenity = tags.amenity || "";
        const manMade = tags.man_made || "";

        if (
            tags.healthcare ||
            ["hospital", "clinic", "doctors", "health_post", "health_centre", "pharmacy"].includes(amenity)
        ) {
            return "health";
        }

        if (getWaterType(tags)) {
            return "water";
        }

        const office = tags.office || "";
        const socialFacility = tags.social_facility || "";

        if (
            ["school", "kindergarten", "college", "university"].includes(amenity) ||
            tags.education === "school"
        ) {
            return "school";
        }

        if (
            ["driving_school", "driver_training", "training", "training_centre", "training_center"].includes(amenity) ||
            tags.training === "yes" ||
            tags.education === "training"
        ) {
            return "training";
        }

        if (
            ["ngo", "charity"].includes(office) ||
            amenity === "ngo" ||
            amenity === "community_centre" ||
            ["ngo", "charity"].includes(socialFacility)
        ) {
            return "organization";
        }

        return null;
    }

    function getWaterType(tags) {
        const amenity = tags.amenity || "";
        const manMade = tags.man_made || "";
        const water = tags.water || "";

        if (["watering_place", "water_trough"].includes(amenity) || tags.animal === "drinking") {
            return "livestock watering point";
        }
        if (["water_well", "borehole"].includes(manMade) || ["well", "borehole"].includes(water)) {
            return "borehole / well";
        }
        if (water === "pond" || water === "reservoir" || tags.landuse === "reservoir") {
            return "water pan / reservoir";
        }
        if (
            ["drinking_water", "water_point"].includes(amenity) ||
            ["water_tap", "water_tower"].includes(manMade) ||
            water === "water_point" ||
            tags.waterway === "water_point"
        ) {
            return "water point";
        }
        return null;
    }

    function getWaterMarkerLetter(waterType) {
        if (waterType.indexOf("livestock") >= 0) return "L";
        if (waterType.indexOf("borehole") >= 0) return "B";
        if (waterType.indexOf("pan") >= 0) return "P";
        return "W";
    }

    function getCoordinates(element) {
        if (typeof element.lat === "number" && typeof element.lon === "number") {
            return [element.lat, element.lon];
        }

        if (element.center && typeof element.center.lat === "number" && typeof element.center.lon === "number") {
            return [element.center.lat, element.center.lon];
        }

        return null;
    }

    function renderLocations() {
        markerLayer.clearLayers();

        mappedLocations.forEach(function (location) {
            if (location.category === "health" && !healthToggle.checked) return;
            if (location.category === "water" && !waterToggle.checked) return;
            if (location.category === "school" && !schoolToggle.checked) return;
            if (location.category === "training" && !trainingToggle.checked) return;
            if (location.category === "organization" && !organizationToggle.checked) return;

            const isHealth = location.category === "health";
            const markerLetter = isHealth
                ? "H"
                : location.category === "school"
                    ? "S"
                    : location.category === "training"
                        ? "T"
                        : location.category === "organization"
                            ? "O"
                            : getWaterMarkerLetter(location.waterType || "water point");
            const markerClass = location.category === "school"
                ? "school"
                : location.category === "training"
                    ? "training"
                    : location.category === "organization"
                        ? "organization"
                        : isHealth
                            ? "health"
                            : location.waterType && location.waterType.indexOf("livestock") >= 0
                    ? "livestock"
                    : location.waterType && location.waterType.indexOf("borehole") >= 0
                        ? "borehole"
                        : "water";
            const marker = L.marker(location.coordinates, {
                title: location.title,
                icon: L.divIcon({
                    className: "",
                    html: '<span class="service-map-marker service-map-marker-' +
                        markerClass + '" aria-hidden="true">' + markerLetter + "</span>",
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                })
            });

            const objectUrl = "https://www.openstreetmap.org/" +
                encodeURIComponent(location.type) + "/" + encodeURIComponent(location.id);
            const popup = "<strong>" + escapeHtml(location.title) + "</strong>" +
                "<br>" + escapeHtml(location.ward) +
                (location.waterType ? "<br>" + escapeHtml(location.waterType) : "") +
                '<br><small>OpenStreetMap mapped location; access and operating status are not verified.</small>' +
                '<br><button class="service-map-zoom-link" type="button">Zoom to this location</button>' +
                '<br><a href="' + objectUrl + '" target="_blank" rel="noopener noreferrer">View OpenStreetMap record</a>';

            marker.bindPopup(popup);
            marker.addTo(markerLayer);
        });
    }

    map.on("popupopen", function (event) {
        const zoomButton = event.popup.getElement().querySelector(".service-map-zoom-link");
        if (!zoomButton) return;

        zoomButton.addEventListener("click", function () {
            const markerLocation = mappedLocations.find(function (location) {
                return location.coordinates[0] === event.popup.getLatLng().lat &&
                    location.coordinates[1] === event.popup.getLatLng().lng;
            });
            if (!markerLocation) return;
            map.setView(markerLocation.coordinates, 16);
        });
    });

    async function loadLocations() {
        refreshButton.disabled = true;
        renderLocations();
        statusElement.textContent = "Showing " + mappedLocations.length +
            " named locations mapped in OpenStreetMap. Checking for updates…";

        const query = [
            "[out:json][timeout:15];",
            "area(3621282315)->.turkanaWest;",
            "(",
            'nwr["amenity"~"^(hospital|clinic|doctors|health_post|health_centre|pharmacy)$"](area.turkanaWest);',
            'nwr["healthcare"](area.turkanaWest);',
            'nwr["amenity"~"^(drinking_water|water_point|watering_place|water_trough)$"](area.turkanaWest);',
            'nwr["man_made"~"^(water_well|borehole|water_tap|water_tower)$"](area.turkanaWest);',
            'nwr["water"~"^(well|borehole|pond|reservoir|water_point)$"](area.turkanaWest);',
            'nwr["landuse"="reservoir"](area.turkanaWest);',
            'nwr["animal"="drinking"](area.turkanaWest);',
            'nwr["waterway"="water_point"](area.turkanaWest);',
            'nwr["amenity"~"^(school|kindergarten|college|university)$"](area.turkanaWest);',
            'nwr["education"~"^(school|training)$"](area.turkanaWest);',
            'nwr["amenity"~"^(driving_school|driver_training|training|training_centre|training_center)$"](area.turkanaWest);',
            'nwr["training"="yes"](area.turkanaWest);',
            'nwr["office"~"^(ngo|charity)$"](area.turkanaWest);',
            'nwr["amenity"="ngo"](area.turkanaWest);',
            'nwr["amenity"="community_centre"](area.turkanaWest);',
            'nwr["social_facility"~"^(ngo|charity)$"](area.turkanaWest);',
            ");out center tags;"
        ].join("");
        queryLink.href = "https://overpass-turbo.eu/?Q=" + encodeURIComponent(query);
        fallbackElement.hidden = true;

        try {
            const controller = new AbortController();
            let timeoutId;
            let response;

            try {
                const timeout = new Promise(function (_, reject) {
                    timeoutId = window.setTimeout(function () {
                        controller.abort();
                        reject(new Error("Map data request timed out."));
                    }, 20000);
                });
                response = await Promise.race([
                    fetch(
                        "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query),
                        { signal: controller.signal }
                    ),
                    timeout
                ]);
            } finally {
                window.clearTimeout(timeoutId);
            }

            if (!response.ok) {
                throw new Error("OpenStreetMap data request failed with status " + response.status);
            }

            const result = await response.json();
            if (!Array.isArray(result.elements)) {
                throw new Error("OpenStreetMap returned an unexpected location data format.");
            }

            const seen = new Set();
            const liveLocations = result.elements.reduce(function (locations, element) {
                const tags = element.tags || {};
                const category = getLocationCategory(tags);
                const coordinates = getCoordinates(element);
                const key = element.type + "/" + element.id;

                if (!category || !coordinates || seen.has(key)) return locations;
                seen.add(key);
                locations.push({
                    type: element.type,
                    id: element.id,
                    title: tags.name || {
                        health: "Health facility",
                        water: "Water point",
                        school: "School",
                        training: "Training centre",
                        organization: "Community organization"
                    }[category],
                    category: category,
                    waterType: category === "water" ? getWaterType(tags) : null,
                    ward: "Turkana West",
                    coordinates: coordinates,
                    objectKey: key
                });
                return locations;
            }, []);

            const knownKeys = new Set(mappedLocations.map(function (location) {
                return location.type + "/" + location.id;
            }));
            liveLocations.forEach(function (location) {
                if (!knownKeys.has(location.objectKey)) {
                    mappedLocations.push(location);
                    knownKeys.add(location.objectKey);
                }
            });

            renderLocations();
            const categoryCounts = mappedLocations.reduce(function (counts, item) {
                counts[item.category] = (counts[item.category] || 0) + 1;
                return counts;
            }, {});
            statusElement.textContent = mappedLocations.length
                ? "Showing " + (categoryCounts.health || 0) + " health facilities, " +
                    (categoryCounts.water || 0) + " water locations, " +
                    (categoryCounts.school || 0) + " schools, " +
                    (categoryCounts.training || 0) + " training centres, and " +
                    (categoryCounts.organization || 0) + " organizations mapped in Turkana West. Last refreshed " +
                    new Date().toLocaleTimeString() + "."
                : "No matching health, water, school, training, or organization locations were found in OpenStreetMap for this area.";
        } catch (error) {
            console.error("Could not load Turkana West service locations:", error);
            const categoryCounts = mappedLocations.reduce(function (counts, item) {
                counts[item.category] = (counts[item.category] || 0) + 1;
                return counts;
            }, {});
            const summary = "Showing " + (categoryCounts.health || 0) + " health facilities, " +
                (categoryCounts.water || 0) + " water locations, " +
                (categoryCounts.school || 0) + " schools, " +
                (categoryCounts.training || 0) + " training centres, and " +
                (categoryCounts.organization || 0) + " organizations. ";
            statusElement.textContent = error.name === "AbortError" || error.message === "Map data request timed out."
                ? summary + "The live OpenStreetMap update timed out."
                : summary + "The live OpenStreetMap update failed.";
            fallbackElement.hidden = false;
        } finally {
            refreshButton.disabled = false;
        }
    }

    healthToggle.addEventListener("change", renderLocations);
    waterToggle.addEventListener("change", renderLocations);
    schoolToggle.addEventListener("change", renderLocations);
    trainingToggle.addEventListener("change", renderLocations);
    organizationToggle.addEventListener("change", renderLocations);
    refreshButton.addEventListener("click", loadLocations);
    loadLocations();
});
