import React from "react";
import PropTypes from 'prop-types';

import ReactTable from "react-table";
import "react-table/react-table.css";


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
      const { data } = this.props;
      return (
        <div>
           <ReactTable
                data={data}
                filterable
                columns={[
                    {
                        Header: "Team",
                        accessor: "TEAM"
                    },
                    {
                        Header: "Player",
                        accessor: "PLAYER"  
                    },
                    {
                        Header: "Games",
                        accessor: "GAMES"  
                    },
                    {
                        Header: "Wins",
                        accessor: "W"  
                    },
                    {
                        Header: "Loss",
                        accessor: "L"  
                    },
                    {
                        Header: "Win Rate",
                        accessor: "WR"  
                    },
                    {
                        Header: "Kills",
                        accessor: "K"  
                    },
                    {
                        Header: "Deaths",
                        accessor: "D"  
                    },
                    {
                        Header: "Assists",
                        accessor: "A"  
                    },
                    {
                        Header: "Creep Score",
                        accessor: "CS"  
                    },
                    {
                        Header: "Creep Score Per Minute",
                        accessor: "CSPM"  
                    },
                    {
                        Header: "Gold",
                        accessor: "G"  
                    },
                    {
                        Header: "Gold Per Minute",
                        accessor: "GPM"  
                    },
                    {
                        Header: "Kill Participation",
                        accessor: "KPAR"  
                    },
                    {
                        Header: "Kill Steal",
                        accessor: "KS"  
                    },
                    {
                        Header: "Goal Share",
                        accessor: "GS"  
                    },
                    {
                        Header: "Champion Pool",
                        accessor: "CP"  
                    },
                    {
                        Header: "Champion",
                        accessor: "Champs"  
                    },
                ]}
                defaultPageSize={15}
                className="-striped -highlight"
           /> 
        </div>      
      );
    }
}

Table.propTypes = {
    data: PropTypes.array,
};

export default Table;