import React, { Component } from 'react'

import {angleRight} from 'react-icons-kit/fa/angleRight'
import { Icon } from 'react-icons-kit'

import {connect} from 'react-redux'
import {ActionInitModel} from '../../../redux/Action/ModelAction'

class getImageElement extends Component 
{
    render()
    {
        return (
            <div className="CaresoleCategorie">
                <h2 className="rowHeader">
                    <a className="allBrowseLink" href={this.props.link}>
                        <div className="row-header-title">{this.props.title}</div>
                        <p className="see-all-link">Explore All</p>
                        <Icon icon={angleRight}></Icon>
                    </a>
                </h2>
            </div>
        )
        
    }
    
}

const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionInitModel}) (getImageElement);