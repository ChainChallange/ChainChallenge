import React from 'react';

type ListCreatorsProps = {
  title: string;
  objective: string;
  endpoint: string;
  parameters: string;
  exampleRequest: string;
  exampleResponse: string;
};

const ListCreators = ({ title, objective, endpoint, parameters, exampleRequest, exampleResponse }: ListCreatorsProps) => {
  return (
    <div className="text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-6">{title}</h1>
      
      <div className="mt-4">
        <h2 className="text-xl font-bold">Objective</h2>
        <p className="pt-4">{objective}</p>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold">Details</h2>
        <ul className="list-disc pl-4">
          <li><strong>Endpoint:</strong> <code>{endpoint}</code></li>
          <li><strong>Parameters:</strong> {parameters}</li>
        </ul>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6">Example Request</h2>
        <pre className="bg-gray-800 p-4 rounded-md text-base sm:text-lg">
          <code>
            {exampleRequest}
          </code>
        </pre>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6">Example Response</h2>
        <pre className="bg-gray-800 p-4 rounded-md text-base sm:text-lg">
          <code>
            {exampleResponse}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default ListCreators;
