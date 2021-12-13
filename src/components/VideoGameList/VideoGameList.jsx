import React, { Component } from 'react';
import {
    Modal,
    Form,
    Button,
    Container,
    Row,
    Col,
    Card,
  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './VideoGameList.css'


class VideoGameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          videoGames: this.props.videoGames,
          search: '',
          flag: false,
          filterBy: 'title'
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelect = (event) => {
        event.preventDefault()
        this.setState({
            filterBy: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let filteredGames = this.props.videoGames.filter(vg => vg[this.state.filterBy].includes(this.state.search))
        this.setState({
            videoGames: filteredGames,
            flag: true
        })
    }
 
    render() {
        return ( <div>
            <form className='form-group listForm'onSubmit={this.handleSubmit}>
            <label for='searchInput'>Search: </label>
            <input className='input' id='searchInput' name='search' onChange={this.handleChange}></input>
            <select className='listSelect' name="filterBy" onChange={this.handleSelect}>
                <option value="title">Title</option>
                <option value="category">Category</option>
                <option value="system">System</option>
            </select>
            <button className='btn btn-secondary' type="submit">🔎</button>
            </form>
            <Container fluid className='justify-content-center'>
            <Row className='justify-content-center d-flex flex-wrap align-items-center videogame-cards'>
            {this.state.flag === false ?
            this.props.videoGames.map(vg => (
                <Col>
                 <Card className='text-centered' key={Math.random()}>
                    <Card.Body className='overflow'>
                    <Card.Title>{vg.title}</Card.Title>
                    <Card.Text>Description: {vg.description}</Card.Text>
                    <Card.Text>System: {vg.system}</Card.Text>
                    <Card.Subtitle>Price: ${vg.price}</Card.Subtitle>
                    <Card.Text>Category: {vg.category}</Card.Text>
                    </Card.Body>
                    <Link to='/Detail' className='btn btn-primary' onClick={ () => this.props.getVg(vg)} >View Product</Link>
                </Card>
                </Col>)) 
                : 
            this.state.videoGames.map(vg => (
                <Col>
                <Card className='card' key={Math.random()}>
                   <Card.Body className='overflow'>
                   <Card.Title>{vg.title}</Card.Title>
                   <Card.Text>Description: {vg.description}</Card.Text>
                   <Card.Text>System: {vg.system}</Card.Text>
                   <Card.Subtitle>Price: ${vg.price}</Card.Subtitle>
                   <Card.Text>Category: {vg.category}</Card.Text>
                   </Card.Body>
                   <Link to='/Detail' className='btn btn-primary' onClick={ () => this.props.getVg(vg)} >View Product</Link>
               </Card>
               </Col>))} 
                </Row>
                </Container>
        </div>);
    }
}
 
export default VideoGameList
