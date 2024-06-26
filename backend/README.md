# ChainChallenge Cartesi Rollups

## Context

Chainchallenge is a decentralized platform for testing programming. In it, anyone can create challenges, define application rules and apply for challenges, having their results saved related to their portfolio and in a global ranking on the platform. Chainchallenge's biggest difference from other platforms is taking advantage of the benefits of decentralization, security and integrity of the blockchain in conjunction with the verifiable computation offered by Cartesi, which guarantees the honest and verifiable execution of submitted scripts and their results.

This is the documentation for the application's backend, using the Cartesi Rollups Framework. Here you can see details about
- How to start the back end
- How the backend was built
- Architectural Details
- Data stored
- Information transmitted

## How Start the Backend

You can launch the backend in two ways. One is more recommended for development/testing while the other is more recommended for production. We're using the [Cartesi Docs](https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/) as principal font. Below, we will address both ways.

It is important to note that you will first need [Docker](https://www.docker.com/), [Yarn](https://classic.yarnpkg.com/lang/en/docs/) and, if you use Windows, [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

### Development/Test with Nonodo

To test the application, we recommend the approach of using the nonodo. It is a package that simulates a blockchain on your computer and is much faster than other alternatives.


#### **Install Languages**

ChainChallenge support some languages. You must install them and some test packages to run:

**Install node v22.2.0**

You can install node.js using the [oficial docs](https://nodejs.org/en/download/package-manager/current), or using n:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install node
```

**Install jest**
```
npm i -g jest
```

**Install Python 3.10.12 and Pip**

You can also [see the docs](https://www.python.org/)

```
sudo apt update
```

```
sudo apt install python3 python3-pip
```

```
python3 --version
```

**Install Pytest**

```
pip3 install pytest
```

**Install Go version go1.18.1**

If you have difficulties, [see the docs](https://go.dev/):

```
sudo apt install golang-go
```

#### **Install Foundry**

You can also [see the docs](https://book.getfoundry.sh/anvil/)

```
curl -L https://foundry.paradigm.xyz | bash
```

**Configure Foundry**

In a new terminal:

```
foundryup
```

#### **Install Nonodo**

Nonodo will help us to simulate our API with blockchain. You can see the [docs](https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/#install-nonodo) for more details and installation.

```
npm i -g nonodo
```


Now you are ready to run the application. Open two terminals inside the backend folder of this cloned repository on your computer. If you have difficulties, [see the docs](https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/)

In the first terminal, run the command:

```
nonodo
```

If you see your terminal window like this:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/d1e6aac7-64ed-4ac4-bf35-233b26b89ba5)

everything went well.


In the second one, run the command:

```
yarn
```

to install the dependences and start the project:

```
yarn run start
```

If you see your terminal window like this:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/537e2b6b-5974-494c-9126-5f6ee3d00cd1)

everything went well.

### Development/Production with Cartesi Cli

To run your project with cartesi cli, first install cartesi cli with this command, or [see the docs](https://docs.cartesi.io/cartesi-rollups/1.3/development/installation/):

```
npm install -g @cartesi/cli
```

Then, build the application with this command, or [see the docs](https://docs.cartesi.io/cartesi-rollups/1.3/development/building-the-application/)

```
cartesi build
```

Finally, run the application with this command, or [see the docs](https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/)

```
cartesi run
```

### Testing

In the third one, you can send a generic request to test the application:

```
cartesi send generic
```

Enter for all options until the last one, where you must place the input (string). In this step, copy the minified json from [this link](./docs/inputs/createMinimalChallenge.json), insert it into the terminal and press enter to complete the request. If everithing went well, you should see this:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/8b8b6bc5-bb0c-44cd-a40a-9ec26c1dbdbd)

Also monitor the logs on the node or execution of the cartesi machine to verify that no errors occurred.


## Payloads

### Inspects

To check inspect routes, see [postman export](./docs/inspects/inspects-postman.json) that we made. We have prepared a series of inspections for each entity to cover most of our API use cases:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/6d6741b5-c668-4f0b-90be-48d6b4e6691a)


### Advanced States

For advanced states requests, we prepared these methods:

- **challenge**: To create a challenge
- **application**: To apply to a challenge
- **creator_update**: To update a creator info
- **applicant_update**: To update a applicant
- **challenge_update**: To update a challenge

So, the payload must have these two field:

```
{
  "method": "one of the above,
  "data": {
    // Your data here
  }
}
```

Below are the input payloads with optional and mandatory fields, following the typescript notation of interfaces. If you prefer, you can find all supported types of the application in the [project's models folder](./src/models):

- Challenge:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/1b9bbec8-61e6-4cee-9653-cd32455469a2)


- Application:
  
![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/2084cb8e-d3cb-412d-b4ca-c51378cd28ad)


- Creator_update:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/7ae42aa0-6ac9-4352-8609-d7722e7eafbc)


- Applicant_update:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/11cecd80-6fbd-4123-878b-cd3a3701efb4)


- Challenge_update:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/27e59cb6-bbca-4daf-8e11-c0a89c40dd67)

## Data Stored

The data is saved in simple state variables inside the cartesi machine. You can see the database types in [this file](./src/database/IDatabase.ts)

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/377a4644-5c48-4092-8a6c-cfefb6171861)

## Architectural Details

The project architecture was built from an N-layer model. The project folders represent application layers with their responsibilities:

![image](https://github.com/ChainChallange/ChainChallenge/assets/110608373/696774cb-49d4-41ff-be16-c236b64b812d)

