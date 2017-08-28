import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const getElemName = function(str, index){
    //given a string and a (clicked) index, return the name of the elem 
    //we could improve this (with, ie, RegEx) to make it more accurate, but for a prototype it'll do
    var beginning = null;
    var end = null;
    for (let i = index; i >= 0; i--){ 
        //iterates backwards until we reach a <
        if (str[i] === "<"){
            beginning = i;
            break;
        }
    }
    
    for (let i = index; i <= str.length; i++){
        if (str[i] === ">" || str[i] === " "){ 
            end = i;
            break;
        }
    }
    
    return str.substring(beginning+1, end);
}

const searchIndex = function (str, searchValue) {
  //returns indices where each named elem (str) begins
  var regExpValue = new RegExp(searchValue, 'gi');
  var matches = [];
  var startIndex = 0;
  var arr = str.match(regExpValue);

  [].forEach.call(arr, function(element) {
    startIndex = str.indexOf(element, startIndex);
    matches.push(startIndex++);
  });

  return matches;
}

class MarkupDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {highlightedElem: ''}
    }
    
    handleClick(syntheticEvent){
        const markup = document.getElementById('markupHolder').innerText; //text 
        const getSelectionPosition = function () {
            var selection = window.getSelection(); //returns index of the clicked character in a text elem
            return selection.focusOffset;
        }
        var selectedIndex = getSelectionPosition();
        var selectedElem = getElemName(markup, selectedIndex)
        alert(selectedElem);
        
        const markupHolder = document.querySelector('#markupHolder span'); 
        const elemIndices = searchIndex(markupHolder.innerHTML, selectedElem); //get the opening indexes to highlight
        const endIndices = elemIndices.map((e)=>e+selectedElem.length); //closing indexes

        /*
        var beginningString = markup.substr(0, elemIndices[0]);
        for (var i in elemIndices){
            beginningString += "<span style='color: blue'>" + markupHolder.innerHTML.substr(elemIndices[i], endIndices[i]) + "</span>" + markupHolder.innerHTML.substr(endIndices[i], markupHolder.innerHTML.length) 
        }*/
        
        /*I was unable to complete this fully within 3-4 hours, but my plan was to iterate 
        through the innerHTML of this elem, stopping at each index beginning the chosen DOM element's name,
        and wrap each DOM name in <span style='color: blue'>.

        A smarter way to achieve this would have been to render each distinct DOM element in the returned markup as a React component. The DOM element wouldn't effect display, but it would make React aware of each
        discrete DOM element's name. For the simplest implementation selecting just the name and not worrying about attrs or closing components, we could use a RegEx to wrap any full words after "<" characters in custom JSX components.
        
        So we would end up with JSX like <<DOMElemName style={{this.state.clickedElem === 'iframe' && color: blue}}>iframe</DOMElemName> src='...'><<DOMElemName style={{this.state.clickedElem === 'span' && color: blue}}>span></span>. Then I would pass "clickedElem" a string to trivially light up each DOMElem's text when selected. 
        */
    }
    
    render(){
        return (
            <div id="results">
            <div id='urlHolder'>
                {this.props.currentUrl && <h1 id='headline'>Displaying markup for {this.props.currentUrl}</h1>}
            </div>
            <div id='markupHolder' onClick={this.handleClick.bind(this)}>
                <span>{this.props.rawMarkup && this.props.rawMarkup}</span>
            </div>
            </div>
        )
    }
}
                
export default MarkupDisplay;