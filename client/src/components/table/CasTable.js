import React from 'react'
import Mytable from './MyTable'

class CasTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cas: [],
            count: 0,
            page: 0,
            pageSize: 20
        };
        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }

    componentDidMount() {
        this.getcasFromServer();
    }

    changePage(event, newPage) {
        this.setState({
            isLoaded: false,
            error: null,
            page: newPage
        }, this.getcasFromServer)
    }

    changePageSize(event) {
        this.setState({
            isLoaded: false,
            error: null,
            pageSize: parseInt(event.target.value, 10)
        }, this.getcasFromServer)
    }

    getcasFromServer() {
        let url = "http://localhost:8888/cas?page=" + this.state.page + "&pagesize=" + this.state.pageSize;
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
                    <Mytable
                        cas={cas}
                        count={count}
                        page={page}
                        pageSize={pageSize}
                        changePage={this.changePage}
                        changePageSize={this.changePageSize} />
                </div>

            );
        }
    }

}

export default CasTable