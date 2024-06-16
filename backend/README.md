# ChainChallenge Cartesi Rollups

## Context

Chainchallenge is a decentralized platform for testing programming. In it, anyone can create challenges, define application rules and apply for challenges, having their results saved related to their portfolio and in a global ranking on the platform. Chainchallenge's biggest difference from other platforms is taking advantage of the benefits of decentralization, security and integrity of the blockchain in conjunction with the verifiable computation offered by Cartesi, which guarantees the honest and verifiable execution of submitted scripts and their results.

## How it works

The core functionality of the project, which is the creation of the test file, a file with the functions to be tested, running the test and collecting the results, is only possible thanks to [Cartesi Rollups Framworks](https://docs.cartesi.io/cartesi-rollups/1.3/). Therefore, the system's main business logic follows this line:

1. Anonymous user sends data to the blockchain to create a challenge.

2. The Cartesi Machine, through a listener, identifies the intention to create a challenge.

3. A creator user is searched for in the system by the wallet that sent the request. If not found, a new user is created from the wallet.

3. The tests are identified to be used later and the challenge is saved.

4. Another user submits a challenge application to the blockchain.

5. The Cartesi Machine, through a listener, identifies the application intention.

6. Conditional application business rules related to the challenge are checked.

7. If the application is valid, it is checked whether there is already an applicant with the client's wallet. If not, a new applicant is created related to the language.

8. The code is used in conjunction with the challenge test file and the results are obtained by the system.

9. All information is saved.

10. During any step mentioned, the client can perform an inspection to verify the information already saved.
