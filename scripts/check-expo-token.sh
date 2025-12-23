if [ -z "$EXPO_TOKEN" ]; then
    echo "EXPO_TOKEN must be set in repository action's secrets"
    exit 1
fi