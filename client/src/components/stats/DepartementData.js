import React from 'react'
import { Grid, FormControl, InputLabel, Select } from '@material-ui/core';

export default class DepartementData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            departements: [],
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
        this.props.changeDepartement(event);
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
    render() {
        const { error, isLoaded, departements } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            // Trouver un composant de chargement...
            return <div>Chargement…</div>;
        } else {
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
    }
}