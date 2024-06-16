# ChainChallenge

## Context

Chainchallenge is a decentralized platform for testing programming. In it, anyone can create challenges, define application rules and apply for challenges, having their results saved related to their portfolio and in a global ranking on the platform. Chainchallenge's biggest difference from other platforms is taking advantage of the benefits of decentralization, security and integrity of the blockchain in conjunction with the verifiable computation offered by Cartesi, which guarantees the honest and verifiable execution of submitted scripts and their results.

This project was developed at the Cartesi Hackaton at Inteli between 06/07/2024 and 06/16/2024 by the students:

- Rafael Techio
- Yago Matos Lopes
- Samuel Lucas de Almeida
- Tony Jonas
- Heitor Candido
  
If you want to go a little further and see more about the construction of our backend and more in depth about the solution's architecture:

**Backend: [CLICK HERE](./backend/README.md)**

If you want to see more about the UX, screens and how our frontend was built: 

**Frontend: [CLICK HERE](./frontend/README.md)**

## Use Cases

With this solution, several contexts can be positively impacted. See some examples:

> A **tech company** wants to take a **technical programming test** without fear of being accused of benefiting candidates.

> An **educational institution** wants to **truthfully administer a Python algorithm test** to its students.

> A **programming competition** needs to ensure the **integrity of submissions** to provide a reward.

> The **programming community** wants to create beginner-level **javascript challenges** for new programmers to practice **without having to be afraid of losing the challenges they create**.

> A **programming super genius** wants to **show off his algorithmic skills in Go without being identified** for now.

> A supreme master of a specific programming language **wants to prove that his traveling salesman algorithm is the most optimized ever made**.

In this way, ChainChallenge aims to solve these and other pain points with security, scalability and decentralization.

## Why Cartesi

Only with Cartesi Rollups Framework is this project possible. Through it, we can run several programming languages ​​that are used in the market TODAY and take advantage of the benefits of blockchain. People would hardly learn solidity and other specific programming languages ​​if there wasn't a huge problem for that. The use of Cartesi's technology reduces this barrier to entry and allows solutions like this, in order to possibly, in the future, allow end users to benefit and not even know about the complexities involved in the process if they don't want to.

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

## System Entities

All system entities have their own characteristics, validation codes and relationships with other entities. Below is a brief description of the entities in our system:

- **Creator**: Creators are the people who create the challenges. Its main identification is the wallet and optionally, an image link and nickname can be inserted.
- **Applicant**: Applicants are the people who submit attempts for the challenges, receive scores and participate in the challenge's local and global rankings on the platform. Its main identification is the wallet and, like the creators, it can optionally have a nickname and an image link.

It is worth mentioning that a creator can also be an applicant, but their records are saved separately. 

- **Challenge**: Challenges created by creators and are questions that can be resolved through application applications. Every challenge can have multiple supported languages ​​and optional submission rules.
- **Application**: Applications are attempts to resolve a challenge and are created by an applicant. They are created using a language supported by the challenge, source code and executed to obtain metrics on the Cartesi Machine.
- **Ranking**: The ranking is separate data, where the applicants with the highest accumulated scores on the platform are listed. In this context, each user has a position.

## Conclusion

This way, through ChainChallenge, we are sure that we have built something really cool for the community here. As seen in our use cases, there are several applications for the project. Furthermore, carrying out dynamic tests is a clear example of the computational power that Cartesi provides for the various blockchains through the Cartesi Rollups Framework, in addition to the verifiability of the codes executed on it, which add value to the results of tests carried out on the system.

We would also like to make it clear that our objective with this project is not to criticize or diminish the work of platforms such as leetcode and hackerrank, but rather to use the best that blockchain technology can provide to boost these and other companies and/or projects. Our blockchain-connected API could be consumed by any other system, this way, other projects like the ones mentioned could easily integrate their already built solutions and take advantage of the benefits of web3.

Once again, we invite you to delve deeper into our solution through the [backend documentatio](./backend/README.md), containing more details on architecture, data structure, communication and application of the cartesi machine, in addition to the [frontend documentation](./frontend/README.md), with more details on how the UX was built.

Finally, we would like to thank the entire Cartesi team, especially Henrique Marlon and Marcus Vinicius for their support and willingness to participate in the masterclass they led. We are very happy with what was done here, and it was a great opportunity to learn more about web3 solutions
