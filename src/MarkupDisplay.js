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
        this.state = {originalMarkup: ''}
    }
    
    handleClick(syntheticEvent){
        const markup = this.props.rawMarkup;
        const getSelectionPosition = function () {
            var selection = window.getSelection(); //returns index of the clicked character in a text elem
            return selection.focusOffset;
        }
        var selectedIndex = getSelectionPosition();
        var selectedElem = getElemName(markup, selectedIndex)
        
        const markupHolder = document.querySelector('#markupHolder span'); 
        const elemIndices = searchIndex(markupHolder.innerHTML, selectedElem); //get the opening indices of each element's name
        const endIndices = elemIndices.map((e)=>e+selectedElem.length); //closing indices
        const beginningHTML = markupHolder.innerHTML.substr(0, elemIndices[0]);
        const fullMarkupArray = markupHolder.innerHTML.split('');
        alert(selectedElem);
//        for (var i = 0; i <= fullMarkupArray.length;i++){
//	       if (elemIndices.indexOf(i) !== -1){
//		      beginningHTML += '<span style="color: blue">' + fullMarkupArray[i];
//	       }
//	       else if (endIndices.indexOf(i) !== -1){
//		      beginningHTML += '</span>' + fullMarkupArray[i];
//	       }
//           else {
//            beginningHTML += fullMarkupArray[i];
//           }
//        }
//
//        markupHolder.innerHTML = beginningHTML;
        /*
        The commented code highlights each element as requested, but in a buggy way. A smarter way to achieve this would have been to render each distinct DOM element in the returned markup as a React component. The DOM element wouldn't effect display, but it would make React aware of each discrete DOM element's name. For the simplest implementation selecting just the name and not worrying about attrs or closing components, we could use a RegEx (/<([^\/][\w|\s]*)>/g is close) to wrap any full words after "<" characters in custom JSX components. 
        
        See Highlight.js for a partial implementation. This is the idiomatic React way to solve the problem.
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