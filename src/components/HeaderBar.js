import React, { Component } from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import MenuBar from "./MenuBar";

export default class HeaderBar extends Component {
  render() {
    return (
      <Segment basic>
        <Grid stackable>
          <Grid.Column width={3}>
            <Image
              as="a"
              href="/"
              src="logo-desktop.svg"
              size="medium"
              wrapped
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center" width={5}>
            <Header color="blue" as="h2">
              Digital Growth Charts Demo
            </Header>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={8}>
            <MenuBar />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
