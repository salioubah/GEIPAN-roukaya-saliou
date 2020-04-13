import React from 'react'
import { Grid, FormControl, InputLabel, Select } from '@material-ui/core';
import MyChart from './MyChart';

export default class DepartementData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            departements: [],
            departement: "",
            cas: [],
            error: null,
            isLoaded: false,
            casLoaded: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.getDepartements();
    }
    handleChange(event) {
        this.setState({
            departement: event.target.value,
            casLoaded: false
        }, this.getCasByDepartement());
    };
    getDepartements() {
        let url = "http://localhost:8888/departements";
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        departements: result
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
    getCasByDepartement() {
        const { departement } = this.state;
        let reqDepartement = departement ? "&zone=" + departement : "";
        let url = "http://localhost:8888/departementCas?" + reqDepartement;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    let a = 0, b = 0, c = 0, d = 0, d1 = 0;
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
                    let valueJSON = [
                        { Type: 'A', total: a },
                        { Type: 'B', total: b },
                        { Type: 'C', total: c },
                        { Type: 'D', total: d },
                        { Type: 'D1', total: d1 }
                    ];
                    this.setState({
                        cas: valueJSON,
                        casLoaded: true
                    });
                },
                (error) => {
                    console.error(error);
                }
            )
    }
    render() {
        const { error, isLoaded, departements, casLoaded } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            // Trouver un composant de chargement...
            return <div>Chargement…</div>;
        } else if (isLoaded && !casLoaded) {
            return (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={3}>
                    <Grid item>
                        <FormControl>
                            <InputLabel htmlFor="departement-native-simple">Département</InputLabel>
                            <Select
                                native
                                value={this.state.departement}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'departement',
                                    id: 'departement-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {departements.map(departement => (
                                    <option key={departement} value={departement}>{departement}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            )
        }
        else {
            return (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={3}>
                    <Grid item xs={12}>
                        <FormControl>
                            <InputLabel htmlFor="departement-native-simple">Département</InputLabel>
                            <Select
                                native
                                value={this.state.departement}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'departement',
                                    id: 'departement-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {departements.map(departement => (
                                    <option key={departement} value={departement}>{departement}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11}><MyChart data={this.state.cas} /></Grid>
                </Grid>
            )
        }
    }
}