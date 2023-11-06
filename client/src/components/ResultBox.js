import { useLayoutEffect, useRef } from 'react';
import '../styles/ResultBox.css'
import Row from './Row';


function ResultBox(props) {

    const resultRef = useRef();

    useLayoutEffect(() => {
       if(resultRef.current) {
            resultRef.current.scrollIntoView(true);
       }
    }, [props.torrentData]);

    let Rows =  props.torrentData.map((ele, index) => {
        return (
            <Row
                name={ele.title}
                size={ele.size}
                id={index}
                key={index}
                sendIndex={(index) => props.sendIndex(index)}
            />
        );
    });
    
    return (
        <div id="result-box" ref={resultRef}>
            <div className="header" onClick={() => console.log('Header clicked!')}>
                <p>#{props.searchKey}</p>
            </div>
            <div className="results">
                <table>
                    <tbody>
                        {Rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ResultBox;