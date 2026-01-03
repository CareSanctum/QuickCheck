#!/bin/sh
set -e

if [ -z "$ANDROID_GOOGLE_SERVICES_JSON_B64" ]; then
  echo "ANDROID_GOOGLE_SERVICES_JSON_B64 is not set"
  exit 1
fi

echo "Creating google-services.json"

echo "$ANDROID_GOOGLE_SERVICES_JSON_B64" | base64 --decode > google-services.json

if [ ! -f google-services.json ]; then
  echo "google-services.json was not created"
  exit 1
fi

echo "google-services.json created successfully"
