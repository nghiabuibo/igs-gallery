'use strict';

export default (votes, newVote) => {
    const voteIndex = votes.indexOf(newVote)

    if (voteIndex === -1) {
        votes.push(newVote)
    } else {
        votes.splice(voteIndex, 1)
    }

    return votes
}