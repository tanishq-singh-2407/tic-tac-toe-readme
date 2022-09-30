#! /bin/bash

TITLE=$1
NAME=$2
URL=$3

regex="^_ttt_move_[abcABC][123]_(|[:\'.]{9})_$"

if [[ $TITLE =~ $regex ]]; then
    MOVE="${TITLE:10:2}"
    SLF="${TITLE:13:-1}"

    deno run --reload ../src/index.ts
    deno run --allow-read --allow-write ../src/index.ts --game --name="$NAME" --url="$URL" --moveTo="$MOVE" --slf="$SLF"
else
    echo "Format got changed, it must follow '$regex'."
    exit 1
fi
