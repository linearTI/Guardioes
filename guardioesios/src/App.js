import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

//import Anatomy from "./screens/anatomy/";

import SideBar from "./screens/sidebar";
import NewContribution from "./screens/NewContributionView";
import Login from "./screens/LoginView";
import MyContributions from "./screens/MyContributionsView";
import Profile from "./screens/ProfileView";
import Help from "./screens/HelpView";
import RegisterUserView from "./screens/RegisterUserView"
import RecoverPasswordView from "./screens/RecoverPasswordView"
import PresentationView from "./screens/PresentationView"

const Drawer = DrawerNavigator(
  {
    NewContribution: { screen: NewContribution },
    Login: { screen: Login },
    MyContributions: { screen: MyContributions },
    Profile: { screen: Profile },
    RegisterUser: { screen: RegisterUserView },
    RecoverPassword: { screen: RecoverPasswordView },
    Help: { screen: Help },    
    Presentation: { screen: PresentationView },    
  },
  {
    initialRouteName: "NewContribution",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
