import React, { Component } from 'react';

const Star = ({ selected=false, onClick=f=>f }) => (
    <div className={ (selected) ? "star selected" : "star" } onClick={onClick}>
    </div>
)

export class RatePostWithStars extends React.Component {
    constructor(props) {
        super(props)
        this.state = { starsSelected: 0 }
        this.change = this.change.bind(this)
    }


    change(starsSelected) {
        this.setState({ starsSelected: starsSelected })
    }

    render() {
        const { totalStars } = this.props
        const { starsSelected } = this.state

        return(
            <div className="star-rating">
                {[...Array(totalStars)].map((n,i) => 
                    <Star 
                        key={i}
                        selected={i<starsSelected}
                        onClick={() => this.change(i+1)}
                    />
                 )}
                <p>{starsSelected} of {totalStars} stars</p>
            </div>
        )
    }
}

export class StarRating extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { totalStars } = this.props.totalStars
        const { starsSelected } = this.props.starsSelected

        return(
            <div className="star-rating">
                {[...Array(this.props.totalStars)].map((n,i) => 
                    <Star 
                        key={i}
                        selected={i<this.props.starsSelected}
                    />
                 )}
                <p>{this.props.starsSelected} of {this.props.totalStars} stars</p>
            </div>
        )
    }
}
