import React, {useState} from 'react';
import Simulation from '../components/Simulation';
import './home.css'
import {Form, Row, Col, Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

const Home = () => {
    const [bodies, setBodies] = useState([
        {x: 1000, y: 1000, vx: 200, vy: 0, mu: 10, size: 5},
      ]);
      const [ dt, setDT ] = React.useState(500);
      const [ speed, setSpeed ] = React.useState(500);
      const handleButtonClick = () => {
        // const newBody = {
        //     x: 10000,
        //     y: 10000,
        //     vx: 5,
        //     vy: 5,
        //     mu: 10000,
        //     size: 5
        //     };
            
            setBodies([bodies]);

    };

    return (
        <div className='home'>
            <h1>
                <b>Particle N-Body Simulator</b>
            </h1>
            <h4>
                Simulate the N-Body gravitational problem and collisions on your browser using Euler's integration and D3 JS!
            </h4>
            <h3>
                <b>How to use the Simulator</b>
            </h3>
            <div className='bodyText'>
                <body>
                    Click on the simulation screen to create a particle. To make the particle move, simply click on the screen,
                    and drag your mouse back to make the particle move in the opposite direction.
                    Similar to an elastic band.
                </body>
                <body>
                    Simply press 'RESET' to restart the simulation to it's default initial position. Note that the simulation uses D3.js to
                    render and animate the points. Adding too many points will result in lag and performance loss.
                </body>
            </div>
            <div className='inputs'>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Time Step (sec):            
                            </Form.Label>
                            <br></br>
                            <RangeSlider
                                value={dt}
                                onChange={e => setDT(e.target.value)}
                                min='1'
                                max='500'
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Simulation Speed (x):            
                            </Form.Label>
                            <br></br>
                            <RangeSlider
                                value={speed}
                                onChange={e => setSpeed(e.target.value)}
                                min='1'
                                max='1000'
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            
      </div>
            <Simulation DT = {dt} SPEED = {speed}/>
            <br></br>
            <Button
                variant='outline-primary'
                onClick={handleButtonClick}>
                    RESET
            </Button>

        </div>
    );
}

export default Home;