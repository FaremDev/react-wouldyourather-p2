import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/QuestionDetail.css'
import { handleVote } from '../actions/shared'
import { Card, Grid, Divider, Header, Segment } from 'semantic-ui-react'

class QuestionDetail extends Component {
  vote = (event) => {
    const { dispatch, question, authedUser } = this.props

    if(!Object.keys(authedUser.answers).includes(question.id)) {
        dispatch(handleVote({
            qid: question.id,
            answer: event.target.id,
            authedUser: authedUser.id
        }))
    }
  }

  render() {
      const { authedUser, question } = this.props

        return (
         <Segment attached="bottom" className="seg-question-detail">
            <Card fluid className="question-item">
                <Header className="user-asks">{question.author.name + " asks..."}</Header><br /><br />
                
                <Header className="would-you-rather-desc">Would you rather...</Header>
                <Segment>
                    <Grid columns={2} stackable textAlign='center' className="question-grid">
                        <Divider vertical>Or</Divider>
                        <Grid.Row verticalAlign='middle' className="options">
                            <Grid.Column id="optionOne" className={ "option" + (question.optionOne.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? " voted" : "")} onClick={this.vote} >
                                {question.optionOne.text}<br />{question.optionOne.votes.length}
                            </Grid.Column>

                            <Grid.Column id="optionTwo" className={ "option" + (question.optionTwo.votes.filter((voter) => { return voter === authedUser.id }).length === 1 ? " voted" : "")} onClick={this.vote}>
                                {question.optionTwo.text}<br />{question.optionTwo.votes.length}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> 
                </Segment>                
            </Card>
        </Segment>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, params) {
    const question = questions[params.match.params.id]

    return {
        authedUser: users[authedUser],
        question: {
            ...question,
            author: users[question.author]
        }
    };
}

export default withRouter(connect(mapStateToProps)(QuestionDetail));
