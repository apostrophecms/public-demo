## A production Dockerfile. Not for use as a development environment
# (for that, use MacOS + homebrew, Linux or Windows Subsystem for Linux)

## Required build variables:
# none

## Required environment variables to pass in at runtime (with -e):

# MongoDB connection URI, for database
#
# APOS_MONGODB_URI
#
# AWS S3 or compatible storage, for uploads
#
# APOS_S3_ENDPOINT *OR* APOS_S3_REGION
# APOS_S3_BUCKET
# APOS_S3_KEY
# APOS_S3_SECRET

# Base URL of the site, for constructing internal links, e.g. https://example.com
# For local testing this can be http://localhost:3000
#
# APOS_BASE_URL

## Optional environment variables to pass at runtime (with -e):

# If used, must be the base URL of a CDN that is already configured to stand in front of the S3 bucket
# CDN

FROM node:20-slim
ENV APOS_MINIFY=1
WORKDIR /app

# Up to date
RUN apt-get update
# Minimal size
RUN apt-get clean

# Dependencies
COPY package* ./
# If any
COPY .npmrc ./.npmrc

# Tell Node.js and apostrophecms to run with production optimizations, less debugging output by default
ENV NODE_ENV=production

# Use npm ci for speed. NOTE: this means your developers must agree that anything
# required for the build is a regular dependency, not a devDependency

# Retry once in case npm is having a bad day upstream
RUN npm ci || (echo "Retrying npm ci..." && sleep 10 && npm ci)

# Now we're ready for the rest of the project
COPY ./ ./

# Generate a unique id for this particular asset build. Not a security issue,
# just distinct from previous builds to avoid stale assets
RUN base64 /dev/urandom | head -c 20 > ./release-id

# Asset build happens once during container build, not when live
RUN node app @apostrophecms/asset:build

# Minimize container image size
RUN rm -rf data/temp
RUN npm cache clean --force

# As always EXPOSE doesn't really do anything, just a memo that port 3000 is
# what you should expose
EXPOSE 3000

# Run a single process. You should load-balance more than one of this container, both per
# available core and on separate servers, for availability and scalability
CMD node app
