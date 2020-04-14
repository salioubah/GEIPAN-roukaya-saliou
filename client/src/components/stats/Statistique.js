import React from 'react'
import DepartementData from './DepartementData';
import Mychart from './MyChart';
export default class Statistique extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            departement: "Ain",
            cas: [],
            isLoaded: false,
            error: null
        }
        this.changeDepartement = this.changeDepartement.bind(this);
    }
    componentDidMount() {
        this.getCasByDepartement()
    }
    changeDepartement(event) {
        this.setState({
            departement: event.target.value,
            isLoaded: false
        }, this.getCasByDepartement)

    }
    getCasByDepartement() {
        const { departement } = this.state;
        console.log(departement);
        let reqDepartement = departement ? departement : "Ain";
        let url = "http://localhost:8888/departementCas?zone=" + reqDepartement;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    let a = 0, b = 0, c = 0, d = 0, d1 = 0;
                    let valueJSON = [];
                    result.data.map(val => {
                        switch (val.cas_classification_calc) {
                            case "A":
                                a++;
                                break;
                            case "B":
                                b++;
                                break
                            case "C":
                                c++;
                                break;
                            case "D":
                                d++;
                                break
                            case "D1":
                                d1++;
                                break
                            default:
                                break;
                        }
                        return val;
                    })
                    valueJSON = [
                        { Type: 'A', total: a },
                        { Type: 'B', total: b },
                        { Type: 'C', total: c },
                        { Type: 'D', total: d },
                        { Type: 'D1', total: d1 }
                    ];
                    this.setState({
                        isLoaded: true,
                        cas: valueJSON
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, cas, departement } = this.state;
        const titre = <span>Nombre de cas du département : <strong>{departement}</strong></span>
        if (error) {
            return <div style={{ textAlign: "center", marginTop: 80, }}>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            // Trouver un composant de chargement...
            return <div style={{ textAlign: "center", marginTop: 80, }}>Chargement…</div>;
        } else if (isLoaded) {
            return (
                <div style={{ textAlign: "center", marginTop: 80, }}>
                    <DepartementData changeDepartement={this.changeDepartement} />
                    <Mychart titre={titre} data={cas} />
                </div>
            )
        }
        else {
            return (
                <div style={{ textAlign: "center", marginTop: 80, }}>
                    <DepartementData changeDepartement={this.changeDepartement} />
                </div>
            )
        }
    }
}