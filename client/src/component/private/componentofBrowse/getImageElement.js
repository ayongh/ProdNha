import React, { Component } from 'react'
import NoImageFound from '../../img/nophoto.png'

import {ic_play_circle_outline} from 'react-icons-kit/md/ic_play_circle_outline'
import { Icon } from 'react-icons-kit'

import {connect} from 'react-redux'
import {ActionInitModel} from '../../../redux/Action/ModelAction'

class getImageElement extends Component 
{

    errorImag(e)
    {
        e.target.src  = NoImageFound
    }

    open(val)
    {
        this.props.ActionInitModel(val)
    }

    render()
    {
        const Classes = this.props.classes

        var classesElement = <h1>Loading...</h1>

       
        if (Classes !== null)
        {
            classesElement = Classes.map( (val, index) => {
                var newTag= val.tag.replace(",", " #")
                return (
                    <div key= {val._id} className="new_contentWraper">
                        <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} alt={'apple'}/>
                        <div className="caresoleImage_description_wrapper">
                            <div className="top_caresoleImage_description">
                                <Icon icon={ic_play_circle_outline} size={70} style={{color:'white', marginTop:"18%", cursor:"pointer"}} onClick={()=>this.open(val)}></Icon>
                            </div>                            
                            <div className="description">
                                <div className="bottom_caresoleImage_description">
                                    <h3 className="caresole_title">{val.name}</h3>
                                    <div className="tag_wrapper">
                                        <i><p className="tag">#{newTag}</p></i>
                                    </div>
                                    <p>{val.description}</p>
                                </div>
                            </div>
                        </div>      
                    </div>  
                )
            }) 
        }

        return classesElement;
    }
    
}

const mapToState = (state) =>{
    return {
        state:state
    }
}

export default connect(mapToState,{ActionInitModel}) (getImageElement);