import React, { Component } from 'react'
import NoImageFound from '../../img/nophoto.png'


import {ic_play_circle_outline} from 'react-icons-kit/md/ic_play_circle_outline'
import { Icon } from 'react-icons-kit'

import {connect} from 'react-redux'
import {ActionInitModel} from '../../../redux/Action/ModelAction'

import '../../CSS/skeleton-loading.css';
import Skeleton from 'react-loading-skeleton';


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

        var classesElement = <div className="skeleton-wrapper"><Skeleton width={250} height={300}></Skeleton> </div>

       
        if (Classes !== null && Classes !== undefined)
        {
            if(Classes.length > 0)
            {
                classesElement = Classes.map( (val, index) => {
                    var newTag= val.tag.replace(",", " #")
                    return (
                        
                        <div className="getElement_outerWrapper">
                            <div key= {val._id} className="new_contentWraper">
                                <img className="caresoleImage" id={val._id} onError={this.errorImag} src={val.thumbnail} loading="lazy" alt={'apple'}/>
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
                                            <p>{val.description || <Skeleton></Skeleton>}</p>
                                        </div>
                                    </div>
                                </div>      
                            </div>  
                        </div>
                       
                    )
                }) 
            }
            else
            {
                classesElement = <div style={{width: "100%", textAlign:"center"}}><h1>No content Found </h1></div> 
            }
            
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