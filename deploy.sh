#!/bin/sh

# clean
rm -rf deploy/

# create folders
mkdir deploy
mkdir deploy/config
mkdir deploy/public
mkdir deploy/src
mkdir deploy/src/components
mkdir deploy/src/layouts
mkdir deploy/src/php
mkdir deploy/src/sections
mkdir deploy/vendor

# copy everything
cp -R config/ deploy/config
cp -R public/ deploy/public
cp -R vendor/ deploy/vendor
cp -R src/components deploy/src
cp -R src/layouts deploy/src
cp -R src/php deploy/src
cp -R src/sections deploy/src
cp src/index.html deploy/src/index.html

# remove unnecessary files
find ./deploy -type f -name ".gitignore" -exec rm '{}' \;
find ./deploy -type f -name ".gitkeep" -exec rm '{}' \;
find ./deploy -type f -name "*.log" -exec rm '{}' \;
find ./deploy -type f -name ".DS_Store" -exec rm '{}' \;
find ./deploy -type f -name "*.map" -exec rm '{}' \;
find ./deploy/src -type f -name "*.js" -exec rm '{}' \;
find ./deploy/src -type f -name "*.styl" -exec rm '{}' \;

# set access rights
chmod -R 744 ./deploy/public/assets/images/
chmod 744 ./deploy/public/favicon.ico