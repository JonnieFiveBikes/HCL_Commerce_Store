#!/bin/bash
#==================================================
# Licensed Materials - Property of HCL Technologies
#
# HCL Commerce
#
# (C) Copyright HCL Technologies Limited 2021
#
#==================================================

echo -e "Verifing package-lock.json to make sure there are no hcl packages ... "
HCLPACKAGES=()
packagelock=`git diff --name-only --diff-filter=ACMR --staged "package-lock.json"`
if [ -n "$packagelock" ]; then
    HCLPACKAGES+=($(grep -oP "@hcl-commerce-store-sdk\/\K[\w-]+(?=\":)" $packagelock))
fi
if [ -n "$HCLPACKAGES" ]; then
echo -e "\e[1m\e[31mERROR: Please remove following from package-lock.json \e[39m\e[0m"
    for pkg in "${HCLPACKAGES[@]}"
    do
        :
        echo -e "- \e[41m@hcl-commerce-store-sdk/$pkg \e[49m";
    done
    exit 1;
fi
