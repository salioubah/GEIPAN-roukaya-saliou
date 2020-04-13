import React from 'react'
import DepartementData from './DepartementData';
export default class Statistique extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center", marginTop: 80, }}>
                <DepartementData />
            </div>
        )
    }
}