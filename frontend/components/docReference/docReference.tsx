import React from 'react';

type ListCreatorsProps = {
  title: string;

};

const DocReference = ({ title }: ListCreatorsProps) => {
  return (
    <div className="text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mb-16">
      <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-6">{title}</h1>
      
      
      <div className="mt-8">
        <h2 className="text-xl font-bold">How Start the Backend</h2>
        <p>You can launch the backend in two ways. One is more recommended for development/testing while the other is more recommended for production. We're using the <a href="https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/">Cartesi Docs</a> as principal font. Below, we will address both ways.</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Development/Test with Nonodo</h3>
        <p>To test the application, we recommend the approach of using the nonodo. It is a package that simulates a blockchain on your computer and is much faster than other alternatives.</p>
        
        <h4 className="text-lg font-bold mt-4">Install Languages</h4>
        <p>ChainChallenge supports some languages. You must install them and some test packages to run:</p>
        <ul className="list-disc pl-4">
          <li><strong>Install node v22.2.0:</strong> You can install node.js using the <a href="https://nodejs.org/en/download/package-manager/current">official docs</a>, or using n:</li>
          <pre>
            <code>
              teste
            </code>
          </pre>
          <li><strong>Install jest:</strong> <code>npm i -g jest</code></li>
          <li><strong>Install Python 3.10.12 and Pip:</strong> You can also <a href="https://www.python.org/">see the docs</a></li>
          <pre>
            <code>
              sudo apt update
              sudo apt install python3 python3-pip
              python3 --version
            </code>
          </pre>
          <li><strong>Install Pytest:</strong> <code>pip3 install pytest</code></li>
          <li><strong>Install Go version go1.18.1:</strong> If you have difficulties, <a href="https://go.dev/">see the docs</a></li>
          <pre>
            <code>
              sudo apt install golang-go
            </code>
          </pre>
        </ul>
        
        <h4 className="text-lg font-bold mt-4">Install Foundry</h4>
        <p>You can also <a href="https://book.getfoundry.sh/anvil/">see the docs</a></p>
        <pre>
          <code>
            curl -L https://foundry.paradigm.xyz | bash
          </code>
        </pre>
        
        <h4 className="text-lg font-bold mt-4">Configure Foundry</h4>
        <p>In a new terminal:</p>
        <pre>
          <code>
            foundryup
          </code>
        </pre>
        
        <h4 className="text-lg font-bold mt-4">Install Nonodo</h4>
        <p>Nonodo will help us to simulate our API with blockchain. You can see the <a href="https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/#install-nonodo">docs</a> for more details and installation.</p>
        <pre>
          <code>
            npm i -g nonodo
          </code>
        </pre>
        
        <p>Now you are ready to run the application. Open two terminals inside the backend folder of this cloned repository on your computer. If you have difficulties, <a href="https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/">see the docs</a></p>
        
        <p>In the first terminal, run the command:</p>
        <pre>
          <code>
            nonodo
          </code>
        </pre>
        
        <p>In the second one, run the command:</p>
        <pre>
          <code>
            yarn
            yarn run start
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Development/Production with Cartesi Cli</h3>
        <p>To run your project with cartesi cli, first install cartesi cli with this command, or <a href="https://docs.cartesi.io/cartesi-rollups/1.3/development/installation/">see the docs</a></p>
        <pre>
          <code>
            npm install -g @cartesi/cli
          </code>
        </pre>
        
        <p>Then, build the application with this command, or <a href="https://docs.cartesi.io/cartesi-rollups/1.3/development/building-the-application/">see the docs</a></p>
        <pre>
          <code>
            cartesi build
          </code>
        </pre>
        
        <p>Finally, run the application with this command, or <a href="https://docs.cartesi.io/cartesi-rollups/1.3/development/running-the-application/">see the docs</a></p>
        <pre>
          <code>
            cartesi run
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Testing</h3>
        
        <p>In the third one, you can send a generic request to test the application:</p>
        <pre>
          <code>
            cartesi send generic
          </code>
        </pre>
        
        <p>Enter for all options until the last one, where you must place the input (string). In this step, copy the minified json from <a href="./docs/inputs/createMinimalChallenge.json">this link</a>, insert it into the terminal and press enter to complete the request. If everything went well, you should see this:</p>
        <img src="https://github.com/ChainChallange/ChainChallenge/assets/110608373/8b8b6bc5-bb0c-44cd-a40a-9ec26c1dbdbd" alt="example-response" className="mt-4 mb-4" />

        <p>Also monitor the logs on the node or execution of the cartesi machine to verify that no errors occurred.</p>
      </div>
      
      
    </div>
  );
}

export default DocReference;
