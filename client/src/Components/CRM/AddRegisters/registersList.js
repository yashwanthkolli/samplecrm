import MaterialTable from 'material-table'

export const LogTable = ({data}) => {
    return(
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Shift', field: 'shift', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'userid', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Login Time', field: 'login_time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Commencing No.', field: 'commencing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Closing No.', field: 'closing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Logout Time', field: 'logout_time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'ITC', field: 'ITC', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'NI', field: 'NI', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'CAN', field: 'CAN', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'SPCAN', field: 'SPCAN', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Total Tickets', field: 'total_ticket', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'No. of Pass', field: 'Number_of_pass', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Cash', field: 'CASH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Voucher', field: 'Vouncher', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'POS', field: 'POS', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'E-Cash', field: 'Ecash', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'UPI Payment', field: 'UPI_PAYMENT', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Grand Total', field: 'Gtotal', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Partroll Ending No.', field: 'Partroll_ending_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'HOC', field: 'HOC', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'TOC', field: 'TOC', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
} 

