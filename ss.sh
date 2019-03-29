#!/usr/bin/env bash

function commit() {
    git add .
    echo -n "commit: "
    read _commit
    git commit -m "${_commit}"
    git push
}