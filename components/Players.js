import React, { Component } from "react";
import axios from "axios";
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
  CardItem,
  List,
  ListItem,
  Thumbnail,
  Spinner
} from "native-base";

class Players extends React.Component {
  constructor() {
    super();
    this.state = {
      listPlayers: "",
      isLoading: false
      // idTeam: this.props.navigation.getParam("idTeam")
    };
  }

  static navigationOptions = {
    title: "La Liga Teams"
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    var id = this.props.navigation.getParam("idTeam");
    axios
      .get(
        `https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=${id}`
      )
      .then(e => {
        this.setState({
          listPlayers: e.data.player,
          isLoading: false
        });
      });
  }

  allPlayers = () => {
    return this.state.listPlayers.map((val, i) => {
      var idPlayer = val.idPlayer;
      var playerName = val.strPlayer;
      var playerPosisi = val.strPosition;
      var playerPhoto = val.strThumb;
      return (
        <ListItem
          key={i}
          onPress={() => {
            this.props.navigation.navigate("PlayerDetails", {
              idPlayer: idPlayer
            });
          }}
        >
          <Left>
            <Thumbnail source={{ uri: playerPhoto }} />
          </Left>
          <Body>
            <Text>{playerName}</Text>
            <Text note>{playerPosisi}</Text>
          </Body>
        </ListItem>
      );
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.isLoading ? (
              <Spinner />
            ) : this.state.listPlayers ? (
              this.allPlayers()
            ) : (
              <Text />
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default Players;
