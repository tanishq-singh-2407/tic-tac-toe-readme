#! /bin/bash

regex="^_ttt_move_[abcABC][123]_[:\'.]{9}_$"

if [[ $title =~ $regex ]]; then
    echo "move=${title:10:2}" >>$GITHUB_ENV
    echo "slf=${title:13:9}" >>$GITHUB_ENV
else
    echo "Format got changed, it must follow '$regex'."
fi
