#!/bin/sh
ROOTDIR=$PWD

# build container for each language

echo "build cpp container ..."
cd $ROOTDIR/cpp && docker build -t cpp .
echo "building cpp container completed"

echo "build java container ..."
cd $ROOTDIR/java && docker build -t java .
echo "building java container completed"

echo "build python container ..."
cd $ROOTDIR/python && docker build -t python .
echo "building python container completed"

echo "build rust container ..."
cd $ROOTDIR/rust && docker build -t rust .
echo "building rust container completed"
