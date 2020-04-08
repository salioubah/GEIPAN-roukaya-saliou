import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, TablePagination } from '@material-ui/core';
import CasPagination from './CasPagination'
import {UIRouterReact} from "@uirouter/react";

const router = new UIRouterReact();
export default class MyTable extends React.Component {
  constructor(props) {
    super(props)
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }
  changePage() {
    this.props.changePage()
  }
  changePageSize() {
    this.props.changePageSize()
  }

    handleRowClick = (event, id) => {
        console.log(id);
        router.stateService.go('detailsCas', {id: id})
    };

  render() {
    return (
      <div>
        <h1>Liste des cas d'observation ({this.props.count} au total)</h1>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={3}>
          <Grid item xs={11}>
            <TableContainer elevation={20} component={Paper}>
              <Table aria-label="customized table">
                <TableHead style={{ backgroundColor: 'blue' }}>
                  <TableRow>
                    <TableCell style={{ color: 'white' }}>Nom du cas</TableCell>
                    <TableCell align="right" style={{ color: 'white' }}>Date d'observation</TableCell>
                    <TableCell align="right" style={{ color: 'white' }}>Département</TableCell>
                    <TableCell align="right" style={{ color: 'white' }}>Classe</TableCell>
                    <TableCell align="right" style={{ color: 'white' }}>Date de mis à jour</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.cas.map(row => (
                    <TableRow key={row._id}
                              onClick={event => this.handleRowClick(event, row)}
                    >
                      <TableCell component="th" scope="row">
                        {row.cas_nom_dossier}
                      </TableCell>
                      <TableCell align="right">{row.cas_AAAA}-{row.cas_MM}-{row.cas_JJ}</TableCell>
                      <TableCell align="right">{row.cas_zone_nom}</TableCell>
                      <TableCell align="right">{row.cas_classification}</TableCell>
                      <TableCell align="right">{row.cas_date_maj}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
                      colSpan={3}
                      count={this.props.count}
                      rowsPerPage={this.props.pageSize}
                      page={this.props.page}
                      labelRowsPerPage="Cas d'observations par page"
                      SelectProps={{
                        inputProps: { 'aria-label': '' },
                        native: true,
                      }}
                      onChangePage={this.props.changePage}
                      onChangeRowsPerPage={this.props.changePageSize}
                      ActionsComponent={CasPagination}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}