#==================================================
# Licensed Materials - Property of HCL Technologies
#
# HCL Commerce
#
# (C) Copyright HCL Technologies Limited 2020
#
#==================================================
#!/bin/bash

IFS=$'\n'

# ORIGIN_URL=$(git config remote.origin.url)
files_without_header_inScope=()
files_without_header=()
for newly_added_file in `git diff --name-only --diff-filter=ACMR --staged "*.js" "*.jsx" "*.ts" "*.tsx" "*.html" "*.yaml" "*.yml"`; do
    files_without_header_inScope+=($(grep -L "(C) Copyright" $newly_added_file))
done

for newly_updated_file in `git diff --name-only --diff-filter=ACMR --staged`; do
    files_without_header+=($(grep -L "(C) Copyright" $newly_updated_file))
done

if [ -n "$files_without_header_inScope" ]
then
    echo -e "\e[1m\e[31mERROR:\e[39m\e[0m \e[41m(C) Copyright \e[49m\e[1m\e[31m license header not found in the following newly updated files:\e[39m\e[0m"
    
    for file in "${files_without_header_inScope[@]}"
    do
        :
        echo "   - $file";
    done
    exit 1;
elif [ -n "$files_without_header" ]
then
    len=${#files_without_header[@]}
    clen=20
    len2print=$len
    if  [ "$len" -gt "$clen" ];
    then
        len2print=$clen
    fi
    echo -e "\e[33mWarning: total of ${len} updated files do not have Copyright header \e[39m";
    for (( i=0; i<$len2print; i++ ));
    do
        :
        echo "   - ${files_without_header[$i]}";
    done
    if  [ "$len" -gt "$clen" ];
    then
        echo " ............ "
    fi
    exit 0;
else
    echo -e "\e[32mAll updated files have Copyright header.\e[39m"
    exit 0;
fi
