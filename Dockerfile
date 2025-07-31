# A production Dockerfile. Not for use as a development environment
# (for that, use MacOS + homebrew, Linux or Windows Subsystem for Linux)

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

# Not "production" yet because we don't want to confuse npm install
# which is very picky about when it will install devDependencies
ENV NODE_ENV=

# Use npm ci for speed. NOTE: this means your developers must agree that anything
# required for the build is a regular dependency, not a devDependency

# Retry once in case npm is having a bad day upstream
RUN npm ci || (echo "Retrying npm ci..." && sleep 10 && npm ci)

# Not until after npm install because developers don't always agree that
# tools required for an asset build are not devDependencies. If you can get to
# agreement on that you can revise to use "npm ci" up above and be done with it
ENV NODE_ENV=production

# Now we're ready for the rest of the project
COPY ./ ./

# Not needed if not in use in this project
ARG APOS_AUTOMATIC_TRANSLATION_PROVIDER
ARG APOS_DEEPL_API_SECRET
ARG APOS_OPENAI_KEY

# Required
ARG APOS_MONGODB_URI

# Either endpoint (for non-AWS S3) or region is required
ARG APOS_S3_ENDPOINT
ARG APOS_S3_REGION

# All required
ARG APOS_S3_BUCKET
ARG APOS_S3_KEY
ARG APOS_S3_SECRET

# Optional. If used, must be the base URL of a CDN that is already configured to stand in front of the S3 bucket
ARG CDN

# Base URL of the site, for constructing internal links, e.g. https://example.com
ARG APOS_BASE_URL

# For a single-site deployment just "prod" is fine
ENV ENV=prod

ENV APOS_AUTOMATIC_TRANSLATION_PROVIDER=${APOS_AUTOMATIC_TRANSLATION_PROVIDER}
ENV APOS_DEEPL_API_SECRET=${APOS_DEEPL_API_SECRET}
ENV APOS_OPENAI_KEY=${APOS_OPENAI_KEY}
ENV APOS_MONGODB_URI=${APOS_MONGODB_URI}
ENV APOS_S3_ENDPOINT=${APOS_S3_ENDPOINT}
ENV APOS_S3_REGION=${APOS_S3_REGION}
ENV APOS_S3_BUCKET=${APOS_S3_BUCKET}
ENV APOS_S3_KEY=${APOS_S3_KEY}
ENV APOS_S3_SECRET=${APOS_S3_SECRET}
ENV CDN=${CDN}
ENV APOS_BASE_URL=${APOS_BASE_URL}

# Static assets should go to uploadfs (S3) for better delivery
ENV APOS_UPLOADFS_ASSETS=1
RUN APOS_BUNDLE=1

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
CMD cd src && node app
