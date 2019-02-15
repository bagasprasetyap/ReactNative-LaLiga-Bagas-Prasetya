import React from "react";
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

class Teams extends React.Component {
  constructor() {
    super();
    this.state = {
      listTeams: [],
      isLoading: false
    };
  }

  static navigationOptions = {
    title: "La Liga Teams"
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    axios
      .get(
        "https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?s=Soccer&c=Spain"
      )
      .then(e => {
        this.setState({
          listTeams: e.data.teams,
          isLoading: false
        });
      });
  }

  allTeams = () => {
    return this.state.listTeams.map((val, i) => {
      var idTeam = val.idTeam;
      var teamName = val.strTeam;
      var teamWeb = val.strWebsite;
      var teamAva = val.strTeamBadge;
      return (
        <ListItem
          key={i}
          onPress={() => {
            this.props.navigation.navigate("Players", {
              idTeam: idTeam
            });
          }}
        >
          <Left>
            <Thumbnail source={{ uri: teamAva }} />
          </Left>
          <Body>
            <Text>{teamName}</Text>
            <Text note>{teamWeb}</Text>
            {/* <Text note>{idTeam}</Text> */}
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
            ) : this.state.listTeams ? (
              this.allTeams()
            ) : (
              <Text />
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default Teams;
