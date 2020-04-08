import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class DetailsCas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cas: null

        };
    }
    componentDidMount() {
        this.getcasIdFromServer();
    }

    getcasIdFromServer() {
        const {id_cas} = this.props.$stateParams;
        let url = "http://localhost:8888/cas/" + id_cas;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        cas: result,
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
        const { error, isLoaded, cas } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <Card style={{margin: '100px'}}>
                    <CardContent>
                        <h1>Details cas </h1>
                    <table style={{width: '100%'}}>
                        <tbody>
                        <tr>
                            <td>Id:</td>
                            <td>{cas.id_cas}</td>
                        </tr>
                        <tr>
                            <td>Nom de dossier:</td>
                            <td>{cas.cas_nom_dossier}</td>
                        </tr>

                        <tr>
                            <td>Zone:</td>
                            <td>{cas.cas_zone_nom}</td>
                        </tr>
                        <tr>
                            <td>Departement:</td>
                            <td>{cas.cas_zone_type}</td>
                        </tr>

                        <tr>
                            <td>Resumé:</td>
                            <td>{cas.cas_resume}</td>
                        </tr>

                        <tr>
                            <td>Resumé web:</td>
                            <td>{cas.cas_resume_web}</td>
                        </tr>

                        </tbody>
                    </table>
                    </CardContent>
                </Card>
            );
        }
    }
}