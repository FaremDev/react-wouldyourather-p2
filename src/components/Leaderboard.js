import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Segment, Grid, Header, Image} from 'semantic-ui-react'
import { showLoading, hideLoading, LoadingBar } from 'react-redux-loading-bar'
import './css/Leaderboard.css'

function Leaderboard(props) {
    const {authedUser, users, sortedLeaderboard} = props

    return (
        <div className="leaderboard">
            <LoadingBar />
            <Segment attached="bottom">
                <p>{users.length}</p>
                <Card.Group>
                    { sortedLeaderboard.map( (qid, i) => 
                    (<Card fluid className="user-leaderboard" key={qid}>
                        <Grid columns={3} divided>
                            <Grid.Row>
                                <Grid.Column width={3} className="column-avatar" textAlign='center'>
                                    { i+1 === 1 && (<p>Premier</p>)} 
                                    { i+1 === 2 && (<p>Deuxième</p>)} 
                                    { i+1 === 3 && (<p>Troisième</p>)}
                                    <Image src={users[qid].avatarURL} alt={"Avatar of " + users[qid].name} className="leaderboard-user-avatar" />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Header>{users[qid].name}</Header>
                                    <div className="user-results"></div>
                                    <div className="user-answered-questions">Answered questions: { Object.keys(users[qid].answers).length }</div>
                                    <div className="user-created-questions">Created questions: { users[qid].questions.length }</div>
                                </Grid.Column>
                                <Grid.Column width={3} className="column-score" textAlign='center'>
                                    <div className="user-score">
                                        <Header>Score</Header>
                                        {users[qid].score}
                                        </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card>)
                    )}
                </Card.Group>
            </Segment>
        </div>
    )   
}

function mapStateToProps({ authedUser, users, dispatch }) {

    Object.keys(users).map( (key) => {
        console.group("USER : " + key)
        console.log(key)
        console.log(users[key])
        console.log(users[key].answers)
        console.log(users[key].questions)
        console.groupEnd();

        const sum = Object.keys(users[key].answers).length + users[key].questions.length
        users[key] = {
            ...users[key],
            score: sum
        }
    })

    let sortedLeaderboard = Object.keys(users).sort(function(a,b){return users[b].score - users[a].score})
    
    return {
        dispatch,
        users,
        authedUser,
        sortedLeaderboard
    }
}

export default connect(mapStateToProps)(Leaderboard)