import React from 'react';
const MakeQuestionComp = (props) =>{
    let input;
    return (
        <div className="quesComp">
            <input ref={node => input = node} />
            <h1>Question bank is here</h1>
            
        </div>
    );
}

export default MakeQuestionComp;