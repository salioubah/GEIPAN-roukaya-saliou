import React from 'react'
import { TextField, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Button, Icon } from '@material-ui/core'

class FiltreCas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classification: "tous"
        };
        this.handleChangeResume = this.handleChangeResume.bind(this);
        this.handleChangeDepartement = this.handleChangeDepartement.bind(this);
        this.handleChangeClasse = this.handleChangeClasse.bind(this);
    }
    handleChangeClasse(event) {
        this.setState({
            classification: event.target.value
        }, this.props.changeClasse(event))
    }
    handleChangeResume(event) {
        this.props.changeResume(event)
    }
    handleChangeDepartement(event) {
        this.props.changeDepartement(event)
    }
    render() {
        return (
            <form elevation={20} component={Paper}>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <TextField label="Mot clé dans le résumé" onChange={this.handleChangeResume} />
                    </Grid>
                    <Grid item>
                        <FormLabel component="legend">Type de Classe</FormLabel>
                        <RadioGroup row aria-label="classification" name="classification" value={this.state.classification} onChange={this.handleChangeClasse}>
                            <FormControlLabel value="tous" control={<Radio />} label="Tous" />
                            <FormControlLabel value="A" control={<Radio />} label="A" />
                            <FormControlLabel value="B" control={<Radio />} label="B" />
                            <FormControlLabel value="C" control={<Radio />} label="C" />
                            <FormControlLabel value="D" control={<Radio />} label="D" />
                            <FormControlLabel value="D1" control={<Radio />} label="D1" />
                            <FormControlLabel value="D2" control={<Radio />} label="D2" />
                        </RadioGroup>
                    </Grid>
                    <Grid item>
                        <TextField label="Zone géographique" onChange={this.handleChangeDepartement} />
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Icon>save</Icon>}
                >Recherche</Button>
            </form>
        )
    }
}

export default FiltreCas