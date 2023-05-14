import React from "react";

function dataWidget() {

    return (<React.Suspense>
        <div class="data-com-wrap">
            <div className="title">已使用</div>
            <div className="data">4</div>
            <div className="unit">个组件</div>
        </div>
    </React.Suspense>)
}

export default dataWidget