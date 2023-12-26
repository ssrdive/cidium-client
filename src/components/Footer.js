import React, { Component } from 'react';

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {new Date().getFullYear()} &copy; Agrivest (Private) Limited.
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;