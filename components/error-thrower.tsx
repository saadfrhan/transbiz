import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorThrower(
	{error}: {error: string}
) {
	return (<>
		<Alert variant="destructive">
		<AlertCircle className="h-4 w-4 text-destructive" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
	</>)
}