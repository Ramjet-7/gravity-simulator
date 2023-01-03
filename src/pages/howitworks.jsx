import React from 'react';
import Latex from 'react-latex';
import './howitworks.css'
import vectorDiagram from '../imageAssets/Vector_subtraction.png'
const G = `$= 6.67 \\times 10^{-11} \\frac{m^3}{kgs^2}$`
const newton_law = ` $F = \\frac{GM_1M_2}{r^2}$ `;
const newton_law_vec = ` $$\\vec F = \\frac{GM_1M_2\\hat r}{r^2}$$ `;
const unit_vector = ` $\\hat r = \\frac{\\vec r}{r}$ `
const newton_law_vec_main = `$$\\tag{1} \\vec a = \\frac{GM\\vec r}{r^3}$$ `;
const newton_law_vec_main2 = `$$\\tag{1.a} \\vec a_2 = \\frac{GM_1(\\vec r_1 - \\vec r_2)}{||\\vec r_1 - \\vec r_2||^3}$$ `;
const newton_law_vec_main3 = `$$\\tag{1.b} \\vec a_1 = \\frac{GM_2(\\vec r_2 - \\vec r_1)}{||\\vec r_2 - \\vec r_1||^3}$$ `;
const nBodyExample = `$$\\tag{2} \\vec a_1 = \\frac{GM_2(\\vec r_2 - \\vec r_1)}{||\\vec r_2 - \\vec r_1||^3} + 
\\frac{GM_3(\\vec r_3 - \\vec r_1)}{||\\vec r_3 - \\vec r_1||^3}$$`;
const nBodyExample2 = `$$\\vec a_2 = \\frac{GM_1(\\vec r_1 - \\vec r_2)}{||\\vec r_1 - \\vec r_2||^3} + 
\\frac{GM_3(\\vec r_3 - \\vec r_2)}{||\\vec r_3 - \\vec r_2||^3}$$`;
const nBodyExample3 = `$$\\vec a_3 = \\frac{GM_1(\\vec r_1 - \\vec r_3)}{||\\vec r_1 - \\vec r_3||^3} + 
\\frac{GM_2(\\vec r_2 - \\vec r_3)}{||\\vec r_2 - \\vec r_3||^3}$$`;
const nBody = `$$\\tag{3} \\vec a_x = \\sum_{i=1 \\atop i\\neq x}^{n}\\frac{GM_i(\\vec r_i - \\vec r_x)}{||\\vec r_i - \\vec r_x||^3}$$`;
const deriv = `
$\\frac{d}{dt}\\vec r(t) = \\vec v(t)$
`;
const deriv2 = `
$\\frac{d^2}{dt^2}\\vec r(t) = \\vec a(t)$
`;

const ode = `
$$\\frac{d^2\\vec r(t)}{dt^2} = \\frac{GM\\vec r(t)}{r(t)^3}$$
`;

const euler = 
`
$$
r(t+h)=v(t)h+r(t)\\\\
v(t+h)=a(t)h+v(t)
$$
`;

const collide = `
$$
\\vec v_f = \\frac{m_1 \\vec v_1+m_2 \\vec v_2}{m_1+m_2}
$$
`


