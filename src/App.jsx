import React from "react"
import Question from "./comps/Question"

export default function App () {
    
    const [newgame, setnewgame] = React.useState(true)
    const [gameOver, setGameOver] = React.useState(false)
    const [questions, setquestions] = React.useState([])
    const [ansTab, setAnsTab] = React.useState([])
    const [params, setParams] = React.useState([])
    const [numb, setNumb] = React.useState()
    const [finalScore, setFinalScore] = React.useState()
    const [settings, setSettings] =React.useState(
        {
            quant: "5",
            cats: "",
            diff: ""
        }
    )


        function back2title(){
            setnewgame(true)
            setGameOver(false)
            setquestions([])
            setParams([])
            setSettings(
                {
                    quant: "5",
                    cats: "",
                    diff: ""
                }
            )
        }
        
    
        function newgamestart() {
            const url = "https://opentdb.com/api.php?amount=" + settings.quant +settings.cats +settings.diff+"&type=multiple"
            console.log(url)
                let paramString = url.split('?')[1];
                let queryString = new URLSearchParams(paramString);
                const parameters=[]
                for(let pair of queryString.entries()) {
                        parameters.push({
                            key: pair[0],
                            value: pair[1]
                        })
                        if(pair[0] === "amount"){
                            setNumb(pair[1])
                        }
                    }
                setParams(parameters)
                fetch(url)
                .then(res => res.json())
                .then(data => setquestions(data.results))
            setnewgame(false)
            const answerTable =[]
            for (let i = 0; i < numb; i++){
                answerTable.push(false)
            }
            setAnsTab(answerTable)
        };
        
        function updateTable(value, id) {
            const newAns = [...ansTab];
            newAns[id] = value;
            setAnsTab(newAns)

        }
        
        const qanda = questions.map((quest, index) => <Question
            corrans={quest.correct_answer}
            incans={quest.incorrect_answers}
            cat={quest.category}
            dif={quest.difficulty}
            que={quest.question}
            id={index}
            handleChange={updateTable}
            key={index}
            gameOver={gameOver}
        />)
        
        function check(){
            const score = ansTab.filter(value => value === true).length;
            setFinalScore(score)
            setGameOver(true)
        }
        
        function settingsChange(event){
            
            const name = event.target.name
            const val = event.target.value
            setSettings(prev => {
                return{
                    ...prev, [name] :val
                }
            })
        }
        
    return(
        
       newgame === true 
       ?
       <>
       <div className="area" >
            <ul className="circles">
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
                    <li>?</li>
            </ul>
        </div >
       <div className="start">
            <h1 className="start-title">Quiz</h1>
            <p className="start-desc">Select options and press "Start"</p>
            <div className="start-options">
            <label className="lables" htmlFor="cars">Choose your category: </label>
            <select className="select" name="cats" id="cats" onChange={settingsChange}>
                <option value="">Any</option>
                <option value="&category=21">Sport</option>
                <option value="&category=12">Music</option>
                <option value="&category=15">Games</option>
                <option value="&category=14">Television</option>
            </select>
            
            <label className="lables" htmlFor="cars">Choose your difficulty: </label>
            <select className="select" name="diff" id="diff" onChange={settingsChange}>
                <option value="">Any</option>
                <option value="&difficulty=easy">Easy</option>
                <option value="&difficulty=medium">Medium</option>
                <option value="&difficulty=hard">Hard</option>
            </select>
            <label className="lables" htmlFor="cars">Number of questions: </label>
            <select className="select" name="quant" id="quant" onChange={settingsChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
            </div>
            <br />
            <div className="start-butt">
                <button className="start-button" onClick={newgamestart}>Start</button>
            </div>
            

       </div>
       
       <div className="pwr">
                <p>Powered by Open Trivia Database</p>
            </div>
       
       
        </>
       :
       
       <div className="maindiv">

        <h1> Answer every questioon and click "Check" at the end </h1>
        {qanda}
        {gameOver === true 
        ?
        <>
        <p className="score">score:{finalScore}/{numb}</p>
        <button className="endbutton" onClick={back2title}>Start over</button>
        </>
        :
        <button className="endbutton" onClick={check}>Check</button>
        }
       </div>
    )
}
