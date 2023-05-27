import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, ImageUrl, newsUrl, author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%' , zIndex :'1'}}>
                                {source}
                                
                            </span>
                    <img src={!ImageUrl ? "https://images.hindustantimes.com/tech/img/2023/05/22/1600x900/Untitled_design_1684738981768_1684738999515.jpg" : ImageUrl}></img>
                    <div className="card-body">
                        <h5 className="card-title">{title}...
                            
                        </h5>   
                        <p className="card-text"> {description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>

                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
