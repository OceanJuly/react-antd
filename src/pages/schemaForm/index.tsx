import react, {useState} from 'react';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/antd'
import './schemaForm.css'
import { completeFormTask } from '@/api/dashboard';
import { useParams } from "react-router-dom"
interface SchemaFormProps {
    className?: string;
}

const schema: RJSFSchema = {
	title: '请假申请表',
	type: 'object',
	required: ['name', 'day', 'days'],
	properties: {
		name: { type: 'string', title: '名称', default: '' },
		day: { type: 'string', format: 'date', title: '开始日期', default: '' },
		days: { type: 'number', title: '请假天数', default: '' },
		reason: { type: 'string', title: '理由', default: '' },
	},
};

const SchemaForm: React.FC<SchemaFormProps> = (props: any) => {
	const routerParams = useParams()
	function tranObj(obj: any) {
		return Object.keys(obj).map((key: string) => {
			const p: any = schema.properties
			const tar = p[key]
			const type = tar.type
			return {
				"id": tar.title,
				"name": tar.title,
				"type": type,
				"value": obj[key]
			}
		})
	}

	function handleSubmit(info: any) {
		if (info.errors.length) return
		const obj: any = {
			taskId: routerParams.id,
			properties: tranObj(info.formData)
		}
		completeFormTask({
			params: obj,
			config: {
				headers: {
					Username: 'admin',
					Password: 'test'
				}
			}
		})
	}
	return (
		<div className="rjsf-form-wrap">
			<Form
				className="rjsf-form"
				schema={schema}
				validator={validator}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};
export default SchemaForm;