import { format } from 'date-fns'
import React from 'react'
import Mytable from './MyTable'
import FiltreCas from './FiltreCas';

class CasTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cas: [],
            resume: "",
            departement: "",
            classe: "tous",
            dateDepart: "",
            dateFin: "",
            count: 0,
            page: 0,
            pageSize: 20
        };
        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.changeResume = this.changeResume.bind(this);
        this.changeDepartement = this.changeDepartement.bind(this);
        this.changeClasse = this.changeClasse.bind(this);
        this.changeDateDepart = this.changeDateDepart.bind(this);
        this.changeDateFin = this.changeDateFin.bind(this);
    }

    componentDidMount() {
        this.getcasFromServer();
    }

    changeResume(event) {
        this.setState({
            resume: event.target.value
        }, this.getcasFromServer)
    }

    changeDepartement(event) {
        this.setState({
            departement: event.target.value
        }, this.getcasFromServer)
    }

    changeClasse(event) {
        this.setState({
            classe: event.target.value
        }, this.getcasFromServer)
    }

    changeDateDepart(event) {
        var result = event ? format(new Date(event), 'yyyy-MM-dd') : "";
        this.setState({
            dateDepart: result
        }, this.getcasFromServer)
    }

    changeDateFin(event) {
        var result = event ? format(new Date(event), 'yyyy-MM-dd') : "";
        this.setState({
            dateFin: result
        }, this.getcasFromServer)
    }

    changePage(event, newPage) {
        this.setState({
            page: newPage
        }, this.getcasFromServer)
    }

    changePageSize(event) {
        this.setState({
            pageSize: parseInt(event.target.value, 10)
        }, this.getcasFromServer)
    }

    goToCasDetail = (event, id_cas) => {
        this.props.transition.router.stateService.go('detailsCas', { id_cas: id_cas })
    };

    getcasFromServer() {
        const { resume, departement, classe, dateDepart, dateFin } = this.state;
        let reqResume = resume ? "&resume=" + resume : "";
        let reqDepartement = departement ? "&zone=" + departement : "";
        let reqClasse = (classe !== "tous" && classe) ? "&classification=" + classe : "";
        let reqDateDepart = dateDepart ? "&dateCasDebut=" + dateDepart : "";
        let reqDateFin = dateFin ? "&dateCasFin=" + dateFin : "";
        let url = "http://localhost:8888/cas?page=" + this.state.page + "&pagesize=" + this.state.pageSize + reqResume + reqDepartement + reqClasse + reqDateDepart + reqDateFin;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result)
                    this.setState({
                        isLoaded: true,
                        cas: result.data,
                        count: result.count
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, cas, count, page, pageSize } = this.state;
        if (error) {
            return <div style={{ textAlign: "center", marginTop: 80, }}>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            // Trouver un composant de chargement...
            return <div style={{ textAlign: "center", marginTop: 80, }}>Chargement…</div>;
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: 80, }}>
                    <FiltreCas
                        changeResume={this.changeResume}
                        changeDepartement={this.changeDepartement}
                        changeClasse={this.changeClasse}
                        changeDateDepart={this.changeDateDepart}
                        changeDateFin={this.changeDateFin}
                    />
                    <Mytable
                        cas={cas}
                        count={count}
                        page={page}
                        pageSize={pageSize}
                        changePage={this.changePage}
                        changePageSize={this.changePageSize}
                        onRowClick={this.goToCasDetail}
                    />
                </div>

            );
        }
    }

}

export default CasTable