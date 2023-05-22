import react, {useState, lazy} from 'react';
const SchemaForm = lazy(() => import('@/pages/process/components/schema-form'
))
interface ProcessType {
	className?: string;
}

const Process: React.FC<ProcessType> = (props: any) => {
	return (
		<>
			<SchemaForm></SchemaForm>
		</>
	)
};
export default Process;