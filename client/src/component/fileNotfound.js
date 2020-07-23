import React, { Component } from 'react'
import './CSS/fileNot_found.css';
import Menu from '../component/private/componentofBrowse/Menu'


export default class fileNotfound extends Component {
    render() {
        return (
            <div className="file_notFound_container">
                <Menu></Menu>
                <div className="fnc_inner_container">
                    <div className="404_container">
                        <h1 className="fnc_404">404!</h1>
                    </div>
                    <h3 className="fnc_Message">Page Not Found</h3>
                </div>
            </div>
        )
    }
}