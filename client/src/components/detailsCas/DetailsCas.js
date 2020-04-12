import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import './DetailsCas.css'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default class DetailsCas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isloadedCas: false,
            isLoadedTemoignages: false,
            cas: null,
            temoignages: [],
            open: false
        };
    }
    componentDidMount() {
        const {id_cas} = this.props.$stateParams;
        this.getcasIdFromServer(id_cas);
        this.getcasIdByTemoignageFromServer(id_cas);
    }

    getcasIdFromServer(id_cas) {
        let url = "http://localhost:8888/cas/" + id_cas;
        fetch(url)
            .then(res => res.json())
            .then(
                (cas) => {
                    this.setState({
                        isLoadedCas: true,
                        cas,
                    });
                },
                (error) => {
                    this.setState({
                        isLoadedCas: true,
                        error
                    });
                }
            )
    }

    getcasIdByTemoignageFromServer(id_cas) {
        let url = "http://localhost:8888/cas/" + id_cas + "/temoignages";
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoadedTemoignages: true,
                        temoignages: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoadedTemoignages: true,
                        error
                    });
                }
            )
    }

    openModal() {
        this.setState({
            open:true
        })
    };

    handleClose() {
        this.setState({
            open:false
        })
    };


    render() {
        const {error, isLoadedCas, isLoadedTemoignages, cas, temoignages, open} = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (isLoadedCas && isLoadedTemoignages) {
            return (
                <Card style={{margin: '100px'}}>
                    <CardContent>
                        <div>
                            <h2>{cas.cas_nom_dossier} </h2>
                        </div>
                        <table className="tab-cas">

                            <tbody>

                            <tr>
                                <td> label="Id:"</td>
                                <td>{cas.id_cas}</td>
                            </tr>

                            <tr>
                                <td> lobservé le:</td>
                                <td>{cas.cas_AAAA}-{cas.cas_MM}-{cas.cas_JJ}</td>
                            </tr>

                            <tr>
                                <td> Zone :</td>
                                <td>{cas.cas_zone_nom}</td>
                            </tr>

                            <tr>
                                <td> Departement:</td>
                                <td>{cas.cas_zone_type}</td>
                            </tr>

                            <tr>
                                <td> Resumé:</td>
                                <td>{cas.cas_resume}</td>
                            </tr>

                            <tr>
                                <td> Resumé Web:</td>
                                <td>{cas.cas_resume_web}</td>
                            </tr>
                            <tr>
                                <td> Temoignage(s):</td>
                                <td>
                                    {
                                        temoignages.map((temoignage, index) => {
                                            return (
                                                <div key={index}>
                                                    <Chip
                                                        label={'temoignage ' + (index + 1)}
                                                        color="primary"
                                                        clickable
                                                        onClick={event => this.openModal()}
                                                        style={{margin: '5px'}}
                                                    />
                                                    <Dialog onClose={() => this.handleClose()}
                                                            aria-labelledby="alert-dialog-slide-title"
                                                            aria-describedby="alert-dialog-slide-description"
                                                            open={open}>
                                                        <DialogTitle id="alert-dialog-title">
                                                            Details du temoignage:
                                                        </DialogTitle>

                                                        <DialogContent dividers>
                                                            <Typography gutterBottom style={{backgroundColor:'lightgrey'}}>
                                                               <center>Temoin:</center>
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Heure et date de l'observation: {temoignage.obs_date_heure}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                              Adresse: {temoignage.obs_1_adr_commune}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                               Age: {temoignage.tem_age}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Sexe: {temoignage.tem_genre}
                                                            </Typography>


                                                            <Typography gutterBottom style={{backgroundColor:'lightgrey'}}>
                                                                <center>Conditions:</center>
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Environnement: {temoignage.obs_1_env_sol_type}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                              Condition meteo: {temoignage.obs_conditions_meteo}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                              cadre de reference: {temoignage.obs_1_cadre_reference_type}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Durée d'observation: {temoignage.obs_duree_lib}
                                                            </Typography>

                                                            <Typography gutterBottom style={{backgroundColor:'lightgrey'}}>
                                                                <center>Localisation:</center>
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Cap: {temoignage.obs_1_cap}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Trajectoire: {temoignage.obs_1_trajectoire_lib}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Vitesse: {temoignage.obs_1_vitesse_types}
                                                            </Typography>

                                                            <Typography gutterBottom>
                                                                Taille apparente: {temoignage.obs_1_taille_apparente_type}
                                                            </Typography>



                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => this.handleClose()} color="primary">
                                                                Fermer
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            );
        } else {
            return <div style={{margin: '100px'}}>Chargement…</div>;
        }
    }
}