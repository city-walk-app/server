#!/bin/bash

COMMAND="npm run"
ARGS="main"

start_service() {
    nohup $COMMAND $ARGS > output.log 2>&1 &
    echo "Success"
}

stop_service() {
    pkill -f "$COMMAND $ARGS" --signal SIGTERM
    echo "Okay"
}

case "$1" in
    start)
        start_service
        ;;
    stop)
        stop_service
        ;;
    *)
        echo "method: $0 {start|stop}"
        exit 1
        ;;
esac

exit 0
