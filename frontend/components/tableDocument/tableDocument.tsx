import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import DocReference from '../docReference/docReference';
import ListCreators from '../listCreators/listCreators';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

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

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

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
    <Tabs.Root className="flex gap-2 pl-2 w-screen h-full" defaultValue="apiReference">
      <Tabs.List className="flex flex-col items-start gap-1 text-white w-2/6" aria-label="Manage your account">
        <Tabs.Trigger
          className="px-2 py-3 rounded-md text-[15px] leading-none text-nowrap text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none cursor-default"
          value="apiReference"
        >
          <h1>Api Reference</h1>
        </Tabs.Trigger>
        <Tabs.Trigger value="components">
          <div
            onClick={() => toggle('components')}
            className="cursor-pointer flex justify-between items-center gap-16 px-2 py-3 rounded-md text-[15px] leading-none text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none"
          >
            Components
            {open.components ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {open.components && (
            <div className="ml-5 mt-2 text-[#9D9D9D]">
              <div
                className="cursor-pointer"
                onClick={() => handleComponentClick('Component1')}
              >
                &lt;Component1 /&gt;
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleComponentClick('Component2')}
              >
                &lt;Component2 /&gt;
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleComponentClick('Component3')}
              >
                &lt;Component3 /&gt;
              </div>
            </div>
          )}
        </Tabs.Trigger>
        <Tabs.Trigger value="routes">
          <div
            onClick={() => toggle('routes')}
            className="cursor-pointer flex justify-between items-center gap-16 px-2 py-3 rounded-md text-[15px] leading-none text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none"
          >
            Routes
            {open.routes ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {open.routes && (
            <div className="flex flex-col items-start ml-5 mt-2 text-[#9D9D9D]">
              <div className="flex gap-4 items-center w-full cursor-pointer" onClick={() => toggle('creator')}>
                Creator {open.creator ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.creator && (
                <div className="flex flex-col items-start ml-5">
                  <div className="cursor-pointer" onClick={() => handleComponentClick('ListCreators')}>List Creators</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component2')}>Find Creator by Wallet</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>Find Creator by Application ID</div>
                </div>
              )}
              <div className="flex gap-4 items-center cursor-pointer" onClick={() => toggle('challenge')}>
                Challenge {open.challenge ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.challenge && (
                <div className="flex flex-col items-start ml-5">
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Challenges</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Challenges by Application ID</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Challenges by Creator Wallet</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>Find Challenge by ID</div>
                </div>
              )}
              <div className="flex gap-4 items-center cursor-pointer" onClick={() => toggle('applications')}>
                Applications {open.applications ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.applications && (
                <div className="flex flex-col items-start ml-5">
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Applications</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>Find Applications By Challenge</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Applications by Challenge ID</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Applications by Challenge ID And Applicant Wallet</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Applications by Creator Wallet</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Applications by Applicant Wallet</div>
                </div>
              )}
              <div className="flex gap-4 items-center cursor-pointer" onClick={() => toggle('applicants')}>
                Applicants {open.applicants ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.applicants && (
                <div className="flex flex-col items-start ml-5  ">
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Applicants</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Applicants by Challenge ID</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>Find Applicant by Wallet</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>Find Applicant by Application ID</div>
                </div>
              )}
              <div className="flex gap-4 items-center cursor-pointer" onClick={() => toggle('ranking')}>
                Ranking {open.ranking ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {open.ranking && (
                <div className="flex flex-col items-start ml-5">
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>List Ranking</div>
                  <div className="cursor-pointer" onClick={() => handleComponentClick('Component3')}>Find Applicant Ranking by Wallet</div>
                </div>
              )}
            </div>
          )}
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="flex px-5 outline-none"
        value="apiReference"
      >
        <DocReference />
      </Tabs.Content>
      <Tabs.Content
        className="px-5 outline-none"
        value="components"
      >
        {selectedComponent && (
          <div>
            {selectedComponent === 'Component1' && <Component1 />}
            {selectedComponent === 'Component2' && <Component2 />}
            {selectedComponent === 'Component3' && <Component3 />}
          </div>
        )}
      </Tabs.Content>
      <Tabs.Content
        className="px-5 outline-none"
        value="routes"
      >
        {selectedComponent && (
          <div>
            {selectedComponent === 'ListCreators' && <ListCreators />}
            {selectedComponent === 'Component2' && <Component2 />}
            {selectedComponent === 'Component3' && <Component3 />}
          </div>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