export default function About() {

    return (
       
     <div>
    
        <div className='body'>
            <h1>
                <b>How the Simulator Works</b>
            </h1>
            <br></br>
            <h3>
                The Physics
            </h3>
            <body>
                Newton's Law of gravitation states that:    
                <Latex>{newton_law}</Latex>
                where <Latex>$F$</Latex> is the force exerted on one mass by the other measured in 
                Newtons, <Latex>$r$</Latex> is the scalar distance between the 2 masses, and <Latex>$G$</Latex> is
                the universal gravitational constant which <Latex>{G}</Latex>.
                <br></br>
                However, the above equation only gives a scalar. Wherease we need a vector. This can be 
                achieved by multiplying the scalar equation by the unit vector of <Latex>$r$</Latex> which will be
                denoted as <Latex>$\hat r$</Latex>.
                <br></br>
                Another important thing to take note of is the reference frame (i.e. coordinate plane) we are using.
                The scalar equation uses the mass as it's frame of reference. In other words, the force exerted
                on <Latex>$M_1$</Latex> implies that <Latex>$M_1$</Latex> is located at the origin (0, 0). Thus 
                the equation involving vectors means that we must have a common reference frame for all masses. The 
                equation can now be written as: 
                <Latex displayMode='true'>{newton_law_vec}</Latex>
                Since we are making a particle simulator, we are concerned with the acceleration of a given mass. This is where Newton's second
                law is vital. <Latex>$\vec F = m \vec a$</Latex>. We can subsitute Newton's second law into Newton's law of gravitation
                to cancel out the mass of the particle whose acceleration we are trying to find. This makes perfect sense as the acceleration
                at a particular point in a gravitational field is constant regardless of the mass of the object in the gravitational field. Furthermore,
                we know that the unit vector <Latex>{unit_vector}</Latex> so we can sub that into the equation as well.
                <br></br>
                We now get our main equation:
                <Latex displayMode='true'>{newton_law_vec_main}</Latex>
                Note that there is only one mass which is the mass that is creating the gravitational field. Also remember
                that <Latex>$\vec r$</Latex> is the vector between the two masses pointing to the second and that <Latex>$r$</Latex> is
                the scalar distance between the two masses.
                <div className='vectorExample'>
                    <figure>
                        <img
                            src={vectorDiagram}
                            className='vectorDiagram'
                            width='300px'
                            height='auto'>
                        </img>
                        <figcaption><b>Vector Subtraction. Used to get the vector between two other vectors.</b></figcaption>
                    </figure>
                </div>
                Since all the masses are in a common reference frame, this can be better represented by:
                <br></br>
                <Latex displayMode='true'>{newton_law_vec_main2}</Latex>
                and similiarly the acceleration of mass 1 would be represented by:
                <Latex displayMode='true'>{newton_law_vec_main3}</Latex>
                <hr></hr>
                Now that we can calculate a vector acceleration and all masses are in a common reference frame, we can now easily
                calculate the acceleration on a particular mass given 3 or more masses. The acceleration (and force) on a given mass is simply
                the sum of all the other accelerations (or force). For example, suppose we have 3 masses <Latex>$[M_1, M_2, M_3]$</Latex>.
                The acceleration for all the masses would be as follows:

                <Latex displayMode='true'>{nBodyExample}</Latex>
                <Latex displayMode='true'>{nBodyExample2}</Latex>
                <Latex displayMode='true'>{nBodyExample3}</Latex>

                A pattern can be seen that for the acceleration of a given mass, we never include the term of that
                particular mass as we would be dividing by zero. The pattern can be represented mathematically in the 
                following equation:
                <Latex displayMode='true'>{nBody}</Latex>
                <br></br>
                <hr></hr>
                <br></br>
            </body>
            <h3>
                The Simulation
            </h3>
            <body>
                The computer program essentially repeats the following process:
                <div className='steps'>
                    <br></br>
                    <li>At the current time step, calculate the acceleration of all points</li>
                    <li>Use the current velocity to find the position at the <b>next</b> timestep</li>
                    <li>Use the acceleration calculated in the current time step to find the velocity at the next time step</li>
                    <li>You now have new position and velocity vectors. Repeat step 1.</li>
                    <br></br>
                </div>
                <br></br>
                Suppose we have a function of position <Latex>$\vec r(t)$</Latex>. 
                <Latex>{deriv}</Latex>.
                <Latex>{deriv2}</Latex>
                We can see that equation <Latex>$(1)$</Latex> can be written as a second order Orindary Differential Equation (ODE)
                <Latex displayMode='true'>{ode}</Latex>
                <br></br>
                The N-Body Problem has no solution (<a href='https://sites.math.washington.edu/~morrow/336_12/papers/adrian.pdf'>with the exception of a few special cases</a>),
                and we also see that we are trying to solve an ODE. Which means it must be simulated with approximations (i.e. <b>Numerical Methods</b>).
                Numerical methods like Euler's method and the 4th order Runge-Kutta method all approximate a solution.
                Some methods are more accurate and accumulate less error as time progresses with the trade off of increased complexity and computing power required.
                The numerical method used in our case is Euler's method due to the fact that the code is being processed in real time on the client side in the browser with D3.js.
                <br></br>
                For a more accurate and capable N-body simulation, visit my implementation of the n-body problem in Python using the RK-4 numerical method to integrate accleration and velocity:
                <br></br>
                <a href='https://github.com/Ramjet-7/N-Body-Simulator'>https://github.com/Ramjet-7/N-Body-Simulator</a>
                <br></br>
                Since vector math involves working in the x and y dimension (or z dimension if working with 3D vectors), let's only consider
                the horizontal x-axis in our frame of reference for the sake of simplicity.
                <br></br>
                Suppose we have a velocity and acceleration function in the x-axis <Latex>$v(t), a(t)$</Latex> which are the derivatives
                of a state vector at any given time step. Using Euler's method, we can integrate to find the position and velocity
                at the next time step. This is done by the following process (let <Latex>$h$</Latex> denote the size of the time step measured in seconds):
                <Latex displayMode='true'>{euler}</Latex>
                Of course, the smaller the time-step, the more accurate the approximation will be to the actual solution, but this comes at the cost
                of more computing resources needed. There are other numerical methods as mentioned above that are more accurate given the same step size.
            </body>
            <h3>Collisions</h3>
            <br></br>
            <body>
                Another neat attribute of this simulator is the fact that it can also simulate collisions. If a particle
                is close enough to another, they will merge (like how asteroids/planetoids merge to form a bigger one). These
                are inelastic collisions as the momentum of the masses are conserved, but the kinetic energy is not.
                <br></br><br></br>
                We know that <Latex>$\vec p = m\vec v$</Latex>. This simulation only handles and calculates the momentum when
                2 masses collide. It is relatively unlikely for 3 masses to collide simultaneously, but the simulation would handle
                the first 2 masses colliding, and the third colliding with the combined mass of the first 2.
                <Latex displayMode='true'>$$m_1 \vec v_1+m_2 \vec v_2 = (m_1+m_2)v_f$$</Latex>
                We are trying to solve for the final velocity after the collision:
                <Latex displayMode='true'>{collide}</Latex>

                The addition of this collision feature was due to two main reasons. The first being that particles crashing
                into each other is a common occurance and very close distances results in a position/velocity function
                changing too rapidly given a relatively normal step size. The second reason is that it was entirely possible
                to only update the state vectors if particles were at a distance greater than their radius, but this results
                in masses going through each other and overall looks boring. I wanted to simulate a mini planetoid system.
            </body>
            <h3>Conclusion</h3>
            <body>
                This simulator uses Equation <Latex>$(3)$</Latex> to calculate the accleration at a given time step.
                We then use Euler's method to integrate and solve for the position and velocity vectors at the next
                time step. The principle of conservation of momentum is also simulated when particles collide.
                The simulation is visually shown using D3.js to plot circle elements onto a SVG canvas.
                <br></br><br></br>
                Finally ...phew. You made it to the end! Hopefully you learned something new about physics today! Thanks for
                reading!
            </body>
        </div>
        </div>
    );
}
