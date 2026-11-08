#!/usr/bin/env bash
# Erstellt LOKAL ein Upload-Paket (ohne .env, ohne Entwicklungsabhängigkeiten) mit
# produktiven PHP-Abhängigkeiten und fertigem Frontend-Build.
# Voraussetzungen lokal: PHP 8.3, Composer, Node.js 22, git, zip.
# Aufruf im Anwendungsverzeichnis:  bash scripts/build-deploy-package.sh
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="${1:-../rezeptverwaltung-deploy-$(date +%Y%m%d-%H%M).zip}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# Nur versionierte Dateien übernehmen (keine .env, keine lokalen Uploads)
git archive --format=tar HEAD . | tar -x -C "$WORK"
cd "$WORK"
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress
npm ci --ignore-scripts
npm run build
rm -rf node_modules tests .github
mkdir -p storage/app/private storage/framework/{cache,sessions,views} storage/logs bootstrap/cache
zip -qr "$OLDPWD/$OUT" . -x '.env' -x 'storage/logs/*.log'
echo "Paket erstellt: $OUT"
