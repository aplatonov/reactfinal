import React from 'react'
import { connect } from 'react-redux'

const Footer = (props) => {
    return (
        <footer className='app-footer'>
            <p>{props.config.application} &mdash; <a target='_blank' href={props.config.website}>{props.config.author}</a></p>
        </footer>
    )
}

const mapStateToProps = state => {
    return {
        config:state.global
    }
}

export default connect(mapStateToProps)(Footer)