import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import Difficulties from './difficulties/Difficulties';
import Container from 'react-bootstrap/Container'
import Questions from './questions/Questions';
import FindMatchModal from './match/FindMatchModal';
import { AppContext } from "../../App.js"
import { QUESTION_URL } from '../../Api';
import axios from 'axios';

function Home() {
    const [matchDifficulty, setMatchDifficulty] = useState("");
    const [showMatchModal, setShowMatchModal] = useState(false);
    const { user } = useContext(AppContext);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('cs3219-jwt-auth'),
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }
        axios.get(QUESTION_URL, headers).then(res => {
            if (res.status !== 200 || res.data.status !== "success") {
                console.error("Error fetching questions for home page.");
            }
            return res.data.data;
        }).then(data => {
            setQuestions(data.questions);
        }).catch(err => {
            console.error("Error fetching questions for home page.", err);
        })
    }, [])
    
    return (
        <>
            <Container>
                <Difficulties setMatchDifficulty={setMatchDifficulty} setShowMatchModal={setShowMatchModal} />
                <br /><br />
                <Questions questions={questions} />
            </Container>
            <FindMatchModal show={showMatchModal} difficulty={matchDifficulty} setShowMatchModal={setShowMatchModal} enableFindMatch={user !== null}/>
        </>
    )
}

export default Home;