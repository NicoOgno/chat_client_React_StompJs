import { Link } from 'react-router-dom';

import React from 'react';

const Homepage = () => {
    const content = (
        <section className="public">
            <header>
                <h1>
                  Welcome to <span>Chatelicious!</span>
                </h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </header>
                <main>
                <p>
                  Beautiful multipurpose chat app to enjoy with family and friends or back-office communications, try out for free!.
                </p>
                <input type="text" placeholder='Enter Username' />
                <button>Go chat!</button>
            </main>
            <footer>
                

            </footer>
        </section>
     );    
     return content;
};

export default Homepage;