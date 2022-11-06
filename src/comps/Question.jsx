import React from "react"

export default function Question(props){
    
    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
    const [answers, setAnswers]=React.useState(props.incans.concat([props.corrans]))
    
    const [ready, setReady]=React.useState(false)
    
    function shuffle(list){
        for (let i = 0; i < answers.length; i++){
            const numb = Math.floor(Math.random() * answers.length)
            if(i !== numb){
            [list[i], list[numb]] = [list[numb], list[i]];
            }
        }
    }
    
    const styles_cor = {
        borderRadius: "20px" ,
        background: props.gameOver && "#21bd02",
        color: "#ffffff"
    }

    
    const styles_inc = {
        color: props.gameOver ? "red" : "#000000"
    }
    
    const styles_def={
        color: "#ffffff"
    }
    
   React.useEffect(function() {
        const answersShuffled = answers
        shuffle(answersShuffled)
        setAnswers(answersShuffled)
        setReady(true)
    }, []);

    
    const buttons = answers.map((a, index) => <div className="answer" > 
                <input 
                    style={a === props.corrans ? styles_cor: styles_def}
                    type="radio"
                    id={index}
                    name={props.id}
                    
                    onChange={()=>props.handleChange((a === props.corrans) ? true : false, props.id)
                    }
                    check={a === props.selected ? "true" : "false"}
                />
                <label  style={a === props.corrans ? styles_cor : styles_def}>{decodeHTMLEntities(a)}</label>
                </div>
                )
    
    return(
        <div>
             <p>______________________________________________________________</p>
        <fieldset className="field">
        <p className="Category">Category: {props.cat} - Difficulty: {props.dif} </p>
        <p className="Question">{decodeHTMLEntities(props.que)}</p>
        <div>
            {buttons}
        </div>
        </fieldset>
        </div>
    )
}