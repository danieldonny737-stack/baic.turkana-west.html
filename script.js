/* =========================================
   TURKANA WEST CONNECT
   JAVASCRIPT
========================================= */

const openReport = document.getElementById("openReport");
const heroReport = document.getElementById("heroReport");
const reportModal = document.getElementById("reportModal");
const closeReport = document.getElementById("closeReport");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const mobileReport = document.getElementById("mobileReport");
const notifyBtn = document.getElementById("notifyBtn");
const reportForm = document.getElementById("reportForm");
const searchButton = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const createPostButton = document.querySelector(".outline-btn");
const viewReports = document.getElementById("viewReports");
const opportunityButtons = document.querySelectorAll(".feature-card a");
const smallOpportunityButton = document.querySelector(".small-btn");

function showReportModal() {
    if (!reportModal) return;
    reportModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function hideReportModal() {
    if (!reportModal) return;
    reportModal.classList.remove("show");
    document.body.style.overflow = "";
}

if (openReport) {
    openReport.addEventListener("click", showReportModal);
}

if (heroReport) {
    heroReport.addEventListener("click", showReportModal);
}

if (closeReport) {
    closeReport.addEventListener("click", hideReportModal);
}

if (reportModal) {
    reportModal.addEventListener("click", function (event) {
        if (event.target === reportModal) {
            hideReportModal();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hideReportModal();
    }
});

if (reportForm) {
    reportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const reportNumber = "TWC-" + Math.floor(1000 + Math.random() * 9000);

        alert(
            "✅ Report submitted successfully!\n\n" +
            "Report ID: " + reportNumber + "\n\n" +
            "Status: Under Review"
        );

        hideReportModal();
        reportForm.reset();
    });
}

const postButtons = document.querySelectorAll(".post-actions button");

postButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const buttonText = button.textContent;

        if (buttonText.includes("❤️")) {
            button.textContent = "❤️ Liked";
            button.style.color = "#0f766e";
        } else if (buttonText.includes("💬")) {
            alert("💬 Comments feature coming soon.");
        } else if (buttonText.includes("↗")) {
            if (navigator.share) {
                navigator.share({
                    title: "Turkana West Connect",
                    text: "Check out this community update on Turkana West Connect."
                });
            } else {
                alert("Share link copied!");
            }
        }
    });
});

if (searchButton && searchInput) {
    searchButton.addEventListener("click", function () {
        const searchValue = searchInput.value.trim();

        if (!searchValue) {
            alert("Please enter something to search.");
            return;
        }

        alert("🔎 Searching for: " + searchValue + "\n\nSearch functionality will be connected to the database later.");
    });
}

if (createPostButton) {
    createPostButton.addEventListener("click", function () {
        alert("📝 Create Post\n\nThe community post system will be added in a later stage.");
    });
}

if (viewReports) {
    viewReports.addEventListener("click", function () {
        alert("📊 Reports Dashboard\n\nThis section will show:\n\n🟡 Submitted\n🔵 Under Review\n🟠 Being Addressed\n🟢 Resolved");
    });
}

opportunityButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        alert("🎓 Opportunities\n\nThe full opportunities system will be connected later.");
    });
});

if (smallOpportunityButton) {
    smallOpportunityButton.addEventListener("click", function () {
        alert("🎓 Digital Skills Training\n\nOpportunity details will appear here.");
    });
}

if (menuToggle && navMenu) {
    const closeMenu = function () {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = function () {
        navMenu.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
    };

    menuToggle.addEventListener("click", function () {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    const mobileLinks = navMenu.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });
}

if (mobileReport) {
    mobileReport.addEventListener("click", function () {
        if (navMenu) navMenu.classList.remove("active");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        showReportModal();
    });
}

if (notifyBtn) {
    notifyBtn.addEventListener("click", function () {
        alert("🔔 Notifications\n\nNew report updates and approved opportunities are available.");
    });
}

const prefersSwahili = navigator.language && navigator.language.toLowerCase().startsWith("sw");
const localeDefaults = { en: "en", sw: "sw" };
const currentLocale = prefersSwahili ? "sw" : "en";

const localeLabels = {
    en: {
        navCommunity: "Community",
        navReports: "Reports",
        navOpportunities: "Opportunities",
        navServices: "Services",
        reportIssue: "Report Issue",
        heroHeadline: "Connecting Communities. Creating Opportunities.",
        heroCopy: "A digital platform connecting refugee and host communities with services, opportunities, organizations and community updates."
    },
    sw: {
        navCommunity: "Jumuiya",
        navReports: "Ripoti",
        navOpportunities: "Fursa",
        navServices: "Huduma",
        reportIssue: "Ripoti Tatizo",
        heroHeadline: "Kuunganisha Jamii. Kujenga Fursa.",
        heroCopy: "Mfumo wa kidijitali unaounganisha jamii za wakimbizi na wageni na huduma, fursa, mashirika, na taarifa za jamii."
    }
};

function applyLocale(locale) {
    const labels = localeLabels[locale] || localeLabels.en;
    const navLinks = document.querySelectorAll(".desktop-nav a");
    navLinks[0] && (navLinks[0].textContent = labels.navCommunity);
    navLinks[1] && (navLinks[1].textContent = labels.navReports);
    navLinks[2] && (navLinks[2].textContent = labels.navOpportunities);
    navLinks[3] && (navLinks[3].textContent = labels.navServices);

    const reportBtn = document.getElementById("openReport");
    if (reportBtn) reportBtn.textContent = labels.reportIssue;

    const heroTitle = document.querySelector(".hero-text h1");
    const heroCopy = document.querySelector(".hero-text p");
    if (heroTitle) heroTitle.innerHTML = labels.heroHeadline.replace(". ", ".<span> ") + "";
    if (heroCopy) heroCopy.textContent = labels.heroCopy;
}

const langButtons = document.querySelectorAll(".lang-btn");
langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selected = button.dataset.lang;
        langButtons.forEach(function (item) {
            item.classList.toggle("active", item === button);
        });
        applyLocale(selected);
    });
});

