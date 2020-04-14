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
            open: false,
            selectedTemoign: null
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

    openModal(tem) {
        this.setState({
            open: true,
            selectedTemoign: tem
        })
    };

    handleClose() {
        this.setState({
            open: false
        })
    };


    render() {
        const {error, isLoadedCas, isLoadedTemoignages, cas, temoignages, open, selectedTemoign} = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (isLoadedCas && isLoadedTemoignages) {
            return (
                <div>
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
                                            temoignages.map((temoignage, index) => {//hanek ttparcouri fel les temoin
                                                return (
                                                    <div key={index}>
                                                        <Chip
                                                            label={'temoignage ' + (index + 1)}
                                                            color="primary"
                                                            clickable
                                                            onClick={() => this.openModal(temoignage)}
                                                            style={{margin: '5px'}}
                                                        />
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

                    {selectedTemoign ?
                        <Dialog onClose={() => this.handleClose()}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                                open={open}>
                            <DialogTitle id="alert-dialog-title">
                                Details du temoignage:
                            </DialogTitle>

                            <DialogContent dividers>
                                <Typography gutterBottom style={{textAlign: 'center', backgroundColor: 'lightgrey'}}>
                                    <span>Temoin:</span>
                                </Typography>
                                <Typography gutterBottom>
                                    Heure et date de l'observation: {selectedTemoign.obs_date_heure}
                                </Typography>

                                <Typography gutterBottom>
                                    Adresse: {selectedTemoign.obs_1_adr_commune}
                                </Typography>

                                <Typography gutterBottom>
                                    Age: {selectedTemoign.tem_age}
                                </Typography>

                                <Typography gutterBottom>
                                    Sexe: {selectedTemoign.tem_genre}
                                </Typography>

                                <Typography gutterBottom style={{textAlign: 'center', backgroundColor: 'lightgrey'}}>
                                    <span>Conditions:</span>
                                </Typography>

                                <Typography gutterBottom>
                                    Environnement: {selectedTemoign.obs_1_env_sol_type}
                                </Typography>

                                <Typography gutterBottom>
                                    Condition meteo: {selectedTemoign.obs_conditions_meteo}
                                </Typography>

                                <Typography gutterBottom>
                                    cadre de reference: {selectedTemoign.obs_1_cadre_reference_type}
                                </Typography>

                                <Typography gutterBottom>
                                    Durée d'observation: {selectedTemoign.obs_duree_lib}
                                </Typography>

                                <Typography gutterBottom style={{textAlign: 'center', backgroundColor: 'lightgrey'}}>
                                    <span>Localisation:</span>
                                </Typography>

                                <Typography gutterBottom>
                                    Cap: {selectedTemoign.obs_1_cap}
                                </Typography>

                                <Typography gutterBottom>
                                    Trajectoire: {selectedTemoign.obs_1_trajectoire_lib}
                                </Typography>

                                <Typography gutterBottom>
                                    Vitesse: {selectedTemoign.obs_1_vitesse_types}
                                </Typography>

                                <Typography gutterBottom>
                                    Taille apparente: {selectedTemoign.obs_1_taille_apparente_type}
                                </Typography>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleClose()} color="primary">
                                    Fermer
                                </Button>
                            </DialogActions>
                        </Dialog>
                        : null
                    }</div>

            );
        } else {
            return <div style={{margin: '100px'}}>Chargement…</div>;
        }
    }
}