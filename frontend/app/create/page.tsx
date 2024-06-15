// import Navbar from "@/components/navbar/navbar"; 
import Steps from "@/components/createSteps/createSteps";
import ProblemDetails from "@/components/createProblemDetails/createProblemDetails";
import Applications from "@/components/createApplications/createApplications";
import Languages from "@/components/createLanguages/createLanguages";
import ShowCode from "@/components/createApplications/createApplications";

const CreateChallenge: React.FC = () => {
  const steps = [
    {
      label: 'Challenge Details',
      content: (
        <div>
          <ProblemDetails />
          <Applications />
        </div>
      ),
    },
    { label: 'Languages', content: <Languages /> },
    { label: 'Testcases', content: <ShowCode /> },
  ];

  return (
    <div className="create-challenge-page bg-[#121418] min-h-screen text-white">
      {/* <Navbar /> */}
      <div className="container mx-auto p-4">
        <Steps steps={steps} />
      </div>
    </div>
  );
};

export default CreateChallenge;