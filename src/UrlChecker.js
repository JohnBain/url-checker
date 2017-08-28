import React, { Component } from 'react';
import curl from 'curl';
import axios from 'axios';
import MarkupDisplay from './MarkupDisplay';

const curlURL = function(url){ 
    let usableUrl = url.replace(/(^\w+:|^)\/\//, ''); //strip http:// and https:// so server understands
    let request = 'https://url-checker-server.herokuapp.com/track?url=' + url;
    return axios.get(request)
        .then(res=>res.data);
}

class UrlChecker extends Component {
    constructor(props){
        super(props);
        this.state = {url: '', currentUrl: '', rawMarkup: ''}
    }
    
    handleChange(syntheticEvent){
       this.setState({url: syntheticEvent.target.value});
    }
    
    grabUrl(syntheticEvent){
        syntheticEvent.preventDefault();
        var that = this;
        curlURL(this.state.url).then(function(res, err){
            that.setState({rawMarkup: res, currentUrl: that.state.url})
        })
    }
    
    render(){
        return (
            <div>
            <form>
                <label style={{width: '5%'}}>
                   
                <input type="text" value={this.state.url} onChange={this.handleChange.bind(this)}/>
                </label>
                <input type="submit" value="GO" onClick={this.grabUrl.bind(this)} style={{width: '5%'}}/>
                </form>
            <MarkupDisplay 
                currentUrl={this.state.currentUrl} 
                rawMarkup={this.state.rawMarkup}/>
            </div>
        )
    }
}
                
export default UrlChecker;