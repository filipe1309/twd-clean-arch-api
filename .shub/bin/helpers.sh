#!/bin/bash

# DevOntheRun Helpers Script

function parse_json() {
    echo $1 | \
    sed -e 's/[{}]/''/g' | \
    sed -e 's/", "/'\",\"'/g' | \
    sed -e 's/" ,"/'\",\"'/g' | \
    sed -e 's/" , "/'\",\"'/g' | \
    sed -e 's/","/'\"---SEPERATOR---\"'/g' | \
    awk -F=':' -v RS='---SEPERATOR---' "\$1~/\"$2\"/ {print}" | \
    sed -e "s/\"$2\"://" | \
    tr -d "\n\t" | \
    sed -e 's/\\"/"/g' | \
    sed -e 's/\\\\/\\/g' | \
    sed -e 's/^[ \t]*//g' | \
    sed -e 's/^"//'  -e 's/"$//' | \
    sed -e 's/"//' | \
    sed -e 's/ $//'
}

format_json() {
    echo $1 | \
    grep -Eo '"[^"]*" *(: *([0-9]*|"[^"]*")[^{}\["]*|,)?|[^"\]\[\}\{]*|\{|\},?|\[|\],?|[0-9 ]*,?' | \
    awk '{if ($0 ~ /^[}\]]/ ) offset-=4; printf "%*c%s\n", offset, " ", $0; if ($0 ~ /^[{\[]/) offset+=4}'
}

function confirm() {
    read -r -p "${1:-Are you sure? [Y/n]} " response
    response=$(echo "$response" | tr '[:upper:]' '[:lower:]') # tolower
    if [[ $response =~ ^(yes|y| ) ]] || [[ -z $response ]]; then
        echo "Ok"
    else
        exit 0;
    fi
}
