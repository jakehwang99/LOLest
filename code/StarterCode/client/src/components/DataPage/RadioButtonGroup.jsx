import React from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

class RadioButtonGroup extends React.Component {
    constructor(props) {
        super(props)
    }

    onChange(e) {
        
    }

    render() {
        return (
        <div> 
            <ToggleButtonGroup type="radio" name="teamSelect" defaultValue={'Cloud9'}>
                { this.props.selections.map((d, i) => { return <ToggleButton key={i} value={d}>{d}</ToggleButton> } ) } 
            </ToggleButtonGroup>
        </div>)
    }
}

export default RadioButtonGroup