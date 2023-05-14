import React from "react";

function tableWidget() {

    return (<React.Suspense>
        <table border="1" class="tableCom-wrap">
            <tr>
                <th>Month</th>
                <th>Savings</th>
            </tr>
            <tr>
                <td>January</td>
                <td>$100</td>
            </tr>
        </table>
    </React.Suspense>)
}

export default tableWidget