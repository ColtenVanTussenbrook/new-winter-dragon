import React from 'react';
import axios from 'axios';
import { Grid, Segment, Header, Card, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Pepper from '../assets/pepper.png';
import heroimg from '../assets/coolpic.jpg'


// CLIENT SIDE

class Menu extends React.Component { 

  state = { menus: [], categories: { items: []}, cart: [] }

  componentDidMount() {
  //get all data from database using sql query
    axios.get(`/api/active_menu`)
      .then(res =>{
        this.setState({categories: res.data})
    })
  }

  handleAddCart = (id) => {
    this.setState({cart: [...this.state.cart, id]})
  }

  checkout = () => {
    this.props.history.push({
      pathname: '/cart',
      state: { cart: [...this.state.cart] }
    })
  }

  displayMenu = () => {
    let menu = []
    for (let i = 0; i < this.state.categories.length; i++) {
      menu.push(
        <div>
          <Grid centered>
          <Header as='h2'>{this.state.categories[i].category.name}</Header>
            <Grid.Row columns={4}>
                  {this.state.categories[i].items.map(i => {
                    return (
                        <Grid.Column>
                          <Card style={{margin: '0px 0px 25px 0px'}}>
                            <Card.Content>
                              <Card.Content>
                                <div style={{float: 'right'}}>
                                { i.spice ? <img src={Pepper} style={{height: '20px', width: '20px'}}/> : <p></p> }
                                </div>
                              </Card.Content>
                              <Card.Header>{i.name}</Card.Header>
                              <Card.Meta>${i.price}</Card.Meta>
                              <Button 
                                positive
                                content="Add To Cart"
                                onClick={() => this.handleAddCart(i.id)}
                              />
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                    )
                  })
                }
            </Grid.Row>
          </Grid>
        </div>
      )
    }
    return menu
  }

  render() {
    // debugger
    return (
      <div>
        <div>
            <Hero>
              <h1 style={{fontSize: '50px'}}>ORDER ONLINE</h1>
            </Hero>
          <div style={{margin: '25px'}}>
                {this.displayMenu()}
                <Button
                  positive 
                  content="Checkout"
                  onClick={this.checkout}
                />
          </div>
        </div>
      </div>
    )
  }

}  

//temporary styles
const Section = styled.div`
  margin: 10% 15%
`
const Hero = styled.div`
background-image: url(${heroimg});
text-align: center;
color: white;
min-height: 200px;
padding: 265px 0px;
height: 100% !important;
position: relative;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`

export default Menu;