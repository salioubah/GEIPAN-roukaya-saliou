import React from "react";
import MaterialTable from "material-table";

class MyTable extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: "90%", textAlign: "center", marginTop: 80, marginLeft: "auto", marginRight: "auto" }}>
        <MaterialTable
          columns={[
            { title: "Adı", field: "name" },
            { title: "Soyadı", field: "surname" },
            { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
            {
              title: "Doğum Yeri",
              field: "birthCity",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
            }
          ]}
          data={[
            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
          ]}
          title="GEIPAN TABLE"
        />
      </div>
    );
  }
}

export default MyTable