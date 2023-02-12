import React, { useEffect, useState } from "react";
import { TabProps } from "./components/Tab";
import TabButton from "./components/TabButton";
import { TabNavigation, TabViewContainer, TabBody } from "./styles";

interface Props {
  children?: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
}

const TabView = ({ children }: Props) => {
  const [activeTab, setActiveTab] = useState<
    React.ReactElement | React.ReactElement[]
  >();

  useEffect(() => {
    if (children && children instanceof Array) {
      setActiveTab(children[0]);
    }
  }, [children]);

  const handleTabClicked = (tab: React.ReactElement) => {
    setActiveTab(tab);
  };

  // For all children of this component, render a menu item with the title of that child
  const renderTabButtons = () => {
    if (children instanceof Array) {
      return children.map((tab) => (
        <TabButton
          handleClick={() => handleTabClicked(tab)}
          color={tab.props.color}
          key={`tabButton-${tab.props.title}`}
        >
          <>{tab.props.title}</>
        </TabButton>
      ));
    } else if (children?.props.title) {
      return <p>{children.props.title}</p>;
    } else {
      throw new Error(
        "<TabView> should contain children with a title attribute (such as <Tab>)"
      );
    }
  };

  return (
    <TabViewContainer>
      <TabNavigation>{renderTabButtons()}</TabNavigation>
      <TabBody>{activeTab}</TabBody>
    </TabViewContainer>
  );
};

export default TabView;
