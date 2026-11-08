// Liest die Routen für JavaScript aus einem JSON-Block (kein Inline-Skript nötig, CSP-konform).
try {
    window.APP_ROUTES = JSON.parse(document.getElementById('app-routes').textContent);
} catch (e) {
    window.APP_ROUTES = {};
}
