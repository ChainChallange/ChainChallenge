import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import DocReference from '../docReference/docReference';
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
    [key: string]: boolean; // Add index signature
  }>({
    components: false,
    hooks: false,
    routes: false,
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
      <Tabs.List className="flex flex-col items-start gap-1 text-white w-1/6" aria-label="Manage your account">
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
        <Tabs.Trigger
          className="px-2 py-3 rounded-md text-[15px] leading-none text-white select-none hover:bg-gray-700 data-[state=active]:bg-gray-600 data-[state=active]:font-bold outline-none cursor-default"
          value="routes"
        >
          Routes
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
            {selectedComponent === 'Component2' && <DocReference />}
            {selectedComponent === 'Component3' && <Component3 />}
          </div>
        )}
      </Tabs.Content>
      <Tabs.Content
        className="px-5 outline-none"
        value="routes"
      >
        {/* Conteúdo de Routes */}
        <div>
          <h2 className="text-2xl font-bold">Routes Documentation</h2>
          <p>This is the documentation for Routes.</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
