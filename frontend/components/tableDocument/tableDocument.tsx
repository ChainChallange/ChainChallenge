import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import DocReference from "../docReference/docReference";
import ListCreators from "../listCreators/listCreators";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// Exemplos de componentes para cada seleção
const Component1 = () => <div>Documentation for Component1</div>;
const Component2 = () => <div>Documentation for Component2</div>;
const Component3 = () => <div>Documentation for Component3</div>;

export default function TableDocument() {
  const [open, setOpen] = useState<{
    components: boolean;
    hooks: boolean;
    routes: boolean;
    creator: boolean;
    challenge: boolean;
    applications: boolean;
    applicants: boolean;
    ranking: boolean;
    [key: string]: boolean; // Add index signature
  }>({
    components: false,
    hooks: false,
    routes: false,
    creator: false,
    challenge: false,
    applications: false,
    applicants: false,
    ranking: false,
  });

  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const toggle = (section: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [section]: !prevOpen[section],
    }));
  };

  const handleComponentClick = (component: string) => {
    setSelectedComponent(component);
  };

  return (
    <Tabs.Root
      className="flex gap-2 pl-2 w-screen h-full"
      defaultValue="apiReference"
    >
      <Tabs.List
        className="flex flex-col items-start gap-1 text-white w-2/6"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="px-2 py-3 rounded-md text-[15px] leading-none text-nowrap text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none cursor-default"
          value="apiReference"
        >
          <h1>API Reference</h1>
        </Tabs.Trigger>
        <Tabs.Trigger value="routes">
          <div
            onClick={() => toggle("routes")}
            className="cursor-pointer flex justify-between items-center gap-16 px-2 py-3 rounded-md text-[15px] leading-none text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none"
          >
            Routes
            {open.routes ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {open.routes && (
            <div className="flex flex-col items-start ml-5 mt-2 text-[#9D9D9D]">
              <div
                className="flex gap-4 items-center w-full cursor-pointer"
                onClick={() => toggle("creator")}
              >
                Creator {open.creator ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.creator && (
                <div className="flex flex-col items-start ml-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleComponentClick("ListCreators")}
                  >
                    List Creators
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleComponentClick("FindCreatorByWallet")}
                  >
                    Find Creator by Wallet
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("FindCreatorByApplicationID")
                    }
                  >
                    Find Creator by Application ID
                  </div>
                </div>
              )}
              <div
                className="flex gap-4 items-center cursor-pointer"
                onClick={() => toggle("challenge")}
              >
                Challenge{" "}
                {open.challenge ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.challenge && (
                <div className="flex flex-col items-start ml-5 gap-2 text-nowrap">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleComponentClick("ListChallenges")}
                  >
                    List Challenges
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListChallengesByApplicationID")
                    }
                  >
                    List Challenges by Application ID
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListChallengesByCreatorWallet")
                    }
                  >
                    List Challenges by Creator Wallet
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleComponentClick("ListChallengeById")}
                  >
                    Find Challenge by ID
                  </div>
                </div>
              )}
              <div
                className="flex gap-4 items-center cursor-pointer"
                onClick={() => toggle("applications")}
              >
                Applications{" "}
                {open.applications ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.applications && (
                <div className="flex flex-col items-start ml-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleComponentClick("ListApplications")}
                  >
                    List Applications
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListApplicationsByChallenge")
                    }
                  >
                    Find Applications by Challenge
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListApplicationsByChallengeId")
                    }
                  >
                    List Applications by Challenge ID
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick(
                        "ListApplicationsByChallengeIdAndApplicantWallet"
                      )
                    }
                  >
                    List Applications by Challenge ID And Applicant Wallet
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListApplicationsByCreatorWallet")
                    }
                  >
                    List Applications by Creator Wallet
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListApplicationsByApplicantWallet")
                    }
                  >
                    List Applications by Applicant Wallet
                  </div>
                </div>
              )}
              <div
                className="flex gap-4 items-center cursor-pointer"
                onClick={() => toggle("applicants")}
              >
                Applicants{" "}
                {open.applicants ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.applicants && (
                <div className="flex flex-col items-start ml-5  ">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleComponentClick("ListApplicants")}
                  >
                    List Applicants
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListApplicantsByChallengeId")
                    }
                  >
                    List Applicants by Challenge ID
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListApplicantsByWallet")
                    }
                  >
                    Find Applicant by Wallet
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("ListApplicantsByApplicationId")
                    }
                  >
                    Find Applicant by Application ID
                  </div>
                </div>
              )}
              <div
                className="flex gap-4 items-center cursor-pointer"
                onClick={() => toggle("ranking")}
              >
                Ranking {open.ranking ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.ranking && (
                <div className="flex flex-col items-start ml-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleComponentClick("ListRanking")}
                  >
                    List Ranking
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleComponentClick("FindApplicantRankingByWallet")
                    }
                  >
                    Find Applicant Ranking by Wallet
                  </div>
                </div>
              )}
            </div>
          )}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="flex px-5 outline-none" value="apiReference">
        <DocReference />
      </Tabs.Content>
      <Tabs.Content className="px-5 outline-none" value="routes">
        {selectedComponent && (
          <div>
            {selectedComponent === "ListCreators" && (
              <ListCreators
                title={"GET List Creators"}
                objective={"Retrieve a list of all creators."}
                endpoint={"GET /creators"}
                parameters={"None"}
                exampleRequest={`curl --location 'http://localhost:8080/inspect/creators'`}
                exampleResponse={`[
    {
        "wallet": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "challenges_created": 10
    }
]`}
              />
            )}
            {selectedComponent === "FindCreatorByWallet" && (
              <ListCreators
                title={"GET Find Creator By Wallet"}
                objective={
                  "Retrieve details of a creator using their wallet address."
                }
                endpoint={"/creator/wallet/:walletAddress"}
                parameters={"walletAddress: string (required)"}
                exampleRequest={
                  "GET /creator/wallet/0x1234567890abcdef1234567890abcdef12345678"
                }
                exampleResponse={`{
  "status": "success",
  "data": {
    "creatorId": "123",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "name": "John Doe",
    "profileImage": "https://example.com/profile.jpg"
  }
}`}
              />
            )}
            {selectedComponent === "FindCreatorByApplicationID" && (
              <ListCreators
                title={"GET Find Creator By Application ID"}
                objective={
                  "Retrieve details of a creator using their application ID."
                }
                endpoint={"/creator/application/:applicationId"}
                parameters={"applicationId: string (required)"}
                exampleRequest={"GET /creator/application/12345"}
                exampleResponse={`{
  "status": "success",
  "data": {
    "creatorId": "123",
    "applicationId": "12345",
    "name": "John Doe",
    "profileImage": "https://example.com/profile.jpg"
  }
}`}
              />
            )}
            {selectedComponent === "ListChallenges" && (
              <ListCreators
                title={"GET List Challenges"}
                objective={"Retrieve a list of all challenges."}
                endpoint={"/challenges"}
                parameters={"None"}
                exampleRequest={"GET /challenges"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "challengeId": "1",
      "title": "Challenge 1",
      "description": "Description of challenge 1",
      "createdDate": "2023-01-01"
    },
    {
      "challengeId": "2",
      "title": "Challenge 2",
      "description": "Description of challenge 2",
      "createdDate": "2023-02-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListChallengesByApplicationID" && (
              <ListCreators
                title={"GET List Challenges By Application ID"}
                objective={
                  "Retrieve a list of challenges associated with a specific application ID."
                }
                endpoint={"/challenges/application/:applicationId"}
                parameters={"applicationId: string (required)"}
                exampleRequest={"GET /challenges/application/12345"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "challengeId": "1",
      "title": "Challenge 1",
      "description": "Description of challenge 1",
      "createdDate": "2023-01-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListChallengesByCreatorWallet" && (
              <ListCreators
                title={"GET List Challenges By Creator Wallet"}
                objective={
                  "Retrieve a list of challenges created by a specific wallet address."
                }
                endpoint={"/challenges/creator/:walletAddress"}
                parameters={"walletAddress: string (required)"}
                exampleRequest={
                  "GET /challenges/creator/0x1234567890abcdef1234567890abcdef12345678"
                }
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "challengeId": "1",
      "title": "Challenge 1",
      "description": "Description of challenge 1",
      "createdDate": "2023-01-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListChallengeById" && (
              <ListCreators
                title={"GET List Challenge By ID"}
                objective={
                  "Retrieve details of a specific challenge using its ID."
                }
                endpoint={"/challenge/:challengeId"}
                parameters={"challengeId: string (required)"}
                exampleRequest={"GET /challenge/1"}
                exampleResponse={`{
  "status": "success",
  "data": {
    "challengeId": "1",
    "title": "Challenge 1",
    "description": "Description of challenge 1",
    "createdDate": "2023-01-01"
  }
}`}
              />
            )}
            {selectedComponent === "ListApplications" && (
              <ListCreators
                title={"GET List Applications"}
                objective={"Retrieve a list of all applications."}
                endpoint={"/applications"}
                parameters={"None"}
                exampleRequest={"GET /applications"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicationId": "1",
      "challengeId": "1",
      "applicantWallet": "0x1234567890abcdef1234567890abcdef12345678",
      "status": "submitted",
      "submittedDate": "2023-01-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListApplicationsByChallenge" && (
              <ListCreators
                title={"GET List Applications By Challenge"}
                objective={
                  "Retrieve a list of applications for a specific challenge."
                }
                endpoint={"/applications/challenge/:challengeId"}
                parameters={"challengeId: string (required)"}
                exampleRequest={"GET /applications/challenge/1"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicationId": "1",
      "challengeId": "1",
      "applicantWallet": "0x1234567890abcdef1234567890abcdef12345678",
      "status": "submitted",
      "submittedDate": "2023-01-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListApplicationsByChallengeId" && (
              <ListCreators
                title={"GET List Applications By Challenge ID"}
                objective={
                  "Retrieve a list of applications for a specific challenge using its ID."
                }
                endpoint={"/applications/challenge/:challengeId"}
                parameters={"challengeId: string (required)"}
                exampleRequest={"GET /applications/challenge/1"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicationId": "1",
      "challengeId": "1",
      "applicantWallet": "0x1234567890abcdef1234567890abcdef12345678",
      "status": "submitted",
      "submittedDate": "2023-01-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent ===
              "ListApplicationsByChallengeIdAndApplicantWallet" && (
              <ListCreators
                title={"GET List Applications By Challenge ID and Applicant Wallet"}
                objective={
                  "Retrieve a list of applications for a specific challenge and applicant wallet."
                }
                endpoint={
                  "/applications/challenge/:challengeId/applicant/:walletAddress"
                }
                parameters={
                  "challengeId: string (required), walletAddress: string (required)"
                }
                exampleRequest={
                  "GET /applications/challenge/1/applicant/0x1234567890abcdef1234567890abcdef12345678"
                }
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicationId": "1",
      "challengeId": "1",
      "applicantWallet": "0x1234567890abcdef1234567890abcdef12345678",
      "status": "submitted",
      "submittedDate": "2023-01-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListApplicationsByCreatorWallet" && (
              <ListCreators
                title={"GET List Applications By Creator Wallet"}
                objective={
                  "Retrieve a list of applications created by a specific wallet address."
                }
                endpoint={"/applications/creator/:walletAddress"}
                parameters={"walletAddress: string (required)"}
                exampleRequest={
                  "GET /applications/creator/0x1234567890abcdef1234567890abcdef12345678"
                }
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicationId": "1",
      "challengeId": "1",
      "applicantWallet": "0x1234567890abcdef1234567890abcdef12345678",
      "status": "submitted",
      "submittedDate": "2023-01-01"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListApplicationsByApplicantWallet" && (
              <ListCreators
                title={"GET List Applications By Applicant Wallet"}
                objective={
                  "Retrieve a list of applications submitted by a specific wallet address."
                }
                endpoint={"/applications/applicant/:walletAddress"}
                parameters={"walletAddress: string (required)"}
                exampleRequest={
                  "GET /applications/applicant/0x1234567890abcdef1234567890abcdef12345678"
                }
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicationId": "1",
      "challengeId": "1",
      "applicantWallet": "0x1234567890abcdef1234567890abcdef12345678",
      "status": "submitted",
      "submittedDate": "2023-01-01"
    }
  ]
}`}
              />
            )}

            {selectedComponent === "ListApplicants" && (
              <ListCreators
                title={"GET List Applicants"}
                objective={"Retrieve a list of all applicants."}
                endpoint={"/applicants"}
                parameters={"None"}
                exampleRequest={"GET /applicants"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicantId": "1",
      "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
      "name": "John Doe",
      "appliedChallenges": ["1", "2"]
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListApplicantsByChallengeId" && (
              <ListCreators
                title={"GET List Applicants By Challenge ID"}
                objective={
                  "Retrieve a list of applicants for a specific challenge using its ID."
                }
                endpoint={"/applicants/challenge/:challengeId"}
                parameters={"challengeId: string (required)"}
                exampleRequest={"GET /applicants/challenge/1"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicantId": "1",
      "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
      "name": "John Doe"
    }
  ]
}`}
              />
            )}
            {selectedComponent === "ListApplicantsByWallet" && (
              <ListCreators
                title={"GET List Applicants By Wallet"}
                objective={
                  "Retrieve details of an applicant using their wallet address."
                }
                endpoint={"/applicants/wallet/:walletAddress"}
                parameters={"walletAddress: string (required)"}
                exampleRequest={
                  "GET /applicants/wallet/0x1234567890abcdef1234567890abcdef12345678"
                }
                exampleResponse={`{
  "status": "success",
  "data": {
    "applicantId": "1",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "name": "John Doe",
    "appliedChallenges": ["1", "2"]
  }
}`}
              />
            )}
            {selectedComponent === "ListApplicantsByApplicationId" && (
              <ListCreators
                title={"GET Get List Applicants By Application ID"}
                objective={
                  "Retrieve details of an applicant using their application ID."
                }
                endpoint={"/applicants/application/:applicationId"}
                parameters={"applicationId: string (required)"}
                exampleRequest={"GET /applicants/application/12345"}
                exampleResponse={`{
  "status": "success",
  "data": {
    "applicantId": "1",
    "applicationId": "12345",
    "name": "John Doe",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678"
  }
}`}
              />
            )}
            {selectedComponent === "ListRanking" && (
              <ListCreators
                title={"GET Get List Ranking"}
                objective={"Retrieve a ranking list of applicants."}
                endpoint={"/ranking"}
                parameters={"None"}
                exampleRequest={"GET /ranking"}
                exampleResponse={`{
  "status": "success",
  "data": [
    {
      "applicantId": "1",
      "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
      "name": "John Doe",
      "rank": 1,
      "score": 95
    },
    {
      "applicantId": "2",
      "walletAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      "name": "Jane Doe",
      "rank": 2,
      "score": 90
    }
  ]
}`}
              />
            )}
            {selectedComponent === "FindApplicantRankingByWallet" && (
              <ListCreators
                title={"GET Find Applicant Ranking By Wallet"}
                objective={
                  "Retrieve the ranking details of an applicant using their wallet address."
                }
                endpoint={"/ranking/wallet/:walletAddress"}
                parameters={"walletAddress: string (required)"}
                exampleRequest={
                  "GET /ranking/wallet/0x1234567890abcdef1234567890abcdef12345678"
                }
                exampleResponse={`{
  "status": "success",
  "data": {
    "applicantId": "1",
    "walletAddress": "0x1234567890abcdef1234567890abcdef12345678",
    "name": "John Doe",
    "rank": 1,
    "score": 95
  }
}`}
              />
            )}
          </div>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
