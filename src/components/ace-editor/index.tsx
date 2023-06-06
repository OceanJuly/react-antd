import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Props } from "react-rnd";

function AceEditorCom(props: Props) {
    function onChange(newValue: string, oldValue: string) {
        console.log("change", newValue, oldValue);
      }
    return (
        <>
            <AceEditor
                mode={props.mode}
                theme="eclipse"
                name="app_code_editor"
                fontSize={16}
                showPrintMargin
                showGutter
                readOnly={props.readOnly || true}
                onChange={onChange}
                value={props.code}
                wrapEnabled
                highlightActiveLine  //突出活动线
                enableSnippets  //启用代码段
                style={{ width: '100%', height: '100%' }}
                setOptions={{
                    enableBasicAutocompletion: true,   //启用基本自动完成功能
                    enableLiveAutocompletion: true,   //启用实时自动完成功能 （比如：智能代码提示）
                    enableSnippets: true,  //启用代码段
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </>
    )
}

export default AceEditorCom;