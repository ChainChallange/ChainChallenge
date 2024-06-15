# syntax=docker.io/docker/dockerfile:1

# Build stage: includes resources necessary for installing dependencies
# If any needed dependencies rely on native binaries, you must use 
# a riscv64 image such as cartesi/node:20-jammy for the build stage,
# to ensure that the appropriate binaries will be generated.
FROM node:20.8.0-bookworm as build-stage

WORKDIR /opt/cartesi/dapp
COPY . .
RUN yarn install && yarn build

# Runtime stage: produces final image that will be executed
# Here the image's platform MUST be linux/riscv64.
# Give preference to small base images, which lead to better start-up
# performance when loading the Cartesi Machine.
FROM --platform=linux/riscv64 cartesi/node:20.8.0-jammy-slim

ARG MACHINE_EMULATOR_TOOLS_VERSION=0.14.1
ADD https://github.com/cartesi/machine-emulator-tools/releases/download/v${MACHINE_EMULATOR_TOOLS_VERSION}/machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb /
RUN dpkg -i /machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb \
  && rm /machine-emulator-tools-v${MACHINE_EMULATOR_TOOLS_VERSION}.deb

LABEL io.cartesi.rollups.sdk_version=0.6.0
LABEL io.cartesi.rollups.ram_size=128Mi

ARG DEBIAN_FRONTEND=noninteractive
RUN set -e \
  && apt-get update \
  && apt-get install -y --no-install-recommends \
  busybox-static=1:1.30.1-7ubuntu3 \
  python3-pip \
  golang-go \
  && rm -rf /var/lib/apt/lists/* /var/log/* /var/cache/* \
  && useradd --create-home --user-group dapp \
  && echo "dapp ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

ENV PATH="/opt/cartesi/bin:${PATH}"

WORKDIR /opt/cartesi/dapp

COPY babel.config.js .
COPY jest.setup.js .
COPY ./cartesi_machine/package.json .

RUN pip install pytest
RUN npm install jest --global
RUN yarn
# RUN go mod init chainchallenge

# Copy the built application from the build stage
COPY --from=build-stage /opt/cartesi/dapp/dist .


# Grant write permissions to the user 'dapp' for all files and directories
RUN chown -R dapp:dapp /opt/cartesi/dapp
RUN chmod -R 755 /opt/cartesi/dapp
RUN chown -R dapp:dapp /opt
RUN chmod -R 755 /opt



ENV ROLLUP_HTTP_SERVER_URL="http://127.0.0.1:5004"
ENTRYPOINT ["rollup-init"]
USER dapp
CMD ["node", "index.js"]
