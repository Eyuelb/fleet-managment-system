import React, { useState, ReactNode } from "react";
import { SegmentedControl } from "@mantine/core";

interface Tab {
  label: string;
  value: string;
  component: () => ReactNode;
}

interface TabSwitcherProps {
  data: Tab[];
}

function TabContent({
  selectedTab,
  data,
}: {
  selectedTab: string;
  data: Tab[];
}) {
  const { component: SelectedComponent } = data.find(
    (item) => item.value === selectedTab
  ) || { component: () => null };
  return <SelectedComponent />;
}

export function TabSwitcher({ data }: TabSwitcherProps) {
  const [selectedTab, setSelectedTab] = useState(data[0].value);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <SegmentedControl
          value={selectedTab}
          onChange={handleTabChange}
          data={data.map(({ label, value }) => ({ label, value }))}
          size="xs"
          variant="outline"
        />
      </div>
      <div className="p-2">
        <TabContent selectedTab={selectedTab} data={data} />
      </div>
    </div>
  );
}
