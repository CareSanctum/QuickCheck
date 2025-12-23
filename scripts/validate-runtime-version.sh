if [ -z "$RUNTIME_VERSION" ]; then
    [[ "$RUNTIME_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] && echo "Runtime Version is Valid" || echo "Runtime Version is Invalid" && exit 1
fi