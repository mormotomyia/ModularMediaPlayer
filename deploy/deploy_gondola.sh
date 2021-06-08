#!/bin/bash
set -e

repository="servermodule"
buildArgs='--build-arg buildCommand=build-production+gondola'

# oldVersion may be "" if no old version existed.
oldVersion="$(az acr repository show-tags --name emsusignage --repository "$repository" | sort --version-sort | grep gondola | tail -n 3 | head -n 1 | sed 's/"//g; s/ //g; s/,//g ')"

echo "Found old Version: >>$oldVersion<<"
read -ep " > Choose different old version: " -i "$oldVersion" oldVersion

# New Version generated automatically?
newVersion="${oldVersion:-0.0.1.gondola}"

# Prompt the user for a new version number, preload if possible
echo "Found old Version: >>$oldVersion<<"
read -ep " > New version number: " -i "$newVersion" newVersion
echo "Understood new Version: >>$newVersion<<"

echo "PULLing from emsusignage.azurecr.io (if possible), then BUILDing"
if [ -n "$oldVersion" ]
then
  echo "building with cache"
  docker pull emsusignage.azurecr.io/$repository:$oldVersion
  docker build --cache-from emsusignage.azurecr.io/$repository:$oldVersion \
    $buildArgs \
    -f "./Dockerfile.deployment" \
    -t "emsusignage.azurecr.io/$repository:$newVersion" ".."
  echo "build with cache"
else
  docker build $buildArgs -f "./Dockerfile.deployment" -t "emsusignage.azurecr.io/$repository:$newVersion" ".."
fi

read -p "Press enter to push or Ctrl-C to not-push"
echo "PUSHing to emsusignage.azurecr.io"
docker push "emsusignage.azurecr.io/$repository:$newVersion"

#end;
