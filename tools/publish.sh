#!/bin/bash
cd $(dirname $0)/../packages
find * -prune -type d | ( while IFS= read -r d; do
  (
    cd $d
    if [ -d "dist" ]; then
      cd dist
    fi
    PKG_VERSION=`node -p "require('./package.json').version"`
    yarn publish --new-version $PKG_VERSION
  ) &
done
wait
)