applyLocale(currentLocale);

const AUTH_USERS_KEY = "turkanaWestUsers";
const AUTH_SESSION_KEY = "turkanaWestCurrentUser";

function getStoredUsers() {
    const stored = localStorage.getItem(AUTH_USERS_KEY);
    if (stored) {
        try {
            const users = JSON.parse(stored);
            if (Array.isArray(users) && users.length) return users;
        } catch (error) {
            console.warn("Stored users could not be parsed.");
        }
    }

    const defaultUsers = [
        { name: "Admin User", email: "admin@turkanawest.com", password: "admin123", role: "Admin" },
        { name: "Community Resident", email: "resident@turkanawest.com", password: "community123", role: "Resident" }
    ];

    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
}

function saveUserSession(user) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
}

function clearUserSession() {
    localStorage.removeItem(AUTH_SESSION_KEY);
}

function getCurrentUser() {
    const saved = localStorage.getItem(AUTH_SESSION_KEY);
    if (!saved) return null;

    try {
        return JSON.parse(saved);
    } catch (error) {
        return null;
    }
}

function showAuthMessage(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = "auth-message show " + type;
}

function redirectToDashboard() {
    window.location.href = "dashboard.html";
}

function guardAuthPages() {
    const path = window.location.pathname.split("/").pop();
    if ((path === "login.html" || path === "register.html") && getCurrentUser()) {
        redirectToDashboard();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    guardAuthPages();

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const logoutBtn = document.getElementById("logoutBtn");
    const dashboardUser = document.getElementById("dashboardUser");
    const dashboardTitle = document.getElementById("dashboardTitle");
    const dashboardDimToggle = document.getElementById("dashboardDimToggle");

    if (dashboardDimToggle) {
        const dimModeKey = "turkanaWestDashboardDimMode";
        const applyDimMode = function (enabled) {
            document.body.dataset.dimMode = enabled ? "true" : "false";
            dashboardDimToggle.setAttribute("aria-pressed", String(enabled));
            dashboardDimToggle.setAttribute(
                "aria-label",
                enabled ? "Disable low-glare colors" : "Enable low-glare colors"
            );
            dashboardDimToggle.textContent = enabled ? "Dim colors: on" : "Dim colors: off";
        };

        applyDimMode(localStorage.getItem(dimModeKey) === "true");
        dashboardDimToggle.addEventListener("click", function () {
            const enabled = document.body.dataset.dimMode !== "true";
            localStorage.setItem(dimModeKey, String(enabled));
            applyDimMode(enabled);
        });
    }

    if (loginForm) {
        const messageBox = document.getElementById("loginMessage");

        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();
            const users = getStoredUsers();
            const matchedUser = users.find(function (user) {
                return user.email.toLowerCase() === email.toLowerCase() && user.password === password;
            });

            if (!matchedUser) {
                showAuthMessage(messageBox, "Invalid email or password. Please try again.", "error");
                return;
            }

            saveUserSession({ name: matchedUser.name, email: matchedUser.email, role: matchedUser.role });
            showAuthMessage(messageBox, "Login successful. Redirecting...", "success");
            setTimeout(redirectToDashboard, 600);
        });
    }

    if (registerForm) {
        const messageBox = document.getElementById("registerMessage");

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const role = document.getElementById("registerRole").value;
            const password = document.getElementById("registerPassword").value.trim();
            const users = getStoredUsers();

            if (users.some(function (user) {
                return user.email.toLowerCase() === email.toLowerCase();
            })) {
                showAuthMessage(messageBox, "An account with this email already exists.", "error");
                return;
            }

            const newUser = { name, email, password, role };
            users.push(newUser);
            localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
            saveUserSession({ name, email, role });
            showAuthMessage(messageBox, "Account created successfully. Redirecting...", "success");
            setTimeout(redirectToDashboard, 600);
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            clearUserSession();
            window.location.href = "login.html";
        });
    }

    if (dashboardUser) {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = "login.html";
            return;
        }

        dashboardUser.textContent = currentUser.name + " • " + currentUser.role + " • " + currentUser.email;

        if (dashboardTitle) {
            dashboardTitle.textContent = "Welcome, " + currentUser.name.split(" ")[0] + "!";
        }
    }
});

console.log("🌍 Turkana West Connect loaded successfully.");

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function () {
                console.log("✅ Turkana West Connect PWA is ready.");
            })
            .catch(function (error) {
                console.log("Service Worker registration failed:", error);
            });
    });
}