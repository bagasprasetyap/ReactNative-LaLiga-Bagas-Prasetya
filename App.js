import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Alert } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Text,
  Footer,
  Form,
  Item,
  Label,
  Input,
  Button,
  Card,
  CardItem
} from "native-base";
import Teams from "./components/Teams";
import Players from "./components/Players";
import PlayerDetails from "./components/PlayerDetails";

var AppNavigator = createStackNavigator(
  {
    Teams: Teams,
    Players: Players,
    PlayerDetails: PlayerDetails
  },
  {
    initialRouteName: "Teams"
  }
);

export default createAppContainer(AppNavigator);
