import React from 'react';
import { Button, Form } from 'semantic-ui-react';

class ItemForm extends React.Component {
  state = { 
      name: '',
      price: '', 
      image: '',
      spice: false,
    }

  componentWillMount () {
    if(this.props.id) {
      this.setState({name: this.props.name, price: this.props.price, image: this.props.image, spice: this.props.spice, id: this.props.id })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, spice, image, id } = this.state;
    if (this.props.id) {
      this.props.editItem(name, price, image, spice, id)
    } else {
      this.props.submit(name, price, image, spice)
    }
    this.setState( {name: '', price: '', spice: false })
  };

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };



  render () {
    const { name, price, spice, image } = this.state;
    return (
      <Form>
        <Form.Field>
          <label>Item Name</label>
          <input 
            name="name"
            title="name"
            value={name}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input 
            name="price"
            title="price"
            value={price}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Spice</label>
          <input 
            name="spice"
            title="spice"
            value={spice}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Image</label> 
          <input 
            name="image"
            title="image"
            value={image}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Button positive onClick={this.handleSubmit}>Add</Button>
      </Form>
      )
    }
}

export default ItemForm;