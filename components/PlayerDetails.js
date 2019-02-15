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

class PlayerDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      playerDetails: "",
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
    var idP = this.props.navigation.getParam("idPlayer");
    axios
      .get(
        `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${idP}`
      )
      .then(e => {
        this.setState({
          playerDetails: e.data.players,
          isLoading: false
        });
      });
  }

  detailPlayers = () => {
    return this.state.playerDetails.map((val, i) => {
      var idPlayer = val.idPlayer;
      var playerName = val.strPlayer;
      var playerPhoto = val.strThumb;
      var playerNation = val.strNationality;
      var playerBio = val.strDescriptionEN;
      return (
        <ListItem key={i}>
          <Left>
            <Thumbnail source={{ uri: playerPhoto }} />
          </Left>
          <Body>
            <Text>{playerName}</Text>
            <Text note>{playerNation}</Text>
          </Body>
          <Content>
            <Text>{playerBio}</Text>
          </Content>
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
            ) : this.state.playerDetails ? (
              this.detailPlayers()
            ) : (
              <Text />
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default PlayerDetails;
