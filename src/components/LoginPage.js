import React, { Component } from 'react';
import { Button,CardImg , Card, CardBody, CardGroup, Col,
          Container, Form, Input, InputGroup,
            InputGroupAddon, InputGroupText, Row ,Alert} from 'reactstrap';
import { Mutation } from "react-apollo";
import '../App.css'
import barac from '../barac.png'
import LOGIN_MUTATION from '../graphql/mutation'

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      username:"",
      password:"",
      visible:false
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onShowAlert = ()=>{
    this.setState({visible:true},()=>{
      setTimeout(()=>{
        this.setState({visible:false})
      },2000)
    });
  }
  render() {
    const { password, username} = this.state
    return ( 
      <div className="flex-row align-items-center py-lg-xl">
        
        <Col md="9">
        </Col>
        <Container>
          <Row className="justify-content-center " >
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardImg    src={barac} top width="50%"  className=" avatar-lg rounded-circle" alt="barac logo"/>
                  <CardBody>
                  <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
                  {(loginUser, { loading, error ,data}) => {
                    if (loading) return 'Loading...'; 
                    if(error)console.log(error.message)
                    if( loading && !data){
                      return <Alert color="danger">
                                Email Or Password Is Not Correct!
                              </Alert>
                    }
                    if(data){
                      console.log(data)
                     // localStorage.setItem('jwt', data.apollome.jwt);
                    }
                    return (
                    <Form
                        onSubmit={e => {
                          //window.location.reload();
                          loginUser();
                     }}>
                      <h1>Login</h1>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email"  placeholder="Email"  onChange={e => this.handleChange} required/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-bag"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={e => this.handleChange} required/>
                      </InputGroup>
                      
                      <Row>
                        <Col xs="6">
                          <Button color="danger" className="px-4">Login</Button>
                        </Col>
                        {error ? <Alert color="danger" >
                          <b className='alertme'>Email Or Password Is Not Correct!</b>
                        </Alert > : ""}
                      </Row>
                    </Form>)
                     }}
                     </Mutation>
                  </CardBody>
                </Card>
               
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
        
    );
  }
}

export default Login;