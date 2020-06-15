 #==================================================
 # Licensed Materials - Property of HCL Technologies
 #
 # HCL Commerce
 #
 # (C) Copyright HCL Technologies Limited 2020
 #
 #==================================================

#!/bin/bash

##
# Get value from consul by key
# Return specified default value if consul value is empty or not found
# arg 1: key
# arg 2: default value
##
function get_consul_value() {
	KEY=$1
	DEFAULT=$2
	if [ -z $KEY ]
	then
		echo "Missing key when trying to get value from consul"
		exit 2
	fi
	VALUE=$(curl -sS ${CONSUL_SERVER_BASE_URL}/${PROJECT_NAME}/branch/${BRANCH_NAME}/$KEY?raw)

	# use default value if consul value is empty
	if [ -z $VALUE ]
	then
		VALUE=$DEFAULT
	fi

	echo $VALUE
}

##
# Validate file to make sure it does not contain
# __XX__ variables
# arg 1: file name
##
function validate_file() {
	FILE=$1
	if [ -z $FILE ]
	then
		echo "Missing input file when trying to validate file"
		exit 2
	fi

	RESULT=$(grep -E "__[A-Z_]+__" $1)
	if [ -z "$RESULT" ]
	then
		echo "File $FILE is validated."
	else
		echo "File $FILE still contains un-replaced variable:"
		echo $RESULT
		exit 1
	fi
}


##
# Create file from template file
# arg 1: destination file
##
function create_file_from_template() {
	DEST_FILE=$1
	if [ ! -f ${DEST_FILE}.template ]
	then
		echo "File ${DEST_FILE}.template does not exist"
		exit 2
	fi

	if [ -f ${DEST_FILE} ]
	then
		rm -f ${DEST_FILE}
	fi
	cp ${DEST_FILE}.template ${DEST_FILE}
	echo "Created ${DEST_FILE} from ${DEST_FILE}.template"
}

# check parameters
if [ $# != 1 ] ; then
  echo "Usage: $0 <branch>"
  exit 1
fi

# move the folder structure for build
echo
echo "======================================="
echo "Prepare the folder structure for build."
echo "======================================="
echo
rm -rf "react-store"
mkdir "react-store"
cp -t react-store/ -v -r `ls -A | grep -v 'master' | grep -v 'bvt' | grep -v 'Jenkinsfile' | grep -v 'prepare.sh' | grep -v 'react-store'`

# Global Variables
PROJECT_NAME="store-web"
BRANCH_NAME=$1
CONSUL_SERVER_BASE_URL="http://v9-jenkinshcl.prod.hclpnp.com:8500/v1/kv/build"

# Create build files based on template file
create_file_from_template "master/build.gradle"
create_file_from_template "bvt/build.gradle"
create_file_from_template "bvt/docker-builds/web/Dockerfile"

###########################
# Update snapshot version #
###########################

# Get the snapshot version for the current branch
CURRENT_VERSION=$(get_consul_value version "9.1-SNAPSHOT")
echo "Current snapshot version: '$CURRENT_VERSION'"
NEXUSURL=`curl http://v9-jenkinshcl.prod.hclpnp.com:8500/v1/kv/build/nexusurl?raw`
echo "$NEXUSURL"

# Update snapshot version in build related files
sed -i "s/__SNAPSHOT_VERSION__/${CURRENT_VERSION}/g" master/build.gradle
sed -i "s/__SNAPSHOT_VERSION__/${CURRENT_VERSION}/g" bvt/docker-builds/web/Dockerfile
sed -i "s/NEXUSURL/${NEXUSURL}/g" bvt/docker-builds/web/Dockerfile

###########################
# Update docker namespace #
###########################

# Get docker namespace for the current branch
DOCKER_NS=$(get_consul_value docker-ns test)
echo "Current docker namespace: '$DOCKER_NS'"

# Update docker namespace in build related files
sed -i "s/__DOCKER_NS__/${DOCKER_NS}/g" bvt/build.gradle

#############################
# Update base certs version #
#############################

# Get base-certs version for the current branch
BASE_CERTS_VERSION=$(get_consul_value base-certs-version "1.0-SNAPSHOT")
echo "Current base certs version: '$BASE_CERTS_VERSION'"

# Update base certs version in build related files
sed -i "s/__BASE_CERTS_VERSION__/${BASE_CERTS_VERSION}/g" bvt/docker-builds/web/Dockerfile

##########################################
# Validate all variables matching __XX__ #
# have been replaced in build files      #
##########################################
validate_file master/build.gradle
validate_file bvt/build.gradle
validate_file bvt/docker-builds/web/Dockerfile
