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
            count: 0,
            page: 0,
            pageSize: 20
        };
        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.changeResume = this.changeResume.bind(this);
        this.changeDepartement = this.changeDepartement.bind(this);
        this.changeClasse = this.changeClasse.bind(this);
    }

    componentDidMount() {
        this.getcasFromServer();
    }

    changeResume(event) {
        console.log("CasTable");
        this.setState({
            resume: event.target.value
        }, this.getcasFromServer)
    }

    changeDepartement(event) {
        console.log("CasTable");
        this.setState({
            departement: event.target.value
        }, this.getcasFromServer)
    }

    changeClasse(event) {
        console.log("CasTable");
        this.setState({
            classe: event.target.value
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

    getcasFromServer() {
        const { resume, departement, classe } = this.state;
        let reqResume = resume ? "&resume=" + resume : "";
        let reqDepartement = departement ? "&zone=" + departement : "";
        let reqClasse = (classe !== "tous" && classe) ? "&classification=" + classe : "";
        let url = "http://localhost:8888/cas?page=" + this.state.page + "&pagesize=" + this.state.pageSize + reqResume + reqDepartement + reqClasse;
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
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            // Trouver un composant de chargement...
            return <div>Chargement…</div>;
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: 80, }}>
                    <FiltreCas
                        changeResume={this.changeResume}
                        changeDepartement={this.changeDepartement}
                        changeClasse={this.changeClasse}
                    />
                    <Mytable
                        cas={cas}
                        count={count}
                        page={page}
                        pageSize={pageSize}
                        changePage={this.changePage}
                        changePageSize={this.changePageSize}
                    />
                </div>

            );
        }
    }

}

export default CasTable