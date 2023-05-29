import { Button, Tooltip } from "antd";
import { Props } from "react-rnd";

function ToolTipBtn(props: Props) {
    return (
        <Tooltip
            placement={props.placement || 'top'}
            title={props.tip}>
                <Button {...props.btnProps}>{props.children || ''}</Button>
        </Tooltip>
    )
}

export default ToolTipBtn