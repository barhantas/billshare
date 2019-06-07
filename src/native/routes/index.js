import React from "react";
import { Scene, Tabs, Stack } from "react-native-router-flux";
import { Icon } from "native-base";

import DefaultProps from "../constants/navigation";
import AppConfig from "../../constants/config";

import Home from "../components/Home";
import CreateBill from "../components/CreateBill";
import BillList from "../components/BillList";

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="billList"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="list" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="billList" component={BillList} />
        </Stack>
        <Stack
          key="createBill"
          title={AppConfig.appName.toUpperCase()}
          icon={() => (
            <Icon type="SimpleLineIcons" name="plus" {...DefaultProps.icons} />
          )}
          {...DefaultProps.navbarProps}
        >
          <Scene key="createBill" component={CreateBill} />
        </Stack>
        <Stack
          key="chat"
          title={AppConfig.appName.toUpperCase()}
          icon={() => (
            <Icon type="Entypo" name="chat" {...DefaultProps.icons} />
          )}
          {...DefaultProps.navbarProps}
        >
          <Scene key="chat" component={Home} />
        </Stack>
      </Tabs>
    </Scene>
  </Stack>
);

export default Index;
